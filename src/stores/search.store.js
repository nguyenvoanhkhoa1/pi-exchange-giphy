import { createStore } from "./store";
export const SearchStore = createStore({
  filter: {
    api_key: "",
    q: "",
    limit: "",
    offset: "",
    rating: "",
    lang: "",
    random_id: "",
    bundle: "",
  },
});

export const useSearchStore = SearchStore.useStore;
