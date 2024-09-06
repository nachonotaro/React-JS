import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdqZT123UAhrN8BISFs9j6Y9ROIMEK6aw",
  authDomain: "reactjs-welsmotorbikes.firebaseapp.com",
  projectId: "reactjs-welsmotorbikes",
  storageBucket: "reactjs-welsmotorbikes.appspot.com",
  messagingSenderId: "622925887128",
  appId: "1:622925887128:web:816f7c8660348c9ed5c2ed",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
