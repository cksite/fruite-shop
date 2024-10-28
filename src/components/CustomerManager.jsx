import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadCustomersFromLocalStorage, saveCustomersToLocalStorage } from '../utils/storageUtils';

const CustomerManager = () => {
  const [customers, setCustomers] = useState(loadCustomersFromLocalStorage());
  const [newCustomer, setNewCustomer] = useState({ name: '', address: '' });
  const [selectedCustomer, setSelectedCustomer] = useState('');

  useEffect(() => {
    saveCustomersToLocalStorage(customers);
  }, [customers]);

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.address) {
      const existingCustomer = customers.find(customer => customer.name.toLowerCase() === newCustomer.name.toLowerCase());
      if (!existingCustomer) {
        setCustomers([...customers, newCustomer]);
        setNewCustomer({ name: '', address: '' });
      } else {
        alert('This customer already exists.');
      }
    }
  };

  const handleUpdateCustomer = () => {
    if (selectedCustomer && newCustomer.name && newCustomer.address) {
      const updatedCustomers = customers.map(customer =>
        customer.name === selectedCustomer
          ? { ...customer, name: newCustomer.name, address: newCustomer.address }
          : customer
      );
      setCustomers(updatedCustomers);
      setSelectedCustomer('');
      setNewCustomer({ name: '', address: '' });
    }
  };

  const handleRemoveCustomer = (name) => {
    const updatedCustomers = customers.filter(customer => customer.name !== name);
    setCustomers(updatedCustomers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-600 p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Manage Customers
        </h1>

        {/* Navigation Button */}
        <Link to="/" className="flex justify-center mb-6">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Back to Bill Generator
          </button>
        </Link>

        {/* Add/Update Customer Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add or Update Customer
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              className="border border-gray-300 focus:border-blue-500 p-3 rounded-lg w-full focus:outline-none transition duration-300"
              placeholder="Customer Name"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            />
            <input
              type="text"
              className="border border-gray-300 focus:border-blue-500 p-3 rounded-lg w-full focus:outline-none transition duration-300"
              placeholder="Customer Address"
              value={newCustomer.address}
              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
            />
          </div>
          <select
            className="border border-gray-300 focus:border-blue-500 p-3 rounded-lg w-full mb-4 focus:outline-none transition duration-300"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
          >
            <option value="">Select a customer to update</option>
            {customers.map((customer) => (
              <option key={customer.name} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 mr-2"
            onClick={handleAddCustomer}
          >
            Add Customer
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            onClick={handleUpdateCustomer}
          >
            Update Customer
          </button>
        </div>

        {/* Customer List */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer List</h2>
        <ul className="list-none space-y-3">
          {customers.map((customer) => (
            <li
              key={customer.name}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm transition duration-300 hover:shadow-md"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-800">{customer.name}</span>
                <span className="text-gray-600">{customer.address}</span>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition duration-300"
                onClick={() => handleRemoveCustomer(customer.name)}
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

export default CustomerManager;
