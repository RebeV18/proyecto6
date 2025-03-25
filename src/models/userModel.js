import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true },
    comuna: { type: String, required: true },
    email: { type: String, required: true },
    fono: { type: String, required: true },
}, { versionKey: false, timestamps: false });

export const Users = mongoose.model('users', usersSchema);