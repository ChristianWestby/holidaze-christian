import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
      <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-12">
        &copy; {new Date().getFullYear()} Holidaze. Alle rettigheter reservert.
      </footer>
    </>
  );
}