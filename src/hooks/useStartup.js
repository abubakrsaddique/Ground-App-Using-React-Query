import { useState } from "react";
import { useMutation } from "react-query";
import { auth, firestore } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const useStartup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createUser = async ({
    firstName,
    lastName,
    email,
    password,
    cardNumber,
    expiry,
    cvc,
  }) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const userRef = firestore
        .collection("users")
        .doc(userCredential.user.uid);

      await userRef.set({
        firstName,
        lastName,
        email,
        cardNumber,
        expiry,
        cvc,
      });

      return userRef;
    } catch (error) {
      throw new Error(
        "Failed to sign up. Please check your details and try again."
      );
    }
  };

  const useSignup = () => {
    const { mutate: saveUserDetails, isLoading } = useMutation(createUser, {
      onSuccess: () => {
        setLoading(false);
        navigate("/dashboard");
        toast.success("Signup successful!");
      },
      onError: (error) => {
        setLoading(false);
        toast.error("Error signing up:", error);
        setError(error.message);
      },
    });

    return {
      saveUserDetails,
      isLoading,
      error,
      setError,
      loading,
    };
  };

  return useSignup();
};

export default useStartup;
