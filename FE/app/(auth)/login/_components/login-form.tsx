"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/composites/button";
import { Input } from "@/components/composites/input";
import { Separator } from "@/components/ui/separator";

export const LoginForm = () => {
  const router = useRouter();

  const handleSignIn = () => {
    console.log("Sign in logic...");
    router.push("/generator");
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <Input id="email" type="email" placeholder="Email Address" />
        <Input id="password" type="password" placeholder="Password" />
      </div>
      <Separator className="bg-slate-200" />
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};
