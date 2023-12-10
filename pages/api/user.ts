import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../mongodb';
import User, { IUser } from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    await dbConnect();

    if (method === 'POST') {
        try {
            const { email, password, fullName, phoneNumber, dob } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 14);
            const user: IUser = await User.create({
                email,
                password: hashedPassword,
                fullName,
                phoneNumber,
                dob 
            });
            const userResponse = { ...user.toObject(), password: undefined };

            res.status(201).json(userResponse);
        } catch (error: any) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'Email already exists' });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
