// Fetch on the server
import React from "react";
import { Metadata } from "next";
import EditDelete from "@/app/components/EditDelete";

export const metadata: Metadata = {
  title: "Users",
  description: "User page",
};

interface User {
  id: number;
  name: string;
}

const usersData = async () => {
  const data = await fetch("http://localhost:3000/api/users");
  // , {
  //   // next: { revalidate: 3600 },
  // });
  const users: User[] = await data.json();

  return (
    <>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <EditDelete />
            {/* <p>{new Date().toLocaleTimeString()}</p> */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default usersData;
