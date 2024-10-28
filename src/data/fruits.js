// src/data/fruits.js

const defaultFruits = [
  { name: 'Apple', price: 120 },
  { name: 'Banana', price: 40 },
  { name: 'Mango', price: 150 },
  { name: 'Orange', price: 60 },
  { name: 'Grapes', price: 90 },
];

const getFruitsFromLocalStorage = () => {
  const fruits = localStorage.getItem('fruits');
  return fruits ? JSON.parse(fruits) : defaultFruits;
};

export default getFruitsFromLocalStorage;
