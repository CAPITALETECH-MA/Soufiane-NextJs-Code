import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";

const usersValidator = z.object({
  name: z.string().min(8),
  email: z.string().email(),
  age: z.number().min(18).max(80),
});

// Get all users with PRISMA
export async function GET(req: NextRequest) {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();

    // Return the list of users with a 200 status code
    return NextResponse.json(users);
  } catch (error) {
    // Handle any unexpected errors
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}

// Get all users without PRISMA
// export async function GET(req: NextRequest) {
//   try {
//     // Connect to the database
//     const client = await pool.connect();

//     // Fetch all users from the database
//     const query = 'SELECT * FROM users';
//     const res = await client.query(query);

//     client.release();

//     return NextResponse.json(res.rows);
//   } catch (error) {

//     return NextResponse.json({ message: "Error fetching users", error: error.message }, { status: 500 });
//   }

// }

// ADD User
export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = usersValidator.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: { name: body.name, email: body.email, age: body.age },
  });

  return NextResponse.json(newUser, { status: 201 });
}
