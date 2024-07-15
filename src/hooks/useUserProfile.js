import { useQuery } from "react-query";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import { auth } from "../Firebase";

const fetchUserProfile = async () => {
  const uid = auth?.currentUser?.uid;
  const db = getFirestore();
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document!");
  }
};

const useUserProfile = () => {
  return useQuery({ queryKey: ["userProfile"], queryFn: fetchUserProfile });
};

export default useUserProfile;
