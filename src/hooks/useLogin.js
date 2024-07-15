import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const useLogin = () => {
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    return userCredential.user;
  };

  const { mutate: loginUser, isLoading } = useMutation(login, {
    onSuccess: () => {
      toast.success("Login successful");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
      throw new Error(
        "Failed to log in. Please check your credentials and try again."
      );
    },
  });

  return { loginUser, isLoading };
};

export default useLogin;
