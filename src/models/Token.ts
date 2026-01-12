import mongoose, { Types, Schema } from "mongoose";

export type TokenType = {
    token: string;
    userId: Types.ObjectId;
    expiresAt: Date;
};

const TokenSchema = new Schema<TokenType>({
    token: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    expiresAt: { type: Date, expires: '10m', default: Date.now },
});

const Token = mongoose.model<TokenType>("Token", TokenSchema);
export default Token;