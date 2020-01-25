const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SELECTED_CART_ID':
            return {
                ...state,
                selectedCartId: action.payload
            };
        case 'SET_CARTS':
            return {
                ...state,
                carts: action.payload
            };
        case 'SET_CART_ITEMS':
            return {
                ...state,
                items: action.payload
            };
        case 'SET_INVENTORY':
            return {
                ...state,
                inventory: action.payload
            };
        case 'SET_TOTAL_PRICE':
            return {
                ...state,
                totalPrice: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;
