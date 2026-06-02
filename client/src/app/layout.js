import "./globals.css";
import { Tajawal, Montserrat } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "TaskFlow",
  description: "Task management app",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full ${tajawal.className} ${montserrat.className}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="checklist-dark.png" />
        <link rel="icon" type="image/svg+xml" href="checklist-light.png" media="(prefers-color-schema): dark" />
      </head>
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}