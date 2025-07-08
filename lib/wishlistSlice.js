import { createSlice }  from"@reduxjs/toolkit"

// create wishlist slice to manage wishlist state and actions
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
    },
    reducers: {
        // add item to wishlist if its not already there
        addToWishlist: (state, action) => {
            const item = action.payload;
            if(!state.items.some((existingItem) => existingItem.id === item.id)){
                state.items.push(item);
            }
        },

        // remove item from wishlist by id
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

// export actions and reducer for use in redux store
export const {addToWishlist, removeFromWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;