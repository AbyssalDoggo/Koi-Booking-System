import React, { ReactNode } from "react";

const AdminLayout = ({ children, userRole }) => {
  const sidebarLinks = {
    5: [
      { href: "/AdminUser", label: "Users" },
      { href: "/AdminOrderHistory", label: "Order History" },
      { href: "/AdminKoiManager", label: "Koi Fish Manager" },
    ],
    2: [{ href: "/sales", label: "Manage Requests" }],
    3: [
      { href: "/ConsultingDashboard", label: "Consulting Dashboard" },
      { href: "/ManageClients", label: "Manage Clients" },
    ],
    4: [
      { href: "/DeliveryDashboard", label: "Delivery Dashboard" },
      { href: "/OrderStatus", label: "Order Status" },
    ],
    1: [
      { href: "/trips", label: "Trip" },
      { href: "/schedule", label: "Schedule" },
    ],
  };

  const links = sidebarLinks[userRole] || [];

  return (
    <div className="flex min-h-screen bg-wheat-0">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold">{userRole} Panel</h2>
        </div>
        <nav className="flex-1 px-2 py-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 px-4 hover:bg-blue-700 rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-grey-0 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{userRole}</span>
            <button className="bg-blue-600 text-white py-2 px-4 rounded">
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-wheat-0">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
