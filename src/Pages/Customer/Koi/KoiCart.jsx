import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../../assets/Koi1.png";

const KoiCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [deposit, setDeposit] = useState(0);

  useEffect(() => {
    const mockCartItem = {
      KoiFishId: 1,
      Price: 1000,
      Quantity: 1,
      KoiFishVariety: {
        Name: "Kohaku",
      },
      Color: "Red and White",
    };
    setCartItems([mockCartItem]);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.Price * item.Quantity, 0);
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.KoiFishId === id
          ? { ...item, Quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.KoiFishId !== id));
  };

  const handleSubmitOrder = async () => {
    const total = calculateTotal();
    const orderData = {
      OrderKoiId: 0,
      CustomerId: 1,
      KoiFishId: cartItems[0].KoiFishId,
      OrderDate: new Date().toISOString(),
      Quantity: cartItems[0].Quantity,
      TotalPrice: total,
      Deposit: deposit,
      RemainingBalance: total - deposit,
      DeliveryMethod: deliveryMethod,
      SpecialInstructions: specialInstructions,
      Status: "Pending",
    };

    try {
      const response = await fetch("https://localhost:7043/api/OrderKoiFish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      setCartItems([]);
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Koi Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <button
            onClick={() => navigate("/koi")}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Browse Koi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item.KoiFishId}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={img}
                    alt="Koi"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      {item.KoiFishVariety?.Name}
                    </h3>
                    <p className="text-gray-600">{item.Color}</p>
                    <p className="text-green-600 font-bold">
                      ${item.Price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.KoiFishId, item.Quantity - 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100">
                        {item.Quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.KoiFishId, item.Quantity + 1)
                        }
                        className="bg-gray-200 px-3 py-1 rounded-r"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.KoiFishId)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700">Delivery Method</label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="pickup">Store Pickup</option>
                  <option value="delivery">Home Delivery</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700">Deposit Amount</label>
                <input
                  type="number"
                  value={deposit}
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="w-full border rounded-lg p-2"
                  min="0"
                  max={calculateTotal()}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700">
                  Special Instructions
                </label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  rows={3}
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Remaining Balance</span>
                  <span>${(calculateTotal() - deposit).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmitOrder}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KoiCart;
