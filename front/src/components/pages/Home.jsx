import React from "react";
import useAuthContext from "../../context/useAuthContext";

function Home() {
  const { user } = useAuthContext();
  return (
    <div className="ml-20 mt-6">
      {user?.name} {user?.email}
    </div>
  );
}

export default Home;
