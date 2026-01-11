"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/composites/button";
import { Input } from "@/components/composites/input";
import { Separator } from "@/components/ui/separator";
import { currentUserAtom, tokenAtom } from "@/stores/auth";
import { useAtom } from "jotai";
import useSWRMutation from "swr/mutation";
import { postReq } from "@/lib/fetcher";
import { toast } from "sonner";

export const LoginForm = () => {
  const router = useRouter();
  const [, setToken] = useAtom(tokenAtom);
  const [, setUser] = useAtom(currentUserAtom);

  const { trigger, isMutating } = useSWRMutation("/auth/login", postReq);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const body = Object.fromEntries(formData);

    try {
      const res = await trigger(body);
      setToken(res.token);
      setUser(res.user);
      toast.success("Login successful!");
      router.push("/generator");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSignIn} className="grid gap-6">
      <div className="grid gap-4">
        <Input name="username" id="username" type="email" placeholder="Email Address" />
        <Input name="password" id="password" type="password" placeholder="Password" />
      </div>
      <Separator className="bg-slate-200" />
      <Button type="submit">{isMutating ? "Signing In..." : "Sign In"}</Button>
    </form>
  );
};
