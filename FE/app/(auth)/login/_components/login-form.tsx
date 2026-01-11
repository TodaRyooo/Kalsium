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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormScheme } from "@/lib/valids/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/composites/form";

export const LoginForm = () => {
  const router = useRouter();
  const [token, setToken] = useAtom(tokenAtom);
  const [, setUser] = useAtom(currentUserAtom);

  const { trigger, isMutating } = useSWRMutation("/auth/login", postReq);

  useEffect(() => {
    const cache = localStorage.getItem("kalsium_token");
    if (token || (cache && cache !== "null")) router.push("/generator");
  }, [token, router]);

  const form = useForm<z.infer<typeof FormScheme>>({
    resolver: zodResolver(FormScheme),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSignIn = async (v: z.infer<typeof FormScheme>) => {
    try {
      const res = await trigger(v);
      setToken(res.token);
      setUser(res.user);
      toast.success("Login successful!");
      router.push("/generator");
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="grid gap-6">
        <div className="grid gap-4">
          <CustomFormField
            control={form.control}
            fieldName="username"
            renderChildren={(field) => <Input id="username" type="email" placeholder="Email Address" {...field} />}
          />

          <CustomFormField
            control={form.control}
            fieldName="password"
            renderChildren={(field) => <Input id="password" type="password" placeholder="Password" {...field} />}
          />
        </div>
        <Separator className="bg-slate-200" />
        <Button type="submit">{isMutating ? "Signing In..." : "Sign In"}</Button>
      </form>
    </Form>
  );
};
