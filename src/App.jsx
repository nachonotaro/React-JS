import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailsContainer } from "./components/ItemDetailsContainer";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./contexts/ItemContext";
import { useEffect } from "react";
import { Cart } from "./components/Cart";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

function App() {
  useEffect(() => {
    const db = getFirestore();
    const q = query(
      collection(db, "items"),
      where("category", "==", "Deportiva")
    );

    getDocs(q).then((snapshot) => {
      if (snapshot.size === 0) console.log("no results");
      else
        console.log(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
    });
  }, []);
  return (
    <Provider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailsContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={404} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
