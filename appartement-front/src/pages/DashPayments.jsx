import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import PayModal from "../components/shared/PayModal";

function DashPayments() {
    const [paidApartments, setPaidApartments] = useState([]);
    const [inserted, setInserted] = useState(false);
    const [unPaidApartments, setUnPaidApartments] = useState([]);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedAppartement, setSelectedAppartement] = useState(null);
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
    return (
        <div className="px-8 py-2">
            <div>
                <div>
                    <h3>Non Paid Appartements For The current Month </h3>
                    <div className="mt-4">
                        <div className="relative w-full overflow-x-auto px-12 ">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2">
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
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2">
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
                                                    <div className="flex justify-center gap-1">
                                                        <button className="bg-red-600 hover:bg-red-700 text-xs text-white font-bold py-2 px-4 rounded-full">
                                                            Edit amount
                                                        </button>
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
        </div>
    );
}

export default DashPayments;
