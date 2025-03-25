import { 
    createUserService, 
    deleteUsersByIdService, 
    getAllDeleteUsersService, 
    getAllUsersService, 
    getDeleteUsersByIdService, 
    getUsersByIdService, 
    permaDeleteUserByIdService, 
    restoreUserByIdService, 
    updateUserByIdService 
} from '../services/users.service.js';

import { response } from '../utils/templates/response.template.js';

export const getAllUsers = async(req, res, next) => {
    try {
        const users = await getAllUsersService();
        response(res, users, 200, 'Usuarios encontrados con éxito');
    } catch (error) {
        next(error);
    }
};

export const getUsersById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const users = await getUsersByIdService(id);
        response(
            res,
            users,
            200,
            `Usuarios con el id: ${id} encontrada con éxito`,
        );
    } catch (error) {
        next(error);
    }
};

export const createUser = async(req, res, next) => {
    try {
        const dataUser = req.body;
        const users = await createUserService(dataUser);

        response(res, users, 201, 'Usuario creada con éxito');
    } catch (error) {
        next(error);
    }
};


export const updateUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const dataUser = req.body;

        const [ userOld, userUpdated ] = await updateUserByIdService(id, dataUser);

        const custom = {
            oldData: userOld
        };
        
        response(res, userUpdated, 201, `Usuario con el id: ${id} actualizada con éxito`, custom);
    } catch (error) {
        next(error);
    }
};


/* ESTO NO SE TIENE QUE HACER*/
export const permaDeleteUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const user = await permaDeleteUserByIdService(id);
        response(res, user, 200, `Usuario con el id: ${id} eliminada con éxito`);
    } catch (error) {
        next(error);
    }
};

/*SOFT DELETE*/

export const deleteUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const user = await deleteUsersByIdService(id);

        response(res, user, 200, `Usuario con el id: ${id} eliminada con éxito`);
    } catch (error) {
        next(error);
    }
};

export const restoreUserById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const user = await restoreUserByIdService(id);
        response(res, user, 200, `Usuario con el id: ${id} restaurada con éxito`);
    } catch (error) {
        next(error);
    }
};


export const getDeleteAllUsers = async(req, res, next) => {
    try {
        const users = await getAllDeleteUsersService();
        response(res, users, 200, 'Usuarios encontrada con éxito');
    } catch (error) {
        next(error);
    }
};

export const getDeleteUsersById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const users = await getDeleteUsersByIdService(id);
        response(
            res,
            users,
            200,
            `Usuarios con el id: ${id} encontrada con éxito`,
        );
    } catch (error) {
        next(error);
    }
};