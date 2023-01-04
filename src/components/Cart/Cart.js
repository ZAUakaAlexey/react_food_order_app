import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSendingData, setIsSendingData] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
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

    const submittedDataCloseModalHandler = () => {
        props.onHideCart();
        setIsSubmitted(false);
    }

    const sendDataToServer = (userData) => {
        // console.log(userData);
        setIsSendingData(true);
        fetch('https://react-food-app-db-84d0b-default-rtdb.europe-west1.firebasedatabase.app/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        }).then(() => {
            setIsSendingData(false);
            setIsSubmitted(true);
            cartCtx.clearCart();
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

    const cartModalContent = <>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {/*{isCheckout && <Checkout onCancel={cancelHandler}/>}*/}
        {isCheckout && <Checkout onConfirm={sendDataToServer} onCancel={props.onHideCart}/>}
        {!isCheckout && modalButtons}
    </>;

    const isSendingDataModalContent = <p>Sending data to server...</p>;

    const didSendingDataModalContent = <div className={styles.actions}>
        <p>Successfully sent data to server...</p>
        <button className={styles.button} onClick={submittedDataCloseModalHandler}>Close</button>
    </div>;

    return <Modal onHideCart={props.onHideCart}>
        {!isSendingData && !isSubmitted && cartModalContent}
        {isSendingData && isSendingDataModalContent}
        {!isSendingData && isSubmitted && didSendingDataModalContent}
    </Modal>
}

export default Cart;
