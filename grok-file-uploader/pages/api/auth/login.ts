import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import db from '../../../lib/db';
import bcrypt from 'bcryptjs';

interface LoginRequestBody {
  username: string;
  password: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body as LoginRequestBody;

  // Input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check JWT_SECRET
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    return res.status(500).json({ message: 'Internal server error' });
  }

  // Fetch user from database
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Set httpOnly cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    })
  );

  return res.status(200).json({
    message: 'Logged in successfully',
    user: { id: user.id, username: user.username },
  });
}