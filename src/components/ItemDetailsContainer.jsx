import Container from "react-bootstrap/Container";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ItemCount } from "./ItemCount";
import { ItemsContext } from "../contexts/ItemContext";

export const ItemDetailsContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addItem } = useContext(ItemsContext);

  useEffect(() => {
    const db = getFirestore();
    const refDoc = doc(db, "items", id);

    getDoc(refDoc)
      .then((snapshot) => {
        setItem({ ...snapshot.data(), id: snapshot.id });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onAdd = (quantity) => addItem({ ...item, quantity });

  if (loading) return "wait";

  return (
    <Container className="mt-4">
      <h1>{item.title}</h1>
      <h2>{item.category}</h2>
      <h3>{item.description}</h3>
      <img src={item.pictureurl} height={350} />
      <b>${item.price}</b>
      <p>Stock: {item.stock}</p>
      <ItemCount stock={item.stock} onAdd={onAdd} />
    </Container>
  );
};
