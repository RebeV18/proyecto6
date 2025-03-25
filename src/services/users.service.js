import { User } from "../models/userModel.js";

export const getAllUsersService = async () => {
  try {
    const users = await User.find({ isActive: true });
    console.log(users);

    notFoundActiveData(
      users,
      "No pudimos encontrar los usuarios",
      "No pudimos encontrar usuarios en la base de datos en la colección de usuarios"
    );

    return users;
  } catch (error) {
    throw new UsersError(
      "Error al intentar obtener todas los usuarios",
      500,
      error
    );
  }
};


export const getUsersByIdService = async (id) => {
    try {
        const user = await Users.findById(id, { isActive: true });

        notFoundActiveData(
            user,
            `No pudimos encontrar el usuario con el id: ${id}`,
            `No pudimos encontrar el usuario con id: ${id} en la base de datos en la colección de usuarios`
        );

        return user;
    } catch(error) {
        throw new UsersError('Error al intentar obtener una usuario por ID', 500, error);
    }
};

export const createUserService = async(dataUser) => {
    try {
        //TENEMOS QUE VALIDAR DATOS!!!! 
        const user =  await Users.create(dataUser);

        return user;
    } catch (error) {
        throw new UsersError('Error al intentar crear una usuario', 500, error);
    }
};


export const updateUserByIdService = async(id, dataUser) => {
    try {
        //TENEMOS QUE VALIDAR DATOS!!!!
        const userOld = await Users.findOneAndUpdate({ _id: id, isActive: true }, dataUser);

        const userUpdated = await Users.findById(id, { isActive: true });

        notFoundActiveData(
            userOld,
            `No pudimos encontrar el usuario con el id: ${id}`,
            `No pudimos encontrar el usuario con id: ${id} en la base de datos en la colección de users`
        );

        return [ userOld, userUpdated ];
    } catch (error) {
        throw new UsersError('Error al intentar actualizar el usuario con el ID', 500, error);
    }
};


/*ESTO NO DEBERÍA HACERSE!!! DELETE O HARD DELETE*/

export const permaDeleteUserByIdService = async(id) => {
    try {
        const user = await Users.findByIdAndDelete(id);
        notFoundActiveData(
            user,
            `No pudimos encontrar el usuario con el id: ${id}`,
            `No pudimos encontrar el usuario con id: ${id} en la base de datos en la colección de users`
        );

        return user;
    } catch (error) {
        throw new UsersError(`Error al intentar eliminar permanentemente el usuario con el ID: ${id}`, 500, error);
    }
};


/*SOFT DELETE o DELETE LOGICO - ESTO SI SE TIENE QUE HACER*/
export const deleteUsersByIdService = async(id) => {
    try {
        const user = await Users.findByIdAndUpdate(id, { isActive: false});

        notFoundActiveData(
            user,
            `No pudimos encontrar el usuario con el id: ${id}`,
            `No pudimos encontrar el usuario con id: ${id} en la base de datos en la colección de users`
        );

        return user;
    } catch (error) {
        throw new UsersError(`Error al intentar eliminar el usuario con el ID: ${id}`, 500, error);
    }
};

export const restoreUserByIdService = async(id) => {
    try {
        const user = await Users.findByIdAndUpdate(id, { isActive: true });

        notFoundData(
            user,
            `No pudimos encontrar el usuario con el id: ${id}`,
            `No pudimos encontrar el usuario con id: ${id} en la base de datos en la colección de users`
        );

        return user;
    } catch (error) {
        throw new UsersError(`Error al intentar restaurar el usuario con el ID: ${id}`, 500, error);
    }
};


export const getAllDeleteUsersService = async () => {
    try {
        const users = await Users.find({ isActive: false });
        console.log(users);

        notFoundData(
            users,
            'No pudimos encontrar los usuarios',
            'No pudimos encontrar usuarios en la base de datos en la colección de users'
        );

        return users;
    } catch (error) {
        throw new UsersError(
            'Error al intentar obtener todos los usuarios',
            500,
            error
        );
    }
};

export const getDeleteUsersByIdService = async (id) => {
    try {
        const user = await Users.findById(id, { isActive: false });

        notFoundData(
            user,
            `No pudimos encontrar los usuarios con el id: ${id}`,
            `No pudimos encontrar el usuario con id: ${id} en la base de datos en la colección de users`
        );

        return user;
    } catch (error) {
        throw new UsersError(
            'Error al intentar obtener una usuario por ID',
            500,
            error
        );
    }
};
