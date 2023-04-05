import React, { useState } from 'react';

// Импортируем необходимые компоненты и типы

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type Order = {
  item: MenuItem;
  quantity: number;
};

type Props = {
  menu: MenuItem[];
};

const BurgerStore: React.FC<Props> = ({ menu }) => {
  const [cart, setCart] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (item: MenuItem, quantity: number) => {
    // Проверяем, есть ли уже такой товар в корзине
    const existingOrder = cart.find((order) => order.item.id === item.id);

    if (existingOrder) {
      // Если товар уже есть в корзине, обновляем количество
      const updatedCart = cart.map((order) => {
        if (order.item.id === item.id) {
          return { ...order, quantity: order.quantity + quantity };
        } else {
          return order;
        }
      });
      setCart(updatedCart);
    } else {
      // Если товара нет в корзине, добавляем новый заказ
      const newOrder = { item, quantity };
      setCart([...cart, newOrder]);
    }
  };

  const removeFromCart = (itemId: number) => {
    // Удаляем товар из корзины
    const updatedCart = cart.filter((order) => order.item.id !== itemId);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    // Вычисляем и обновляем общую стоимость заказа
    const total = cart.reduce(
      (acc, order) => acc + order.item.price * order.quantity,
      0
    );
    setTotal(total);
  };

  return (
    <div>
      <h1>Burger Store</h1>
      <div className="menu">
        {menu.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
            <button onClick={() => addToCart(item, 1)}>Add to cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((order) => (
              <li key={order.item.id}>
                {order.item.name} x {order.quantity} - ${order.item.price * order.quantity}{' '}
                <button onClick={() => removeFromCart(order.item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        <p>Total: ${total}</p>
        <button onClick={() => calculateTotal()}>Calculate Total</button>
      </div>
    </div>
  );
};

export default BurgerStore;