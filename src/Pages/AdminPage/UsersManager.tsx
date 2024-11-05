// src/pages/Users.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

interface User {
  UserId: number;
  UserName: string;
  FullName: string;
  Email: string;
  Password: string; // Ensure to handle this securely
  PhoneNumber: string;
  BirthDate: string; // Use appropriate type for date if needed
  Address: string;
  Gender: string;
  ImageUser: string; // URL or base64 string depending on your application
  HireDate: string; // Use appropriate type for date if needed
  RoleId: number;
  IsActive: boolean;
  CreatedDate: string;
  UpdatedDate: string; // This should be updated in your backend
  RegistrationDate: string; // Use appropriate type for date if needed
  IsVerified: boolean;
  LastPurchaseDate: string; // Use appropriate type for date if needed
  TotalSpent: number;
  PreferredContactMethod: string;
  MembershipLevel: string;
  Notes: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://localhost:7043/api/Users");
        if (response.data.Status === 1 && Array.isArray(response.data.Data)) {
          setUsers(response.data.Data);
        } else {
          setError("Unexpected response format");
        }
      } catch (err) {
        setError("Failed to fetch users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // const handleDelete = (userId: number) => {
  //   const apiUrl = `https://localhost:7043/api/Users/${userId}`;

  //   const confirmMessage = `Are you sure you want to delete user ${userId}?`;

  //   if (window.confirm(confirmMessage)) {
  //     axios.delete(apiUrl)
  //       .then(response => {
  //         if (response.status === 200) {
  //           // Remove the user from the state
  //           setUsers(users.filter(user => user.UserId !== userId));
  //           console.log(`User  ${userId} deleted successfully`);
  //         } else {
  //           console.error(`Error deleting user ${userId}`);
  //         }
  //       })
  //       .catch(error => {
  //         console.error(`Error deleting user ${userId}: ${error.message}`);
  //       });
  //   }
  // };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.UserName.toLowerCase().includes(searchQuery) ||
      user.Email.toLowerCase().includes(searchQuery) ||
      user.Address.toLowerCase().includes(searchQuery)
  );

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveChanges = async () => {
    if (!editingUser) return;

    setIsSaving(true); // Start saving state

    try {
      const response = await axios.put(
        `https://localhost:7043/api/Users/${editingUser.UserId}`,
        {
          UserId: editingUser.UserId,
          FullName: editingUser.FullName,
          UserName: editingUser.UserName,
          Password: editingUser.Password, // Make sure to hash/store passwords securely
          Email: editingUser.Email,
          PhoneNumber: editingUser.PhoneNumber,
          BirthDate: editingUser.BirthDate,
          Address: editingUser.Address,
          Gender: editingUser.Gender,
          ImageUser: editingUser.ImageUser,
          HireDate: editingUser.HireDate,
          RoleId: editingUser.RoleId,
          IsActive: editingUser.IsActive,
          CreatedDate: editingUser.CreatedDate, // Typically shouldn't be updated
          UpdatedDate: new Date().toISOString(), // Update with current date
          RegistrationDate: editingUser.RegistrationDate, // Typically shouldn't be updated
          IsVerified: editingUser.IsVerified,
          LastPurchaseDate: editingUser.LastPurchaseDate,
          TotalSpent: editingUser.TotalSpent,
          PreferredContactMethod: editingUser.PreferredContactMethod,
          MembershipLevel: editingUser.MembershipLevel,
          Notes: editingUser.Notes,
        }
      );

      if (response.status === 200) {
        // Update user in the local state after successful API call
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.UserId === editingUser.UserId ? editingUser : user
          )
        );
        alert("User updated successfully!");
      } else {
        alert("Failed to update user");
      }
    } catch (err) {
      console.error("Error saving user:", err);
      alert("An error occurred while saving the user");
    } finally {
      setIsSaving(false); // End saving state
      handleModalClose(); // Close the modal after saving
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-3 ">
          <h2 className="text-2xl font-semibold mb-4 ">Users Management</h2>

          <button className="p-2 bg-blue-600 rounded text-white">
            {" "}
            Create User{" "}
          </button>
        </div>
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder="Search users by username, email, or address"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Display Loading, Error, or Table */}
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2">User ID</th>
                <th className="px-4 py-2 border-b-2">Username</th>
                <th className="px-4 py-2 border-b-2">Email</th>
                <th className="px-4 py-2 border-b-2">Address</th>
                <th className="px-4 py-2 border-b-2">Created Date</th>
                <th className="px-4 py-2 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.UserId} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{user.UserId}</td>
                    <td className="border px-4 py-2">{user.UserName}</td>
                    <td className="border px-4 py-2">{user.Email}</td>
                    <td className="border px-4 py-2">{user.Address}</td>
                    <td className="border px-4 py-2">
                      {new Date(user.CreatedDate).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {isModalOpen && editingUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit User</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  value={editingUser.UserName}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, UserName: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="border p-2 w-full rounded"
                  value={editingUser.Email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, Email: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  className="border p-2 w-full rounded"
                  value={editingUser.Address}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, Address: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Users;
