import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import { Weight } from 'lucide-react';


interface Koi {
    KoiFishId: string;
    Weight: number;
    Length: number; 
    Color: string;
    Price: number;
    FarmId: number;
    KoiFishVariety: KoiFishVariety | null;
  }
interface KoiFishVariety{
  KoiFishVarietyId: number;
  TypeName: string;
  ScientificName: string;
  Description: string;
  ColorPattern: string;
  LifespanYears: number;
}



const KoiFish = () => {

    const [kois, setKois] = useState<Koi[]>([]);
    const [koiFishVarieties, setKoiFishVarieties] = useState<KoiFishVariety[]>([]);
    const [selectedVariety, setSelectedVariety] = useState<KoiFishVariety | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingKoi, setEditingKoi] = useState<Koi | null>(null);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isCreateKoiModalOpen, setIsCreateKoiModalOpen] = useState<boolean>(false);
    const [newKoi, setNewKoi] = useState<Koi | null>(null);
    const userRole = localStorage.getItem("userRole");

    useEffect(() => {
        const fetchKois = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await axios.get('https://localhost:7043/api/KoiFish');
            const response2 = await axios.get('https://localhost:7043/api/KoiFishVarieties')
            if (response.data.Status === 1 && response2.data.Status === 1) {
              setKois(response.data.Data);
              setKoiFishVarieties(response2.data.Data);
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

      const handleDeleteKoi = async (koiId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Koi?");
        if (!confirmDelete) return;
    
        try {
          const response = await axios.delete(`https://localhost:7043/api/Koi/${koiId}`);
    
          if (response.status === 200) {
            setKois(kois.filter(koi => koi.KoiFishId !== koiId));
            alert('Koi deleted successfully!');
          } else {
            alert('Failed to delete Koi. Please try again.');
          }
        } catch (err) {
          console.error('Error deleting Koi:', err);
          alert('An error occurred while deleting the Koi.');
        }
      };


      const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
      };
    
      const handleCreateKoiClose = () => {
        setIsCreateKoiModalOpen(false);
        setNewKoi(null);
      };


      const handleCreateKoiClick = () => {
        setNewKoi({
         KoiFishId: '', Weight: 0, Length:0, Color: '',Price:0, FarmId: 0, KoiFishVariety: null
        });
        setIsCreateKoiModalOpen(true);
      };
     
      const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingKoi(null);
      };

      const handleSaveChanges = async () => {
        if (!editingKoi) return;
    
        setIsSaving(true); // Start saving state
    
        try {
          const response = await axios.put(`https://localhost:7043/api/Koi/${editingKoi.KoiFishId}`, {
            KoiFishId: editingKoi.KoiFishId,
            Weight: editingKoi.Weight,
            Length: editingKoi.Length,
            Price: editingKoi.Price,
            Color: editingKoi.Color,
            FarmId :editingKoi.FarmId,
          });
    
          if (response.status === 200) {
            // Update user in the local state after successful API call
            setKois(prevKoi =>
              prevKoi.map(koi => (koi.KoiFishId === editingKoi.KoiFishId ? editingKoi : koi))
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

      const handleEditClick = (koi: Koi) => {
        setEditingKoi(koi);
        setIsModalOpen(true);
      };

      const handleVarietyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value);
        const variety = koiFishVarieties.find(variety => variety.KoiFishVarietyId == selectedId ) || null ;
        setSelectedVariety(variety);
      };

      const handleCreateUserSave = async () => {
        if (!newKoi || !selectedVariety) return;
      
        const koiData = {
          ...newKoi,
          VarietyId: selectedVariety.KoiFishVarietyId,
          KoiFishVariety: selectedVariety,  // Optionally include the entire variety object if needed
        };
      
        try {
          const response = await axios.post('https://localhost:7043/api/KoiFish', koiData);
      
          if (response.status === 200 || response.status === 201) {
            setKois([...kois, response.data]);  // Append the new koi to the list
            alert('New Koi added successfully!');
            setNewKoi(null);  
            handleCreateKoiClose();  
          } else {
            alert('Failed to add new Koi. Please try again.');
          }
        } catch (err) {
          console.error('Error adding Koi:', err);
          alert('An error occurred while adding the Koi.');
        }
      };


  return (
    <AdminLayout userRole={userRole}>
         <div className="bg-white p-6 rounded shadow">
        <div className='flex justify-between mb-3 '>
        <h2 className="text-2xl font-semibold mb-4 ">Koi Fish Management</h2>

        <button onClick={handleCreateKoiClick} className='p-2 bg-blue-600 rounded text-white'> Add Koi fish </button>
        </div>
        <div className="mb-4">
          <input 
            type="text" 
            className="border p-2 w-full rounded" 
            placeholder="Search " 
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <p>Loading Kois...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2">Koi Id</th>
                <th className="px-4 py-2 border-b-2">Type name</th>
                <th className="px-4 py-2 border-b-2">Weight</th>
                <th className="px-4 py-2 border-b-2">Length</th>
                <th className="px-4 py-2 border-b-2">Color</th>
                <th className="px-4 py-2 border-b-2">Description</th>
                <th className="px-4 py-2 border-b-2">Price</th>
                <th className="px-4 py-2 border-b-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {kois.length > 0 ? (
                kois.map(koi => {
                  return (
                    <tr key={koi.KoiFishId} className="hover:bg-gray-100">
                      <td className="border px-4 py-2">{koi.KoiFishId}</td>
                      <td className="border px-4 py-2">{koi.KoiFishVariety?.TypeName}</td>
                      <td className="border px-4 py-2">{koi.Weight}g</td>
                      <td className="border px-4 py-2">{koi.Length}cm</td>
                      <td className="border px-4 py-2">{koi.Color}</td>
                      <td className="border px-4 py-2">{koi.KoiFishVariety?.Description}</td>
                      <td className="border px-4 py-2">{koi.Price} VND</td>
                      <td className="border px-4 py-2">
                        <button onClick={() => handleEditClick(koi)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                          Edit
                        </button>
                        <button onClick={()=> handleDeleteKoi(koi.KoiFishId)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
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
          

{isCreateKoiModalOpen && newKoi && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Add New Koi</h2>


              <div className='mb-4'>
              <label className="block text-sm font-medium">Select Variety</label>
              <select
          className="border p-2 w-full rounded"
          onChange={handleVarietyChange}
        >
          {koiFishVarieties.map(variety => (
            <option key={variety.KoiFishVarietyId} value={variety.KoiFishVarietyId}>
              {variety.TypeName}
            </option>
          ))}
        </select>
              </div>

              {selectedVariety && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-semibold">Variety Details</h3>
          <p><strong>Scientific Name:</strong> {selectedVariety.ScientificName}</p>
          <p><strong>Life Span</strong> {selectedVariety.LifespanYears} years</p>
          <p><strong>Description:</strong> {selectedVariety.Description}</p>
          
        </div>
      )}


              <div className='mb-2'>
              <label className="block text-sm font-medium">Color</label>
              <input 
                type="text" 
                className="border p-2 w-full rounded mb-4" 
                placeholder="Color" 
                value={newKoi.Color}
                onChange={(e) => setNewKoi({...newKoi, Color : e.target.value})} 
              />
              </div>

              <div className='mb-2'>
              <label className="block text-sm font-medium">Weigth</label>
            <input 
                type="number" 
                className="border p-2 w-full rounded mb-4" 
                placeholder="Weight" 
                value={newKoi.Weight}
                onChange={(e) => setNewKoi({...newKoi, Weight : parseFloat(e.target.value) || 0})} 
              />
             </div>

             <div className='mb-2'>
             <label className="block text-sm font-medium">Length</label>
             <input 
                type="number" 
                className="border p-2 w-full rounded mb-4" 
                placeholder="Length" 
                value={newKoi.Length}
                onChange={(e) => setNewKoi({...newKoi, Length: parseFloat(e.target.value) || 0})} 
              />

              
              </div>
              <div className="flex justify-end">
                <button 
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                  onClick={handleCreateKoiClose}
                >
                  Cancel
                </button>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleCreateKoiClick}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

{isModalOpen && editingKoi && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Koi Fish</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium">Price</label>
                <input 
                  type="number" 
                  className="border p-2 w-full rounded" 
                  value={editingKoi.Price} 
                  onChange={(e) => setEditingKoi({...editingKoi, Price: parseFloat(e.target.value) || 0})} 
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Color</label>
                <input 
                  type="text" 
                  className="border p-2 w-full rounded" 
                  value={editingKoi.Color} 
                  onChange={(e) => setEditingKoi({...editingKoi, Color : e.target.value})} 
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
        </div>
         
    </AdminLayout>
  )
}

export default KoiFish