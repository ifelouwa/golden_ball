import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './components/ui/provider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth.Context.jsx';
import { Toaster } from './components/ui/toaster.jsx';
import App from './App.jsx';

// Renders the app with all necessary providers
ReactDOM.createRoot(document.getElementById('root')).render(

  // Chakra UI provider for theming
  <Provider>
    {/* Authentication context provider */}
    <AuthProvider>
      {/* Router for navigation */}
      <BrowserRouter>
        {/* Main app component */}
        <App />
        {/* Toast notifications */}
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
