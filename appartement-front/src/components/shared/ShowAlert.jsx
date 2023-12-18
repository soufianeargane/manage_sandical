import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

function ShowAlert({ severity, title, message, setSuccess }) {
    return (
        <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert
                onClose={() => {
                    setSuccess(false);
                }}
                severity={severity}
            >
                <AlertTitle>{title}</AlertTitle>
                {message}
            </Alert>
        </Stack>
    );
}

export default ShowAlert;
