import React from 'react'

const KoiDetails = () => {
  return (
    <div className='text-white'>
     <div className='mx-80 mt-32 mb-5'> 
        <h1 className='bg-orange-200 pl-5 py-2 font-bold text-black'> [ NT3I-148 ]  紅銀河４３cm  </h1>
     </div>
<div className='flex space-x-5'>
     <img className='ml-80 w-[425px] h-[500px]' src="src/assets/Koi1.png" alt="koi" />
     <div className='flex-col'>
     <h1 className='text-3xl mt-10 mb-3'>Price: 300.000 </h1>
    <h1 className='mb-2'>Category: </h1>
    <h1 className='mb-2'>From:</h1>
    
     <div className='mt-10'>
      <div className='border-2 border-blue-400 bg-orange-200 text-black font-bold mr-80'><p className='text-center'>Detail</p></div>
      <div className='mr-80  border-2 border-blue-400 text-center'>asfjxzbcjbasjbckanscknxzcm, asknfkn askf a asfa sf as fsadsaa sdbasjfbja </div>
  

      <button className='bg-green-300 mt-5 px-3 py-2 rounded-md text-black '> Buy Now </button>
     </div>
     </div>

     <></>
</div>
    </div>
  )
}

export default KoiDetails