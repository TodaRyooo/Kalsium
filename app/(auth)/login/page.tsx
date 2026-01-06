import { Button } from "@/components/composites/button";
import { Input } from "@/components/composites/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/composites/card";
import { Text } from "@/components/composites/text";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Kalsium</CardTitle>
          <Text className="text-muted-foreground text-sm">Enter your credentials to access your vault</Text>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4">
            <Input id="email" type="email" placeholder="Email Address" />
            <Input id="password" type="password" placeholder="Password" />
          </div>

          <Separator className="bg-slate-200" />

          <Button>Sign In</Button>
        </CardContent>
      </Card>
    </div>
  );
}
