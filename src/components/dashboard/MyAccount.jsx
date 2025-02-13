import React from "react";
import { FaSpinner } from "react-icons/fa";
import Close from "../../../public/videomodalclose.svg";
import useMyAccount from "../../hooks/useMyAccount";

const MyAccount = ({ onClose }) => {
  const { handleSubmit, isLoading, error } = useMyAccount(onClose);

  return (
    <div className="bg-black w-screen top-0 fixed right-0 h-screen z-50 bg-opacity-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-darkgray rounded-tl-3xl rounded-bl-3xl flex flex-col items-center justify-center p-5 z-[999]">
        <div className="w-full flex justify-end">
          <img
            src={Close}
            alt=""
            onClick={onClose}
            className="h-6 w-6 cursor-pointer border-2 border-lightbrown border-opacity-15"
          />
        </div>

        <form className="flex w-full flex-col" onSubmit={handleSubmit}>
          <p className="text-darkbrown mb-4 font-semibold text-xl">
            Edit My Account
          </p>
          {error && <p className="text-red-500 mb-4">{error.message}</p>}
          <input
            required
            type="password"
            placeholder="Enter Old Password"
            name="oldPassword"
            className="mb-3 w-full rounded-3xl px-6 py-4 text-base font-medium leading-4 outline-black"
          />
          <input
            required
            type="password"
            placeholder="Enter New Password"
            name="newPassword"
            className="mb-3 w-full rounded-3xl px-6 py-4 text-base font-medium leading-4 outline-black"
          />
          <input
            required
            type="password"
            placeholder="Confirm New Password"
            name="confirmPassword"
            className="mb-3 w-full rounded-3xl px-6 py-4 text-base font-medium leading-4 outline-black"
          />
          <button
            type="submit"
            className="mt-10 flex h-14 w-full items-center justify-center rounded-3xl bg-darkbrown text-lg font-medium text-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
