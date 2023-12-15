import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

const defaultValues = {
    owner: "",
    building: "",
    number: "",
    status: "",
};

function BasicModal({ setInserted, inserted }) {
    const [open, setOpen] = React.useState(false);
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
        formState: { errors },
        setValue,
    } = useForm({ resolver: yupResolver(schema), defaultValues });

    React.useEffect(() => {
        if (open) {
            setValue("owner", ""); // Reset owner field
            setValue("building", ""); // Reset building field
            setValue("number", ""); // Reset number field
            setValue("status", ""); // Reset status field
        }
    }, [open, setValue]);

    const onSubmit = async (data) => {
        try {
            let result = await axiosInstance.post(
                "api/appartement/create",
                data,
                {
                    withCredentials: true,
                }
            );
            setInserted(!inserted);
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleOpen}>Add an appartment</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
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
                                defaultValue="" // Set the initial value here
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
                                className="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full"
                            >
                                Add an appartment
                            </button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;
