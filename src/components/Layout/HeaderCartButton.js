import CartIcon from "./CartIcon";
import styles from './HeaderCartButton.module.css'
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {

    const [bumpButton, setBumpButton] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    const numberOfCartItems = items.reduce((acc, item) => {
        return acc + item.amount
    }, 0);

    const btnStyle = `${styles.button} ${bumpButton ? styles.bump: ''}`;

    useEffect(()=> {

        if (items.length === 0) {
            return
        }
        setBumpButton(true);

        const timer = setTimeout(() => setBumpButton(false), 300)

        return () => {
            clearTimeout(timer)
        };

    }, [items])

    return (
        <button className={btnStyle} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;
