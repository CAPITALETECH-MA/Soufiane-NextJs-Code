import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";

// Zod Validator
const usersValidator = z.object({
  name: z.string().min(8),
  email: z.string().email(),
  age: z.number().min(18).max(100),
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

// ADD User
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("Request Body:", body);

  const validation = usersValidator.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: { name: body.name, email: body.email, age: body.age },
  });

  return NextResponse.json(newUser, { status: 201 });
}
