import { buildQueryString } from "../../helpers";
import { createInstance, handleError } from "../base";

const services = createInstance("/");
const baseUrl = "/gifs";

export const getTrendingGif = async (filter) => {
  try {
    let query = `${baseUrl}/trending`;
    if (filter) {
      query += buildQueryString(filter);
    }
    const res = await services.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getSearchResultGif = async (filter) => {
  try {
    let query = `${baseUrl}/search`;
    if (filter) {
      query += buildQueryString(filter);
    }
    const res = await services.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getGifById = async (id, filter) => {
  try {
    let query = `${baseUrl}/${id}`;
    if (filter) {
      query += buildQueryString(filter);
    }
    const res = await services.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const getSearchAutocomplete = async (filter) => {
  try {
    let query = `${baseUrl}/search/tags`;
    if (filter) {
      query += buildQueryString(filter);
    }
    const res = await services.get(query);
    return res;
  } catch (error) {
    return handleError(error);
  }
};
