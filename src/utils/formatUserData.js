export const formatUserData = (hashedPassword, ...rest) => {
    const { nombre, apellido, pais, email, fono, isAdmin=false } = rest;
    return {
        nombre,
        apellido,
        pais,
        email,
        fono,
        password: hashedPassword,
        isAdmin
    };
};