import { type Request, type Response } from "express";
import User from "../models/User";
import Token from "../models/Token";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { generateJWT } from "../utils/jwt";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
    static createUser = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const userExists = await User.findOne({ email });
            const user = new User(req.body);

            if (userExists) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            user.password = await hashPassword(password);
            const token = new Token();
            token.token = generateToken();
            token.userId = user._id;

            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })
            
            await Promise.allSettled([user.save(), token.save()]);

            res.status(201).json({ message: "User created successfully. Please check your email to confirm your account." });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static confirmEmail = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExist = await Token.findOne({ token });

            if (!tokenExist) {
                res.status(400).json({ message: "Invalid or expired token" });
                return;
            }

            const user = await User.findById(tokenExist.userId);
            if (!user) {
                res.status(400).json({ message: "User not found" });
                return;
            }
            
            user.confirmed = true;
            await Promise.allSettled([user.save(), Token.deleteOne()]);
            res.status(200).json({ message: "Email confirmed successfully" });
        } catch (error) {
            console.error("Error confirming email:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                res.status(400).json({ message: "Invalid email or password" });
                return;
            }

            if (!user.confirmed) {
                const token = new Token();
                token.userId = user._id;
                token.token = generateToken();
                await token.save();

                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                });

                res.status(401).json({ message: "Please confirm your email before logging in" });
                return;
            }

            const isPasswordValid = await checkPassword(password, user.password);
            if (!isPasswordValid) {
                res.status(400).json({ message: "Invalid email or password" });
                return;
            }

            const token = generateJWT({ id: user._id.toString() });
            res.send(token)

        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};