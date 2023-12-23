// App.js

import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import fetchData from './Main';
import './style.css'
const App = () => {
  const [apiData, setApiData] = useState(null);
  const [groupingOption, setGroupingOption] = useState('status'); // Initialize with default value
  const [orderingOption, setOrderingOption] = useState('priority'); // Initialize with default value

  useEffect(() => {
    const fetchApiData = async () => {
      const data = await fetchData();
      setApiData(data);
    };

    fetchApiData();
  }, []);

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleOrderingChange = (option) => {
    setOrderingOption(option);
  };

  return (
    <div>
      <Navbar
        onGroupingChange={handleGroupingChange}
        onOrderingChange={handleOrderingChange} // Pass the ordering change handler
      />
      {apiData && (
        <Header
          tickets={apiData.tickets}
          users={apiData.users}
          groupingOption={groupingOption}
          orderingOption={orderingOption} // Pass the ordering option
        />
      )}
      {/* Add other components/content here */}
    </div>
  );
};

export default App;
