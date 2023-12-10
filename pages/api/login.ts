import dbConnect from '../../mongodb';
import User, { IUser } from '../../models/User';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();
        const { email, password } = req.body;

        const user: IUser | null = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const userResponse = { ...user.toObject(), password: undefined };
        res.status(200).json(userResponse);
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
