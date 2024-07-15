import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestore } from "../Firebase";
import { toast } from "react-hot-toast";

const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [lengthUnit, setLengthUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [feetInches, setFeetInches] = useState({ feet: "", inches: "" });
  const [cmValue, setCmValue] = useState("");
  const [height, setHeight] = useState(["", ""]);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [kgValue, setKgValue] = useState("");
  const [lbsValue, setLbsValue] = useState("");
  const queryClient = useQueryClient();
  const auth = getAuth();
  const user = auth.currentUser;

  const { data: profileData, isLoading: profileLoading } = useQuery(
    "userProfile",
    async () => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      const userRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    },
    {
      enabled: !!user,
    }
  );

  const updateProfile = useMutation(
    async (newProfileData) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      const userRef = doc(firestore, "users", user.uid);
      await setDoc(userRef, newProfileData, { merge: true });
    },
    {
      onSuccess: () => {
        setLoading(false);
        queryClient.invalidateQueries("userProfile");
        toast.success("Profile updated successfully.");
      },
      onError: (error) => {
        setLoading(false);
        toast.error("Failed to update profile. Please try again.");
        console.error("Error updating profile:", error);
      },
    }
  );

  useEffect(() => {
    if (profileData) {
      setAge(profileData.age || "");
      if (profileData.height) {
        const heightStr = profileData.height;
        if (heightStr.includes("ft")) {
          const [feet, inches] = heightStr.split("ft");
          setLengthUnit("ft");
          setFeetInches({
            feet: feet || "",
            inches: inches.replace("inch", "") || "",
          });
          setHeight([feet || "", inches.replace("inch", "") || ""]);
        } else if (heightStr.includes("cm")) {
          setLengthUnit("cm");
          setCmValue(heightStr.replace("cm", ""));
          setHeight([heightStr.replace("cm", ""), null]);
        }
      }
      if (profileData.weight) {
        const weightStr = profileData.weight;
        if (weightStr.includes("kg")) {
          setWeightUnit("kg");
          setKgValue(weightStr.replace("kg", ""));
        } else if (weightStr.includes("lbs")) {
          setWeightUnit("lbs");
          setLbsValue(weightStr.replace("lbs", ""));
        }
      }
      setSelectedGoal(profileData.selectedGoal || "");
      setSelectedMeal(profileData.selectedMeal || "");
    }
  }, [profileData]);

  const handleLengthUnitChange = (unit) => {
    setLengthUnit(unit);

    if (unit === "ft" && cmValue !== "") {
      const feet = Math.floor(cmValue / 30.48);
      const inches = ((cmValue / 30.48) % 1) * 12;
      setFeetInches({ feet: feet, inches: inches.toFixed(2) });
      setHeight([feet, inches.toFixed(2)]);
      setCmValue("");
    } else if (
      unit === "cm" &&
      feetInches.feet !== "" &&
      feetInches.inches !== ""
    ) {
      const cm = feetInches.feet * 30.48 + feetInches.inches * 2.54;
      setCmValue(cm.toFixed(2));
      setHeight([cm.toFixed(2), null]);
      setFeetInches({ feet: "", inches: "" });
    }
  };

  const handleWeightUnitChange = (unit) => {
    setWeightUnit(unit);

    if (unit === "lbs" && kgValue !== "") {
      const lbs = kgValue * 2.20462;
      setLbsValue(lbs.toFixed(2));
      setKgValue("");
    } else if (unit === "kg" && lbsValue !== "") {
      const kg = lbsValue / 2.20462;
      setKgValue(kg.toFixed(2));
      setLbsValue("");
    }
  };

  const handleFeetInputChange = (e) => {
    const newFeet = e.target.value;
    setFeetInches({ ...feetInches, feet: newFeet });
    setHeight([newFeet, feetInches.inches]);
  };

  const handleInchesInputChange = (e) => {
    const newInches = e.target.value;
    setFeetInches({ ...feetInches, inches: newInches });
    setHeight([feetInches.feet, newInches]);
  };

  const handleCmInputChange = (event) => {
    const newCmValue = event.target.value;
    setCmValue(newCmValue);
    setHeight([newCmValue, null]);
  };

  const handleKgInputChange = (event) => {
    setKgValue(event.target.value);
  };

  const handleLbsInputChange = (event) => {
    setLbsValue(event.target.value);
  };

  const handleGoalChange = (goal) => {
    setSelectedGoal(goal);
  };

  const handleMealChange = (meal) => {
    setSelectedMeal(meal);
  };

  const formatHeight = () => {
    if (lengthUnit === "ft") {
      return `${height[0]}ft${height[1]}inch`;
    } else if (lengthUnit === "cm") {
      return `${height[0]}cm`;
    }
    return "";
  };

  const formatWeight = () => {
    if (weightUnit === "kg") {
      return `${kgValue}kg`;
    } else if (weightUnit === "lbs") {
      return `${lbsValue}lbs`;
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedProfile = {
        age,
        height: formatHeight(),
        weight: formatWeight(),
        selectedGoal,
        selectedMeal,
      };

      await updateProfile.mutateAsync(updatedProfile);
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
    }
  };

  return {
    loading,
    lengthUnit,
    weightUnit,
    feetInches,
    cmValue,
    height,
    age,
    weight,
    selectedGoal,
    selectedMeal,
    kgValue,
    lbsValue,
    handleSubmit,
    setAge,
    handleLengthUnitChange,
    handleWeightUnitChange,
    handleFeetInputChange,
    handleInchesInputChange,
    handleCmInputChange,
    handleKgInputChange,
    handleLbsInputChange,
    handleGoalChange,
    handleMealChange,
  };
};

export default useEditProfile;
