import { DataBaseError } from '../../errors/TypeError.js';
import { Users } from '../../model/Users.model.js';


export const updateDocsUsers = async() => {
    try {
        await Users.updateMany(
            { isActive: { $exists: false} }, 
            { $set: { isActive: true } }
        );
    } catch (error) {
        throw new DataBaseError('No pudimos actualizar los documentos en la base de datos', 500, error);
    }
};