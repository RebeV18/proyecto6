import { Product } from "../models/productModel.js";

export const getAllProductsService = async () => {
  try {
    const products = await Product.find({ isActive: true });
    console.log(products);

    notFoundActiveData(
      products,
      "No pudimos encontrar los productos",
      "No pudimos encontrar productos en la base de datos en la colección de products"
    );

    return products;
  } catch (error) {
    throw new ProductsError(
      "Error al intentar obtener todas los productos",
      500,
      error
    );
  }
};


export const getProductsByIdService = async (id) => {
    try {
        const product = await Products.findById(id, { isActive: true });

        notFoundActiveData(
            product,
            `No pudimos encontrar el producto con el id: ${id}`,
            `No pudimos encontrar el producto con id: ${id} en la base de datos en la colección de products`
        );

        return product;
    } catch(error) {
        throw new ProductsError('Error al intentar obtener una producto por ID', 500, error);
    }
};

export const createProductService = async(dataProduct) => {
    try {
        //TENEMOS QUE VALIDAR DATOS!!!! 
        const product =  await Products.create(dataProduct);

        return product;
    } catch (error) {
        throw new ProductsError('Error al intentar crear una producto', 500, error);
    }
};


export const updateProductByIdService = async(id, dataProduct) => {
    try {
        //TENEMOS QUE VALIDAR DATOS!!!!
        const productOld = await Products.findOneAndUpdate({ _id: id, isActive: true }, dataProduct);

        const productUpdated = await Products.findById(id, { isActive: true });

        notFoundActiveData(
            productOld,
            `No pudimos encontrar el producto con el id: ${id}`,
            `No pudimos encontrar el producto con id: ${id} en la base de datos en la colección de products`
        );

        return [ productOld, productUpdated ];
    } catch (error) {
        throw new ProductsError('Error al intentar actualizar el producto con el ID', 500, error);
    }
};


/*ESTO NO DEBERÍA HACERSE!!! DELETE O HARD DELETE*/

export const permaDeleteProductByIdService = async(id) => {
    try {
        const product = await Products.findByIdAndDelete(id);
        notFoundActiveData(
            product,
            `No pudimos encontrar el producto con el id: ${id}`,
            `No pudimos encontrar el producto con id: ${id} en la base de datos en la colección de products`
        );

        return product;
    } catch (error) {
        throw new ProductsError(`Error al intentar eliminar permanentemente el producto con el ID: ${id}`, 500, error);
    }
};


/*SOFT DELETE o DELETE LOGICO - ESTO SI SE TIENE QUE HACER*/
export const deleteProductsByIdService = async(id) => {
    try {
        const product = await Products.findByIdAndUpdate(id, { isActive: false});

        notFoundActiveData(
            product,
            `No pudimos encontrar el producto con el id: ${id}`,
            `No pudimos encontrar el producto con id: ${id} en la base de datos en la colección de products`
        );

        return product;
    } catch (error) {
        throw new ProductsError(`Error al intentar eliminar el product con el ID: ${id}`, 500, error);
    }
};

export const restoreProductByIdService = async(id) => {
    try {
        const product = await Products.findByIdAndUpdate(id, { isActive: true });

        notFoundData(
            product,
            `No pudimos encontrar el producto con el id: ${id}`,
            `No pudimos encontrar el producto con id: ${id} en la base de datos en la colección de products`
        );

        return product;
    } catch (error) {
        throw new ProductsError(`Error al intentar restaurar el producto con el ID: ${id}`, 500, error);
    }
};


export const getAllDeleteProductsService = async () => {
    try {
        const products = await Products.find({ isActive: false });
        console.log(products);

        notFoundData(
            products,
            'No pudimos encontrar el producto',
            'No pudimos encontrar products en la base de datos en la colección de products'
        );

        return products;
    } catch (error) {
        throw new ProductsError(
            'Error al intentar obtener todos los productos',
            500,
            error
        );
    }
};

export const getDeleteProductsByIdService = async (id) => {
    try {
        const product = await Products.findById(id, { isActive: false });

        notFoundData(
            product,
            `No pudimos encontrar el producto con el id: ${id}`,
            `No pudimos encontrar el producto con id: ${id} en la base de datos en la colección de products`
        );

        return product;
    } catch (error) {
        throw new ProductsError(
            'Error al intentar obtener una producto por ID',
            500,
            error
        );
    }
};
