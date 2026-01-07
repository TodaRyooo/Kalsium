import { JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>{children}</body>
    </html>
  );
}
