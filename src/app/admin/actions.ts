"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_DEMO_COOKIE, ADMIN_DEMO_VALUE } from "@/lib/admin-auth";

export async function enterAdminDemo() {
  const jar = await cookies();
  jar.set(ADMIN_DEMO_COOKIE, ADMIN_DEMO_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
  redirect("/admin");
}

export async function leaveAdminDemo() {
  const jar = await cookies();
  jar.delete(ADMIN_DEMO_COOKIE);
  redirect("/admin/connexion");
}
