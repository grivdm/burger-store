import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import MenuItemComponent from "./MenuItemComponent";
import MenuData  from "../examples/MenuExample.json";


const MenuComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredMenuData = Object.values(MenuData).filter((item) => {
    if (selectedCategory === "all") {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    } else {
      return (
        item.category === selectedCategory &&
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  });

  return (
    <Container maxWidth="md" id="menu">
      <Box width="100%">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Our Menu
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={9}
            container
            justifyContent="flex-end"
          >
            <Button
              variant={selectedCategory === "all" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => handleCategoryClick("all")}
            >
              All
            </Button>
            <Button
              variant={
                selectedCategory === "burgers" ? "contained" : "outlined"
              }
              onClick={() => handleCategoryClick("burgers")}
            >
              Burgers
            </Button>
            <Button
              variant={selectedCategory === "sides" ? "contained" : "outlined"}
              onClick={() => handleCategoryClick("sides")}
            >
              Sides
            </Button>
            <Button
              variant={selectedCategory === "drinks" ? "contained" : "outlined"}
              onClick={() => handleCategoryClick("drinks")}
            >
              Drinks
            </Button>
          </Grid >
          {filteredMenuData.map((item) => (
            <Grid item xs={12} sm={6} md={4}   key={item.id}>
              <MenuItemComponent item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MenuComponent;
