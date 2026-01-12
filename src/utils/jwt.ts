import * as jwt from 'jsonwebtoken';

type UserType = {
    id: string;
}

export const generateJWT = (payload: UserType): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('Missing JWT_SECRET environment variable');
    const options = { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions;
    const token = jwt.sign({ id: payload.id } as jwt.JwtPayload, secret as jwt.Secret, options);
    return token;
};