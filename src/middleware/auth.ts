import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, {  UserType } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: UserType;
        }
    }
}

export const validate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        const user = await User.findById(decoded.id).select('id name email');
        if (!user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}