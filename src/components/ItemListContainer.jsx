import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getFirestore,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const db = getFirestore();
    const refcollection = !id
      ? collection(db, "items")
      : query(collection(db, "items"), where("category", "==", id));

    getDocs(refcollection)
      .then((snapshot) => {
        setItems(
          snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return "wait";
  return (
    <Container className="mt-4 container-fluid">
      {items.map((i) => (
        <Card key={i.id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src={i.pictureurl} height={190} />
          <Card.Body>
            <Card.Title>{i.title}</Card.Title>
            <Card.Text>{i.description}</Card.Text>
            <Card.Text>{i.category}</Card.Text>
            <Card.Text>cc: {i.cc}</Card.Text>
            <Link to={`/item/${i.id}`}>
              <Button variant="primary">Ver</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

{
  /* <div className='card card-product container mt-5'>
      <img src={pictureUrl} className='card-img-top mt-2' alt={title} />
      <div className='card-body'>
        <h5 className='card-title text-center'>{title}</h5>
        <p className='card-text text-center fw-bold'>Precio: €{price}</p>
        <p className='card-text text-center'>Stock disponible: {stock}</p>
      </div>
      <BtnDetalle path={`/item/${id}`} />
    </div> */
}
