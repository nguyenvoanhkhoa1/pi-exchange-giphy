import { TABLE } from "../configs";
import { createStore } from "./store";
export const TrendingStore = createStore({
  filter: {
    api_key: process.env.REACT_APP_API_KEY,
    limit: TABLE.defaultLimit,
    offset: "",
    rating: "",
    random_id: "",
    bundle: "",
  },
});

export const useTrendingStore = TrendingStore.useStore;
