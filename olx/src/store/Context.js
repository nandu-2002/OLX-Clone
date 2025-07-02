// store/firebaseContext.js
import { createContext, useState } from 'react';
//import { app, analytics, auth, db, storage } from '../firebase/config';

export const FirebaseContext = createContext(null);

/*export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, analytics, auth, db, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};*/

export const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
  const [user,setUser]=useState(null)

  return(
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}
