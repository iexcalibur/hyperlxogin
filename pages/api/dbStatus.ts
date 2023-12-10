import dbConnect from '../../mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect();
        res.status(200).json({ message: "Connected to MongoDB" });
    } catch (error) {
        res.status(500).json({ message: "Failed to connect to MongoDB", error });
    }
}
