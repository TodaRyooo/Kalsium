"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/composites/card";
import { SignupForm } from "./_components/signup-form"; 
import { useAtomValue } from "jotai";
import { tokenAtom } from "@/stores/auth";
import { Spinner } from "@/components/composites/spinner";

export default function Page() {
  const token = useAtomValue(tokenAtom);
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      {token ? (
        <Spinner />
      ) : (
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle>Create Kalsium Account</CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
