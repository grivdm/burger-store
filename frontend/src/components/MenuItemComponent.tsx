import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Tooltip,
  Button,
} from "@mui/material";
import { css } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { addToCart } from "../slices/CartSlice";
import { useAppDispatch } from "../hooks";
import { MenuItem } from "../interfaces/MenuItem";
import { CartItem } from "../interfaces/CartItem";

const cardStyle = css`
  max-width: 345px;
`;

const mediaStyle = css`
  height: 0;
  padding-top: 56.25%; /* 16:9 */
`;

const StyledCard = styled(Card)(cardStyle);
const StyledCardMedia = styled(CardMedia)(mediaStyle);

type MenuProps = {
  item: MenuItem;
};

const MenuItemComponent: React.FC<MenuProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const [showAddToCart, setShowAddToCart] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    const itemInCart: CartItem = {
      ...item,
      quantity,
    };
    dispatch(addToCart(itemInCart));
  };

  return (
    <StyledCard
      onMouseEnter={() => setShowAddToCart(true)}
      onMouseLeave={() => setShowAddToCart(false)}
    >
      <StyledCardMedia image={item.image} title={item.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.price}
        </Typography>
        {showAddToCart && (
          <Tooltip title="Add to Cart">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </Tooltip>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default MenuItemComponent;
