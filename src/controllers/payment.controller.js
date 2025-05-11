import { mercadopagoService } from "../services/mercadopago.service.js";
import { response } from "../utils/templates/response.template.js";

export const createPayment = async (req, res, next) => {
  try {
    const { cart } = req.body;
    const preferenceResult = await mercadopagoService(cart);
    response(
      res,
      preferenceResult,
      200,
      "Preferencia de compra creada con éxito"
    );
  } catch (error) {
    next(error);
  }
};
