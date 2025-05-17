import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users, User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (users.find(user => user.username === username)) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });

  res.status(201).json({ message: 'User created' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};
