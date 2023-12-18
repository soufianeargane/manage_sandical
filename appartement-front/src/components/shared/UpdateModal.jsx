/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axiosInstance";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function UpdateModal({
    opened,
    setUpdateModalOpen,
    selectedAppartement,
    setInserted,
    inserted,
    setSuccess,
    setError,
}) {
    const [open, setOpen] = useState(false);
    const [localSelectedAppartement, setLocalSelectedAppartement] =
        useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const schema = yup.object().shape({
        owner: yup.string().required(),
        building: yup.string().required(),
        number: yup.string().required(),
        status: yup.string().required(),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        setLocalSelectedAppartement(selectedAppartement);

        setValue("owner", selectedAppartement?.owner || "");
        setValue("building", selectedAppartement?.building || "");
        setValue("number", selectedAppartement?.number || "");
        setValue("status", selectedAppartement?.status || "");
    }, [selectedAppartement, setValue]);

    const onSubmit = async (data) => {
        try {
            let result = await axiosInstance.put(
                `api/appartement/update/${selectedAppartement._id}`,
                data,
                {
                    withCredentials: true,
                }
            );
            setUpdateModalOpen(false);
            setSuccess(true);
            setInserted(!inserted);
        } catch (error) {
            console.log(error);
            setError(true);
            setUpdateModalOpen(false);
        }
    };

    return (
        <div>
            {/* <Button onClick={handleOpen}>Update </Button> */}
            <Modal
                open={opened}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* close button */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => {
                                setUpdateModalOpen(false);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} action="">
                        <div className="mb-4">
                            <label
                                className="block text-sm text-gray-600 dark:text-gray-400"
                                htmlFor=""
                            >
                                Owner name
                            </label>
                            <input
                                type="text"
                                className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                placeholder="Search"
                                {...register("owner")}
                            />
                            {errors.owner && (
                                <p style={{ margin: 0, color: "red" }}>
                                    {errors.owner.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm text-gray-600 dark:text-gray-400"
                                htmlFor=""
                            >
                                Building
                            </label>
                            <input
                                type="text"
                                className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                placeholder="Search"
                                {...register("building")}
                            />
                            {errors.building && (
                                <p style={{ margin: 0, color: "red" }}>
                                    {errors.building.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-sm text-gray-600 dark:text-gray-400"
                                htmlFor=""
                            >
                                Number
                            </label>
                            <input
                                type="text"
                                className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                placeholder="Search"
                                {...register("number")}
                            />
                            {errors.number && (
                                <p style={{ margin: 0, color: "red" }}>
                                    {errors.number.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-sm text-gray-600 dark:text-gray-400"
                                htmlFor=""
                            >
                                Status
                            </label>
                            <select
                                name=""
                                id=""
                                className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                {...register("status")}
                            >
                                <option disabled value="">
                                    Select an option
                                </option>
                                <option value="rental">Rent</option>
                                <option value="sold">Sold</option>
                            </select>
                            {errors.status && (
                                <p style={{ margin: 0, color: "red" }}>
                                    {errors.status.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-3 rounded font-medium w-full"
                            >
                                Update Appartement
                            </button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default UpdateModal;
