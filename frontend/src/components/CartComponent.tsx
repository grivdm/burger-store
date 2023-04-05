import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
});

const ItemContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '12px',
});

type CartItem = {
  id: number;
  name: string;
  price: number;
};

type CartProps = {
  items: CartItem[];
  onClear: () => void;
  onCheckout: () => void;
};

const Cart: React.FC<CartProps> = ({ items, onClear, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Cart
      </Typography>
      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <ItemContainer key={item.id}>
              <Typography>{item.name}</Typography>
              <Typography>${item.price.toFixed(2)}</Typography>
            </ItemContainer>
          ))}
          <ItemContainer>
            <Typography>Total:</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </ItemContainer>
          <Box display="flex" justifyContent="space-between" marginTop="12px">
            <Button variant="outlined" onClick={onClear}>
              Clear Cart
            </Button>
            <Button variant="contained" color="primary" onClick={onCheckout}>
              Checkout
            </Button>
          </Box>
        </>
      ) : (
        <Typography>Your cart is empty.</Typography>
      )}
    </Container>
  );
};

export default Cart;