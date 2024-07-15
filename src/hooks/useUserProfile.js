import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const fetchUserProfile = async (uid) => {
  const db = getFirestore();
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};

const fetchProfileImageUrl = async (imagePath) => {
  const storage = getStorage();
  const imageRef = ref(storage, imagePath);
  return getDownloadURL(imageRef);
};

const useUserProfile = (uid) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("userProfile");
  }, [uid, queryClient]);

  return useQuery(["userProfile", uid], async () => {
    const profileData = await fetchUserProfile(uid);
    let imageUrl = "";
    if (profileData.profileImage) {
      imageUrl = await fetchProfileImageUrl(profileData.profileImage);
    }
    return { ...profileData, profileImageUrl: imageUrl };
  });
};

export default useUserProfile;
