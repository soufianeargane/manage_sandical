import axiosInstance from "../api/axiosInstance";

const ValidateToken = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/checkauth");
    return response.data;
  } catch (error) {
    return { error: "Error validating token ssss" };
  }
};

export default ValidateToken;
