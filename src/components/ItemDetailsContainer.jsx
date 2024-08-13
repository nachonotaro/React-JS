import Container from "react-bootstrap/Container";
import data from "../data/productos.json";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ItemDetailsContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    new Promise((resolve) => setTimeout(() => resolve(data), 2000))
      .then((response) => {
        const finded = response.find((i) => i.id === Number(id));
        setItem(finded);
      })
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return "wait";

  return (
    <Container className="mt-4">
      <h1>{item.title}</h1>
      <h2>{item.category}</h2>
      <h3>{item.description}</h3>
      <img src={item.pictureurl} height={350} />
      <b>${item.price}</b>
    </Container>
  );
};
