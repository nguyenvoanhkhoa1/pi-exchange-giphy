import { TABLE } from "../configs";
import { createStore } from "./store";
export const SearchStore = createStore({
  filter: {
    api_key: process.env.REACT_APP_API_KEY,
    q: "",
    limit: TABLE.defaultLimit,
    offset: "",
    rating: "",
    lang: "",
    random_id: "",
    bundle: "",
  },
});

export const useSearchStore = SearchStore.useStore;
