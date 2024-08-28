import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  oldPassword: z.string().min(5),
  newPassword: z.string().min(5),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (!user || !user.hashedPassword) {
    return NextResponse.json(
      { error: "Utilisateur non trouvé ou mot de passe invalide" },
      { status: 400 }
    );
  }

  const passwordMatch = bcrypt.compare(body.oldPassword, user.hashedPassword);

  if (!passwordMatch)
    return NextResponse.json(
      { error: "Les mdp ne correspondent pas" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { id: user!.id },
    data: {
      hashedPassword: hashedPassword,
    },
  });

  return NextResponse.json(updatedUser);
}
