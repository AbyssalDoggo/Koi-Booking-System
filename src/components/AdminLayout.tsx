// src/components/AdminLayout.tsx
import React, { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode; // 'children' will be passed to render inside the layout
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            <li>
              <a href="/" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/AdminUser" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Users
              </a>
            </li>
            <li>
              <a href="/AdminOrderHistory" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Order History
              </a>
            </li>
            <li>
              <a href="/AdminKoiManager" className="block py-2 px-4 hover:bg-blue-700 rounded">
                Koi Fish Manager
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin</span>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
