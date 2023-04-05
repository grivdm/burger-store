import React from 'react'
import {Card, CardMedia, CardContent, Typography,  } from '@mui/material';
import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';

const cardStyle = css`
  max-width: 345px;
`;

const mediaStyle = css`
  height: 0;
  padding-top: 56.25%; /* 16:9 */
`;

const StyledCard = styled(Card)(cardStyle);
const StyledCardMedia = styled(CardMedia)(mediaStyle);

type MenuItem = {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
  };

type MenuProps = {
    item: MenuItem;
    };


  const MenuItemComponent: React.FC<MenuProps> = ({ item }) => {
    const [open, setOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value));
      };
    
      const handleAddToCart = () => {
        // Add code to add the item to the cart with the selected quantity
        setOpen(false);
      };


    return (
      <StyledCard>
        <StyledCardMedia image={item.image} title={item.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
          
        </CardContent>
      </StyledCard>
    );
  };

export default MenuItemComponent