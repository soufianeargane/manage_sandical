const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/PaymentController");
const checkTokenMiddleware = require("../middlewares/tokenMiddleware");

router.post("/create", checkTokenMiddleware, paymentController.createPayment);
router.get(
    "/payments-by-month",
    checkTokenMiddleware,
    paymentController.getPaymentsByMonth
);
router.get(
    "/single-payment/:id",
    checkTokenMiddleware,
    paymentController.getSinglePayment
);

router.put(
    "/update-payment/:id",
    checkTokenMiddleware,
    paymentController.updatePayment
);
module.exports = router;
