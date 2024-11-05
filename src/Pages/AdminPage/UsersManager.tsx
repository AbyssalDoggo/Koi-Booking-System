// src/pages/Users.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import { DatePicker } from 'rsuite';


interface User {
  UserId: string;   
  FullName: string;     
  UserName: string;
  Password:string;      
  Email: string;    
  PhoneNumber: string;
  BirthDate: string;     
  Address: string;  
  Gender: number;
  ImageUser: string;
  IsActive: boolean;
  CreatedDate: string;  
  RoleId: number;        
  IsVerified: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://localhost:7043/api/Users');

        if (response.data.Status === 1) {
          setUsers(response.data.Data);
        } else {
          setError('Unexpected response format');
        }
      } catch (err) {
        setError('Failed to fetch users.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUserClick = () => {
    setNewUser({
      UserId:'' , FullName: '', UserName: '', Password: '', Email: '', PhoneNumber: '', BirthDate: '',
      Address: '', Gender: 0, ImageUser: '', IsActive: false, CreatedDate: '', RoleId: 0, IsVerified: false
    });
    setIsCreateUserModalOpen(true);
  };

  const handleCreateUserClose = () => {
    setIsCreateUserModalOpen(false);
    setNewUser(null);
  };

  const handleCreateUserSave = async () => {
    if (!newUser) return;

    try {
      const response = await axios.post('https://localhost:7043/api/Users', newUser);

      if (response.status === 200) {
        setUsers([...users, response.data]);
        alert('User created successfully!');
      } else {
        alert('Failed to create user');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      alert('An error occurred while creating the user');
    } finally {
      handleCreateUserClose();
    }
  };

  const handleToggleStatus = async (user: User) => {
    const updatedUser = { ...user, IsActive: !user.IsActive };
  
    try {
      const response = await axios.put(`https://localhost:7043/api/Users/${user.UserId}`, updatedUser);
      
      if (response.status == 0) {
        setUsers(prevUsers => 
          prevUsers.map(u => (u.UserId === user.UserId ? updatedUser : u))
        );
        alert('User verification status updated successfully!');
      } else {
        alert('Failed to update verification status');
      }
    } catch (error) {
      console.error('Error updating user verification status:', error);
      alert('An error occurred while updating the verification status');
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredUsers = users.filter(user =>
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
      const response = await axios.put(`https://localhost:7043/api/Users/${editingUser.UserId}`, {
        UserId: editingUser.UserId,
        UserName: editingUser.UserName,
        Email: editingUser.Email,
        Address: editingUser.Address,
        RoleId: editingUser.RoleId,
        // Add any other fields that you want to send in the PUT request
      });

      if (response.status === 200) {
        // Update user in the local state after successful API call
        setUsers(prevUsers =>
          prevUsers.map(user => (user.UserId === editingUser.UserId ? editingUser : user))
        );
        alert('User updated successfully!');
      } else {
        alert('Failed to update user');
      }
    } catch (err) {
      console.error('Error saving user:', err);
      alert('An error occurred while saving the user');
    } finally {
      setIsSaving(false); // End saving state
      handleModalClose(); // Close the modal after saving
    }
  };

  

  

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded shadow">
        <div className='flex justify-between mb-3 '>
        <h2 className="text-2xl font-semibold mb-4 ">Users Management</h2>

        <button onClick={handleCreateUserClick} className='p-2 bg-blue-600 rounded text-white'> Create User </button>
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
                <th className="px-4 py-2 border-b-2">Full Name</th>
                <th className="px-4 py-2 border-b-2">Email</th>
                <th className="px-4 py-2 border-b-2">Phone number</th>
                <th className="px-4 py-2 border-b-2">Birth Date</th>
                <th className="px-4 py-2 border-b-2">Address</th>
                <th className="px-4 py-2 border-b-2">Created Date</th>
                <th className="px-4 py-2 border-b-2">Status</th>
                <th className="px-4 py-2 border-b-2">Role id</th>
                <th className="px-4 py-2 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.UserId} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{user.UserId}</td>
                    <td className="border px-4 py-2">{user.FullName}</td>
                    <td className="border px-4 py-2">{user.Email}</td>
                    <td className="border px-4 py-2">{user.PhoneNumber}</td>
                    <td className="border px-4 py-2">{new Date(user.BirthDate).toLocaleString()}</td>
                    <td className="border px-4 py-2">{user.Address}</td>
                    <td className="border px-4 py-2">{new Date(user.CreatedDate).toLocaleString()}</td>
                    <td className="border px-4 py-2">
                    <label className="switch">
                        <input
                          type="checkbox"
                          checked={!!user.IsActive}
                          onChange={() => handleToggleStatus(user)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td className="border px-4 py-2">{user.RoleId}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleEditClick(user)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">No users found</td>
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
                <label className="block text-sm font-medium">Full Name</label>
                <input 
                  type="text" 
                  className="border p-2 w-full rounded" 
                  value={editingUser.FullName} 
                  onChange={(e) => setEditingUser({...editingUser, FullName: e.target.value})} 
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">User Name</label>
                <input 
                  type="text" 
                  className="border p-2 w-full rounded" 
                  value={editingUser.UserName} 
                  onChange={(e) => setEditingUser({...editingUser, UserName: e.target.value})} 
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Password</label>
                <input 
                  type="text" 
                  className="border p-2 w-full rounded" 
                  value={editingUser.Password} 
                  onChange={(e) => setEditingUser({...editingUser, Password: e.target.value})} 
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  className="border p-2 w-full rounded" 
                  value={editingUser.Email} 
                  onChange={(e) => setEditingUser({...editingUser, Email: e.target.value})} 
                />
              </div>

              <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Gender</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={editingUser.Gender === 1}
                    onChange={() => setEditingUser({...editingUser, Gender: 1})}
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={editingUser.Gender === 0}
                    onChange={() => setEditingUser({...editingUser, Gender: 0})}
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>


             < div className="mb-4">
                <label className="block text-sm font-medium">Role</label>
                <input 
                  type="email" 
                  className="border p-2 w-full rounded" 
                  value={editingUser.Email} 
                  onChange={(e) => setEditingUser({...editingUser, Email: e.target.value})} 
                />
              </div>  

              <div className="mb-4">
                <label className="block text-sm font-medium">Address</label>
                <input 
                  type="text" 
                  className="border p-2 w-full rounded" 
                  value={editingUser.Address} 
                  onChange={(e) => setEditingUser({...editingUser, Address: e.target.value})} 
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Phone Number</label>
                <input 
                  type="text" 
                  className="border p-2 w-full rounded" 
                  value={editingUser.PhoneNumber} 
                  onChange={(e) => setEditingUser({...editingUser, PhoneNumber: e.target.value})} 
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
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

{isCreateUserModalOpen && newUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Create New User</h2>

    
      <label className="block text-sm">Full Name</label>
              <input 
                type="text" 
                className="border border-black p-2 w-full rounded mb-4" 
                placeholder="Full Name" 
                value={newUser.FullName}
                onChange={(e) => setNewUser({...newUser, FullName: e.target.value})} 
              />
              <label className="block text-sm ">User Name</label>
               <input 
                type="text" 
                className="border border-black p-2 w-full rounded mb-4" 
                placeholder="UserName" 
                value={newUser.UserName}
                onChange={(e) => setNewUser({...newUser, UserName: e.target.value})} 
              />
              <label className="block text-sm">Password</label>
               <input 
                type="text" 
                className="border border-black p-2 w-full rounded mb-4" 
                placeholder="Password" 
                value={newUser.Password}
                onChange={(e) => setNewUser({...newUser, Password: e.target.value})} 
              />
              <label className="block text-sm  mb-2">Email</label>
              <input 
                type="email" 
                className="border border-black p-2 w-full rounded mb-4" 
                placeholder="Email" 
                value={newUser.Email}
                onChange={(e) => setNewUser({...newUser, Email: e.target.value})} 
              />


               <div className="mb-4">
              <label className="block text-sm  mb-2">Gender</label>
              <div className="flex items-center space-x-4">
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={newUser.Gender === 0}
                    onChange={() => setNewUser({...newUser, Gender: 0})}
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={newUser.Gender === 1}
                    onChange={() => setNewUser({...newUser, Gender: 1})}
                  />
                  <span className="ml-2">Male</span>
                </label>
              </div>
            </div>
            <label className="block text-sm ">Address</label>
              <input 
                type="text" 
                className="border border-black p-2 w-full rounded mb-4" 
                placeholder="Address" 
                value={newUser.Address}
                onChange={(e) => setNewUser({...newUser, Address: e.target.value})} 
              />
              <label className="block text-sm  ">Phone Number</label>
              <input 
                type="text" 
                className="border border-black p-2 w-full rounded mb-4" 
                placeholder="Phone Number" 
                value={newUser.PhoneNumber}
                onChange={(e) => setNewUser({...newUser, PhoneNumber: e.target.value})} 
              />

              <label className='block text-sm'>Birth</label>
             {/* <DatePicker value={new Date(newUser.BirthDate)} onChangeCalendarDate={(e) => setNewUser({...newUser, BirthDate: e.getTimezoneOffset})}  className='rounded'></DatePicker> */}

              <div className="flex justify-end">
                <button 
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  onClick={handleCreateUserClose}
                >
                  Cancel
                </button>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleCreateUserSave}
                >
                  Save
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
