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
      <button onClick={reset} class="btn btn-primary">
        Limpiar
      </button>
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
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            name="name"
            onChange={handleChange}
            value={buyer.name}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Phone
          </label>
          <input
            value={buyer.phone}
            name="phone"
            onChange={handleChange}
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Email
          </label>
          <input
            value={buyer.email}
            name="email"
            onChange={handleChange}
            class="form-control"
          />
        </div>
        {
          <button type="button" class="btn btn-primary" onClick={sendOrder}>
            Comprar
          </button>
        }
      </form>
    </Container>
  );
};
