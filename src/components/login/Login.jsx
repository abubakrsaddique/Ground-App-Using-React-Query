import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { FaSpinner } from "react-icons/fa";
import Image from "../../images/login.webp";
import BackArrow from "../../../public/backarrow.svg";
import Apple from "../../../public/apple.svg";
import PlayStore from "../../../public/playstore.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    if (!validateEmail(email)) {
      throw new Error("The email address is badly formatted.");
    }
    await auth.signInWithEmailAndPassword(email, password);
  };

  const { mutate: loginUser, isLoading } = useMutation(login, {
    onSuccess: () => {
      console.log("Login successful, navigating to dashboard...");
      navigate("/dashboard");
    },
    onError: (error) => {
      setError(
        error.message === "The email address is badly formatted."
          ? error.message
          : "Failed to log in. Please check your credentials and try again."
      );
      console.error("Login error:", error.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    loginUser({ email, password });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen w-full  bg-gray">
      <div className="flex flex-row mob:flex-col-reverse tab:flex-col-reverse">
        <div className=" relative w-[70%] mob:w-full tab:w-full tab:mt-14">
          <div className="flex h-full w-full items-center justify-center py-6">
            <form className="flex flex-col" onSubmit={handleLogin}>
              <p className="mb-8 text-3xl font-bold text-darkbrown">Login</p>
              <input
                required
                type="email"
                placeholder="Email"
                name="email"
                className="mb-3 w-[400px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                required
                type="password"
                placeholder="Password"
                name="password"
                className="mb-3 w-[400px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black mob:w-[350px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-darkbrown mt-2 w-fit text-sm font-medium leading-5 underline cursor-pointer">
                <a>Forgot password?</a>
              </p>
              {error && (
                <p className="text-sm text-lightbrown mt-4 flex justify-center items-center">
                  {error}
                </p>
              )}
              <p className="mt-10 text-center text-sm font-medium text-lightbrown">
                You don’t have an account?{" "}
                <span
                  className="font-semibol cursor-pointer text-darkbrown underline"
                  onClick={handleSignupClick}
                >
                  Sign Up
                </span>
              </p>
              <button type="submit" className="mt-4" disabled={isLoading}>
                <div className="relative z-[100] flex h-14 cursor-pointer items-center justify-center overflow-hidden rounded-3xl font-medium text-primary w-full bg-darkbrown text-base hover:bg-lightgreen mob:w-[350px]">
                  {isLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <span className="relative z-10">Login</span>
                  )}
                </div>
              </button>
            </form>
          </div>
          <div className="absolute left-8 top-8 mob:hidden flex tab:hidden ">
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1] "
              onClick={handleHomeClick}
            >
              <img src={BackArrow} alt="" />
            </div>
          </div>
        </div>
        {/* For Mobile */}
        <div className="relative block w-full">
          <div className="absolute left-5 top-5 hidden tab:block mob:block">
            <div
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1]"
              onClick={handleHomeClick}
            >
              <img src={BackArrow} alt="" />
            </div>
          </div>
          <div className="absolute right-14 top-9 flex items-center  gap-4 mob:hidden">
            <div
              className="relative z-[100] cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl bg-primary text-base font-medium hover:bg-darkbrown  hover:text-primary mob:hidden"
              onClick={handleHomeClick}
            >
              <span className="relative z-10"> Home</span>
            </div>
          </div>
          <img
            fetchpriority="high"
            width="3392"
            height="4096"
            decoding="async"
            data-nimg="1"
            className="h-screen w-full object-cover rounded-tl-[40px] mob:h-[400px] tab:h-[82vh] mob:rounded-none tab:rounded-none"
            src={Image}
          />
          <div className="absolute left-[50%] top-[40%] tab:top-[47%] -ml-28 mob:-ml-24">
            <p className="flex justify-center items-center text-5xl tab:text-5xl mob:text-[40px] font-bold uppercase text-primary ">
              Grounds
            </p>
            <p className="text-center text-[18px] font-light leading-[60px] mob:leading-10 text-primary mob:text-sm">
              Your new training grounds
            </p>
          </div>
          <div className="absolute bottom-16 left-[50%] z-[10] translate-x-[-50%]  items-center gap-4 ">
            <div
              className="flex items-center gap-6 mob:hidden tab:hidden cursor-pointer"
              onClick={handleHomeClick}
            >
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

export default Login;
