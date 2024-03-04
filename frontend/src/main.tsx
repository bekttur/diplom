import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import "./react-select.scss"
import '@radix-ui/themes/styles.css';

import './i18n.js';
import { AuthContextProvider } from './context/AuthContext.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback='loading...'>
        <AuthContextProvider>
          <Theme>
            <App />
          </Theme>
        </AuthContextProvider>
      </React.Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
