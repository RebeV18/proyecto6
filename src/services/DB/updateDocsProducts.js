import { DataBaseError } from '../../errors/TypeError.js';
import { Products } from '../../model/Products.model.js';


export const updateDocsProducts = async() => {
    try {
        await Products.updateMany(
            { isActive: { $exists: false} }, 
            { $set: { isActive: true } }
        );
    } catch (error) {
        throw new DataBaseError('No pudimos actualizar los documentos en la base de datos', 500, error);
    }
};