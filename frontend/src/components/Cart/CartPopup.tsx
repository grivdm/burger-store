import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { toggleCart } from "../../slices/CartUISlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CartItemComponent from "./CartItemComponent";
import { clearCart, checkout } from "../../slices/CartSlice";
import CloseIcon from "@mui/icons-material/Close";
import {CartItem} from '../../interfaces/CartItem';


const CartPopup = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const isOpen = useAppSelector((state) => state.cartUI.isOpen);
  const totalPrice = useAppSelector((state) => state.cart.totPrice);
  const handleClose = () => dispatch(toggleCart());
  const onClear = () => dispatch(clearCart());
  const onCheckout = () => dispatch(checkout());

  useEffect(() => {}, [items]);

  return (
    <Dialog
      maxWidth="sm"
      sx={{
        ".MuiDialog-paperWidthSm": {
          width: "70%",
        },
        ".MuiDialog-paper": {
          padding: "0",
        },
        "@media (max-width: 600px)": {
          ".MuiDialog-paper": {
            margin: 0,
            borderRadius: 0,
            overflow: "auto",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
          },
          ".MuiDialog-paperFullScreen": {
            height: "100%",
            margin: 0,
          },
        },
      }}
      open={isOpen}
      onClose={handleClose}
      // fullScreen={true}
    >
      <DialogTitle
        id="cart-dialog-title"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Cart
      </DialogTitle>
      <IconButton
        sx={{ position: "absolute", top: 0, right: 0 }}
        aria-label="close"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ padding: "16px" }}>
        {items.length > 0 ? (
          items.map((item: CartItem) => (
            <CartItemComponent key={item.id} {...item} />
          ))
        ) : (
          <Typography variant="body1" gutterBottom>
            Your cart is empty
          </Typography>
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <Typography variant="body1" gutterBottom>
              Total
            </Typography>
            <Typography variant="body1" gutterBottom>
              ${totalPrice}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
            }}
          >
            <Button onClick={onClear} variant="outlined">
              Clear
            </Button>
            <Button
              onClick={onCheckout}
              variant="contained"
              disabled={items.length === 0}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CartPopup;
