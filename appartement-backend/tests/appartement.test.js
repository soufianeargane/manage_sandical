const createAppartement =
    require("../controllers/AppartementController").createAppartement;
const AppartementModel = require("../models/AppartementModel");

describe("Test createAppartement function", () => {
    it("should create an appartement and return success message", async () => {
        // define req and res
        const req = {
            body: {
                number: "123456",
                building: "123456",
                owner: "abdoo",
                status: "sold",
            },
        };
        const res = {
            json: jest.fn(),
        };

        // mock the create method of AppartementModel
        AppartementModel.create = jest.fn().mockResolvedValue({});

        // call the function
        await createAppartement(req, res);

        expect(res.json).toHaveBeenCalledWith({
            success: "Appartement created successfully",
            appartement: expect.any(Object),
        });
    });

    it("should return an error message if something goes wrong", async () => {
        // define req and res
        const req = {
            body: {
                number: "123456",
                building: "123456",
                owner: "abdoo",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        AppartementModel.create = jest
            .fn()
            .mockRejectedValue(new Error("Something went wrong"));

        // call the function
        await createAppartement(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Something went wrong",
        });
    });
});

const getAllAppartements =
    require("../controllers/AppartementController").getAllAppartements;

describe("Test getAllAppartements function", () => {
    it("should return all appartements", async () => {
        // define req and res
        const req = {};
        const res = {
            json: jest.fn(),
        };

        // mock the find method of AppartementModel
        AppartementModel.find = jest.fn().mockResolvedValue([]);

        // call the function
        await getAllAppartements(req, res);

        expect(res.json).toHaveBeenCalledWith({
            status: true,
            data: expect.any(Array),
        });
    });

    it("should return an error message if something goes wrong", async () => {
        // define req and res
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        AppartementModel.find = jest
            .fn()
            .mockRejectedValue(new Error("Something went wrong"));

        // call the function
        await getAllAppartements(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Something went wrong",
        });
    });
});

const getAppartementById =
    require("../controllers/AppartementController").getAppartementById;

describe("Test getAppartementById function", () => {
    it("should return an appartement", async () => {
        // define req and res
        const req = {
            params: {
                id: "123456",
            },
        };
        const res = {
            json: jest.fn(),
        };

        // mock the findById method of AppartementModel
        AppartementModel.findById = jest.fn().mockResolvedValue({});

        // call the function
        await getAppartementById(req, res);

        expect(res.json).toHaveBeenCalledWith({
            success: "Appartement found successfully",
            data: expect.any(Object),
        });
    });

    it("should return an error message if something goes wrong", async () => {
        // define req and res
        const req = {
            params: {
                id: "123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        AppartementModel.findById = jest
            .fn()
            .mockRejectedValue(new Error("Something went wrong"));

        // call the function
        await getAppartementById(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Something went wrong",
        });
    });
});

const updateAppartement =
    require("../controllers/AppartementController").updateAppartement;

describe("Test updateAppartement function", () => {
    it("should update an appartement", async () => {
        // define req and res
        const req = {
            params: {
                id: "123456",
            },
            body: {
                number: "123456",
                building: "123456",
                owner: "abdoo",
                status: "sold",
            },
        };
        const res = {
            json: jest.fn(),
        };

        // mock the findByIdAndUpdate method of AppartementModel
        AppartementModel.findByIdAndUpdate = jest.fn().mockResolvedValue({});

        // call the function
        await updateAppartement(req, res);

        expect(res.json).toHaveBeenCalledWith({
            success: "Appartement updated successfully",
            updatedAppartement: expect.any(Object),
        });
    });

    it("should return an error message if something goes wrong", async () => {
        // define req and res
        const req = {
            params: {
                id: "123456",
            },
            body: {
                number: "123456",
                building: "123456",
                owner: "abdoo",
                status: "sold",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        AppartementModel.findByIdAndUpdate = jest
            .fn()
            .mockRejectedValue(new Error("Something went wrong"));

        // call the function
        await updateAppartement(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Something went wrong",
        });
    });
});

const deleteAppartement =
    require("../controllers/AppartementController").deleteAppartement;

describe("Test deleteAppartement function", () => {
    it("should delete an appartement", async () => {
        // define req and res
        const req = {
            params: {
                id: "123456",
            },
        };
        const res = {
            json: jest.fn(),
        };

        // mock the findByIdAndDelete method of AppartementModel
        AppartementModel.findByIdAndDelete = jest.fn().mockResolvedValue({});

        // call the function
        await deleteAppartement(req, res);

        expect(res.json).toHaveBeenCalledWith({
            success: "Appartement deleted successfully",
            deletedAppartement: expect.any(Object),
        });
    });

    it("should return an error message if something goes wrong", async () => {
        // define req and res
        const req = {
            params: {
                id: "123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        AppartementModel.findByIdAndDelete = jest
            .fn()
            .mockRejectedValue(new Error("Something went wrong"));

        // call the function
        await deleteAppartement(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Something went wrong",
        });
    });
});
