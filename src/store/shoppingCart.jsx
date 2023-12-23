import { atom, selector } from "recoil";

export const shoppingCartState = atom({
  key: "shoppingCart",
  default: [],
});

export const likeItemState = atom({
  key: "likeItemState",
  default: [],
});

export const shoppingCartTotalState = selector({
  key: "shoppingCartTotal",
  get: ({ get }) => {
    const shoppingCart = get(shoppingCartState);
    return shoppingCart.length;
  },
});

export const likeItemTotalState = selector({
  key: "likeItemTotal",
  get: ({ get }) => {
    const likeItems = get(likeItemState);
    return likeItems.length;
  },
});
