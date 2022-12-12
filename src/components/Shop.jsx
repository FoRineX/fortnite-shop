import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from './config';

import { Preloader } from './Preloader';
import { GoodsList } from './ItemsList';
import { Cart } from './Cart';

import { BasketList } from './BasketList';

import { Alert } from './Alert';
import { Scroll } from './Scroll';


export function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [basketShow, setBasketShow] = useState(false);
  const [alertName, setAlertName] = useState('');
  const [scrollShow, setScrollShow] = useState(0);
  
// BUY FUNC //
const addToBasket = (orderItem) => {
    const itemIndex =  order.findIndex((orderEl) => orderEl.mainId === orderItem.mainId);
    
    if (itemIndex < 0) {
      const newItem = {
      ...orderItem,
      quantity: 1, 
    };
       setOrder([...order, newItem])
    } else {
      const newOrder = order.map((orderEl, index) => {
        if (index === itemIndex) {
          return {
            ...orderEl,
            quantity: orderEl.quantity + 1
          }
        } else {return orderEl;}})
        setOrder(newOrder); 
    }
    setAlertName(orderItem.displayName)
  }

  const closeAlert = () => {
    setAlertName('');
  }

// OPEN/CLOSE and DELETE Basket //
  const handleBasketShow = () => {
    setBasketShow(!basketShow);
  }

  const handleBasketDelete = (ItemId) => { 
    const newOrder = order.filter(el => el.mainId !== ItemId)
    setOrder(newOrder)
  }

  const handleIncreaseQuantity = (ItemId) => {
    const newOrder = order.map (el => {
      if (el.mainId === ItemId) {
        const newQuantity = el.quantity + 1;
        return {
          ...el,
          quantity : newQuantity
        } 
      } else {return el}})
      setOrder(newOrder);
  }

  const handleDecreaseQuantity = (ItemId) => {
    const newOrder = order.map ((el) => {
      if (el.mainId === ItemId) {
        const newQuantity = el.quantity - 1;
        return {
          ...el,
          quantity : newQuantity >= 0 ? newQuantity : 0
        }
      } else {return el}})
      setOrder(newOrder);
        
      newOrder.map ((el) => {
        if (el.mainId === ItemId && el.quantity === 0) {
          handleBasketDelete(ItemId)
        }})
  }

    const handlePay = () => {
      setBasketShow(!basketShow);
      setOrder([]);
      alert('Сервис в разработке!');
    }

    // SCROLL //
    const handleScroll = () => { 
      window.scrollTo({top: 0, behavior: "smooth" });
      setScrollShow(0);
    };
    
    const handleScrollShow = () => setScrollShow(window.scrollY)
      
    useEffect(() => {window.addEventListener('scroll', handleScrollShow);
      return () => window.removeEventListener('scroll', handleScrollShow);
}, []);


// GETTIN DATA //
  useEffect(function getItems() {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.shop && setGoods(data.shop);
        setLoading(false);
      });
  }, []);

//   JSX RENDER //
  return (
    <main className='container content'>
        <Cart quantity={order.length } addToBasket={addToBasket} handleBasketShow = {handleBasketShow} />
      {loading ? <Preloader /> : <GoodsList goods={goods} addToBasket = {addToBasket } />}
      {basketShow && <BasketList order = {order} handleBasketShow = {handleBasketShow }  handleBasketDelete = {handleBasketDelete} handleIncreaseQuantity = {handleIncreaseQuantity} handleDecreaseQuantity = {handleDecreaseQuantity} handlePay = {handlePay}/>}
      {alertName && <Alert displayName = {alertName} closeAlert = {closeAlert}/> }
      {scrollShow && <Scroll handleScroll = {handleScroll}/>}
    </main>
  );
}