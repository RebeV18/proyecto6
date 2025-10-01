/**
 * @swagger
 * info:
 *   title: LG Songs API
 *   version: 1.0.0
 *   description: |
 *     API completa para la tienda de música LG Songs
 *
 *     ## Características
 *     - 🎵 **Gestión de productos musicales** (canciones y álbumes)
 *     - 👥 **Sistema de usuarios** con autenticación JWT
 *     - 💰 **Pagos integrados** con MercadoPago
 *     - 🔐 **Autenticación y autorización** completa
 *     - 📱 **API RESTful** moderna
 *
 *     ## Autenticación
 *     La API utiliza JWT (JSON Web Tokens) para autenticación.
 *     Include el token en el header: `Authorization: Bearer <tu_jwt_token>`
 *
 *     ## Códigos de Estado
 *     - `200` - Éxito
 *     - `201` - Creado exitosamente
 *     - `400` - Error en los datos de entrada
 *     - `401` - No autorizado
 *     - `403` - Permisos insuficientes
 *     - `404` - Recurso no encontrado
 *     - `500` - Error interno del servidor
 *   contact:
 *     name: "Soporte LG Songs"
 *     email: "soporte@lgsongs.com"
 *     url: "https://lgsongs.com/soporte"
 *   license:
 *     name: "ISC"
 * servers:
 *   - url: http://localhost:3000
 *     description: Servidor de desarrollo
 *   - url: https://api.lgsongs.com
 *     description: Servidor de producción
 *
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - cancion
 *         - autores
 *         - cd
 *         - precio
 *         - track_numero
 *         - anho_lanzamiento
 *         - imagen
 *         - apple
 *         - spotify
 *         - youtube
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del producto
 *           example: "abc123def456"
 *         cancion:
 *           type: string
 *           description: Nombre de la canción
 *           example: "Bohemian Rhapsody"
 *         autores:
 *           type: string
 *           description: Artistas o autores de la canción
 *           example: "Queen, Freddie Mercury"
 *         cd:
 *           type: string
 *           description: Nombre del álbum o CD
 *           example: "A Night at the Opera"
 *         precio:
 *           type: number
 *           minimum: 1
 *           maximum: 1000000
 *           description: Precio en pesos chilenos
 *           example: 15990
 *         track_numero:
 *           type: number
 *           minimum: 1
 *           maximum: 999
 *           description: Número de track en el álbum
 *           example: 11
 *         anho_lanzamiento:
 *           type: number
 *           minimum: 1900
 *           maximum: 2025
 *           description: Año de lanzamiento
 *           example: 1975
 *         imagen:
 *           type: string
 *           format: uri
 *           description: URL de la imagen del álbum
 *           example: "https://example.com/album-cover.jpg"
 *         apple:
 *           type: string
 *           format: uri
 *           description: Enlace a Apple Music
 *           example: "https://music.apple.com/album/bohemian-rhapsody"
 *         spotify:
 *           type: string
 *           format: uri
 *           description: Enlace a Spotify
 *           example: "https://open.spotify.com/track/bohemian-rhapsody"
 *         youtube:
 *           type: string
 *           format: uri
 *           description: Enlace a YouTube
 *           example: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ"
 *         isActive:
 *           type: boolean
 *           description: Estado del producto
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     User:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - pais
 *         - email
 *         - telefono
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del usuario
 *           example: "user123abc"
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Nombre del usuario
 *           example: "Juan"
 *         apellido:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Apellido del usuario
 *           example: "Pérez"
 *         pais:
 *           type: string
 *           description: País del usuario
 *           example: "Chile"
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *           example: "juan.perez@email.com"
 *         telefono:
 *           type: string
 *           pattern: "^\\+56[0-9]{9}$"
 *           description: Teléfono chileno
 *           example: "+56912345678"
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña del usuario
 *           example: "password123"
 *         isActive:
 *           type: boolean
 *           description: Estado del usuario
 *           example: true
 *         isAdmin:
 *           type: boolean
 *           description: Si es administrador
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *
 *     PaymentPreference:
 *       type: object
 *       required:
 *         - items
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "product123"
 *               title:
 *                 type: string
 *                 example: "Bohemian Rhapsody - Queen"
 *               quantity:
 *                 type: number
 *                 example: 1
 *               unit_price:
 *                 type: number
 *                 example: 15990
 *         back_urls:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               format: uri
 *               example: "http://localhost:5173/payment/success"
 *             failure:
 *               type: string
 *               format: uri
 *               example: "http://localhost:5173/payment/failure"
 *             pending:
 *               type: string
 *               format: uri
 *               example: "http://localhost:5173/payment/pending"
 *         payer:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Juan"
 *             surname:
 *               type: string
 *               example: "Pérez"
 *             email:
 *               type: string
 *               format: email
 *               example: "juan.perez@email.com"
 *             phone:
 *               type: object
 *               properties:
 *                 area_code:
 *                   type: string
 *                   example: "56"
 *                 number:
 *                   type: string
 *                   example: "912345678"
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Operación exitosa"
 *         data:
 *           type: object
 *         statusCode:
 *           type: number
 *           example: 200
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error en la operación"
 *         statusCode:
 *           type: number
 *           example: 400
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   - name: System
 *     description: Endpoints del sistema y salud
 *   - name: Products
 *     description: Gestión de productos (canciones)
 *   - name: Users
 *     description: Gestión de usuarios
 *   - name: Payment
 *     description: Procesamiento de pagos con MercadoPago
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check del servidor
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Servidor funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   example: 123.456
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 service:
 *                   type: string
 *                   example: "LG Songs Backend"
 *                 database:
 *                   type: string
 *                   example: "Firebase Firestore"
 *                 memory:
 *                   type: object
 *                   properties:
 *                     used:
 *                       type: string
 *                       example: "45 MB"
 *                     total:
 *                       type: string
 *                       example: "128 MB"
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos ordenados por CD y track
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Número máximo de productos a retornar
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de productos a saltar
 *     responses:
 *       200:
 *         description: Productos encontrados con éxito
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   post:
 *     summary: Crea un nuevo producto (solo administradores)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             cancion: "Bohemian Rhapsody"
 *             autores: "Queen, Freddie Mercury"
 *             cd: "A Night at the Opera"
 *             precio: 15990
 *             track_numero: 11
 *             anho_lanzamiento: 1975
 *             imagen: "https://example.com/album-cover.jpg"
 *             apple: "https://music.apple.com/album/bohemian-rhapsody"
 *             spotify: "https://open.spotify.com/track/bohemian-rhapsody"
 *             youtube: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ"
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Product'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Permisos insuficientes (requiere admin)
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Actualiza un producto (solo administradores)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Product'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Permisos insuficientes
 *       404:
 *         description: Producto no encontrado
 *
 *   delete:
 *     summary: Elimina un producto (soft delete - solo administradores)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Permisos insuficientes
 *       404:
 *         description: Producto no encontrado
 */

