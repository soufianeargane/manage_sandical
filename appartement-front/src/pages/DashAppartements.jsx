import BasicModal from "../components/shared/Modal";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import UpdateModal from "../components/shared/UpdateModal";

function DashAppartements() {
    const [appartements, setAppartements] = useState([]);
    const [selectedAppartement, setSelectedAppartement] = useState(null);
    const [inserted, setInserted] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    useEffect(() => {
        document.title = "Appartements";
        async function getApartments() {
            try {
                let result = await axiosInstance.get("api/appartement/", {
                    withCredentials: true,
                });
                setAppartements(result.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        getApartments();

        return () => {
            console.log("cleaned up");
        };
    }, [inserted]);

    const deleteAppartement = async (id) => {
        try {
            let result = await axiosInstance.delete(
                `api/appartement/delete/${id}`,
                {
                    withCredentials: true,
                }
            );
            if (result.data.success) {
                setInserted(!inserted);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditClick = (appartement) => {
        console.log(appartement);
        setSelectedAppartement(appartement);
        setUpdateModalOpen(true);
    };
    return (
        <div>
            <div>
                <BasicModal setInserted={setInserted} inserted={inserted} />
            </div>
            <div>
                <div className="relative w-full overflow-x-auto px-20 ">
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
                            {appartements.map((appartement, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
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
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() =>
                                                    handleEditClick(appartement)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                onClick={() =>
                                                    deleteAppartement(
                                                        appartement._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <UpdateModal
                        opened={updateModalOpen}
                        setUpdateModalOpen={setUpdateModalOpen}
                        selectedAppartement={selectedAppartement}
                        setInserted={setInserted}
                        inserted={inserted}
                    />{" "}
                </div>
            </div>
        </div>
    );
}

export default DashAppartements;
