import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routes';
import { ProvideAuth } from './routes/useAuth';

export function App() {
  return (
    <div className="term-app">
      <ProvideAuth>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </ProvideAuth>
    </div>
  );
}
