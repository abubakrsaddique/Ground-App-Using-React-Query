import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

const useProfileImage = (onClose) => {
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [userProfilePreview, setUserProfilePreview] = useState(null);
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(null);
  const queryClient = useQueryClient();
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const fetchCurrentProfileImageUrl = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCurrentProfileImageUrl(userData.profileImage || null);
      } else {
        setCurrentProfileImageUrl(null);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
      setCurrentProfileImageUrl(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserProfileImage(file);
      setUserProfilePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${user.uid}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const saveProfileImage = async (url) => {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { profileImage: url });
  };

  const { mutate: uploadMutate, isLoading: isUploading } = useMutation(
    uploadImage,
    {
      onSuccess: async (url) => {
        await saveProfileImage(url);
        setCurrentProfileImageUrl(url);
        queryClient.invalidateQueries("userProfile");
        toast.success("Profile image updated successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      },
      onError: (error) => {
        console.error("Error uploading image:", error);
      },
    }
  );

  useEffect(() => {
    fetchCurrentProfileImageUrl();
  }, [user]);

  return {
    userProfileImage,
    userProfilePreview,
    currentProfileImageUrl,
    handleImageChange,
    uploadMutate,
    isUploading,
    fetchCurrentProfileImageUrl,
  };
};

export default useProfileImage;
