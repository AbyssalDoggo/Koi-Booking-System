import React from "react";
import AdminLayout from "../../../components/AdminLayout";

const Profile = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <AdminLayout userRole={userRole}>
      <div>Profile</div>
    </AdminLayout>
  );
};

export default Profile;
