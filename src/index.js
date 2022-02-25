import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwZ_w3sN5sJ4FBWaT69p-zkG6aQ-d9V4g",
  authDomain: "my-react-chat-app-2d9ca.firebaseapp.com",
  databaseURL: "https://my-react-chat-app-2d9ca-default-rtdb.firebaseio.com",
  projectId: "my-react-chat-app-2d9ca",
  storageBucket: "my-react-chat-app-2d9ca.appspot.com",
  messagingSenderId: "227996134406",
  appId: "1:227996134406:web:39e72ccfd80874be3c2787",
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
