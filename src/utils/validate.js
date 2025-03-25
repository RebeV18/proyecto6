import { NotFoundError, ValidationError } from '../errors/TypeError.js';


export const validateDate = (date) => {
    const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateRegEx.test(date)) {
        throw new ValidationError('La fecha no es valida', `la fecha ${date} debe tener el formato YYYY-MM-DD`);
    }
};

/**
 * Arroja un error de NotFoundError si la data entrega es un falsy o un Array vacio
 * @param {any} data - Data que se desea evaluar
 * @param {string} message - Mensaje personalizado de error
 * @param {string} datails - Detalle personalizado de error
 * @throws {NotFoundError} - Si la data es falsy o un Array vacio
 */
export const notFoundData = (data, message, datails) => {
    if(!data) throw new NotFoundError(
        message || 'No se encontraron los datos',
        datails || 'No se econtraron los datos solicitados'
    );

    if(Array.isArray(data) && data.length === 0) throw new NotFoundError(
        message || 'No se encontraron los datos',
        datails || 'No se econtraron los datos solicitados'
    );
};

export const notActive = (data, message, datails) => {
    if(Array.isArray(data) && data.length > 0) {
        data.forEach(item => {
            if(!item.isActive) throw new NotFoundError(
                message || 'No se encontraron los datos activos',
                datails || 'No se econtraron los datos acrtivos solicitados'
            );
        });
    }

    if(!Array.isArray(data) && !data.isActive) throw new NotFoundError(
        message || 'No se encontraron los datos activos',
        datails || 'No se econtraron los datos acrtivos solicitados'
    );
};

export const notFoundActiveData = (data, message, details) => {
    notFoundData(data, message, details);
    notActive(data, message, details);
};