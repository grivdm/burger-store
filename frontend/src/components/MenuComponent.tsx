import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button,
    TextField,
} from '@mui/material';
import { css } from '@emotion/react';
import MenuItemComponent from './MenuItemComponent';

const MenuData = [
  {
    id: 1,
    name: 'Classic Burger',
    category: 'burgers',
    image: 'https://source.unsplash.com/random/640x360',
    description: 'Our classic burger is made with a juicy beef patty, lettuce, tomato, and our secret sauce.',
  },
  {
    id: 2,
    name: 'Cheeseburger',
    category: 'burgers',
    image: 'https://source.unsplash.com/random/640x360',
    description: 'Our cheeseburger is made with a juicy beef patty, cheese, lettuce, tomato, and our secret sauce.',
  },
  {
    id: 3,
    name: 'Fries',
    category: 'sides',
    image: 'https://source.unsplash.com/random/640x360',
    description: 'Our fries are crispy and delicious.',
  },
];

const cardStyle = css`
  max-width: 345px;
`;

const mediaStyle = css`
  height: 0;
  padding-top: 56.25%; /* 16:9 */
`;

const MenuComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    };

  const filteredMenuData = MenuData.filter((item) => { 
    if (selectedCategory === 'all') {
        return item.name.toLowerCase().includes(searchValue.toLowerCase());
    } else {
        return item.category === selectedCategory && item.name.toLowerCase().includes(searchValue.toLowerCase());
    }
    });

  return (
    <Container maxWidth="md">
      <Box width="100%">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Our Menu
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9} container justifyContent="flex-end">
            <Button variant={selectedCategory === 'all' ? 'contained' : 'outlined'} color="secondary" onClick={() => handleCategoryClick('all')}>
              All
            </Button>
            <Button variant={selectedCategory === 'burgers' ? 'contained' : 'outlined'} onClick={() => handleCategoryClick('burgers')}>
              Burgers
            </Button>
            <Button variant={selectedCategory === 'sides' ? 'contained' : 'outlined'} onClick={() => handleCategoryClick('sides')}>
              Sides
            </Button>
          </Grid>
          {filteredMenuData.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <MenuItemComponent item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MenuComponent;
