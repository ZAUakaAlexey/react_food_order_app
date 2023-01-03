import Card from "../UI/Card";
// import {DUMMY_MEALS} from "../../assets/dummyMeals";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);

    useEffect(() => {

        const fetchMeals = async () => {
            const response = await fetch('https://react-food-app-db-84d0b-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
            const responseData = await response.json();
            // console.log(responseData);
            const loadedMeals = [];

            for (let key in responseData) {
                loadedMeals.push({
                    id:key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            // console.log(loadedMeals)
            setMeals(loadedMeals);
        }
        fetchMeals();
    }, [])

    const mealsList = meals.map(meal => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealsList}
                {mealsList.length === 0 && <p>No meals</p>}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;
