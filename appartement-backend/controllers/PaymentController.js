const PaymentModel = require("../models/PaymentModel");
const AppartementModel = require("../models/AppartementModel");
const PDFDocument = require("pdfkit");

const createPayment = async (req, res) => {
    try {
        const { amount, apartmentId } = req.body;

        const today = new Date();
        const month = today.getMonth() + 1; // Months are zero-based
        const year = today.getFullYear();

        const payment = await PaymentModel.create({
            amount,
            apartment: apartmentId,
            month,
            year,
        });

        res.json({ success: "Payment created successfully", payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getPaymentsByMonth = async (req, res) => {
    try {
        const today = new Date();
        const month = today.getMonth() + 1; // Months are zero-based
        const year = today.getFullYear();

        // Fetch all apartments
        const allApartments = await AppartementModel.find();

        // Fetch paid apartments for the current month
        const paidApartments = await PaymentModel.find({
            month,
            year,
            apartment: { $in: allApartments.map((apartment) => apartment._id) },
        }).populate("apartment");

        // Separate paid and unpaid apartments
        const paidApartmentsIds = paidApartments.map((payment) =>
            String(payment.apartment._id)
        );
        const unpaidApartments = allApartments.filter(
            (apartment) => !paidApartmentsIds.includes(String(apartment._id))
        );

        res.json({
            paidApartments,
            unpaidApartments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSinglePayment = async (req, res) => {
    try {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        // apartmentId
        const payment_id = req.params.id;
        // Fetch all apartments
        const allApartments = await AppartementModel.find();
        // Fetch paid apartments for the current month
        const payment = await PaymentModel.find({
            _id: payment_id,
            month,
            year,
            apartment: { $in: allApartments.map((apartment) => apartment._id) },
        }).populate("apartment");

        if (!payment) {
            return res.status(404).send("Payment not found");
        }
        const apartment = payment[0].apartment;

        // Create a new PDF document
        const doc = new PDFDocument();

        // Set response headers
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=facture_${apartment.number}.pdf`
        );

        // Pipe the PDF to the response
        doc.pipe(res);

        // Add content to the PDF
        doc.fontSize(16).text("Facture Bill", { align: "center" }).moveDown();
        doc.fontSize(12).text(`Owner: ${apartment.owner}`);
        doc.text(`Building: ${apartment.building}`);
        doc.text(`Apartment Number: ${apartment.number}`);
        doc.text(`Status: ${apartment.status}`);
        doc.text(`Amount: $${payment[0].amount}`);

        // Finalize the PDF
        doc.end();
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    createPayment,
    getPaymentsByMonth,
    getSinglePayment,
};
