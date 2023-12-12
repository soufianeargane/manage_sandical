import validateToken from "../helpers/validateToken";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/userSlice";

// eslint-disable-next-line react/prop-types
const AuthorizedRoute = ({ element }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogged, setIsLogged] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        async function checkTOKEN() {
            if (user.name) {
                setIsLogged(true);
                console.log(user);
            } else {
                try {
                    let result = await validateToken();
                    if (result.success) {
                        setIsLogged(true);
                        dispatch(setUser(result.user));
                    } else {
                        navigate("/login");
                    }
                } catch (error) {
                    console.log("errror");
                }
            }
        }

        checkTOKEN();
    }, []);

    if (isLogged) {
        return element;
    } else {
        return <div>loading...</div>;
    }
};

export default AuthorizedRoute;
