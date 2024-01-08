import React from "react";

import { Metadata } from "next";
import Form from "@/app/components/Form";

export const metadata: Metadata = {
  title: "Add Users",
  description: "Add Users page",
};

const page = () => {
  return (
    <>
      <h3>Add Users</h3>
      <Form />
    </>
  );
};

export default page;
