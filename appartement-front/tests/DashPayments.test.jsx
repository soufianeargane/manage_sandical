import { describe, it, expect } from "vitest";
import DashPayments from "../src/pages/DashPayments";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/slices/store";

describe("DashPayments", () => {
    it("renders without error", () => {
        render(
            <Provider store={store}>
                <Router>
                    <DashPayments />
                </Router>
            </Provider>
        );

        expect(screen.getByText("Generate PDF")).toBeInTheDocument();
    });
});
