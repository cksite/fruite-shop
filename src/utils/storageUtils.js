// Functions to handle customers in local storage

export const loadCustomersFromLocalStorage = () => {
    const data = localStorage.getItem('customers');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveCustomersToLocalStorage = (customers) => {
    localStorage.setItem('customers', JSON.stringify(customers));
  };
  
  // Functions to handle fruits in local storage
  export const loadFruitsFromLocalStorage = () => {
    const data = localStorage.getItem('fruits');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveFruitsToLocalStorage = (fruits) => {
    localStorage.setItem('fruits', JSON.stringify(fruits));
  };
  