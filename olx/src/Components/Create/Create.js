import React, { Fragment, use, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const {auth,db}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null)
  const navigate=useNavigate()
  const date=new Date()

  const handleSubmit = async () => {
  if (!image) return alert("Please select an image");

  try {
    // 1. Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "olximg");

    const response = await fetch("https://api.cloudinary.com/v1_1/de79kow6d/image/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("📸 Cloudinary response:", data);

    if (!data.secure_url) {
      throw new Error(data.error?.message || "Image upload failed");
    }

    const imageUrl = data.secure_url;

    // 2. Store product data in Firestore
    await addDoc(collection(db, "products"), {
      name,
      category,
      price,
      imageUrl,
      userId: user.uid,
      createdAt: date.toDateString(),
    });

    navigate('/')

    alert("✅ Product uploaded successfully!");
  } catch (error) {
    console.error("❌ Upload or Firestore error:", error);
    alert("Error: " + error.message);
  }
};



  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="category"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} id="price" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
