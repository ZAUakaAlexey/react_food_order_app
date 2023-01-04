import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasOrderedItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1})
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const cancelHandler = () => {
        setIsCheckout(false);
    }

    const sendDataToServer = (userData) => {
        console.log(userData);
        fetch('https://react-food-app-db-84d0b-default-rtdb.europe-west1.firebasedatabase.app/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        }).then(() => {
            cartCtx.clearCart();
            props.onHideCart();
        }).catch((error) => {
            console.log(error)
        })
    }

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />
            )}
        </ul>
    );

    const modalButtons = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasOrderedItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>;

    return <Modal onHideCart={props.onHideCart}>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {/*{isCheckout && <Checkout onCancel={cancelHandler}/>}*/}
        {isCheckout && <Checkout onConfirm={sendDataToServer} onCancel={props.onHideCart}/>}
        {!isCheckout && modalButtons}
    </Modal>
}

export default Cart;
