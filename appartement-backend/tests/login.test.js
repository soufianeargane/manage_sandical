const loginTest = require("../controllers/authController").login;
const validateForms = require("../validators/validateUserForms").validateForms;
const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("Test loginTest function", () => {
    it("should return 400 if email is not provided", async () => {
        // define req and res
        const req = {
            body: {
                password: "123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.spyOn(validateForms, "validateLogin").mockReturnValue({
            error: { details: [{ message: '"email" is required' }] },
        });

        // call the function
        await loginTest(req, res);

        // check if res.status is called with 400
        expect(res.status).toHaveBeenCalledWith(400);
        // check if res.json is called with { error: 'Email is required' }
        expect(res.json).toHaveBeenCalledWith({ error: '"email" is required' });
    });

    it("should return 400 if user is not found in the database", async () => {
        // define req and res
        const req = {
            body: {
                email: "test@test.com",
                password: "123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.spyOn(validateForms, "validateLogin").mockReturnValue({
            error: null,
        });

        // mock findOne to return null
        UserModel.findOne = jest.fn().mockReturnValue(null);

        // call the function
        await loginTest(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Email is not found" });
    });

    it("should return 400 if password is invalid", async () => {
        // define req and res
        const req = {
            body: {
                email: "test@gmail.com",
                password: "123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.spyOn(validateForms, "validateLogin").mockReturnValue({
            error: null,
        });

        // mock findOne to return user object
        UserModel.findOne = jest.fn().mockReturnValue({});

        // mock compare to return false
        bcryptjs.compare = jest.fn().mockReturnValue(false);

        // call the function
        await loginTest(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid password" });
    });

    it("should call res.cookie and res.json with correct data if login is successful", async () => {
        // define req and res
        const req = {
            body: {
                email: "test@gmail.com",
                password: "123456",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
        };

        jest.spyOn(validateForms, "validateLogin").mockReturnValue({
            error: null,
        });

        // mock findOne to return user object
        UserModel.findOne = jest.fn().mockReturnValue({
            _id: "user_id",
            name: "John Doe",
            email: "test@gmail.com",
        });

        // mock compare to return true
        bcryptjs.compare = jest.fn().mockReturnValue(true);

        // mock sign to return token
        jwt.sign = jest.fn().mockReturnValue("token");

        // call the function
        await loginTest(req, res);

        expect(res.cookie).toHaveBeenCalledWith("authToken", "token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        expect(res.json).toHaveBeenCalledWith({
            success: "Logged in successfully",
            user: {
                _id: "user_id",
                name: "John Doe",
                email: "test@gmail.com",
            },
        });
    });
});
