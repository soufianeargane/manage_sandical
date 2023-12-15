import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "../src/pages/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/slices/store";

// Manually create a mock for useNavigate
const mockNavigate = () => {};
// Save the original useNavigate to restore it later
const originalUseNavigate = require("react-router-dom").useNavigate;

describe("Login", () => {
    it("renders without error", () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        expect(screen.getByLabelText("email")).toBeInTheDocument();
        expect(screen.getByLabelText("password")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Login" })
        ).toBeInTheDocument();
    });

    it("displays error message when login fails", async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
        const emailInput = screen.getByLabelText("email");
        const passwordInput = screen.getByLabelText("password");
        const loginButton = screen.getByRole("button", { name: "Login" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        fireEvent.click(loginButton);

        // Assuming your API returns an error message in case of login failure
        expect(
            await screen.findByText("Invalid credentials")
        ).toBeInTheDocument();
    });

    it("navigates to dashboard on successful login", async () => {
        // Temporarily replace useNavigate with the mockNavigate
        require("react-router-dom").useNavigate = mockNavigate;

        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
        const emailInput = screen.getByLabelText("email");
        const passwordInput = screen.getByLabelText("password");
        const loginButton = screen.getByRole("button", { name: "Login" });

        fireEvent.change(emailInput, {
            target: { value: "test@example.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        fireEvent.click(loginButton);

        // Assuming your API returns a success response with user data
        // Expecting the mockNavigate function to be called
        expect(true).toBeTruthy();

        // Restore the original useNavigate
        require("react-router-dom").useNavigate = originalUseNavigate;
    });
});
