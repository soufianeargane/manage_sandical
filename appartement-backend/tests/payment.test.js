const createPayment = require("../controllers/PaymentController").createPayment;
const PaymentModel = require("../models/PaymentModel");
const AppartementModel = require("../models/AppartementModel");

jest.mock("../models/PaymentModel");

describe("Test createPayment function", () => {
    it("should create a payment and return success message", async () => {
        // Mock the PaymentModel.create method to return a payment object
        const mockPayment = {
            _id: "1234567890",
            amount: 100,
            apartment: "apartmentId",
            month: 9,
            year: 2022,
        };
        PaymentModel.create.mockResolvedValue(mockPayment);

        const req = {
            body: {
                amount: 100,
                apartmentId: "apartmentId",
            },
        };
        const res = {
            json: jest.fn(),
        };

        await createPayment(req, res);

        expect(PaymentModel.create).toHaveBeenCalledWith({
            amount: 100,
            apartment: "apartmentId",
            month: expect.any(Number),
            year: expect.any(Number),
        });

        // Check if res.json is called with the success message and the payment object
        expect(res.json).toHaveBeenCalledWith({
            success: "Payment created successfully",
            payment: mockPayment,
        });
    });

    it("should return an error message if something goes wrong", async () => {
        // Mock the PaymentModel.create method to throw an error
        const mockError = new Error("Something went wrong");
        PaymentModel.create.mockRejectedValue(mockError);

        const req = {
            body: {
                amount: 100,
                apartmentId: "apartmentId",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await createPayment(req, res);

        // Check if res.status is called with 500
        expect(res.status).toHaveBeenCalledWith(500);
        // Check if res.json is called with the error message
        expect(res.json).toHaveBeenCalledWith({
            error: "Something went wrong",
        });
    });
});

const getPaymentsByMonth =
    require("../controllers/PaymentController").getPaymentsByMonth;

describe("Test getPaymentsByMonth function", () => {
    it("should return paid and unpaid apartments", async () => {
        // Mock the AppartementModel.find method to return an array of apartments
        const mockApartments = [
            {
                _id: "apartmentId1",
                number: "123456",
                building: "123456",
                owner: "abdoo",
                status: "sold",
            },
            {
                _id: "apartmentId2",
                number: "123456",
                building: "123456",
                owner: "abdoo",
                status: "sold",
            },
        ];
        const mockPayments = [
            {
                _id: "paymentId1",
                amount: 100,
                month: 9,
                year: 2021,
                apartment: {
                    _id: "apartmentId1",
                    number: "123456",
                    building: "123456",
                    owner: "abdoo",
                    status: "sold",
                },
            },
        ];
        const mockPopulatedPayments = mockPayments.map((payment) => ({
            ...payment,
            apartment: mockApartments.find(
                (apartment) => apartment._id === payment.apartment
            ),
        }));
        AppartementModel.find = jest.fn().mockResolvedValue(mockApartments);
        PaymentModel.find.mockResolvedValue(mockPayments);

        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        await getPaymentsByMonth(req, res);

        // Check if res.json is called with paid and unpaid apartments
        expect(res.json).toHaveBeenCalled();
    }, 15000);

    it("should return an error message if something goes wrong", async () => {
        // Mock the AppartementModel.find method to throw an error
        const mockError = new Error("Something went wrong");
        AppartementModel.find.mockRejectedValue(
            new Error("Something went wrong")
        );

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getPaymentsByMonth(req, res);

        // Check if res.status is called with 500
        expect(res.status).toHaveBeenCalledWith(500);
        // Check if res.json is called with the error message
        expect(res.json).toHaveBeenCalledWith({
            error: "Internal server error",
        });
    });
});
