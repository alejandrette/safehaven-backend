import mongoose, { Schema } from 'mongoose';

export type UserType = {
    name: string;
    email: string;
    password: string;
    confirmed: boolean;
    rolId: string;
};

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    confirmed: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model<UserType>('User', UserSchema);
export default User;