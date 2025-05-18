import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true },
    pais: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "El correo no es valido"],
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return /^\+[0-9]{11}$/.test(value);
        },
        message: "El teléfono debe tener formato +56999999999",
      },
    },
    password: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.isActive;
        delete ret.isAdmin;
        return ret;
      },
    },
    versionKey: false,
    timestamps: false,
  }
);

export const User = mongoose.model("user", userSchema);
