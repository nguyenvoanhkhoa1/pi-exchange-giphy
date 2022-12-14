export const TABLE = {
  defaultLimit:
    window.innerWidth > 1536
      ? 30
      : window.innerWidth > 1280
      ? 24
      : window.innerWidth > 1024
      ? 18
      : 12,
};

export const SEARCH = {
  autocomplete: {
    defaultLimit: 4,
    defaultTimeout: 1000,
  },
};

export const ACTION = {
  favorite: 1,
  share: 2,
  embed: 3,
};
