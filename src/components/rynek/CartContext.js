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
  const [sellCart, setSellCard] = useState([]);

  const addToCart = useCallback((item) => {
    setCart((cart) => {
      return [...cart, item];
    });
  }, []);

  // const addToSellCart = useCallback((item) => {
  //   setSellCard((sellCart) => {
  //     const existingItem = sellCart.filter((sellItem) => sellItem.id === item.id);
  //     if(!existingItem) {
  //       return [...sellCart, item]
  //       }else {
  //           return sellCart.filter((sellItem) => sellItem !== existingItem)
  //         }
  //       })
  //       return [...sellCart, item]
  //   }, [])

  const addToSellCart = useCallback((item) => {
    setSellCard((sellCart) => {
      return [...sellCart, item]
    })
  }, [])

const getUniqueSellItems = [...new Set(sellCart)]

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

  const value = {
    getCartItems,
    getUniqueSellItems,
    getCartItemsGroupedByKey,
    getSellCartItemsGroupedByKey,
    getTotalPrice,
    addToCart,
    addToSellCart,
    subtractFromCart,
    resetCart,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCart = () => {
  return useContext(Context);
};
