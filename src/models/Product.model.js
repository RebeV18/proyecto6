import mongoose, { Types } from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    cancion: { type: String, required: true },
    autores: { type: String, required: true },
    cd: { type: String, required: true },
    precio: { type: Types.Double, required: true },
    imagen: { type: String, required: true },
    anho_lanzamiento: { type: Number, required: true },
    apple: { type: String, required: true },
    spotify: { type: String, required: true },
    youtube: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.isActive;
        return ret;
      },
    },
    versionKey: false,
    timestamps: false,
  }
);

export const Product = mongoose.model("product", productSchema);
