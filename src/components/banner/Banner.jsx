import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BackgroundVideo from "../../images/banner.mp4";
import Close from "../../images/close.png";
import { AuthContext } from "../../context/AuthContext";
import VideoSvg from "../../../public/video.svg";
import VideoCloseSvg from "../../../public/videomodalclose.svg";
import MobileIcon from "../../../public/mobileicon.svg";
import Instagram from "../../../public/insta.svg";
import Facebook from "../../../public/fb.svg";
import Youtube from "../../../public/yt.svg";
import Dot from "../../../public/dot.svg";
import BannerImage1 from "../../../public/banner1.svg";
import BannerImage2 from "../../../public/banner2.svg";
import Apple from "../../../public/apple.svg";
import PlayStore from "../../../public/playstore.svg";
import Arrow from "../../../public/arrow.svg";
import InstantAccess from "../../../public/instantaccess.svg";

const Banner = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (location.state && location.state.fromDashboard) {
      setIsModalOpen(true);
    }
  }, [location.state]);

  const handleGroundClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard", { state: { fromDashboard: true } });
    }
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative h-full min-h-screen w-full bg-gray py-10">
      <video
        className="absolute top-0 h-full w-full object-cover mob:h-[70vh] tab:h-[72vh] rounded-b-3xl"
        src={BackgroundVideo}
        autoPlay
        muted
        loop
        playsInline
      ></video>
      <img
        src={VideoSvg}
        alt=""
        onClick={toggleModal}
        className="absolute left-[50%] top-[45%]  tab:mt-[30%] z-10 h-auto w-[100px] translate-x-[-50%] translate-y-[-50%] cursor-pointer transition-transform hover:scale-110 "
      />

      {/* Modal Content */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center  bg-gray bg-opacity-75 ">
          <div className="z-[200] h-full min-w-full bg-primary">
            <div className="relative h-full py-14 mob:py-0 tab:py-0">
              <button
                className="absolute top-8 tab:top-16 mob:top-16 mob:text-primary tab:text-primary left-6 cursor-pointer "
                onClick={() => setModalOpen(false)}
              >
                <img src={VideoCloseSvg} alt="" />
              </button>
              <div className="my-8 mx-16 mob:my-0 mob:mx-0 tab:mx-0 tab:my-0 mob:relative mob:z-[-1] tab:relative tab:z-[-1]">
                <iframe
                  className="w-full h-[70vh] mob:h-screen tab:h-screen"
                  src="https://www.youtube.com/embed/4hLgD_vPrgY?si=oXuBOH-PFV4HdmTW"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Screen */}
      <div className="relative top-0 h-full w-full  px-28 ">
        {/* Nav_Bar */}
        <nav className="flex relative mob:hidden tab:hidden rounded-[77px] w-full h-[74px] items-center justify-between px-[50px] bg-gray py-4">
          <div>
            <p
              className="text-3xl font-bold leading-[45px] text-darkbrown cursor-pointer"
              onClick={handleGroundClick}
            >
              GROUNDS
            </p>
          </div>
          <div className="flex justify-center items-center cursor-pointer">
            <a className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
              Home
            </a>
            <a className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
              Coaches
            </a>
            <a className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
              Pricing
            </a>
            <a className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
              Programs
            </a>
            <a className="z-[10] mr-9 text-base font-medium leading-6 text-darkbrown">
              Support
            </a>
          </div>

          <div
            className="relative z-[100] flex cursor-pointer items-center justify-center px-8 py-3 rounded-[50px] bg-darkbrown hover:bg-lightgreen"
            onClick={handleLoginClick}
          >
            <span className="relative z-10 text-primary text-base font-semi-bold leading-6">
              {isLoggedIn ? "Dashboard" : "Login"}
            </span>
          </div>
        </nav>
        {/* For Mobile */}

        <div className="absolute top-0 left-0 right-0 mob:flex tab:flex w-full items-center justify-between px-5  hidden">
          <p className="text-3xl font-bold leading-none text-primary cursor-pointer">
            GROUNDS
          </p>
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <img src={MobileIcon} alt="" />
            ) : (
              <img src={MobileIcon} alt="" />
            )}
          </button>
        </div>

        <div
          className={`fixed left-0 top-0 z-[999] h-screen w-full transform overflow-x-hidden bg-gray transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } md:block`}
          style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px" }}
        >
          <div className="mt-6 flex items-center justify-between px-5">
            <a href="/">
              <p className="text-darkbrown text-3xl font-bold leading-7">
                GROUNDS
              </p>
            </a>
            <button onClick={toggleMenu}>
              <img
                alt="closeIcon"
                loading="lazy"
                width="32"
                height="32"
                decoding="async"
                src={Close}
              />
            </button>
          </div>
          <div className="mt-16 h-full w-full bg-gray">
            <div className="px-5">
              <div className="flex flex-col gap-8 cursor-pointer">
                <span className="text-2xl font-semibold leading-7 text-darkbrown">
                  Home
                </span>
                <span className="text-2xl font-semibold leading-7 text-darkbrown">
                  Coaches
                </span>
                <span className="text-2xl font-semibold leading-7 text-darkbrown">
                  Pricing
                </span>
                <span className="text-2xl font-semibold leading-7 text-darkbrown">
                  Programs
                </span>
                <span className="text-2xl font-semibold leading-7 text-darkbrown">
                  Support
                </span>
              </div>

              <div
                className="mt-12 flex h-[56px] w-full items-center text-primary justify-center rounded-3xl bg-darkbrown text-xl font-bold leading-6"
                onClick={handleSignupClick}
              >
                {isLoggedIn ? "Dashboard" : "Get Started"}
              </div>

              <p
                className="mt-4 text-center text-base font-normal text-lightbrown leading-5 "
                onClick={handleLoginClick}
              >
                Already have an account?{" "}
                <a className="text-darkbrown underline">Log In</a>
              </p>
            </div>
            <div className="w-full border-t-[0.5px] border-caption opacity-50 my-0 mb-10 mt-10"></div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <a className="text-sm font-medium leading-6">
                <img src={Instagram} alt="" />
              </a>
              <span className="text-sm font-medium leading-6 ">
                <img src={Dot} alt="" />
              </span>
              <a className="text-sm font-medium leading-6 ">
                <img src={Facebook} alt="" />
              </a>
              <span className="text-sm font-medium leading-6 text-[#302A25]">
                <img src={Dot} alt="" />
              </span>
              <a className="text-sm font-medium leading-6 ">
                <img src={Youtube} alt="" />
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-5">
              <img src={Apple} alt="" />

              <img src={PlayStore} alt="" />
            </div>
          </div>
        </div>
        {/* Main Heading */}
        <div className="grid min-h-[82vh] items-center mob:flex mob:flex-row-reverse mob:pt-[325%] tab:flex  tab:pt-[136%]">
          <div className="flex h-full flex-col mt-20 justify-center mob:mr-7 tab:-ml-14">
            <h1 className="text-7xl  flex flex-col font-bold text-primary mob:text-5xl mob:-mt-5 mob:text-darkbrown tab:text-5xl  tab:text-darkbrown">
              <span className="pb-4 mob:pb-2 tab:pb-2">Stand</span>
              <span className="pb-4 mob:pb-2 tab:pb-2">Your</span>
              <span className="pb-4 mob:pb-2 tab:pb-2">Ground</span>
            </h1>
            <p className="mt-6 text-xl font-normal text-primary mob:text-sm mob:text-lightbrown mob:mt-3 tab:mt-3 tab:text-lightbrown">
              <span>
                Register now for the Grounds app
                <br />
                and get{" "}
              </span>
              <span className="relative text-xl font-bold leading-8 mob:text-xl mob:text-darkbrown tab:text-darkbrown">
                INSTANT ACCESS!
                <img
                  src={InstantAccess}
                  alt=""
                  className="absolute -right-[2px] w-full"
                />
              </span>
            </p>
            <div>
              <div className="relative  bg-lightgreen text-sm leading-6  text-primary font-medium z-[100] flex w-[225px] py-4 rounded-3xl mt-12 cursor-pointer items-center justify-center mob:mt-8  tab:mt-8">
                <span
                  className="relative z-10 cursor-pointer"
                  onClick={handleSignupClick}
                >
                  Start Your Free Trial
                </span>
                <img src={Arrow} alt="" />
                <span
                  className="absolute left-0 top-0 z-0 h-[1px] w-[1px] translate-x-[-50%] translate-y-[-50%] rounded-[50%] bg-transparent"
                  style={{
                    translate: "none",
                    rotate: "none",
                    scale: "none",
                    background: "rgb(48, 42, 37)",
                    transform: "translate(-50%, -50%) translate(169px, 62px)",
                    height: "0px",
                    width: "0px",
                  }}
                ></span>
              </div>
            </div>
            <div className="mt-9 flex items-center gap-4 mob:mt-4 ">
              <div className="flex gap-2">
                <img src={BannerImage1} alt="" />
                <img src={BannerImage2} alt="" />
              </div>
              <div>
                <p className="text-sm font-medium leading-6 text-primary mob:text-xs mob:text-lightbrown tab:text-lightbrown ">
                  Compatible with <br />
                  <span className="text-primary mob:text-brown tab:text-brown">
                    Apple Health & Google Fit
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
