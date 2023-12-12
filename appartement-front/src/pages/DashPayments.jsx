import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

function DashPayments() {
    const [paidApartments, setPaidApartments] = useState([]);
    const [unPaidApartments, setUnPaidApartments] = useState([]);
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
                setUnPaidApartments(result.data.unPaidApartments);
            } catch (error) {
                console.log(error);
            }
        }

        getPayments();

        return () => {};
    }, []);
    return (
        <div>
            <div>
                <div>
                    <h3>Non Paid Appartements</h3>
                    <div>
                        <table></table>
                    </div>
                </div>
                <div>
                    <h3>Paid Appartements</h3>
                    <div>
                        <table></table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashPayments;
