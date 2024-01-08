import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";

const usersValidator = z.object({
  name: z.string().min(8),
  email: z.string().email(),
  age: z.number().min(18).max(80),
});

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
