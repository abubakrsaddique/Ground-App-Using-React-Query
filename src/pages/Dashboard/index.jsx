import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import useUserProfile from "../../hooks/useUserProfile";

const index = () => {
  const {
    data: userData,
    isLoading: isUserDataLoading,
    error,
    refetch,
    isRefetching,
  } = useUserProfile();

  console.log({ userData, isUserDataLoading, error, isRefetching });

  return (
    <Dashboard
      userData={userData}
      isUserDataLoading={isUserDataLoading}
      refetchUserData={refetch}
      error={error}
    />
  );
};

export default index;
