import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';



const CartStore = create (
    persist(
        (set) => ({
            cart : null,
            setCart : (cart:object) => set({cart}),
            logout : () => set({cart : null})
        }),
        {
            name : 'cart',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default CartStore