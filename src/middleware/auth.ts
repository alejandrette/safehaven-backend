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
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const [, token] = bearer.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (typeof decoded === 'object' && decoded.id) {
            const user = await User.findById(decoded.id).select('id name email');
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            } else {
                req.user = user;
                next();
            }
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}