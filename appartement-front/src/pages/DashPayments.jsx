import { useState, useEffect, useRef } from "react";
import axiosInstance from "../api/axiosInstance";
import PayModal from "../components/shared/PayModal";
import EditIcon from "@mui/icons-material/Edit";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ShowAlert from "../components/shared/ShowAlert";
import EditModal from "../components/shared/EditModal";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function DashPayments() {
    const [paidApartments, setPaidApartments] = useState([]);
    const [inserted, setInserted] = useState(false);
    const [unPaidApartments, setUnPaidApartments] = useState([]);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [editPaymentModalOpen, setEditPaymentModalOpen] = useState(false);
    const [selectedAppartement, setSelectedAppartement] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const paidTableRef = useRef(null);
    const nonPaidTableRef = useRef(null);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
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
                setError(false);
                setUnPaidApartments(result.data.unpaidApartments);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        }

        getPayments();

        return () => {};
    }, [inserted]);

    const openModal = (apartment) => {
        setSelectedAppartement(apartment);
        setUpdateModalOpen(true);
    };

    const openEditModal = (apartment) => {
        setSelectedAppartement(apartment);
        setEditPaymentModalOpen(true);
    };

    const generatePDF = () => {
        try {
            const doc = new jsPDF();

            // Add content to the PDF
            doc.text("Paid Apartments", 10, 10);

            // Remove last column (Action) from the paidTable
            const paidTableClone = paidTableRef.current.cloneNode(true);
            paidTableClone.querySelector("thead tr").deleteCell(-1);
            Array.from(paidTableClone.querySelectorAll("tbody tr")).forEach(
                (row) => row.deleteCell(-1)
            );

            doc.autoTable({
                html: paidTableClone,
            });

            // Add spacing between tables
            doc.text(
                "Non-Paid Apartments",
                10,
                doc.autoTable.previous.finalY + 20
            );

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
            doc.save("apartments_report.pdf");
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };

    const handleButtonClick = (appartmentId) => {
        const url = `http://localhost:3000/api/payment/single-payment/${appartmentId}`;
        window.open(url, "_blank"); // Opens the URL in a new tab
    };

    const getData = async (e) => {
        e.preventDefault();
        try {
            const result = await axiosInstance.get(
                `/api/payment/payments-by-month?MONTH=${month}&YEAR=${year}`,
                {
                    withCredentials: true,
                }
            );
            console.log(result.data);
            setPaidApartments(result.data.paidApartments);
            setUnPaidApartments(result.data.unpaidApartments);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    };
    return (
        <div className="px-8 py-2">
            <div className="mb-4">
                {success && (
                    <ShowAlert
                        severity="success"
                        title="Success"
                        message="operation went  successfully"
                        setSuccess={setSuccess}
                    />
                )}
                {error && (
                    <ShowAlert
                        severity="error"
                        title="Error"
                        message="Something went wrong"
                        setSuccess={setError}
                    />
                )}
            </div>
            <div>
                <form onSubmit={getData}>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700 dark:text-white">
                            Get Appartements By Month And Year (Default is this
                            month)
                        </h1>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <input
                            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            type="number"
                            placeholder="Month"
                            onChange={(e) => setMonth(e.target.value)}
                        />
                        <input
                            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                            type="number"
                            placeholder="Year"
                            onChange={(e) => setYear(e.target.value)}
                        />

                        <button>get</button>
                    </div>
                </form>
                <div>
                    <h3>
                        Non Paid Appartements For The{" "}
                        {month === ""
                            ? "current Month"
                            : `month ${month} ${year}`}{" "}
                    </h3>
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
                                setSuccess={setSuccess}
                                setError={setError}
                                month={month}
                                year={year}
                            />

                            <EditModal
                                opened={editPaymentModalOpen}
                                setUpdateModalOpen={setEditPaymentModalOpen}
                                setSuccess={setSuccess}
                                setError={setError}
                                selectedAppartement={selectedAppartement}
                                inserted={inserted}
                                setInserted={setInserted}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <h3>
                        Paid Appartements For The{" "}
                        {month === ""
                            ? "current Month"
                            : `month ${month} ${year}`}{" "}
                    </h3>
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
                                                            <button
                                                                className="hover:text-blue-500 px-2 py-1 hover:bg-gray-100 rounded-full"
                                                                onClick={() =>
                                                                    openEditModal(
                                                                        appartement
                                                                    )
                                                                }
                                                            >
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
