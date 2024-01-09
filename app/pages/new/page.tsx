import React from "react";

import { Metadata } from "next";
import UserForm from "@/app/components/userForm";

export const metadata: Metadata = {
  title: "Add Users",
  description: "Add Users page",
};

const page = () => {
  return (
    <>
      <h3>Add Users</h3>
      <UserForm />
    </>
  );
};

export default page;
