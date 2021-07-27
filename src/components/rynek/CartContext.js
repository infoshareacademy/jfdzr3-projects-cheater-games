import { createContext, useCallback, useContext, useState, useMemo } from "react";

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

  const addToCart = useCallback((item) => {
    setCart((cart) => {
      return [...cart, item];
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

  const resetCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = useMemo(() => {
    const getCartItems = () => cart;
    const getCartItemsGroupedByKey = () => {
      return cart.reduce((result, item) => {
        if (result[item.key] === undefined) {
          result[item.key] = [];
        }
        
        result[item.key].push(item);

        return result;
      }, {});
    }
    const getTotalPrice = () => cart.map(item => item.val.value).reduce((a, b) => a + b, 0);

    return {
      getCartItems,
      getCartItemsGroupedByKey,
      getTotalPrice,
      addToCart,
      subtractFromCart,
      resetCart,
    };
  }, [cart]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCart = () => {
  return useContext(Context);
};
