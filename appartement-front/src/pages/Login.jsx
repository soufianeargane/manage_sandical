// export register component with h1 tag
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validateToken from "../helpers/validateToken";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

export const Login = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkTOKEN() {
            try {
                let result = await validateToken();
                if (result.success) {
                    console.log("success");
                    dispatch(setUser(result.user));
                    navigate("/dash/appartements");
                }
            } catch (error) {
                console.log("errror");
            }
        }

        checkTOKEN();
    }, []);

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(8).max(16),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        await axios
            .post("http://localhost:3000/api/auth/login", data)
            .then((response) => {
                try {
                    console.log(response.data.user);
                    dispatch(setUser(response.data.user));
                    navigate("/dash/appartements");
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error.response.data.error);
                setError(error.response.data.error);
            });
    };

    return (
        <div
            style={{
                width: "100%",
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                component="form"
                sx={{
                    "& .MuiTextField-root": { m: 1, width: "25ch" },
                    border: "1px solid grey",
                    padding: "20px",
                    borderRadius: "10px",
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div
                    style={{
                        maxWidth: "400px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    {error && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    )}
                    <div>
                        <TextField
                            error={!!errors.email}
                            label="email"
                            {...register("email")}
                        />
                        {errors.email && (
                            <p style={{ margin: 0, color: "red" }}>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <TextField
                            type="password"
                            error={!!errors.password}
                            label="password"
                            {...register("password")}
                        />
                        {errors.password && (
                            <p style={{ margin: 0, color: "red" }}>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <p>
                            Don&apos;t have an account?{" "}
                            <a href="/register">Sign up</a>
                        </p>
                    </div>
                </div>
                <Button variant="contained" type="submit">
                    Login
                </Button>
            </Box>
        </div>
    );
};
