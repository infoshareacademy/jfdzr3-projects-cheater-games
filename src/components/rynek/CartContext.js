import { createContext, useCallback, useContext, useState } from "react";

const noop = () => {};

const Context = createContext({
  getCartItems: () => [],
  getCartItemsGroupedByKey: () => {},
  getTotalPrice: () => 0,
  addToCart: noop,
  removeFromCart: noop,
  clearCart: noop,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [sellCart, setSellCart] = useState([]);

  const addToCart = useCallback((item) => {
    setCart((cart) => {
      return [...cart, item];
    });
  }, []);

  const addToSellCart = useCallback((item) => {
    setSellCart((sellCart) => {
      const existingItem = sellCart.find((cartItem) => cartItem.id === item.id);
      if (!existingItem) {
        return [...sellCart, item];
      } else {
        return sellCart.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem}
            : cartItem
        );
      }
    });
  }, []);

  const subtractFromCart = useCallback((key) => {
    setCart((cart) => {
      const indexOfFirstItemWithGivenKey = cart.findIndex(
        (item) => item.key === key
      );
      return [
        ...cart.slice(0, indexOfFirstItemWithGivenKey),
        ...cart.slice(indexOfFirstItemWithGivenKey + 1),
      ];
    });
  }, []);

  const deleteFromSellPage = (id) => {
    const newSellItems = sellCart.filter(
      (cartItem) => cartItem.id !== id
    );
    return setSellCart(newSellItems);
  };

  const resetCart = useCallback(() => {
    setCart([]);
  }, []);

  const getCartItems = () => cart;
  const getCartItemsGroupedByKey = () => {
    return cart.reduce((result, item) => {
      if (result[item.key] === undefined) {
        result[item.key] = [];
      }
      result[item.key].push(item);
      return result;
    }, {});
  };
console.log(sellCart);

// }
  const getSellCartItems = () => sellCart;
  const getSellCartItemsGroupedByKey = () => {
    return sellCart.reduce((result, item) => {
      if (result[item.key] === undefined) {
        result[item.key] = [];
      } else if (!item.id) {
      }
      result[item.key].push(item);
      return result;
    }, {});
  };

  const getTotalPrice = () =>
    cart.map((item) => item.val.value).reduce((a, b) => a + b, 0);

    const getTotalSellPrice = () =>
    sellCart.map((item) => item.val.value).reduce((a, b) => a + b, 0);
    
  const value = {
    getCartItems,
    getCartItemsGroupedByKey,
    getSellCartItems,
    getSellCartItemsGroupedByKey,
    getTotalPrice,
    getTotalSellPrice,
    addToCart,
    addToSellCart,
    subtractFromCart,
    deleteFromSellPage,
    resetCart,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCart = () => {
  return useContext(Context);
};
