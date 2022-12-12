import { BasketItem } from "./BasketItem";

export function BasketList (props) {
    const {order = [], handleBasketShow = Function.prototype,  handleBasketDelete = Function.prototype, handleIncreaseQuantity = Function.prototype, handleDecreaseQuantity = Function.prototype, handlePay = Function.prototype } = props;

    const totalPrice =  order.reduce((total, el) => {
       return total + el.price.regularPrice * el.quantity
    }, 0)

    return (<div className="CardPay">
    <ul className="collection basket-list">
        <li className="collection-item active">Корзина</li>
         {order.length ? (
            order.map((item) => <BasketItem key = {item.mainId} handleBasketDelete = {handleBasketDelete} handleIncreaseQuantity = {handleIncreaseQuantity} handleDecreaseQuantity = {handleDecreaseQuantity} {...item} />
        )) : (<li className="collection-item">Нет товаров</li> 
    )}
    <li className="collection-item active ">Общая стоимость:
    <span className="totalPrice"><button id="payBtn" className="btn pink accent-3" onClick={() => handlePay()}>
        Оплатить {totalPrice} UAH</button> </span> 
    </li>
    <i id="scrollBtn" className="material-icons basket-close" onClick={handleBasketShow}>close</i>   
    </ul>
   
    </div>)
}