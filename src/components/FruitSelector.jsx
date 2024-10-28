import React, { useState } from 'react';

const FruitSelector = ({ onAdd, fruits }) => {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (selectedFruit && quantity > 0) {
      onAdd({ name: selectedFruit, quantity: parseInt(quantity) });
      setSelectedFruit('');
      setQuantity(1);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md w-full mx-auto border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Select Fruit</h2>
      <div className="mb-6">
        <label htmlFor="fruit" className="block text-gray-700 text-lg mb-2 font-medium">Fruit</label>
        <select
          id="fruit"
          className="border border-gray-300 focus:border-blue-500 p-4 rounded-lg w-full bg-gray-50 focus:outline-none transition duration-300 text-gray-700"
          value={selectedFruit}
          onChange={(e) => setSelectedFruit(e.target.value)}
        >
          <option value="">Select a fruit</option>
          {fruits.map((fruit) => (
            <option key={fruit.name} value={fruit.name}>
              {fruit.name} (₹{fruit.price})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label htmlFor="quantity" className="block text-gray-700 text-lg mb-2 font-medium">Quantity</label>
        <input
          id="quantity"
          type="number"
          className="border border-gray-300 focus:border-blue-500 p-4 rounded-lg w-full bg-gray-50 focus:outline-none transition duration-300 text-gray-700"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
        onClick={handleAdd}
      >
        Add to Bill
      </button>
    </div>
  );
};

export default FruitSelector;
