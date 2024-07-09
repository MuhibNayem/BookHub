import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/User';
import { User } from '../types/user';

const JWT_SECRET =
  process.env.JWT_SECRET || 'b3e63aeb-d1aa-414d-9f9f-3f811f89d623';

export const login = async (
  req: Request<{}, {}, { user: User }, {}>,
  res: Response,
) => {
  const { username, password } = req.body.user;

  try {
    const user = await UserModel.findByUsername(username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const register = async (
  req: Request<{}, {}, { user: User }, {}>,
  res: Response,
) => {
  const { username, password, role } = req.body?.user;

  try {
    const existingUser = await UserModel.findByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await UserModel.createUser(username, password, role);

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
