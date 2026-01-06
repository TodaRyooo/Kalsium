import { Text } from "@/components/composites/text";
import { GeneratorForm } from "./_components/generator-form";

export default function Page() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col justify-center px-4 py-10">
      <div className="mb-8 space-y-2 text-center">
        <Text variant="h1">Generator</Text>
        <Text variant="muted">Manage your security with precision.</Text>
      </div>
      <GeneratorForm />
    </div>
  );
}
