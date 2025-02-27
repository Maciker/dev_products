import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const files = db
      .prepare('SELECT id, filename, uploadDate FROM files WHERE userId = ?')
      .all(decoded.userId);
    return res.status(200).json({ files });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}