import { useContext, useState } from "react";
import { ItemsContext } from "../contexts/ItemContext";
import Container from "react-bootstrap/Container";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const initialValues = {
  phone: "",
  email: "",
  name: "",
};

export const Cart = () => {
  const [buyer, setBuyer] = useState(initialValues);
  const { items, reset, removeItem } = useContext(ItemsContext);
  const handleChange = (ev) => {
    setBuyer((prev) => {
      return {
        ...prev,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const total = items.reduce((acc, act) => acc + act.price * act.quantity, 0);

  const sendOrder = () => {
    const order = {
      buyer,
      items,
      total,
    };

    const db = getFirestore();
    const orderCollection = collection(db, "orders");

    addDoc(orderCollection, order)
      .then(({ id }) => {
        if (id) {
          alert("Su orden:" + id + "ha sido completada");
        }
      })
      .finally(() => {
        reset();
        setBuyer(initialValues);
      });
  };

  return (
    <Container>
      <button onClick={reset}>Limpiar</button>
      {items.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <img src={item.pictureurl} height={200} />
            <p>{item.quantity}</p>
            <p onClick={() => removeItem(item.id)}>Eliminar</p>
          </div>
        );
      })}
      <br />
      <div>Total ${total}</div>
      <br />
      <form>
        <div>
          <label>Nombre</label>
          <input value={buyer.name} name="name" onChange={handleChange} />
        </div>
        <div>
          <label>Telefono</label>
          <input value={buyer.phone} name="phone" onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input value={buyer.email} name="email" onChange={handleChange} />
        </div>
        {
          <button type="button" onClick={sendOrder}>
            Comprar
          </button>
        }
      </form>
    </Container>
  );
};
