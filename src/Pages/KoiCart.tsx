import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { KoiFish } from "./KoiDetail";

interface CartItem extends KoiFish {
  quantity: number;
}

const KoiCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const mockCartItems: CartItem[] = [
      {
        KoiFishId: 1,
        KoiFishVarietyId: 1,
        FarmId: 1,
        Weight: 2.5,
        Length: 30,
        Color: "Red and White",
        Price: 150,
        DateAdded: "2024-10-18",
        IsAvailable: true,
        Notes: "Beautiful Kohaku",
        Supplier: "Koi Farm A",
        Gender: 1,
        Farm: { Name: "Koi Farm A" },
        KoiFishVariety: { Name: "Kohaku" },
        quantity: 1,
      },
      {
        KoiFishId: 2,
        KoiFishVarietyId: 2,
        FarmId: 2,
        Weight: 3,
        Length: 35,
        Color: "Black and White",
        Price: 200,
        DateAdded: "2024-10-17",
        IsAvailable: true,
        Notes: "Elegant Shiro Utsuri",
        Supplier: "Koi Farm B",
        Gender: 2,
        Farm: { Name: "Koi Farm B" },
        KoiFishVariety: { Name: "Shiro Utsuri" },
        quantity: 2,
      },
    ];

    setCartItems(mockCartItems);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.KoiFishId === id
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.KoiFishId !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Koi Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.KoiFishId}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center"
            >
              <img
                src={`/api/placeholder/100/100?text=${item.KoiFishVariety.Name}`}
                alt={item.KoiFishVariety.Name}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">
                  {item.KoiFishVariety.Name}
                </h2>
                <p className="text-gray-600">Farm: {item.Farm.Name}</p>
                <p className="text-gray-600">Color: {item.Color}</p>
                <p className="font-bold text-lg">${item.Price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    updateQuantity(item.KoiFishId, item.quantity - 1)
                  }
                  className="bg-gray-200 px-2 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.KoiFishId, item.quantity + 1)
                  }
                  className="bg-gray-200 px-2 py-1 rounded-r"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.KoiFishId)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-bold mb-2">Total: ${totalPrice}</h2>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      <Link
        to="/koi"
        className="mt-6 inline-block text-blue-500 hover:underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default KoiCart;
