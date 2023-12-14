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

        if (!payment || payment.length === 0) {
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
        doc.pipe(res, { end: true });

        generateHeader(doc);

        doc.text(`Apartement Number:`, 50, 200)
            .text(`${apartment.number}`, 200, 200)

            .text("Apartment Building:", 50, 215)
            .text(`${apartment.building}`, 200, 215)
            .text("Date:", 50, 230)
            .text(`${today.toLocaleDateString()}`, 200, 230)
            .fontSize(15)
            .font("Helvetica-Bold")
            .text("Owner:", 300, 200)
            .text(`${apartment.owner}`, 370, 200)
            .text("Status:", 300, 225)
            .text(`${apartment.status}`, 370, 225);

        doc.moveDown();

        generateTable(doc, payment[0]);

        // Finalize the PDF
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

function generateHeader(doc) {
    doc.image("logo.png", 50, 45, { width: 50 })
        .fillColor("#444444")
        .fontSize(20)
        .text("SANDIC managment", 110, 57)
        .fontSize(10)
        .text("YouCode", 200, 65, { align: "right" })
        .text("Youssoufia, Morocco", 200, 80, { align: "right" })
        .moveDown();
}

function generateTable(doc, payment) {
    const tableTop = 350;

    doc.font("Helvetica-Bold");
    doc.fontSize(12).text("Amount Paid", 50, tableTop);
    doc.text("Taxes", 200, tableTop);
    doc.text("Total", 300, tableTop);

    doc.font("Helvetica");
    doc.fontSize(12).text(`${payment.amount}`, 50, tableTop + 25);
    doc.text("0", 200, tableTop + 25);
    doc.text(`${payment.amount}`, 300, tableTop + 25);
}

module.exports = {
    createPayment,
    getPaymentsByMonth,
    getSinglePayment,
};
