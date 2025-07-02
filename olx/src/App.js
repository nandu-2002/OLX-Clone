import React, { useContext, useEffect } from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Signup from './Pages/Signup'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Login from './Pages/Login';
import { AuthContext, FirebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import Create from './Pages/Create';
import View from './Pages/ViewPost'
import { Post } from './store/PostContext';


function App() {
  const {setUser}=useContext(AuthContext)
  const {auth,db}=useContext(FirebaseContext)

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
    
  })
  return (
    <div>
      <Post>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<View/>}/>
      </Routes>
     </Post>
    </div>
  );
}

export default App;
