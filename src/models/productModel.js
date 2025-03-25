import mongoose, { Types } from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    cancion: { type: String, required: true },
    autores: { type: String, required: true },
    cd: { type: String, required: true },
    precio: { type: Types.Double, required: true }
}, { versionKey: false, timestamps: false });

export const Products = mongoose.model('product', productSchema);