/**
 * @swagger
 * /api/products/cd/{cdName}:
 *   get:
 *     summary: Obtiene todas las canciones de un álbum específico
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: cdName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del álbum/CD
 *         example: "A Night at the Opera"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Número máximo de canciones a retornar
 *     responses:
 *       200:
 *         description: Canciones del álbum encontradas
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *       404:
 *         description: Álbum no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/products/cancion/{cancionName}:
 *   get:
 *     summary: Busca una canción específica por nombre
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: cancionName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la canción
 *         example: "Bohemian Rhapsody"
 *     responses:
 *       200:
 *         description: Canción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Product'
 *       404:
 *         description: Canción no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Busca productos por término de búsqueda
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *         example: "Queen"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Número máximo de resultados
 *     responses:
 *       200:
 *         description: Resultados de búsqueda encontrados
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 *       400:
 *         description: Término de búsqueda requerido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - pais
 *               - email
 *               - telefono
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 example: "Pérez"
 *               pais:
 *                 type: string
 *                 example: "Chile"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@email.com"
 *               telefono:
 *                 type: string
 *                 pattern: "^\\+56[0-9]{9}$"
 *                 example: "+56912345678"
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user:
 *                           $ref: '#/components/schemas/User'
 *                         token:
 *                           type: string
 *                           description: JWT token
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: El usuario ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "juan.perez@email.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         user:
 *                           $ref: '#/components/schemas/User'
 *                         token:
 *                           type: string
 *                           description: JWT token
 *                           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales incorrectas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene lista de usuarios (solo admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Número máximo de usuarios
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de usuarios a saltar
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Permisos insuficientes (requiere admin)
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 *
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Carlos"
 *               apellido:
 *                 type: string
 *                 example: "Pérez González"
 *               telefono:
 *                 type: string
 *                 example: "+56987654321"
 *               pais:
 *                 type: string
 *                 example: "Chile"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/payment/create-preference:
 *   post:
 *     summary: Crea una preferencia de pago en MercadoPago
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentPreference'
 *           example:
 *             items:
 *               - id: "product123"
 *                 title: "Bohemian Rhapsody - Queen"
 *                 quantity: 1
 *                 unit_price: 15990
 *             back_urls:
 *               success: "http://localhost:5173/payment/success"
 *               failure: "http://localhost:5173/payment/failure"
 *               pending: "http://localhost:5173/payment/pending"
 *             payer:
 *               name: "Juan"
 *               surname: "Pérez"
 *               email: "juan.perez@email.com"
 *               phone:
 *                 area_code: "56"
 *                 number: "912345678"
 *     responses:
 *       201:
 *         description: Preferencia de pago creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID de la preferencia
 *                           example: "123456789-abcd-1234-5678-123456789abc"
 *                         init_point:
 *                           type: string
 *                           format: uri
 *                           description: URL para iniciar el pago
 *                           example: "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=123456789-abcd-1234-5678-123456789abc"
 *                         sandbox_init_point:
 *                           type: string
 *                           format: uri
 *                           description: URL para sandbox (testing)
 *                           example: "https://sandbox.mercadopago.cl/checkout/v1/redirect?pref_id=123456789-abcd-1234-5678-123456789abc"
 *       401:
 *         description: No autorizado
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     summary: Webhook para notificaciones de MercadoPago
 *     tags: [Payment]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "12345678"
 *               live_mode:
 *                 type: boolean
 *                 example: false
 *               type:
 *                 type: string
 *                 example: "payment"
 *               date_created:
 *                 type: string
 *                 format: date-time
 *                 example: "2023-10-01T10:30:00.000Z"
 *               application_id:
 *                 type: string
 *                 example: "123456789012345"
 *               user_id:
 *                 type: string
 *                 example: "987654321"
 *               version:
 *                 type: string
 *                 example: "1"
 *               api_version:
 *                 type: string
 *                 example: "v1"
 *               action:
 *                 type: string
 *                 example: "payment.created"
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345678"
 *     responses:
 *       200:
 *         description: Webhook procesado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Datos del webhook inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/payment/status/{paymentId}:
 *   get:
 *     summary: Obtiene el estado de un pago
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del pago en MercadoPago
 *         example: "12345678"
 *     responses:
 *       200:
 *         description: Estado del pago obtenido
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: ID del pago
 *                           example: "12345678"
 *                         status:
 *                           type: string
 *                           enum: [pending, approved, rejected, cancelled]
 *                           description: Estado del pago
 *                           example: "approved"
 *                         status_detail:
 *                           type: string
 *                           description: Detalle del estado
 *                           example: "accredited"
 *                         transaction_amount:
 *                           type: number
 *                           description: Monto de la transacción
 *                           example: 15990
 *                         date_created:
 *                           type: string
 *                           format: date-time
 *                           description: Fecha de creación
 *                           example: "2023-10-01T10:30:00.000Z"
 *                         date_approved:
 *                           type: string
 *                           format: date-time
 *                           description: Fecha de aprobación
 *                           example: "2023-10-01T10:35:00.000Z"
 *       404:
 *         description: Pago no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: No autorizado
 */
