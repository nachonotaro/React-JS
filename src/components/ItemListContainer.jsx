import Container from "react-bootstrap/Container";
import data from "../data/productos.json";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    new Promise((resolve, reject) => setTimeout(resolve(data), 2000))
      .then((response) => {
        if (!id) {
          setItems(response);
        } else {
          const filtered = response.filter((i) => i.category === id);
          setItems(filtered);
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return "wait";
  return (
    <Container className="mt-4 d-flex">
      {items.map((i) => (
        <Card key={i.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={i.pictureurl} />
          <Card.Body>
            <Card.Title>{i.title}</Card.Title>
            <Card.Text>{i.description}</Card.Text>
            <Card.Text>{i.category}</Card.Text>
            <Card.Text>{i.cc}</Card.Text>
            <Link to={`/item/${i.id}`}>
              <Button variant="primary">Ver</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
