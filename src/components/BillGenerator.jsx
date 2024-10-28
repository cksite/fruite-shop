import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import generatePDF from '../utils/generatePDF';
import FruitSelector from './FruitSelector';
import BillList from './BillList';
import CustomerManager from './CustomerManager';
import getFruitsFromLocalStorage from '../data/fruits';
import { loadCustomersFromLocalStorage } from '../utils/storageUtils';

const BillGenerator = () => {
  const [billItems, setBillItems] = useState([]);
  const [customer, setCustomer] = useState({ name: '', address: '' });
  const [fruits, setFruits] = useState(getFruitsFromLocalStorage());
  const [customers, setCustomers] = useState(loadCustomersFromLocalStorage());

  useEffect(() => {
    setFruits(getFruitsFromLocalStorage());
  }, []);

  useEffect(() => {
    setCustomers(loadCustomersFromLocalStorage());
  }, []);

  const addItemToBill = (item) => {
    const fruit = fruits.find((f) => f.name === item.name);
    if (fruit) {
      setBillItems([...billItems, { ...item, price: fruit.price }]);
    }
  };

  const handleGeneratePDF = () => {
    generatePDF(billItems, customer);
    setBillItems([]);
    setCustomer({ name: '', address: '' });
  };

  const handleSelectCustomer = (name) => {
    const selectedCustomer = customers.find(c => c.name === name);
    setCustomer(selectedCustomer || { name: '', address: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Maa Veshnavi Fruit Merchant</h1>

      <div className="flex space-x-4 mb-6">
        <Link
          to="/manage-fruits"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Manage Fruits
        </Link>

        <Link
          to="/manage-customers"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Manage Customers
        </Link>
      </div>

      {/* Customer Details Form */}
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Details</h2>
        <select
          className="border border-gray-300 focus:border-blue-500 p-3 rounded-lg mb-4 w-full"
          value={customer.name}
          onChange={(e) => handleSelectCustomer(e.target.value)}
        >
          <option value="">Select a customer</option>
          {customers.map((cust, index) => (
            <option key={index} value={cust.name}>
              {cust.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="border border-gray-300 focus:border-blue-500 p-3 rounded-lg mb-2 w-full"
          placeholder="Customer Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <input
          type="text"
          className="border border-gray-300 focus:border-blue-500 p-3 rounded-lg mb-4 w-full"
          placeholder="Customer Address"
          value={customer.address}
          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
        />
      </div>

      {/* Fruit Selector */}
      <FruitSelector onAdd={addItemToBill} fruits={fruits} />

      {/* Bill List */}
      <BillList items={billItems} />

      {/* Generate PDF Button */}
      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        onClick={handleGeneratePDF}
      >
        Generate Bill
      </button>
    </div>
  );
};

export default BillGenerator;
