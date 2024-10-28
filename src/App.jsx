import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BillGenerator from './components/BillGenerator';
import FruitManager from './components/FruitManager';
import CustomerManager from './components/CustomerManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BillGenerator />} />
        <Route path="/manage-fruits" element={<FruitManager />} />
        <Route path="/manage-customers" element={<CustomerManager />} />
      </Routes>
    </Router>
  );
}

export default App;
