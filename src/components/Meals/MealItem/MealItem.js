import styles from './MealItem.module.css';
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import CartContext from "../../../store/cart-context";

const MealItem = ({id, name, description, price}) => {

    const cartCtx = useContext(CartContext)

    const addItemToCartHandler = amount => {
        console.log(amount)
        cartCtx.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price
        })
    }

    const formattedPrice = `$${price.toFixed(2)}`;


    return <li className={styles.meal}>
        <div>
            <h3>{name}</h3>
            <div className={styles.description}>
                {description}
            </div>
            <div className={styles.price}>
                {formattedPrice}
            </div>
        </div>
        <div>
            <MealItemForm id={id} onAddItemToCart={addItemToCartHandler}/>
        </div>
    </li>
}

export default MealItem;
