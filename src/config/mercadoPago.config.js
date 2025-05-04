import { MercadoPagoConfig } from "mercadopago";
import { envs } from "./envs.config.js";

const { mercadoPagoToken, sandbox } = envs.mercadoPago;

const client = new MercadoPagoConfig({
  accessToken: mercadoPagoToken,
  options: { sandbox },
});

export default client;
