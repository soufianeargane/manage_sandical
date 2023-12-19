const express = require("express");
const router = express.Router();
const appartementController = require("../controllers/AppartementController");
const validateAppartementMiddleware = require("../validators/validateAppartement");
const checkTokenMiddleware = require("../middlewares/tokenMiddleware");

router.post(
    "/create",
    [checkTokenMiddleware, validateAppartementMiddleware],
    appartementController.createAppartement
);

/**
 * @swagger
 * /api/appartement/create:
 *   post:
 *     summary: Create an apartment
 *     description: Create an apartment with the specified details.
 *     tags:
 *       - Appartement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *                 example: "123"
 *               building:
 *                 type: string
 *                 example: "A"
 *               owner:
 *                 type: string
 *                 example: "John Doe"
 *               status:
 *                 type: string
 *                 enum: ["rental", "sold"]
 *                 example: "rental"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Indicates if the apartment was created successfully.
 *                   example: "Apartment created successfully"
 *                 appartement:
 *                   $ref: '#/components/schemas/Appartement'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that something went wrong.
 *                   example: "Something went wrong"
 */

router.get("/", checkTokenMiddleware, appartementController.getAllAppartements);

/**
 * @swagger
 * /api/appartement:
 *   get:
 *     summary: Get all apartments
 *     description: Retrieve a list of all apartments.
 *     tags:
 *       - Appartement
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appartement'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that something went wrong.
 *                   example: "Something went wrong"
 */

router.get(
    "/:id",
    checkTokenMiddleware,
    appartementController.getAppartementById
);

/**
 * @swagger
 * /api/appartement/{id}:
 *   get:
 *     summary: Get an apartment by ID
 *     description: Retrieve an apartment by ID.
 *     tags:
 *       - Appartement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the apartment to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appartement'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the apartment was not found.
 *                   example: "Appartment not found"
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that something went wrong.
 *                   example: "Something went wrong"
 */

router.put(
    "/update/:id",
    [checkTokenMiddleware, validateAppartementMiddleware],
    appartementController.updateAppartement
);

/**
 * @swagger
 * /api/appartement/update/{id}:
 *   put:
 *     summary: Update an apartment
 *     description: Update an apartment with the specified details.
 *     tags:
 *       - Appartement
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "1234567890"
 *         description: Apartment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Appartement'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Indicates if the apartment was updated successfully.
 *                   example: "Apartment updated successfully"
 *                 appartement:
 *                   $ref: '#/components/schemas/Appartement'
 *       '404':
 *         description: Apartment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the apartment was not found.
 *                   example: "Apartment not found"
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that something went wrong.
 *                   example: "Something went wrong"
 */

router.delete(
    "/delete/:id",
    checkTokenMiddleware,
    appartementController.deleteAppartement
);

/**
 * @swagger
 * /api/appartement/delete/{id}:
 *   delete:
 *     summary: Delete an apartment
 *     description: Delete an apartment by ID.
 *     tags:
 *       - Appartement
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the apartment to delete.
 *         schema:
 *           type: string
 *           example: "609c8cefb65d5f001fbb1f8d"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Indicates if the apartment was deleted successfully.
 *                   example: "Appartement deleted successfully"
 *                 deletedAppartement:
 *                   $ref: '#/components/schemas/Appartement'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that something went wrong.
 *                   example: "Something went wrong"
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the apartment was not found.
 *                   example: "Appartement not found"
 */

module.exports = router;
