import "./globals.css";
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import StyledComponentsRegistry from "@/lib/AntdConfig";
import StoreProvider from "@/store/StoreProvider";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PursFinance",
  description: "Purs Finance Business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${archivo.className} bg-[#FAFAFA]`}>
        <StyledComponentsRegistry>
          <StoreProvider>{children}</StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
