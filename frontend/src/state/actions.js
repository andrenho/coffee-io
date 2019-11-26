import axios from 'axios';
import currentArch from './arch';

const Action = {
    ADD_ITEM            : 1,
    REMOVE_ITEM         : 2,
    RECIPES_UPDATED     : 3,
    INGREDIENTS_UPDATED : 4,
    CART_SUBMITTED      : 5,
}

export function addItem(item) {
    return { type: Action.ADD_ITEM, item };
}

export function removeItem(i) {
    return { type: Action.REMOVE_ITEM, i };
}

export function updateRecipes() {
    function recipesUpdated(data) {
        return { type: Action.RECIPES_UPDATED, data };
    }

    return (dispatch) => {
        return axios.get(currentArch().api + '/recipes/global/')
            .then(res => {
                res.data.expiration = Date.now() + 1;
                window.localStorage.setItem('recipes', JSON.stringify(res.data));
                dispatch(recipesUpdated(res.data));
            })
            .catch(error => { throw(error); });
    }
}

export function updateIngredients() {
    function ingredientsUpdated(data) {
        return { type: Action.INGREDIENTS_UPDATED, data };
    }

    return (dispatch) => {
        return axios.get(currentArch().api + '/ingredients/')
            .then(res => {
                res.data.expiration = Date.now() + 1;
                window.localStorage.setItem('ingredients', JSON.stringify(res.data));
                dispatch(ingredientsUpdated(res.data));
            })
            .catch(error => { throw(error); });
    }
}

export function submitCart(cart, address) {
    function cartSubmitted() {
        return { type: Action.CART_SUBMITTED };
    }

    return (dispatch) => {
        cart.deliveryAddress = address;
        return axios.post(currentArch().api + "/cart", cart)
            .then(res => {
                dispatch(cartSubmitted());
            })
            .catch(error => { throw(error); });
    }
}

export default Action;

// vim:st=4:sts=4:sw=4:expandtab
