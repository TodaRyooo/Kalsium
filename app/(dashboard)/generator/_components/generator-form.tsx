"use client";

import { useState } from "react";
import { Button } from "@/components/composites/button";
import { Card, CardContent } from "@/components/composites/card";
import { Text } from "@/components/composites/text";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/composites/select";
import { Switch } from "@/components/composites/switch";
import { Label } from "@/components/composites/label";
import { Separator } from "@/components/ui/separator";

const SUPPORTED_LENGTHS = [8, 12, 16, 24, 32, 64] as const;
const GENERATION_COUNTS = [1, 5, 10, 20, 50] as const;

export const GeneratorForm = () => {
  const [passwords, setPasswords] = useState<string[]>([]);

  const handleGenerate = () => {
    setPasswords(["Qwerty123", "Asdfgh456", "Zxcvbn789", "Kalsium2026", "Vault_Secret"]);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
      {/* --- 左側: 設定エリア --- */}
      <div className="space-y-6">
        <Text variant="h2" className="text-xl">
          Settings
        </Text>
        <Card className="max-w-none shadow-sm">
          <CardContent className="grid gap-6 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Length</Label>
                <Select defaultValue="16">
                  <SelectTrigger className="font-mono">
                    <SelectValue placeholder="Length" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LENGTHS.map((n) => (
                      <SelectItem key={n} value={n.toString()} className="font-mono">
                        {n} characters
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Count</Label>
                <Select defaultValue="1">
                  <SelectTrigger className="font-mono">
                    <SelectValue placeholder="Count" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENERATION_COUNTS.map((n) => (
                      <SelectItem key={n} value={n.toString()} className="font-mono">
                        {n} passwords
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="uppercase">Uppercase</Label>
                <Switch id="uppercase" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="symbols">Symbols</Label>
                <Switch id="symbols" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="numbers">Numbers</Label>
                <Switch id="numbers" defaultChecked />
              </div>
            </div>

            <Button onClick={handleGenerate} className="mt-2">
              Generate Passwords
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* --- 右側: 結果エリア --- */}
      <div className="space-y-6">
        <Text variant="h2" className="text-xl">
          Generated Passwords
        </Text>
        {passwords.length > 0 ? (
          <div className="grid gap-3">
            {passwords.map((pw, i) => (
              <Card key={i} className="max-w-none border border-dashed bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center justify-between px-4 py-3">
                  <code className="font-mono text-lg text-slate-700">{pw}</code>
                  <Button variant="ghost" size="sm" className="w-24">
                    Copy
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/30">
            <Text variant="muted">Generate to see results</Text>
          </div>
        )}
      </div>
    </div>
  );
};
