import mongoose, { Schema } from "mongoose";

export type CategorieType = {
    name: string;
};

const CategorieSchema: Schema = new Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const Categorie = mongoose.model<CategorieType>('Categorie', CategorieSchema);
export default Categorie;