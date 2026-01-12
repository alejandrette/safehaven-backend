import mongoose, { Schema } from "mongoose";

export type TypeRol = {
    name: string;
    permissions: string[];
};

const RolSchema = new Schema({
    name: { type: String, required: true, unique: true },
    permissions: { type: [String], required: true }
}, { timestamps: true });

const Rol = mongoose.model<TypeRol>('Rol', RolSchema);
export default Rol;