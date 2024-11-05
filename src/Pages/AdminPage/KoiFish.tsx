import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';


interface Koi {
    KoiFishId: number;
    Weight: number;
    Length: number; 
    Color: string;
    Price: number;
    FarmId: number;
    KoiFishVarietyId: number;
    Description: string;
  }
interface KoiVariety{
  ScientificName: string;
  Description: string;
  ColorPattern: string;
}



const KoiFish = () => {

    const [kois, setKois] = useState<Koi[]>([]);
    const [koivarie, setKoivarie] = useState<KoiVariety[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingKoi, setEditingKoi] = useState<Koi | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        const fetchKois = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await axios.get('https://localhost:7043/api/KoiFish');
            
            if (response.data.Status === 1 ) {
              setKois(response.data.Data);
            } else {
              setError('Unexpected response format');
            }
          } catch (err) {
            setError('Failed to fetch KoiFish.');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchKois();
      }, []);


      const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
      };
    
     
     
      const getVariety = async (KoiFishVarietyId: number) => {
        if (!koivarie[KoiFishVarietyId]) {
          try {
            const response = await axios.get(`https://localhost:7043/api/KoiFishVarieties/${KoiFishVarietyId}`);
            
            if (response.status === 200) {
              setKoivarie(prevState => ({
                ...prevState,
                [KoiFishVarietyId]: response.data,
              }));
            } else {
              setError('Failed to fetch koi variety data');
            }
          } catch (err) {
            console.error(err);
            setError('An error occurred while fetching koi variety data');
          }
        }
      };


  return (
    <AdminLayout>
         <div className="bg-white p-6 rounded shadow">
        <div className='flex justify-between mb-3 '>
        <h2 className="text-2xl font-semibold mb-4 ">Koi Fish Management</h2>

        <button className='p-2 bg-blue-600 rounded text-white'> Add Koi fish </button>
        </div>
        {/* Search Bar */}
        <div className="mb-4">
          <input 
            type="text" 
            className="border p-2 w-full rounded" 
            placeholder="Search " 
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
                <th className="px-4 py-2 border-b-2">Koi Id</th>
                <th className="px-4 py-2 border-b-2">Science name</th>
                <th className="px-4 py-2 border-b-2">Weight</th>
                <th className="px-4 py-2 border-b-2">Length</th>
                <th className="px-4 py-2 border-b-2">Color pattern</th>
                <th className="px-4 py-2 border-b-2">Description</th>
                <th className="px-4 py-2 border-b-2">Price</th>
                <th className="px-4 py-2 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kois.length > 0 ? (
                kois.map(koi => {
                  // Gọi hàm lấy variety cho koi này
                  getVariety(koi.KoiFishVarietyId);

                  const variety = koivarie[koi.KoiFishId];

                  return (
                    <tr key={koi.KoiFishId} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{koi.KoiFishId}</td>
                      <td className="border px-4 py-2">{variety?.ScientificName || 'Loading...'}</td>
                      <td className="border px-4 py-2">{koi.Weight}g</td>
                      <td className="border px-4 py-2">{koi.Length}cm</td>
                      <td className="border px-4 py-2">{variety?.ColorPattern || 'Loading...'}</td>
                      <td className="border px-4 py-2">{koi.Description}</td>
                      <td className="border px-4 py-2">{koi.Price} VND</td>
                      <td className="border px-4 py-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                          Edit
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center p-4">No koi fish found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}


        </div>
         
    </AdminLayout>
  )
}

export default KoiFish