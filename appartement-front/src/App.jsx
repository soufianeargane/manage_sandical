import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthorizedRoute from "./services/AuthorizedRoute";
import { Provider } from "react-redux";
import store from "./slices/store";
import RootLayout from "./layouts/RootLayout";
import DashAppartements from "./pages/DashAppartements";
import DashPayments from "./pages/DashPayments";
import { Login } from "./pages/Login";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dash/" element={<RootLayout />}>
                        <Route
                            path="appartements"
                            element={
                                <AuthorizedRoute
                                    element={<DashAppartements />}
                                />
                            }
                        />
                        <Route
                            path="payments"
                            element={
                                <AuthorizedRoute element={<DashPayments />} />
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
