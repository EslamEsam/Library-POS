import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';


const UserStore = create (
    persist(
        (set) => ({
            user : null,
            setUser : (user:object) => set({user}),
            logout : () => set({user : null})
        }),
        {
            name : 'users',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default UserStore