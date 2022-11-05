import { createStore } from "./store";
export const TrendingStore = createStore({
  filter: {
    api_key: process.env.API_KEY,
    limit: "",
    offset: "",
    rating: "",
    random_id: "",
    bundle: "",
  },
});

export const useTrendingStore = TrendingStore.useStore;
