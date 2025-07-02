import React, { useContext, useEffect, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const items=["Cars","Properties","Mobiles","Bikes","Jobs"]

function Header() {

  const {user}=useContext(AuthContext)
  const {auth}=useContext(FirebaseContext)
  const navigate=useNavigate()

  const [currentIndex,setCurrentIndex]=useState(0)

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  }, 2000);
  return () => clearInterval(interval);
}, []);

  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
  <div className="input" style={{ position: 'relative' }}>
    <input type="text" />

    <div className="scrollingPlaceholder">
      Search  
      <div className="tickerContainer">
        <div className="tickerContent">
          {[...items, ...items].map((item, index) => (
            <div className="scrollItem" key={index}>
              {`"${item}"`}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  </div>

  <div className="searchAction">
    <Search color="#ffffff" />
  </div>
</div>





        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user?`Welcome ${user.displayName}`:'Login'}</span>
          <hr />
        </div>
        {user && <span onClick={()=>{
          signOut(auth).then(()=>{
            navigate('/login')
          })
        }}>Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
