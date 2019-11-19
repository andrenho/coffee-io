import Action from "./actions";

const initialState = {
    cart: {
        items: [],
        deliveryCost: 0.0,
        taxCost: 0.0,
        total: 0.0,
    },
    recipes: [],
    ingredients: [],
};

function updateCartTotal(cart) {
    cart.total = 0;
    for (const item of cart.items)
        cart.total += item.totalCost;
}

export function rootReducer(state = initialState, action) {
    if (action.type === Action.ADD_ITEM) {
        const cart = Object.assign({}, state.cart, {
            items: state.cart.items.concat(action.item),
        });
        updateCartTotal(cart);
        state = Object.assign({}, state, { cart });
    } else if (action.type === Action.REMOVE_ITEM) {
        const cart = Object.assign({}, state.cart);
        state.cart.items.splice(action.i, 1);
        updateCartTotal(cart);
        state = Object.assign({}, state, { cart });
    } else if (action.type === Action.RECIPES_UPDATED) {
        return Object.assign({}, state, { recipes: action.data });
    } else if (action.type === Action.INGREDIENTS_UPDATED) {
        return Object.assign({}, state, { ingredients: action.data });
    } else if (action.type === Action.CART_SUBMITTED) {
        state = Object.assign({}, state, { cart: initialState.cart });
    }
    return state;
}

// vim:st=4:sts=4:sw=4:expandtab
