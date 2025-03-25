export const response = (res, data, statusCode, message, ...custom) => {
    res.status(statusCode).json({
        message: message || 'Información procesada con éxito',
        statusCode,
        data,
        ...custom //spreef operator
    })
}