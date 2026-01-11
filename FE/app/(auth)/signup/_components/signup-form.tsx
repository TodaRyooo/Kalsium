"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/composites/button";
import { Input } from "@/components/composites/input";
import { useAtom } from "jotai";
import { currentUserAtom, tokenAtom } from "@/stores/auth";
import useSWRMutation from "swr/mutation";
import { postReq } from "@/lib/fetcher";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpScheme } from "@/lib/valids/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/composites/form";

export const SignupForm = () => {
  const router = useRouter();
  const [, setToken] = useAtom(tokenAtom);
  const [, setUser] = useAtom(currentUserAtom);

  const { trigger, isMutating } = useSWRMutation("/auth/signup", postReq);

  const form = useForm<z.infer<typeof SignUpScheme>>({
    resolver: zodResolver(SignUpScheme),
    mode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const handleSignUp = async (v: z.infer<typeof SignUpScheme>) => {
    try {
      const res = await trigger(v);
      setToken(res.token);
      setUser(res.user);
      toast.success("Account created!");
      router.push("/generator");
    } catch (err) {
      toast.error("Signup failed. User might already exist.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="grid gap-6">
        <div className="grid gap-4">
          <CustomFormField
            control={form.control}
            fieldName="username"
            formLabel="Email"
            renderChildren={(field) => (
              <Input id="signup-username" type="email" placeholder="kalsium@example.com" {...field} />
            )}
          />
          <CustomFormField
            control={form.control}
            fieldName="password"
            formLabel="Password"
            renderChildren={(field) => (
              <Input id="signup-password" type="password" placeholder="8+ chars (A-z, 0-9)" {...field} />
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          {isMutating ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};
