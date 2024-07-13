import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "react-query";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import AddImage from "../../images/addimage.webp";
import MyAccount from "./MyAccount";
import ProfileImage from "./ProfileImage";
import EditProfile from "./EditProfile";
import AddButton from "../../../public/add.svg";
import Apple from "../../../public/apple.svg";
import PlayStore from "../../../public/playstore.svg";
import EditButton from "../../../public/edit.svg";
import PaymentImage from "../../../public/payment.svg";

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

const useUserProfile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return useQuery(
    ["userProfile", user?.uid],
    async () => {
      const profileData = await fetchUserProfile(user.uid);
      let imageUrl = "";
      if (profileData.profileImage) {
        imageUrl = await fetchProfileImageUrl(profileData.profileImage);
      }
      return { ...profileData, profileImageUrl: imageUrl };
    },
    {
      enabled: !!user,
    }
  );
};

const Dashboard = () => {
  const { logout, isLoggedIn, user } = useContext(AuthContext);
  const [isProfileImageOpen, setIsProfileImageOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { data: userProfile, isLoading, error } = useUserProfile();

  const handleGroundClick = () => {
    if (isLoggedIn) {
      navigate("/", { state: { isLoggedIn } });
    } else {
      navigate("/");
    }
  };
  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const toggleProfileImage = () => {
    setIsProfileImageOpen(!isProfileImageOpen);
  };

  const toggleEditProfile = () => {
    setIsEditProfileOpen(!isEditProfileOpen);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray w-full mob:no-scrollbar">
      {/* Navbar */}
      <div className="flex items-center justify-between  px-40 py-11 mob:px-4 mob:py-8 tab:px-4 tab:py-8  ">
        <p
          className="text-darkbrown font-bold leading-10 text-[38px] cursor-pointer"
          onClick={handleGroundClick}
        >
          Grounds
        </p>
        <p
          className="cursor-pointer text-base font-semibold leading-5 text-black"
          onClick={handleLogoutClick}
        >
          Log out
        </p>
      </div>
      {/* Main Conatainer */}
      <div className="mx-auto max-w-[60rem] px-5 ">
        {/* Profile Picture */}
        <div className="mb-20 mt-5">
          <div className="flex items-center justify-between flex-row mob:flex-col tab:flex-col">
            <div className="flex  items-center gap-6 flex-row mob:flex-col tab:flex-col">
              <div className="relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full ">
                <img
                  alt="ProfileImage"
                  loading="lazy"
                  width="96"
                  height="96"
                  decoding="async"
                  className="h-24 w-24 rounded-full object-cover"
                  src={userProfile.profileImageUrl || AddImage}
                  onClick={toggleProfileImage}
                />
              </div>
              <img
                src={AddButton}
                alt=""
                className="ml-[-49px] mt-[68px] z-[1] cursor-pointer mob:ml-[69px] mob:mt-[-48px] tab:ml-[70px] tab:mt-[-48px] "
                onClick={toggleProfileImage}
              />
              {isProfileImageOpen && (
                <ProfileImage onClose={toggleProfileImage} />
              )}
              <p className="text-xl font-semibold leading-7 text-brown">
                Welcome , {userProfile?.firstName}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <p className=" text-center text-base font-normal leading-5 mt-0 w-[400px] text-lightbrown">
                Download the app below and login in with the same credentials
                you just used to create your account
              </p>
              <div className="mt-5 flex items-center justify-center gap-5 cursor-pointer">
                <img src={Apple} alt="" />
                <img src={PlayStore} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* Account Detail  */}
        <div className="flex flex-row gap-8 w-full mob:flex-col tab:flex-col ">
          {/* Left Side */}
          <div className="w-[50%] flex flex-shrink-0 flex-col mob:w-full tab:w-full">
            {/* Email $ Password */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="pl-1 text-2xl font-semibold leading-6">
                  My Account
                </h2>
                <img
                  src={EditButton}
                  alt=""
                  className="cursor-pointer"
                  onClick={handleToggle}
                />
                {isOpen && <MyAccount onClose={handleClose} />}
              </div>

              <div className="mt-4 bg-primary rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-semibold">Email</p>
                  <p className="text-base font-semibold text-lightbrown">
                    {userProfile?.email}
                  </p>
                </div>
                <div className="border-t border-gray my-4"></div>
                <div className="flex items-center justify-between ">
                  <p className="text-base font-semibold">Password</p>
                  <p className="text-base font-semibold text-lightbrown">
                    •••••••••••••••
                  </p>
                </div>
              </div>
            </div>
            {/* Profile Detail */}
            <div className="mt-8">
              <div className="pb-12">
                <div className="flex items-center justify-between">
                  <h2 className="pl-1.5 text-2xl font-semibold leading-6">
                    My Profile
                  </h2>
                  <img
                    src={EditButton}
                    alt=""
                    className="cursor-pointer"
                    onClick={toggleEditProfile}
                  />
                  {isEditProfileOpen && (
                    <EditProfile onClose={toggleEditProfile} />
                  )}
                </div>
                <div className="mt-4 w-full rounded-3xl bg-primary p-6">
                  <div className="flex flex-wrap items-center justify-between">
                    <p className="font-semibold leading-4 text-black text-base">
                      Age
                    </p>
                    <p className="font-semibold leading-4 text-lightbrown text-base">
                      22
                    </p>
                  </div>
                  <div className="my-5 w-full border-t border-gray opacity-50"></div>
                  <div className="flex flex-wrap items-center justify-between">
                    <p className="font-semibold leading-4 text-black text-base">
                      Height
                    </p>
                    <p className="font-semibold leading-4 text-lightbrown text-base">
                      5ft10inhces
                    </p>
                  </div>
                  <div className="my-5 w-full border-t border-gray opacity-50"></div>
                  <div className="flex flex-wrap items-center justify-between">
                    <p className="font-semibold leading-4 text-black text-base">
                      Weight
                    </p>
                    <p className="font-semibold leading-4 text-lightbrown text-base">
                      75kg
                    </p>
                  </div>
                  <div className="my-5 w-full border-t border-gray opacity-50"></div>
                  <div className="flex flex-wrap items-center justify-between">
                    <p className="break-all font-semibold leading-4 text-black text-base">
                      Goals
                    </p>
                    <p className="font-semibold leading-4 text-lightbrown text-base">
                      lose weight
                    </p>
                  </div>
                  <div className="my-5 w-full border-t border-gray opacity-50"></div>
                  <div className="flex flex-wrap items-center justify-between">
                    <p className="font-semibold leading-4 text-black text-base">
                      Daily Meal Amount
                    </p>
                    <p className="font-semibold leading-4 text-lightbrown text-base">
                      3
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-[50%] flex-shrink-0 flex flex-col mob:w-full mob:pb-10 mob:-mt-10 tab:w-full tab:pb-10 tab:-mt-10">
            {/* My plan */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="pl-[6px] text-xl font-semibold leading-6">
                  My Plan
                </h2>
              </div>
              <div className="mt-4 w-full rounded-3xl bg-primary p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-darkbrown font-semibold leading-5 text-base">
                      12 Month •{" "}
                      <span className="text-lightgreen"> Best deal</span>
                    </p>
                    <p className="leading-4 mt-[6px] font-medium text-sm text-lightbrown">
                      Term expires 5th Aug 24
                    </p>
                  </div>
                  <p className="text-base font-semibold leading-5 text-lightgreen ">
                    $
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8"></div>
            <div className="flex items-center justify-between">
              <h2 className="pl-[6px] text-xl font-semibold leading-6">
                My Payment Method
              </h2>
            </div>
            <div className="mt-4 w-full rounded-3xl bg-primary p-6">
              <div className="flex flex-wrap items-center justify-between">
                <p className="font-semibold leading-4 text-black text-base">
                  Payment Method
                </p>
                <p className="font-semibold leading-4 text-base">promotional</p>
              </div>
              <div className="my-5 w-full border-t border-caption border-lightbrown opacity-50"></div>
              <div className="flex items-center">
                <img src={PaymentImage} alt="" className="w-[116px] h-[64px]" />
                <p className="ml-2 text-base font-medium leading-6 text-black">
                  All In-App purchases must be managed within your Apple
                  Subscriptions.
                </p>
              </div>
              <ol className="mt-6 list-decimal pl-4 text-lightbrown">
                <li className="text-base font-medium">
                  Go to Settings &gt; [your name] &gt; iTunes &amp; App Store
                </li>
                <li className="text-base font-medium text-caption">
                  Tap your Apple ID at the top of the screen, then select View
                  Apple ID. You might need to sign in with your Apple ID
                </li>
                <li className="text-base font-medium ">
                  Scroll down and tap 'Subscriptions'
                </li>
                <li className="text-base font-medium ">
                  Choose 'Grounds' as the subscription that you want to manage
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
