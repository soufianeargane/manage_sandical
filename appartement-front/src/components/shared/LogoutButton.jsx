import axiosInstance from "../../api/axiosInstance.jsx";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axiosInstance.post("/api/auth/logout").then((response) => {
                console.log(response.data);
                dispatch(setUser({}));
                navigate("/login");
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Typography onClick={handleLogout}>Logout</Typography>
        </div>
    );
};

export default LogoutButton;
