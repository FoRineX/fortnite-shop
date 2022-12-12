export function BasketItem (props) {
    const {mainId, displayName, price, quantity, handleBasketDelete = Function.prototype, handleIncreaseQuantity = Function.prototype, handleDecreaseQuantity = Function.prototype } = props;

    return  (<li className="collection-item">
        {displayName} <i className="material-icons quantityBtn" onClick={() => handleDecreaseQuantity(mainId)}>keyboard_arrow_down </i> x 
        {quantity} <i className="material-icons quantityBtn" onClick={() => handleIncreaseQuantity(mainId)}>keyboard_arrow_up</i> = {price.regularPrice * quantity} UAH
        <span  className="secondary-content" onClick={() => handleBasketDelete(mainId) }><i className="material-icons basket-delete" >delete_forever</i></span>
        </li>
    )
} 