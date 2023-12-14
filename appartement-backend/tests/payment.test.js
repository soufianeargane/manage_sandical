const createPayment = require("../controllers/PaymentController").createPayment;
const PaymentModel = require("../models/PaymentModel");

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

        // Check if PaymentModel.create is called with the correct parameters
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
