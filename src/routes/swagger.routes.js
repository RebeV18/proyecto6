/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         idProd:
 *           type: string
 *         cancion:
 *           type: string
 *         autores:
 *           type: string
 *         cd:
 *           type: string
 *         precio:
 *           type: number
 *         isActive:
 *           type: boolean
 *     User:
 *       type: object
 *       properties:
 *         idProd:
 *           type: string
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         pais:
 *           type: string
 *         email:
 *           type: string
 *         telefono:
 *           type: string
 *         password:
 *           type: string
 *         isActive:
 *           type: boolean
 *         isAdmin:
 *           type: boolean
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Crea un producto (canción)
 *     tags: [Product]
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

/**
 * @swagger
 * /product/readall:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Productos encontrados con éxito
 *       500:
 *         description: Error al intentar obtener todos los productos
 */

/**
 * @swagger
 * /product/readone/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       500:
 *         description: Error al obtener producto
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Crea un usuario
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 *       500:
 *         description: Error al registrar usuario
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Realiza logueo del usuario
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario logueado
 *       500:
 *         description: Credenciales incorrectas
 */
