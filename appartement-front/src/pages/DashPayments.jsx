import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import PayModal from "../components/shared/PayModal";
import EditIcon from "@mui/icons-material/Edit";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function DashPayments() {
    const [paidApartments, setPaidApartments] = useState([]);
    const [inserted, setInserted] = useState(false);
    const [unPaidApartments, setUnPaidApartments] = useState([]);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedAppartement, setSelectedAppartement] = useState(null);
    const paidTableRef = useRef(null);
    const nonPaidTableRef = useRef(null);
    useEffect(() => {
        document.title = "Payments";

        async function getPayments() {
            try {
                let result = await axiosInstance.get(
                    "/api/payment/payments-by-month",
                    {
                        withCredentials: true,
                    }
                );
                setPaidApartments(result.data.paidApartments);
                setUnPaidApartments(result.data.unpaidApartments);
            } catch (error) {
                console.log(error);
            }
        }

        getPayments();

        return () => {};
    }, [inserted]);

    const openModal = (apartment) => {
        setSelectedAppartement(apartment);
        setUpdateModalOpen(true);
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Add content to the PDF
        doc.text("Paid Apartments", 10, 10);

        // Remove last column (Action) from the paidTable
        const paidTableClone = paidTableRef.current.cloneNode(true);
        paidTableClone.querySelector("thead tr").deleteCell(-1);
        Array.from(paidTableClone.querySelectorAll("tbody tr")).forEach((row) =>
            row.deleteCell(-1)
        );

        doc.autoTable({
            html: paidTableClone,
        });

        // Add spacing between tables
        doc.text("Non-Paid Apartments", 10, doc.autoTable.previous.finalY + 20);

        // Remove last column (Action) from the nonPaidTable
        const nonPaidTableClone = nonPaidTableRef.current.cloneNode(true);
        nonPaidTableClone.querySelector("thead tr").deleteCell(-1);
        Array.from(nonPaidTableClone.querySelectorAll("tbody tr")).forEach(
            (row) => row.deleteCell(-1)
        );

        doc.autoTable({
            html: nonPaidTableClone,
            startY: doc.autoTable.previous.finalY + 25,
        });

        // Save the PDF
        doc.save("apartments_report.pdf");
    };

    const handleButtonClick = (appartmentId) => {
        const url = `http://localhost:3000/api/payment/single-payment/${appartmentId}`;
        window.open(url, "_blank"); // Opens the URL in a new tab
    };
    return (
        <div className="px-8 py-2">
            <div>
                <div>
                    <h3>Non Paid Appartements For The current Month </h3>
                    <div className="mt-4">
                        <div className="relative w-full overflow-x-auto px-12 ">
                            <table
                                ref={nonPaidTableRef}
                                id="nonPaidTable"
                                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2"
                            >
                                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Owner name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            building number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            apartment number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unPaidApartments &&
                                        unPaidApartments.map(
                                            (appartement, index) => (
                                                <tr
                                                    key={index}
                                                    className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {appartement.owner}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {appartement.building}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {appartement.number}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {appartement.status}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={() =>
                                                                    openModal(
                                                                        appartement
                                                                    )
                                                                }
                                                                className="bg-blue-500 hover:bg-blue-700 text-xs text-white font-bold py-2 px-4 rounded-full"
                                                            >
                                                                Pay now !
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                            <PayModal
                                inserted={inserted}
                                setInserted={setInserted}
                                selectedAppartement={selectedAppartement}
                                opened={updateModalOpen}
                                setUpdateModalOpen={setUpdateModalOpen}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3>Paid Appartements For The current Month</h3>
                    <div className="mt-4">
                        <div className="relative w-full overflow-x-auto px-12 ">
                            <table
                                id="paidTable"
                                ref={paidTableRef}
                                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2"
                            >
                                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Owner name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            building number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            apartment number
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Amount
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paidApartments.map(
                                        (appartement, index) => (
                                            <tr
                                                key={index}
                                                className="bg-white border-b text-center dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {
                                                        appartement.apartment
                                                            .owner
                                                    }
                                                </th>
                                                <td className="px-6 py-4">
                                                    {
                                                        appartement.apartment
                                                            .building
                                                    }
                                                </td>
                                                <td className="px-6 py-4">
                                                    {
                                                        appartement.apartment
                                                            .number
                                                    }
                                                </td>
                                                <td className="px-6 py-4">
                                                    {appartement.amount}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center gap-3">
                                                        <div>
                                                            <button className="hover:text-blue-500 px-2 py-1 hover:bg-gray-100 rounded-full">
                                                                <EditIcon />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="hover:text-red-500 px-2 py-1 hover:bg-black rounded-full"
                                                                onClick={() =>
                                                                    handleButtonClick(
                                                                        appartement._id
                                                                    )
                                                                }
                                                            >
                                                                <LocalPrintshopIcon />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={generatePDF}
            >
                Generate PDF
            </button>
        </div>
    );
}

export default DashPayments;
