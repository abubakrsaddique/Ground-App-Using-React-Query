import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { auth, firestore } from "../../Firebase";
import { FaSpinner } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import Image from "../../images/login.webp";
import BackArrow from "../../../public/backarrow.svg";
import Apple from "../../../public/apple.svg";
import PlayStore from "../../../public/playstore.svg";
import InstantAccess from "../../../public/instantaccess.svg";
import StartUpImage1 from "../../../public/startup1.svg";
import StartUpImage2 from "../../../public/startup2.svg";
import StartUpImage3 from "../../../public/startup3.svg";

const stripePromise = loadStripe("your_publishable_key_here");

const StartUp = ({ user, db }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };
  const createUser = async () => {
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

  const { mutate: saveUserDetails, isLoading } = useMutation(createUser, {
    onSuccess: () => {
      setLoading(false);
      console.log("Signup successful!");
      queryClient.invalidateQueries("userProfile");
      navigate("/dashboard");
    },
    onError: (error) => {
      setLoading(false);
      console.error("Error signing up:", error);
      setError(error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "cardNumber":
        if (/^\d{0,16}$/.test(value)) {
          setCardNumber(value);
        }
        break;
      case "expiry":
        if (value.length <= 5) {
          setExpiry(value);
        }
        break;
      case "cvc":
        if (/^\d{0,3}$/.test(value)) {
          setCvc(value);
        }
        break;
      default:
        break;
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (cardNumber.length !== 16) {
      setError("Card number must be 16 digits.");
      setLoading(false);
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
      setError("Expiry date must be in MM/YY format.");
      setLoading(false);
      return;
    }

    if (cvc.length !== 3) {
      setError("CVC must be 3 digits.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    saveUserDetails({
      firstName,
      lastName,
      email,
      password,
      cardNumber,
      expiry,
      cvc,
    });
  };

  return (
    <div className="min-h-screen w-full  bg-gray">
      <div className="flex flex-row mob:flex-col-reverse tab:flex-col-reverse">
        {/* Left Side */}
        <div className="no-scrollbar justify-center relative flex w-[40%] mob:w-full tab:w-full">
          <div className="w-full realtive">
            <div className="h-screen overflow-scroll mt-0 block">
              <div
                className="flex h-10 w-10 cursor-pointer items-center mt-8 ml-8 justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1] mob:hidden tab:hidden"
                onClick={handleSignupClick}
              >
                <img src={BackArrow} alt="" />
              </div>
              <div>
                <div className="relative pl-5 w-[70%] mx-auto mob:w-[90%] mob:pl-0">
                  <div className="absolute left-0 top-8 h-[90%] border border-dashed border-lightgreen mob:hidden"></div>
                  <p className="text-darkbrown -ml-9 mt-10 flex items-center gap-2 text-2xl font-bold mob:-ml-1 mob:text-xl">
                    <img src={StartUpImage1} alt="" />
                    Your Information
                  </p>

                  <div className="mt-8 flex flex-col gap-4">
                    <form
                      className="flex relative flex-col"
                      onSubmit={handleSave}
                    >
                      <div className="mb-2 mt-0 flex items-center gap-2">
                        <img src={StartUpImage2} alt="" />
                        <p className="text-darkbrown text-xs font-normal leading-6">
                          You will use this email when signing into the app
                        </p>
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        className="mb-3  rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        required
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        className="mb-3  rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email"
                        name="email"
                        className="mb-3  rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="mb-3  rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="mb-4 mt-8 flex items-center justify-between gap-0">
                        <p className="text-dark-brown z-10 ml-[-35px] flex items-center gap-2 text-[20px] font-semibold leading-8 mob:ml-0 mob:text-[18px]">
                          <img src={StartUpImage3} alt="" />
                          Payment Details
                        </p>
                      </div>
                      <div className="w-full">
                        <input
                          required
                          type="text"
                          placeholder="Card Number"
                          name="cardNumber"
                          className="mb-3 rounded-3xl px-4 py-2 w-full outline-black"
                          value={cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex space-x-4">
                        <input
                          required
                          type="text"
                          placeholder=" (MM/YY)"
                          name="expiry"
                          className="mb-3 rounded-3xl px-4 py-2 w-full outline-black"
                          value={expiry}
                          onChange={handleInputChange}
                        />
                        <input
                          required
                          type="text"
                          placeholder="CVC"
                          name="cvc"
                          className="mb-3 rounded-3xl px-4 py-2 w-full outline-black"
                          value={cvc}
                          onChange={handleInputChange}
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-red-500 mt-4 flex justify-center items-center">
                          {error}
                        </p>
                      )}
                      <p className="mb-10 mt-8 block text-sm font-normal leading-5 text-lightbrown mob:hidden">
                        Already have an account?{" "}
                        <a>
                          <span
                            className="cursor-pointer font-medium text-lightgreen underline"
                            onClick={handleLoginClick}
                          >
                            Log In
                          </span>
                        </a>
                      </p>
                      <div className="relative z-[100] flex h-14 cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-lightgreen font-medium text-primary w-full text-base hover:bg-brown ">
                        <button type="submit" className=" " disabled={loading}>
                          {loading ? (
                            <FaSpinner className="animate-spin mx-auto" />
                          ) : (
                            "Start Your Journey"
                          )}
                        </button>
                        <span className="absolute left-0 top-0 z-0 h-[1px] w-[1px] translate-x-[-50%] translate-y-[-50%] rounded-[50%] bg-transparent"></span>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="px-[18%] -mt-10 relative mob:px-[6%]">
                  <p className="mt-12 text-center text-xs font-light leading-5 mob:pb-6">
                    At the end of your free trial your subscription will
                    automatically
                    <br />
                    rollover to a $99.99/year subscription billed annually
                    <br />
                    unless
                    <br />
                    cancelled.
                    <br />
                    <span>
                      <a className="underline cursor-pointer">Privacy Policy</a>{" "}
                      |{" "}
                      <a className="underline cursor-pointer">
                        Terms of service
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* For Mobile */}
        <div className="relative block w-[60%] mob:w-full lg:w-[60%] tab:w-full">
          <div className="absolute left-5 top-5 hidden tab:block mob:block">
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1]"
              onClick={handleSignupClick}
            >
              <img src={BackArrow} alt="" />
            </div>
          </div>
          <div className="absolute right-14 top-9 flex items-center  gap-4 mob:hidden">
            <div className="relative z-[100] text-primary cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl text-base font-medium ">
              <span
                className="relative z-10 tab:hidden mob:hidden"
                onClick={handleHomeClick}
              >
                Home
              </span>
            </div>
            <div
              className="relative z-[100] cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl bg-primary text-base font-medium hover:bg-darkbrown  hover:text-primary mob:hidden tab:hidden"
              onClick={handleLoginClick}
            >
              <button className="relative z-10"> Login</button>
            </div>
          </div>
          <img
            fetchpriority="high"
            width="3392"
            height="4096"
            decoding="async"
            data-nimg="1"
            className="h-screen w-full object-cover rounded-tl-[40px] mob:h-[400px] tab:h-[40vh] mob:rounded-none tab:rounded-none"
            src={Image}
          />
          <div className="absolute left-[50%] top-[50%] -mt-14 mob:mt-0 w-full translate-x-[-50%] translate-y-[-50%]">
            <h1 className="text-center text-5xl font-extrabold leading-[64px] text-primary mob:text-3xl tab:text-3xl">
              Start Your 7-Day
              <br />
              <span className="relative flex flex-col items-center">
                FREE Trial
                <img
                  src={InstantAccess}
                  alt=""
                  className="mob:w-[200px] tab:w-[220px] w-"
                />
              </span>
            </h1>
            <p className="mt-6 text-center text-base font-light leading-6 text-primary mob:flex mob:flex-col mob:text-sm tab:flex tab:flex-col tab:text-sm">
              Register now for the Grounds app and get
              <span className="font-semibold"> INSTANT ACCESS!</span>
            </p>
          </div>
          <div className="absolute bottom-16 left-[50%] z-[10] translate-x-[-50%]  items-center gap-4 ">
            <div className="flex items-center gap-6 mob:hidden tab:hidden cursor-pointer">
              <img src={Apple} alt="" />
              <img src={PlayStore} alt="" />
            </div>
          </div>
          <div className="bg-gradient-to-b from-custom-hsla1 via-custom-hsla2 to-custom-f2eee6 absolute bottom-0 z-[1] h-[350px] w-full opacity-90 "></div>
        </div>
      </div>
    </div>
  );
};

export default StartUp;
