import { useMutation, useQueryClient } from "react-query";
import { getAuth, updatePassword } from "firebase/auth";
import { toast } from "react-hot-toast";

const useMyAccount = (onClose) => {
  const auth = getAuth();
  const queryClient = useQueryClient();

  const handleChangePassword = async ({ newPassword }) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    }

    await updatePassword(user, newPassword);
  };

  const { mutate, isLoading, error } = useMutation(handleChangePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      toast.success("Password updated successfully!");
      setTimeout(onClose, 2000);
    },
    onError: (error) => {
      toast.error(`Error updating password: ${error.message}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    mutate({ oldPassword, newPassword });
  };

  return {
    handleSubmit,
    isLoading,
    error,
  };
};

export default useMyAccount;
