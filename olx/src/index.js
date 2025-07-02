import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContext,AuthProvider } from './store/Context';
import { app, analytics, auth, db, storage } from './firebase/config';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <FirebaseContext.Provider value={{ app, analytics, auth, db, storage }}>
          <AuthProvider>
            <App/>
          </AuthProvider>
        </FirebaseContext.Provider>
  </BrowserRouter>);
