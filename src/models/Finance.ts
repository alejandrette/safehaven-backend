import mongoose, { Schema, Types } from "mongoose";

export type FinanceType = {
    name: string;
    amount: number;
    date: Date;
    categorieId: string;
    typeId: string;
    userId: string;
};

const FinanceSchema: Schema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    categorieId: { type: Types.ObjectId, ref: 'Categorie', required: true },
    typeId: { type: Types.ObjectId, ref: 'Type', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Finance = mongoose.model<FinanceType>('Finance', FinanceSchema);
export default Finance;