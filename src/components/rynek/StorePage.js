import { CartProvider } from "./CartContext";
import { Store } from "./Store";

export const StorePage = () => {
  return (
    <CartProvider>
      <Store />
    </CartProvider>
  );
};
