import { createContext, useContext } from "react";
import ActivityStore from "./activityStore";

// High level interface, where we're going to store all our actual stores
interface Store {
    activityStore: ActivityStore
}

// Add all new instances of Store into this constant
export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

// Allows us to use our stores in our app
export function useStore() {
    return useContext(StoreContext);
}