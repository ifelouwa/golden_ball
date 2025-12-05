import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './components/ui/provider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth.Context.jsx';
import { Toaster } from './components/ui/toaster.jsx';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
