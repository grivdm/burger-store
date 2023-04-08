import React, { useEffect } from "react";
import { Box, Typography, Button, ListItem, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeFromCart, changeQuantity } from "../../slices/CartSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CartItem } from "../../interfaces/CartItem";

const CartItemComponent: React.FC<CartItem> = ({
  id,
  name,
  price,
  quantity,
}) => {
  const dispatch = useAppDispatch();
  console.log(
    "id: " + id + " name: " + name + " price: " + price + "quantity" + quantity
  );
  const onRemove = () => dispatch(removeFromCart(id));
  const handleChangeQuantity = () => dispatch(changeQuantity(id));

  return (
    <ListItem>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
          width: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            ${price}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <TextField
            label="Quantity"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            size="small"
            value={quantity}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
            sx={{
              width: "64px",
              height: "32px",
              "& .MuiOutlinedInput-input": { padding: "6px 0" },
            }}
          />
        </Box>
        <Button onClick={onRemove}>
          <DeleteForeverIcon sx={{ fontSize: "1.5rem" }} />
        </Button>
      </Box>
    </ListItem>
  );
};

export default CartItemComponent;
