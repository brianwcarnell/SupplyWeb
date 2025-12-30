import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Set flag so HTML error handler knows we've initialized
(window as any).appLoaded = true;

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("[FATAL] Root element not found.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("[FATAL] React mount failed:", error);
  }
}