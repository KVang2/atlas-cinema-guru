// This file simply redirects to the built-in login UI powered by `auth.ts`

import { redirect } from "next/navigation";

export default function LoginRedirectPage() {
  redirect("/api/auth/signin");
}
