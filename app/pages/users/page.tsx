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
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await data.json();

  return (
    <>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <EditDelete />
          </li>
        ))}
      </ul>
    </>
  );
};

export default usersData;
