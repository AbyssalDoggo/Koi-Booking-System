import React from "react";

const ProductsPage = () => {
  return (
    <div className="text-white grid">
      <div className="p-2 mt-10 ml-10 float-end text-lg flex place-content-between">
        <div>
          <label>Category:</label>
          <select className="text-black rounded-sm ml-1 w-[150px]" name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div className="mr-10">
          <label>Key word:</label>
          <input className="rounded-sm ml-1 " type="text" />
          <button className="bg-cyan-700 px-2 rounded-md ml-2 hover:bg-cyan-950">
            Search
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="border-white border-2 w-[200px] ml-10 mt-10">
            <div className="border-b-2 py-2 border-white bg-orange-200 text-black">
           <h1 className="text-center ">Category List</h1>
           </div>
           <p className="pl-1 text-xl hover:text-red-400 hover:cursor-pointer hover:underline"> All Products</p>
           <p className="pl-1 text-xl hover:text-red-400 hover:cursor-pointer hover:underline"> New Products</p>
           <p className="pl-1 text-xl hover:text-red-400 hover:cursor-pointer hover:underline"> Red</p>
           <p className="pl-1 text-xl hover:text-red-400 hover:cursor-pointer hover:underline"> Plantinum</p>
           <p className="pl-1 text-xl hover:text-red-400 hover:cursor-pointer hover:underline"> Sakuraogon</p>

        </div>

        <div className=" ml-10 mt-10  w-[950px] p-3 gap-5 flex flex-wrap  ">
           <div className="w-2/12 h-[325px] border-2 bg-white text-center border-gray-400">
                <img src="https://www.koikoimatsuda.jp/shopping/itemphoto/NT3I-149a.jpg" alt="vjip"></img>
                <h1 className="text-black text-lg font-bold">Matsatsuda </h1>
                <p className="text-green-400">Taiso 22cm</p>
                <p className="text-red-400 text-xl mb-3 font-semibold">145.000d/each</p>
                <button className="border-black border-2 rounded bg-yellow-300 text-black px-7 ">Buy</button>
           </div>
           <div className="w-2/12 h-[325px] border-2 bg-white text-center border-gray-400">
                <img src="https://www.koikoimatsuda.jp/shopping/itemphoto/NT3I-149a.jpg" alt="vjip"></img>
                <h1 className="text-black text-lg font-bold">Matsatsuda </h1>
                <p className="text-green-400">Taiso 22cm</p>
                <p className="text-red-400 text-xl mb-3 font-semibold">145.000d/each</p>
                <button className="border-black border-2 rounded bg-yellow-300 text-black px-7 ">Buy</button>
           </div>
           <div className="w-2/12 h-[325px] border-2 bg-white text-center border-gray-400">
                <img src="https://www.koikoimatsuda.jp/shopping/itemphoto/NT3I-149a.jpg" alt="vjip"></img>
                <h1 className="text-black text-lg font-bold">Matsatsuda </h1>
                <p className="text-green-400">Taiso 22cm</p>
                <p className="text-red-400 text-xl mb-3 font-semibold">145.000d/each</p>
                <button className="border-black border-2 rounded bg-yellow-300 text-black px-7 ">Buy</button>
           </div>
           <div className="w-2/12 h-[325px] border-2 bg-white text-center border-gray-400">
                <img src="https://www.koikoimatsuda.jp/shopping/itemphoto/NT3I-149a.jpg" alt="vjip"></img>
                <h1 className="text-black text-lg font-bold">Matsatsuda </h1>
                <p className="text-green-400">Taiso 22cm</p>
                <p className="text-red-400 text-xl mb-3 font-semibold">145.000d/each</p>
                <button className="border-black border-2 rounded bg-yellow-300 text-black px-7 ">Buy</button>
           </div>

           <div className="w-2/12 h-[325px] border-2 bg-white text-center border-gray-400">
                <img src="https://www.koikoimatsuda.jp/shopping/itemphoto/NT3I-149a.jpg" alt="vjip"></img>
                <h1 className="text-black text-lg font-bold">Matsatsuda </h1>
                <p className="text-green-400">Taiso 22cm</p>
                <p className="text-red-400 text-xl mb-3 font-semibold">145.000d/each</p>
                <button className="border-black border-2 rounded bg-yellow-300 text-black px-7 ">Buy</button>
           </div>
           
           <div className="w-2/12 h-[325px] border-2 bg-white text-center border-gray-400">
                <img src="https://www.koikoimatsuda.jp/shopping/itemphoto/NT3I-149a.jpg" alt="vjip"></img>
                <h1 className="text-black text-lg font-bold">Matsatsuda </h1>
                <p className="text-green-400">Taiso 22cm</p>
                <p className="text-red-400 text-xl mb-3 font-semibold">145.000d/each</p>
                <button className="border-black border-2 rounded bg-yellow-300 text-black px-7 ">Buy</button>
           </div>
           
           <div className="w-2/12 h-[325px] border-2 bg-white text-center border-gray-400">
                <img src="https://www.koikoimatsuda.jp/shopping/itemphoto/NT3I-149a.jpg" alt="vjip"></img>
                <h1 className="text-black text-lg font-bold">Matsatsuda </h1>
                <p className="text-green-400">Taiso 22cm</p>
                <p className="text-red-400 text-xl mb-3 font-semibold">145.000d/each</p>
                <button className="border-black border-2 rounded bg-yellow-300 text-black px-7 ">Buy</button>
           </div>
           
           <div className="w-2/12 h-[325px] border-2 bg-white text-center border-gray-400">
                <img src="https://www.koikoimatsuda.jp/shopping/itemphoto/NT3I-149a.jpg" alt="vjip"></img>
                <h1 className="text-black text-lg font-bold">Matsatsuda </h1>
                <p className="text-green-400">Taiso 22cm</p>
                <p className="text-red-400 text-xl mb-3 font-semibold">145.000d/each</p>
                <button className="border-black border-2 rounded bg-yellow-300 text-black px-7 ">Buy</button>
           </div>
          


        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
