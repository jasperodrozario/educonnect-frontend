import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { SidebarModified } from "@/app/_components/SidebarModified";
import { AiChatButton } from "@/components/chat/AiChatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EduConnect",
  description: "An AI-powered learning platform",
};

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased background-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarModified>
            {children}
            {modal}
            <AiChatButton />
          </SidebarModified>
        </ThemeProvider>
      </body>
    </html>
  );
}
