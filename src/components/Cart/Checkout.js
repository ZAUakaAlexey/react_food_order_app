
import styles from './Checkout.module.css'
import {useRef, useState} from "react";

const isEmpty = value => value.trim() === '';
const isPostalCode = value => value.trim().length ===5 && !isNaN(+value.trim());

const Checkout = (props) => {
    const [formFieldsValidity, setFormFieldsValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city:true
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();


    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalIsValid = isPostalCode(enteredPostal);
        const cityIsValid = !isEmpty(enteredCity);

        setFormFieldsValidity({
            name: nameIsValid,
            street: streetIsValid,
            postal: postalIsValid,
            city: cityIsValid
        })

        // console.log(enteredPostal, ' -> ',postalIsValid);

        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        });

        nameInputRef.current.value = '';
        streetInputRef.current.value = '';
        postalInputRef.current.value = '';
        cityInputRef.current.value = '';
    }

    return <form onSubmit={submitHandler}>
        <div className={`${styles.control} ${formFieldsValidity.name ? '':styles.invalid}`}>
            <label htmlFor="name">Your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {!formFieldsValidity.name && <p>Please, enter a valid name!</p>}
        </div>
        <div className={`${styles.control} ${formFieldsValidity.street ? '':styles.invalid}`}>
            <label htmlFor="street">Street</label>
            <input type='text' id='street' ref={streetInputRef}/>
            {!formFieldsValidity.street && <p>Please, enter a valid street!</p>}
        </div>
        <div className={`${styles.control} ${formFieldsValidity.postal ? '':styles.invalid}`}>
            <label htmlFor="postal">Postal Code</label>
            <input type='text' id='postal' ref={postalInputRef}/>
            {!formFieldsValidity.postal && <p>Please, enter a valid postal code!</p>}
        </div>
        <div className={`${styles.control} ${formFieldsValidity.city ? '':styles.invalid}`}>
            <label htmlFor="city">City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formFieldsValidity.city && <p>Please, enter a valid city!</p>}
        </div>
        <div className={styles.actions}>
            <button type='button' onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
        </div>
    </form>
};

export default Checkout;
