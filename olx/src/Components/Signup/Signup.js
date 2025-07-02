import React, { useState ,useContext} from 'react';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context'; 
import './Signup.css';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=useNavigate()
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')

const {db,auth}=useContext(FirebaseContext)

const handleSubmit=(e)=>{
  e.preventDefault()
  createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    const user=userCredential.user
    return updateProfile(user,{displayName:username}).then(()=>{
      addDoc(collection(db,'users'),{
        id:user.uid,
        username:username,
        phone:phone
      }).then(()=>{
        navigate('/login')
      })
    })
  })
}
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="phone"
            name="phone"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
            
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
