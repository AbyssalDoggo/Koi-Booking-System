import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';


interface Order {
    OrderHistoryId: number;
    CustomerId: number;
    OrderKoiId: number;
    OrderTripId:number;
    OrderDate: string;
    TotalPrice: number;
  }
const OrderHistory: React.FC = () => {
  
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
  

    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await axios.get('https://localhost:7043/api/OrderHistories');
  
         
            setOrders(response.data.Data);
          
        } catch (err) {
          setError('Failed to fetch orders.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.toLowerCase();
      setSearchQuery(query);
    };
    

  return (
    <AdminLayout>
 <div className="bg-white p-6 rounded shadow">
        <div className='flex justify-between mb-3 '>
        <h2 className="text-2xl font-semibold mb-4 ">Order History</h2>

        
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
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2">ID</th>
                <th className="px-4 py-2 border-b-2">Customer</th>
                <th className="px-4 py-2 border-b-2">Products</th>
                <th className="px-4 py-2 border-b-2">Order date</th>
                <th className="px-4 py-2 border-b-2">Trip id</th>
                <th className="px-4 py-2 border-b-2">Price</th>
                <th className="px-4 py-2 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map(order => (
                  <tr key={order.OrderHistoryId} className="hover:bg-gray-100">
                     <td className="border px-4 py-2">{order.OrderHistoryId}</td>
                    <td className="border px-4 py-2">{order.CustomerId}</td>
                    <td className="border px-4 py-2">{order.OrderKoiId}</td>
                    <td className="border px-4 py-2">{new Date(order.OrderDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{order.OrderTripId}</td>
                    <td className="border px-4 py-2">{order.TotalPrice}</td>
                    <td className="border px-4 py-2">
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
 </div>
    </AdminLayout>
  );
};

export default OrderHistory