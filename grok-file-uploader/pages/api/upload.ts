import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';
import db from '../../lib/db';
import jwt from 'jsonwebtoken';

export const config = {
  api: { bodyParser: false }, // Disable Next.js body parsing for file uploads
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const userId = decoded.userId;

    const form = formidable({
      uploadDir: './uploads',
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ mimetype }) => {
        const allowedTypes = ['application/pdf', 'text/csv', 'image/jpeg', 'image/png'];
        return mimetype ? allowedTypes.includes(mimetype) : false;
      },
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const filePath = path.join(process.cwd(), 'uploads', file.newFilename);
      db.prepare('INSERT INTO files (userId, filename, uploadDate, filePath) VALUES (?, ?, ?, ?)').run(
        userId,
        file.originalFilename || file.newFilename,
        new Date().toISOString(),
        filePath
      );

      return res.status(200).json({ message: 'File uploaded successfully' });
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}