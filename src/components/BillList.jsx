// src/components/BillList.jsx

import React from 'react';

const BillList = ({ items }) => {
  const totalAmount = items.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mb-6 w-full max-w-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bill List</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">No items added</p>
      ) : (
        <div className="space-y-3">
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-200">
                <div className="flex items-center">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">(Quantity: {item.quantity})</span>
                </div>
                <span className="font-semibold text-green-700">₹{(item.quantity * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-4 border-gray-300">
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount:</span>
              <span className="text-blue-600">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillList;
