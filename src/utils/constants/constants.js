export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  PROFESSIONAL: "professional",
};

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
};

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 128,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  PRICE_MIN: 1,
  PRICE_MAX: 1000000,
  YEAR_MIN: 1900,
  YEAR_MAX: new Date().getFullYear(),
  TRACK_MIN: 1,
  TRACK_MAX: 999,
};

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_CHILE: /^\+56[0-9]{9}$/,
  RUT_CHILE: /^[0-9]+-[0-9kK]{1}$/,
  URL: /^https?:\/\/.+/,
};
