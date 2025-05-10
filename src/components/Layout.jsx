import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav className="layout__navbar p-4 bg-gray-100 flex gap-4">
        <a href="/" className="layout__link text-blue-600 underline">Hjem</a>
        <a href="/about" className="layout__link text-blue-600 underline">Om</a>
      </nav>
      <main className="layout__main p-4">
        <Outlet />
      </main>
    </>
  );
}