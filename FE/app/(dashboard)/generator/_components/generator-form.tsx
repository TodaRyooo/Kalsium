"use client";

import { Button } from "@/components/composites/button";
import { Card, CardContent } from "@/components/composites/card";
import { Text } from "@/components/composites/text";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/composites/select";
import { Switch } from "@/components/composites/switch";
import { Label } from "@/components/composites/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/composites/input";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { identityAtom, notesAtom, passwordsAtom, selectedPasswordAtom } from "@/stores/generators";

import useSWRMutation from "swr/mutation";
import { postReq } from "@/lib/fetcher";

const SUPPORTED_LENGTHS = [8, 12, 16, 24, 32, 64] as const;
const GENERATION_COUNTS = [1, 5, 10, 20, 50] as const;

export const GeneratorForm = () => {
  const [passwords, setPasswords] = useAtom(passwordsAtom);
  const [selectedPassword, setSelectedPassword] = useAtom(selectedPasswordAtom);
  const [identity, setIdentity] = useAtom(identityAtom);
  const [notes, setNotes] = useAtom(notesAtom);

  const { trigger, isMutating } = useSWRMutation("/bonds", postReq);

  const handleCreate = async () => {
    if (!selectedPassword) return;
    await trigger({ identity, pass: selectedPassword, note: notes });
    console.log("done");
  };

  const handleGenerate = () => {
    setPasswords(["Qwerty123", "Asdfgh456", "Zxcvbn789", "Kalsium2026", "Vault_Secret"]);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-3">
      {/* --- 1. 左側: Settings --- */}
      <div className="flex w-full flex-col lg:justify-self-center">
        <Text variant="h2" className="text-lg font-semibold">
          Settings
        </Text>
        <Card className="w-full max-w-none shadow-sm">
          <CardContent className="grid gap-6 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Length</Label>
                <Select defaultValue="16">
                  <SelectTrigger className="font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LENGTHS.map((n) => (
                      <SelectItem key={n} value={n.toString()} className="font-mono">
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Count</Label>
                <Select defaultValue="1">
                  <SelectTrigger className="font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GENERATION_COUNTS.map((n) => (
                      <SelectItem key={n} value={n.toString()} className="font-mono">
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              {["uppercase", "symbols", "numbers"].map((id) => (
                <div key={id} className="flex items-center justify-between">
                  <Label htmlFor={id} className="capitalize">
                    {id}
                  </Label>
                  <Switch id={id} defaultChecked />
                </div>
              ))}
            </div>
            <Button onClick={handleGenerate} className="w-full">
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* --- 2. 中央: Results --- */}
      <div className="flex w-full flex-col lg:justify-self-center">
        <Text variant="h2" className="text-lg font-semibold">
          Results
        </Text>
        <div className="space-y-2">
          {passwords.length > 0 ? (
            passwords.map((pw, i) => (
              <button
                key={i}
                onClick={() => setSelectedPassword(pw)}
                className={cn(
                  "w-full text-left transition-all duration-200",
                  "rounded-lg border border-dashed p-3",
                  "hover:border-slate-400 hover:bg-slate-100/50 active:scale-[0.98]",
                  selectedPassword === pw
                    ? "border-slate-900 bg-slate-100 shadow-sm ring-1 ring-slate-900"
                    : "border-slate-200 bg-slate-50/50",
                )}
              >
                <div className="flex items-center justify-between">
                  <code
                    className={cn(
                      "font-mono text-sm transition-colors",
                      selectedPassword === pw ? "font-bold text-slate-900" : "text-slate-600",
                    )}
                  >
                    {pw}
                  </code>
                  {selectedPassword === pw && <div className="h-2 w-2 animate-pulse rounded-full bg-slate-900" />}
                </div>
              </button>
            ))
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/30">
              <Text variant="muted" className="text-xs">
                Generate to see results
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* --- 3. 右側: Bond Creation --- */}
      <div className="flex w-full flex-col lg:justify-self-center">
        <Text variant="h2" className="text-lg font-semibold">
          Create Bond
        </Text>
        <Card className="w-full max-w-none shadow-sm">
          <CardContent className="grid gap-4 pt-6">
            <div className="space-y-2">
              <Label>Identity (Username or Email)</Label>
              <Input placeholder="user@example.com" value={identity} onChange={(e) => setIdentity(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                value={selectedPassword}
                readOnly
                className="bg-slate-50 font-mono"
                placeholder="Select from results"
              />
            </div>
            <div className="space-y-2">
              <Label>Notes (Optional)</Label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Where is this used?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <Button
              className="w-full bg-slate-900 text-white hover:bg-slate-800"
              disabled={!selectedPassword}
              onClick={handleCreate}
            >
              Create Bond
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
