import React from "react";
import { toggleCart } from "../slices/CartUISlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";

const CartButton = () => {
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector((state) => state.cart.totPrice);

  const handleClick = () => {
    dispatch(toggleCart());
  };
  return (
    <Badge badgeContent={`$${
      totalPrice ? totalPrice.toFixed(2) : "0"
    }`} color="info">
      <ShoppingCartIcon onClick={handleClick} sx={{ fontSize: "2rem" }} />
    </Badge>
  )
  
  
};

export default CartButton;
