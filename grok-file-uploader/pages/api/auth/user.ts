import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import db from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = db.prepare('SELECT id, username FROM users WHERE id = ?').get(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}