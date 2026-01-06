import { Card, CardContent, CardHeader, CardTitle } from "@/components/composites/card";
import { Text } from "@/components/composites/text";
import { LoginForm } from "@/app/(auth)/login/_components/login-form";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Kalsium</CardTitle>
          <Text variant="muted">Enter your credentials to access your vault</Text>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
