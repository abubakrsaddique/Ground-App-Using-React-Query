import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import Image from "../../images/login.webp";
import Image1 from "../../images/image1.webp";
import Image2 from "../../images/image2.webp";
import Image3 from "../../images/image3.webp";
import Image4 from "../../images/image4.webp";
import Image5 from "../../images/image5.webp";
import Image6 from "../../images/image6.webp";
import Image7 from "../../images/image7.webp";
import Image8 from "../../images/image8.webp";
import Image9 from "../../images/image9.webp";
import Image10 from "../../images/image10.webp";
import Image11 from "../../images/image11.webp";
import BackArrow from "../../../public/backarrow.svg";
import Apple from "../../../public/apple.svg";
import PlayStore from "../../../public/playstore.svg";
import SignUpImage1 from "../../../public/signup1.svg";
import InstantAccess from "../../../public/instantaccess.svg";
import Design from "../../../public/design.svg";

const Signup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedCard, setSelectedCard] = useState(1);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };
  const handleStartUpClick = () => {
    if (selectedTrainer) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        navigate("/startup");
        console.log(
          "Navigating to startup page with trainer:",
          selectedTrainer
        );
      }, 2000);
    } else {
      alert("Please select a trainer before proceeding.");
    }
  };

  const handleCardClick = (cardNumber) => {
    if (selectedCard === cardNumber) {
      setSelectedCard(0);
    } else {
      setSelectedCard(cardNumber);
    }
  };

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  const handleTrainerSelect = (trainerName) => {
    setSelectedTrainer(trainerName);
    setIsOpen(false);
  };
  const handleChange = () => {
    setIsOpen(true);
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
                onClick={handleLoginClick}
              >
                <img src={BackArrow} alt="" />
              </div>
              <div>
                <p className=" text-[18px] font-normal leading-4 text-lightbrown mt-12 w-[70%] mx-auto mob:mx-8">
                  Already have an account?
                  <span
                    className="cursor-pointer  font-medium text-lightgreen underline "
                    onClick={handleLoginClick}
                  >
                    Log In
                  </span>
                </p>
                <div className="relative pl-5 w-[70%] mx-auto mob:w-[90%] mob:pl-0">
                  <div className="absolute left-0 top-8 h-full border border-dashed border-lightgreen mob:hidden"></div>
                  <p className="text-darkbrown -ml-9 mt-10 flex items-center gap-2 text-2xl font-bold mob:-ml-1 mob:text-xl">
                    <img src={SignUpImage1} alt="" className="text-2xl" />
                    Select Subscription Plan
                  </p>
                  {/* Card 1 */}
                  <div className="mt-8 flex flex-col gap-4">
                    <div
                      className={`relative bg-primary pb-4 pt-5 rounded-3xl border-2 border-lightgreen cursor-pointer hover:border-2 hover:border-lightgreen ${
                        selectedCard === 1 ? "border-lightgreen" : ""
                      }`}
                      onClick={() => handleCardClick(1)}
                    >
                      <div className="absolute left-[31%] -top-4 flex h-6 items-center justify-center rounded-[6px] bg-lightgreen px-2 shadow-md">
                        <p className="text-[8px] font-bold tracking-[1px] text-primary">
                          BEST VALUE • 60% OFF
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center justify-between px-6">
                          <p className="text-sm font-semibold text-black">
                            <span className="font-medium text-lightgreen">
                              Annual •
                            </span>{" "}
                            Billed at $99.99 USD/yr
                          </p>
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="h-7 w-7 appearance-none rounded-md border border-gray checked:bg-lightgreen"
                              checked={selectedCard === 1}
                              onChange={() => handleCardClick(1)}
                            />
                            {selectedCard === 1 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute left-[-7px] top-[-5px] m-2 h-6 w-6 text-white"
                              >
                                <path d="M6 10l2 2 6-6"></path>
                              </svg>
                            )}
                          </div>
                        </div>
                        {selectedCard === 1 ? (
                          <>
                            <p className="px-6 text-xl font-bold leading-[32px] text-black">
                              $8.33 <span className=""> USD </span>{" "}
                              <span className="-ml-1"> /mo </span>
                            </p>
                            <p className="text-dark-brown mb-3 mt-[5px] px-6 text-xs font-bold">
                              All programs included in your subscription
                            </p>
                            {/* Images Section */}
                            <div className="no-scrollbar mb-5 flex items-center gap-1 overflow-scroll px-6">
                              {/* Image 1 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image1}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 2 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image2}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 3 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image3}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 4 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image4}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 5 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image5}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 6 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image6}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Sculpt Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 7 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image7}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Runway Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 8 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image8}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Juicy Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 9 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image9}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Burn Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 10 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image10}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  ForeverFit Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 11 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image11}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Fuego Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                            </div>
                            {/* Images Below Content */}
                            <div className="my-2 flex items-center gap-2 px-6 ">
                              <img src={Design} alt="" />
                              <p className="text-darkbrown left-4 text-sm font-semibold ">
                                Access To All Trainers Programs
                              </p>
                            </div>
                            <div className="my-2 flex items-center gap-2 px-6 ">
                              <img src={Design} alt="" />
                              <p className="text-darkbrown left-4 text-sm font-semibold ">
                                Log Or Scan Your Branded Foods
                              </p>
                            </div>
                            <div className="my-2 flex items-center gap-2 px-6 ">
                              <img src={Design} alt="" />
                              <p className="text-darkbrown left-4 text-sm font-semibold ">
                                Comprehensive Period Tracking
                              </p>
                            </div>
                            <div className="my-2 flex items-center gap-2 px-6 ">
                              <img src={Design} alt="" />
                              <p className="text-darkbrown left-4 text-sm font-semibold ">
                                Access To Our Grounds Community
                              </p>
                            </div>
                          </>
                        ) : (
                          <div>
                            <p className="px-6 text-xl font-bold leading-[32px] text-black">
                              $8.33 <span className=""> USD </span>{" "}
                              <span className="-ml-1"> /mo </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div
                      className={`relative bg-primary pb-4 pt-5 rounded-3xl border-2 cursor-pointer border-lightgreen hover:border-2 hover:border-lightgreen ${
                        selectedCard === 2 ? "border-lightgreen" : ""
                      }`}
                      onClick={() => handleCardClick(2)}
                    >
                      <div>
                        <div className="flex items-center justify-between px-6">
                          <p className="text-sm font-semibold text-black">
                            <span className="font-medium text-lightgreen">
                              Monthly
                            </span>
                          </p>
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="h-7 w-7 appearance-none rounded-md border border-gray checked:bg-lightgreen"
                              checked={selectedCard === 2}
                              onChange={() => handleCardClick(2)}
                            />
                            {selectedCard === 2 && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="absolute left-[-7px] top-[-5px] m-2 h-6 w-6 text-white"
                              >
                                <path d="M6 10l2 2 6-6"></path>
                              </svg>
                            )}
                          </div>
                        </div>
                        {selectedCard === 2 ? (
                          <>
                            <p className="px-6 text-xl font-bold leading-[32px] text-black">
                              $19.99 <span className=""> USD </span>{" "}
                              <span className="-ml-1"> /mo </span>
                            </p>
                            <p className="px-6 text-sm text-lightbrown">
                              Standard Pricing
                            </p>
                            <p className="text-dark-brown mb-3 mt-[5px] px-6 text-xs font-bold">
                              All programs included in your subscription
                            </p>
                            {/* Images Section */}
                            <div className="no-scrollbar mb-5 flex items-center gap-1 overflow-scroll px-6">
                              {/* Image 1 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image1}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 2 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image2}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 3 */}
                              <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image3}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 4 */}
                              <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image4}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 5 */}
                              <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image5}
                                />
                                <div className="absolute top-0 z-[1] h-full w-full rounded-2xl"></div>
                              </div>
                              {/* Image 6 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image6}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Sculpt Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 7 */}
                              <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image7}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Runway Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 8 */}
                              <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image8}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Juicy Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 9 */}
                              <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image9}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Burn Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 10 */}
                              <div className=" relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image10}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  ForeverFit Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                              {/* Image 11 */}
                              <div className="relative h-20 w-20 flex-shrink-0 rounded-2xl">
                                <img
                                  alt="img"
                                  loading="lazy"
                                  width="800"
                                  height="522"
                                  decoding="async"
                                  data-nimg="1"
                                  className="h-full w-full rounded-[10px] object-cover"
                                  src={Image11}
                                />
                                <p className="absolute left-[50%] top-[50%] z-[10] translate-x-[-50%] translate-y-[-50%] text-center text-[10px] font-medium leading-[13px] text-primary">
                                  Fuego Challenge
                                </p>
                                <div className="absolute top-0 z-[1] h-full w-full rounded-[16px] checkout-imgbox-overlay"></div>
                              </div>
                            </div>
                            {/* Images Below Content */}
                            <div className="my-2 flex items-center gap-2 px-6 ">
                              <img src={Design} alt="" />
                              <p className="text-darkbrown left-4 text-sm font-semibold ">
                                Access To All Trainers Programs
                              </p>
                            </div>
                            <div className="my-2 flex items-center gap-2 px-6 ">
                              <img src={Design} alt="" />
                              <p className="text-darkbrown left-4 text-sm font-semibold ">
                                Log Or Scan Your Branded Foods
                              </p>
                            </div>
                            <div className="my-2 flex items-center gap-2 px-6 ">
                              <img src={Design} alt="" />
                              <p className="text-darkbrown left-4 text-sm font-semibold ">
                                Comprehensive Period Tracking
                              </p>
                            </div>
                            <div className="my-2 flex items-center gap-2 px-6 ">
                              <img src={Design} alt="" />
                              <p className="text-darkbrown left-4 text-sm font-semibold ">
                                Access To Our Grounds Community
                              </p>
                            </div>
                          </>
                        ) : (
                          <div>
                            {" "}
                            <p className="px-6 text-xl font-bold leading-[32px] text-black">
                              $19.99 <span className=""> USD </span>{" "}
                              <span className="-ml-1"> /mo </span>
                            </p>
                            <p className="px-6 text-sm text-lightbrown">
                              Standard Pricing
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full mt-5">
                    <div className="rounded-2xl border-2 border-lightbrown bg-primary p-2 px-4">
                      <p className="flex cursor-pointer text-lightbrown items-center justify-between text-sm font-normal ">
                        {selectedTrainer ? (
                          <>
                            {selectedTrainer}
                            <span
                              className="text-sm font-semibold text-red"
                              onClick={toggleCard}
                            >
                              Change
                            </span>
                          </>
                        ) : (
                          <>
                            Trainer referred by
                            <span
                              className="text-sm font-semibold text-lightgreen"
                              onClick={toggleCard}
                            >
                              View
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  {/* View Card */}
                  <div
                    className={`absolute mt-2 z-[101] w-[94%] rounded-2xl border-2 border-lightbrown bg-primary py-2 pt-4 ${
                      isOpen ? "" : "hidden"
                    }`}
                  >
                    <p
                      className="flex cursor-pointer text-lightbrown items-center justify-between px-4 py-2 text-sm font-normal  hover:bg-[#F8F8F8]"
                      onClick={() => handleTrainerSelect("Heidi Somers")}
                    >
                      Heidi Somers
                    </p>
                    <p
                      className="flex cursor-pointer text-lightbrown items-center justify-between px-4 py-2 text-sm font-normal  hover:bg-[#F8F8F8]"
                      onClick={() => handleTrainerSelect("Bailey Stewart")}
                    >
                      Bailey Stewart
                    </p>
                    <p
                      className="flex cursor-pointer text-lightbrown items-center justify-between px-4 py-2 text-sm font-normal  hover:bg-[#F8F8F8]"
                      onClick={() => handleTrainerSelect(" Brooklyn Moore")}
                    >
                      Brooklyn Moore
                    </p>
                    <p
                      className="flex cursor-pointer text-lightbrown items-center justify-between px-4 py-2 text-sm font-normal  hover:bg-[#F8F8F8]"
                      onClick={() => handleTrainerSelect(" Kara Corey")}
                    >
                      Kara Corey
                    </p>
                    <p
                      className="flex cursor-pointer text-lightbrown items-center justify-between px-4 py-2 text-sm font-normal  hover:bg-[#F8F8F8]"
                      onClick={() => handleTrainerSelect("Teresa Hurtado")}
                    >
                      Teresa Hurtado
                    </p>
                    <p
                      className="flex cursor-pointer text-lightbrown items-center justify-between px-4 py-2 text-sm font-normal  hover:bg-[#F8F8F8]"
                      onClick={() => handleTrainerSelect("None")}
                    >
                      None
                    </p>
                  </div>
                </div>
                <div className="px-[18%] relative mob:px-[6%]">
                  <div
                    className="relative z-[100] flex h-14 cursor-pointer items-center justify-center overflow-hidden rounded-3xl bg-lightgreen font-medium text-primary mt-11  w-full text-base hover:bg-brown transition-colors duration-500"
                    onClick={handleStartUpClick}
                  >
                    <div className="flex justify-center items-center">
                      {loading ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <span className="relative z-10">
                          Continue To Create Account
                        </span>
                      )}
                    </div>
                    <span className="absolute left-0 top-0 z-0 h-[1px] w-[1px] translate-x-[-50%] translate-y-[-50%] rounded-[50%] bg-transparent"></span>
                  </div>
                  <p className="mt-5 text-center text-xs font-light leading-5 mob:pb-6">
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
              onClick={handleLoginClick}
            >
              <img src={BackArrow} alt="" />
            </div>
          </div>
          <div className="absolute right-14 top-9 flex items-center  gap-4 mob:hidden">
            <div
              className="relative z-[100] text-primary cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl text-base font-medium "
              onClick={handleHomeClick}
            >
              <span className="relative z-10 tab:hidden mob:hidden">Home</span>
            </div>
            <div
              className="relative z-[100] cursor-pointer overflow-hidden flex h-11 w-24 items-center justify-center rounded-3xl bg-primary text-base font-medium  hover:text-primary mob:hidden tab:hidden hover:bg-brown"
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

export default Signup;
