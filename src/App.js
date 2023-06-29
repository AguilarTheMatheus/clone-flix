import React from 'react';
import StreamingService from './StreamingService';
import Catalog from './Catalog';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <h1>Meu Serviço de Streaming</h1>
      <StreamingService />
      <Catalog />
    </div>
  );
};

export default App;
