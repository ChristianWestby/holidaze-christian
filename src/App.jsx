import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <nav className="layout__navbar p-4 bg-gray-100 flex gap-4">
        <Link to="/" className="layout__link text-blue-600 underline">Hjem</Link>
        <Link to="/about" className="layout__link text-blue-600 underline">Om</Link>
      </nav>
      <main className="layout__main p-4">
        <Outlet />
      </main>
    </>
  );
}