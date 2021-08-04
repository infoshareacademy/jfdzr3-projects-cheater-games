import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import ShoppingCartRoundedIcon from "@material-ui/icons/ShoppingCartRounded";
import { GiSwapBag } from "react-icons/gi";
import { useCart } from "./CartContext";
import { useUser } from "../../hooks/useUser";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export const Item = ({ name, value, icon, onBuyClick, onSellClick }) => {
  const [open, setOpen] = useState(false);
  const { getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const user = useUser();
  const userGold = user?.resources.gold;

  const handleClick = () => {
    if (userGold < totalPrice + value) {
      setOpen(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <h5>{name}</h5>
      <img src={icon} style={{ height: "70px" }} alt="" />
      {onSellClick && (
        <button onClick={() => onSellClick()}>
          <Chip
            label={value}
            icon={<GiSwapBag style={{ color: "#0e79b2" }} />}
            variant="outlined"
            size="small"
            style={{
              fontWeight: "500",
              color: "#0e79b2",
              border: "transparent",
            }}
            onClick={handleClick}
          />
        </button>
      )}
      {onBuyClick && (
        <>
          <button onClick={onBuyClick} disabled={userGold < totalPrice + value}>
            <Chip
              label={value}
              icon={<ShoppingCartRoundedIcon style={{ color: "green" }} />}
              variant="outlined"
              size="small"
              style={{
                fontWeight: "500",
                color: "green",
                border: "transparent",
              }}
              onClick={handleClick}
            />
          </button>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Nie masz wystarczającej ilości złota"
            action={
              <>
                <Button color="secondary" size="small" onClick={handleClose}>
                  UNDO
                </Button>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
          />
        </>
      )}
    </>
  );
};
