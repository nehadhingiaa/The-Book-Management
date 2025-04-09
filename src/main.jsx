import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store'; // Ensure persistor is exported from your store
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import "../i18n.jsx";

// Render the app
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <React.Suspense fallback="loading...">
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.Suspense>
  // </StrictMode>
);
