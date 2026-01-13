import jwt from 'jsonwebtoken';

type UserType = {
    id: string;
}

export const generateJWT = (payload: UserType): string => {
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "180d" });
    return token;
};