import { Outlet } from "react-router-dom";
import Navbar from "@components/layout/Navbar";
import Footer from "@components/layout/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main role="main" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}