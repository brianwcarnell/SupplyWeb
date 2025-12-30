import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// Flag to tell the HTML error handler that React has started loading
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
    console.error("[FATAL] React Render Failed:", error);
    throw error;
  }
}