import React, { useEffect, useContext, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    if (!postDetails) return;

    const fetchUserDetails = async () => {
      try {
        const userQuery = query(collection(db, 'users'), where('id', '==', postDetails.userId));
        const querySnapshot = await getDocs(userQuery);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [db, postDetails]);

  if (!postDetails) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imageUrl} alt={postDetails.name || 'Product'} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name || 'Product Name'}</span>
          <p>{postDetails.category || 'Category'}</p>
          <span>
            {postDetails.createdAt}
          </span>
        </div>

        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
