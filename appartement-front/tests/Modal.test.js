import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import BasicModal from "../src/components/shared/Modal";

describe("BasicModal", () => {
    it("renders without error", () => {
        const { getByText } = render(<BasicModal />);
        const addButton = getByText("Add an appartment");
        expect(addButton).toBeInTheDocument();
    });

    it('opens the modal when "Add an appartment" button is clicked', () => {
        const { getByText, getByLabelText } = render(<BasicModal />);
        const addButton = getByText("Add an appartment");
        fireEvent.click(addButton);

        const ownerInput = getByLabelText("Owner name");
        const buildingInput = getByLabelText("Building");
        const numberInput = getByLabelText("Number");
        const statusSelect = getByLabelText("Status");

        expect(ownerInput).toBeInTheDocument();
        expect(buildingInput).toBeInTheDocument();
        expect(numberInput).toBeInTheDocument();
        expect(statusSelect).toBeInTheDocument();
    });

    // it("submits the form and calls the appropriate functions", async () => {
    //     const setInserted = jest.fn();
    //     const setSuccess = jest.fn();
    //     const setError = jest.fn();

    //     const { getByText, getByLabelText } = render(
    //         <BasicModal
    //             setInserted={setInserted}
    //             setSuccess={setSuccess}
    //             setError={setError}
    //         />
    //     );

    //     const addButton = getByText("Add an appartment");
    //     fireEvent.click(addButton);

    //     const ownerInput = getByLabelText("Owner name");
    //     const buildingInput = getByLabelText("Building");
    //     const numberInput = getByLabelText("Number");
    //     const statusSelect = getByLabelText("Status");

    //     // Fill in form fields
    //     fireEvent.change(ownerInput, { target: { value: "John Doe" } });
    //     fireEvent.change(buildingInput, { target: { value: "Building A" } });
    //     fireEvent.change(numberInput, { target: { value: "123" } });
    //     fireEvent.change(statusSelect, { target: { value: "rental" } });

    //     const submitButton = getByText("Add an appartment");
    //     fireEvent.click(submitButton);

    //     // Assuming axiosInstance.post is mocked properly
    //     await waitFor(() => {
    //         expect(axiosInstance.post).toHaveBeenCalledWith(
    //             "api/appartement/create",
    //             {
    //                 owner: "John Doe",
    //                 building: "Building A",
    //                 number: "123",
    //                 status: "rental",
    //             },
    //             { withCredentials: true }
    //         );
    //     });

    //     expect(setSuccess).toHaveBeenCalledTimes(1);
    //     expect(setInserted).toHaveBeenCalledTimes(1);
    //     expect(setError).not.toHaveBeenCalled();
    // });
});
