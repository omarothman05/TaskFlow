import Footer from "@/components/Footer";
import "../globals.css";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">

      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />

    </div>
  );
}