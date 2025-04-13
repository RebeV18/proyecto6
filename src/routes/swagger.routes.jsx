/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        idProd:
 *          type: string
 *        cancion:
 *          type: string
 *        autores:
 *          type: string
 *        cd:
 *          type: string
  *        precio:
 *          type: double
 *          isActive:
 *            type: boolean

 *    User:
 *      type: object
 *      properties:
 *        idProd:
 *          type: string
 *        nombre:
 *          type: string
  *       apellido:
 *          type: string
 *        pais:
 *          type: string
  *       email:
 *          type: string
 *        telefono:
 *          type: string
  *        password:
 *          type: string
 *          isActive:
 *            type: boolean
  *         isAdmin:
 *            type: boolean

 */

/**
* @swagger
* middlewares:
*   authMiddleware:
*     summary: Verifica login del usuario a través del token.
*
*   verifyAdmin:
*     summary: Verifica si el usuario logueado es administrador o no por medio de isAdmin.
*       $ref: '#/components/schemas/User'
*/

/**
 * @swagger
 * /api-docs/product/create:
 *   post:
 *     summary: Crea un producto (canción)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: [] #middlewares:authMiddleware & verifyAdmin
 *          $ref: '#middlewares'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto creado con éxito
 *       500:
 *         description: Error al intentar crear un producto
 */
 router.post("product/create", products.controller.createProduct);

 /**
  * @swagger
  * /api-docs/product/readall:
  *   get:
  *     summary: Obtiene todos los productos
  *     tags: [Product]
  *     responses:
  *       200:
  *         description: Productos encontrados con éxito
  *       500:
  *         description: Error al intentar obtener todos los productos
  */
 router.get("product/readall", products.controller.getAllProducts);
 
 /**
  * @swagger
  * /api-docs/product/readone/{id}:
  *   get:
  *     summary: Obtiene un producto por ID.
  *     tags: [Product]
  *     parameters:
  *       - in: path
  *         idProd: id
  *         schema:
  *           type: string
  *         required: true
  *         description: id del producto
  *     responses:
  *       200:
  *         description: Productos con el id: ${id} encontrado con éxito
  *       500:
  *         description: Error al intentar obtener un producto por ID ${id}
  */
    router.get("product/readone/{id}:", products.controller.getProductById);

/**
  * @swagger
  * /api-docs/product/update/{id}:
  *   put:
  *     summary: Edita la información del producto con ID {id}.
  *     tags: [Product]
  *     security:
  *       - bearerAuth: [] #middlewares:authMiddleware & verifyAdmin
  *          $ref: '#middlewares
  *     parameters:
  *       - in: path
  *         idProd: id
  *         schema:
  *           type: string
  *         required: true
  *         description: id del producto
  *     responses:
  *       200:
  *         description: Producto con el id: ${id} actualizado con éxito
  *       500:
  *         description: Error al intentar actualizar el producto con el ID ${id}
  */
    router.put("product/update/{id}", products.controller.updateProductById);

/**
  * @swagger
  * /api-docs/product/delete/{id}:
  *   delete:
  *     summary: Coloca como inactivo el producto con ID {id}.
  *     tags: [Product]
  *     security:
  *       - bearerAuth: [] #middlewares:authMiddleware & verifyAdmin
  *          $ref: '#middlewares
  *     parameters:
  *       - in: path
  *         idProd: id
  *         schema:
  *           type: string
  *         required: true
  *         description: id del producto
  *     responses:
  *       200:
  *         description: Producto con el id: ${id} eliminado con éxito
  *       500:
  *         description: Error al intentar eliminar el producto con el ID: ${id}
  */
  router.put("product/delete/{id}", products.controller.deleteProductById);


/**
  * @swagger
  * /api-docs/product/restore/{id}:
  *   patch:
  *     summary: Coloca como activo nuevamente el producto con ID {id}.
  *     tags: [Product]
  *     security:
  *       - bearerAuth: [] #middlewares:authMiddleware & verifyAdmin
  *          $ref: '#middlewares
  *     parameters:
  *       - in: path
  *         idProd: id
  *         schema:
  *           type: string
  *         required: true
  *         description: id del producto
  *     responses:
  *       200:
  *         description: Producto con el id: ${id} restaurado con éxito
  *       500:
  *         description: Error al intentar restaurar el producto con el ID: ${id}
  */
    router.patch("product/restore/{:id}", products.controller.restoreProductById);




  /**
 * @swagger
 * /api-docs/user/register:
 *   post:
 *     summary: Crea un usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: [] #middlewares:authMiddleware & verifyAdmin
 *          $ref: '#middlewares
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       500:
 *         description: Error al intentar registrar el usuario
 */
 router.post("user/register", user.controller.register);

 /**
  * @swagger
  * /api-docs/user/login:
  *   post:
  *     summary: Realiza logueo del usuario
  *     tags: [User]
  *     security:
  *       - bearerAuth: [] #middlewares:authMiddleware & verifyAdmin
  *          $ref: '#middlewares
  *     requestBody:
  *       content:
  *         application/json:
  *              email:
  *                 required: yes
  *                 $ref: '#/components/schemas/User/email'
  *              password:
  *                 required: yes
  *                 $ref: '#/components/schemas/User/password'
  *     responses:
  *       200:
  *         description: Usuario logueado con éxito
  *       500:
  *         description: Credenciales incorrectas
  */
 router.post("user/login", user.controller.login);
 
 /**
  * @swagger
  * /api-docs/user/verifytoken:
  *   get:
  *     summary: Permite que la plataforma recuerde el estado de inicio de sesión por medio del token.
  *     tags: [User]
  *     security:
  *       - bearerAuth: [] #middlewares:authMiddleware & verifyAdmin
  *          $ref: '#middlewares
  *     requestBody:
  *       content:
  *         application/json:
  *              token:
  *                 type: string
  *     responses:
  *       200:
  *         description: Token válido
  *       500:
  *         description: Error
  */
 
 router.get("user/verifytoken", user.controller.verifyToken);

 /**
  * @swagger
  * /api-docscls
  * /user/update/{id}:
  *   put:
  *     summary: Edita la información del usuario con ID {id}.
  *     tags: [User]
  *     security:
  *       - bearerAuth: [] #middlewares:authMiddleware & verifyAdmin
  *          $ref: '#middlewares
  *     parameters:
  *       - in: path
  *         idUser: id
  *         schema:
  *           type: string
  *         required: true
  *         description: id del usuario
  *     responses:
  *       200:
  *         description: El usuario con el id: ${id} fue actualizado con éxito
  *       500:
  *         description: No tienes permiso para editar este usuario
  */
router.put("user/update/{id}", user.controller.updateUserById);