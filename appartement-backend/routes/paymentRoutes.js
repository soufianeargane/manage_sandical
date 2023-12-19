const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");
const checkTokenMiddleware = require("../middlewares/tokenMiddleware");

router.post("/create", checkTokenMiddleware, paymentController.createPayment);

/**
 * @swagger
 * /api/payment/create:
 *   post:
 *     summary: Create a payment
 *     description: Create a payment for a specific apartment.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100.00
 *               apartmentId:
 *                 type: string
 *                 example: "1234567890"
 *               month:
 *                 type: integer
 *                 example: 5
 *               year:
 *                 type: integer
 *                 example: 2023
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
 *                   description: Indicates if the payment was created successfully.
 *                   example: "Payment created successfully"
 *       '500':
 *         description: Internal Server Error
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
    "/payments-by-month",
    checkTokenMiddleware,
    paymentController.getPaymentsByMonth
);

/**
 * @swagger
 * /api/payment/payments-by-month:
 *   get:
 *     summary: Get payments by month
 *     description: Get all payments for a specific month.
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: query
 *         name: MONTH
 *         schema:
 *           type: integer
 *           example: 5
 *         description: Month number (1-12)
 *       - in: query
 *         name: YEAR
 *         schema:
 *           type: integer
 *           example: 2023
 *         description: Year number
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 paidApartments:
 *                   type: array
 *                   description: List of apartments that have paid for the current month.
 *                 unpaidApartments:
 *                   type: array
 *                   description: List of apartments that have not paid for the current month.
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that something went wrong.
 *                   example: "Internal server error"
 */
router.get(
    "/single-payment/:id",
    checkTokenMiddleware,
    paymentController.getSinglePayment
);

/**
 * @swagger
 * /api/payment/single-payment/{id}:
 *   get:
 *     summary: Get single payment
 *     description: Get a single payment by id.
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "1234567890"
 *         description: Payment ID
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: File
 *               format: binary
 *               description: PDF file containing the payment information.
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that something went wrong.
 *                   example: "Internal server error"
 */

router.put(
    "/update-payment/:id",
    checkTokenMiddleware,
    paymentController.updatePayment
);

/**
 * @swagger
 * /api/payment/update-payment/{id}:
 *   put:
 *     summary: Update payment
 *     description: Update a payment by id.
 *     tags:
 *       - Payment
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: "1234567890"
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100.00
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
 *                   description: Indicates if the payment was updated successfully.
 *                   example: "Payment updated successfully"
 *                 payment:
 *                   type: object
 *                   description: Updated payment object.
 *       '404':
 *         description: Payment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that the payment was not found.
 *                   example: "Payment not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating that something went wrong.
 *                   example: "Internal server error"
 */

module.exports = router;
