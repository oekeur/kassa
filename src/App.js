import React, { Component } from 'react';
import './App.css';

import {
  UserInfo, Total,
  Receipt, Calculator,
  Payment
} from './components';

import InventoryData from './inventory.json';
import Inventory from './components/inventory';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-side">
          <UserInfo />
          <Total />
          <Receipt />
          <Calculator />
          <Payment />
        </div>
        <div className="App-inventory">
          <Inventory data={InventoryData} />
        </div>
      </div>
    );
  }
}

export default App;
