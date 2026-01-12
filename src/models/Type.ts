import mongoose, { Schema } from "mongoose";

export type TypeType = {
    name: string;
};

const TypeSchema: Schema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const Type = mongoose.model<TypeType>('Type', TypeSchema);
export default Type;