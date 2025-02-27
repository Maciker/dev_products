import type { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import db from '../../../lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { fileId } = req.query as { fileId: string };
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const file = db
      .prepare('SELECT * FROM files WHERE id = ? AND userId = ?')
      .get(fileId, decoded.userId);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=report-${fileId}.pdf`);
    doc.pipe(res);

    doc.text(`Report for File: ${file.filename}`);
    doc.text(`Uploaded on: ${new Date(file.uploadDate).toLocaleString()}`);
    doc.end();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}