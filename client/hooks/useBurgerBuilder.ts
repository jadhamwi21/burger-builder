import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addTopping,
	removeTopping,
	resetBurgerState,
	toggleCoke,
	toggleFries,
} from "../slices/burger";
import { appendNewBurger, setStep } from "../slices/order";
import { RootState } from "../store/store";
import { OrderStep, Topping } from "../types/types";

export const useBurgerBuilder = () => {
	const { BurgerQuantity, Toppings, CurrentBurger } = useSelector(
		(state: RootState) => ({
			BurgerQuantity: state.orderReducer.BurgersQuantity,
			Toppings: state.burgerReducer.BurgerToppings,
			CurrentBurger: state.burgerReducer,
		})
	);
	const [burgerNumber, setBurgerNumber] = useState(0);
	console.log(BurgerQuantity, "Quantity");
	const dispatch = useDispatch();

	const ToppingClickHandler = (topping: Topping) => {
		const AddedPreviously = Toppings.indexOf(topping) !== -1;
		if (AddedPreviously) {
			dispatch(removeTopping(topping));
		} else {
			dispatch(addTopping(topping));
		}
	};

	useEffect(() => {
		if (burgerNumber === BurgerQuantity) {
			console.log("executed");
			dispatch(setStep(OrderStep.OrderForm));
		}
	}, [burgerNumber]);

	const FriesClickHandler = () => {
		dispatch(toggleFries());
	};
	const CokeClickHandler = () => {
		dispatch(toggleCoke());
	};

	const ResetToppings = () => {
		dispatch(resetBurgerState());
	};

	const NextBurgerHandler = () => {
		setBurgerNumber((currentBurgerNumber) => currentBurgerNumber + 1);
		dispatch(appendNewBurger(CurrentBurger));
		dispatch(resetBurgerState());
	};

	return {
		ToppingClickHandler,
		FriesClickHandler,
		CokeClickHandler,
		NextBurgerHandler,
		ResetToppings,
		burgerNumber,

		Toppings,
	};
};
