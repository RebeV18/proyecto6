import { Preference } from "mercadopago";
import client from "../../config/mercadoPago.config.js";

import { envs } from "../../config/envs.config.js";
import { PaymentsError } from "../../errors/TypeError.js";

const { frontendUrl } = envs;

export const mercadopagoService = async (cart) => {
  try {
    const items = cart.map((product) => ({
      title: product.cancion,
      unit_price: product.precio,
      quantity: 1,
      currency_id: "CLP",
    }));

    const body = {
      items,
      back_url: {
        success: `${frontendUrl}/mercadopago/status?status=approved`,
        failure: `${frontendUrl}/mercadopago/status?status=failure`,
        pending: `${frontendUrl}/mercadopago/status?status=pending`,
      },
    };

    const preference = new Preference(client);
    const response = await preference.create({ body });

    return response;
  } catch (error) {
    console.error(error);
    throw new PaymentsError(
      "Error al intentar crear la preferencia de compra",
      500,
      error
    );
  }
};
