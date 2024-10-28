import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadFruitsFromLocalStorage, saveFruitsToLocalStorage } from '../utils/storageUtils';

const FruitManager = () => {
  const [fruits, setFruits] = useState(loadFruitsFromLocalStorage());
  const [newFruit, setNewFruit] = useState({ name: '', price: '' });

  useEffect(() => {
    saveFruitsToLocalStorage(fruits);
  }, [fruits]);

  const handleAddFruit = () => {
    if (newFruit.name && newFruit.price) {
      const existingFruit = fruits.find(
        (fruit) => fruit.name.toLowerCase() === newFruit.name.toLowerCase()
      );
      if (!existingFruit) {
        setFruits([...fruits, { ...newFruit, price: parseFloat(newFruit.price) }]);
        setNewFruit({ name: '', price: '' });
      } else {
        alert('This fruit already exists.');
      }
    }
  };

  const handleUpdatePrice = (index, newPrice) => {
    const updatedFruits = fruits.map((fruit, i) =>
      i === index ? { ...fruit, price: parseFloat(newPrice) } : fruit
    );
    setFruits(updatedFruits);
  };

  const handleRemoveFruit = (index) => {
    const updatedFruits = fruits.filter((_, i) => i !== index);
    setFruits(updatedFruits);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Manage Fruits
        </h1>

        <Link to="/" className="block mb-6 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
            Back to Bill Generator
          </button>
        </Link>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add New Fruit
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              className="border border-gray-300 focus:border-blue-500 p-3 rounded-lg w-full focus:outline-none transition duration-300"
              placeholder="Fruit Name"
              value={newFruit.name}
              onChange={(e) => setNewFruit({ ...newFruit, name: e.target.value })}
            />
            <input
              type="number"
              className="border border-gray-300 focus:border-blue-500 p-3 rounded-lg w-full focus:outline-none transition duration-300"
              placeholder="Fruit Price (₹)"
              value={newFruit.price}
              onChange={(e) => setNewFruit({ ...newFruit, price: e.target.value })}
            />
          </div>
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            onClick={handleAddFruit}
          >
            Add Fruit
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Fruit List</h2>
        <ul className="list-none space-y-3">
          {fruits.map((fruit, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm transition duration-300 hover:shadow-md"
            >
              <div className="flex items-center">
                <span className="font-bold text-gray-800 mr-3">{fruit.name}</span>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="border border-gray-300 focus:border-blue-500 p-2 rounded-lg w-20 text-gray-700 focus:outline-none transition duration-300"
                    value={fruit.price}
                    onChange={(e) => handleUpdatePrice(index, e.target.value)}
                  />
                  <span className="text-gray-700 ml-2">₹</span>
                </div>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300"
                onClick={() => handleRemoveFruit(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FruitManager;
