import React from "react";
import useAuthContext from "../../context/useAuthContext";

function Home() {
  const { user } = useAuthContext();
  return (
    <div className="text-sm text-gray-500 ml-10 mt-6">
      {user?.name} {user?.email}
    </div>
  );
}

export default Home;
