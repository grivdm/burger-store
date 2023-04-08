import React from "react";
import { Box } from "@mui/material";

import CarouselComponent from "../components/CarouselComponent";
import MenuComponent from "../components/MenuComponent";
import AboutComponent from "../components/AboutComponent";

const HomePage = () => {
  return (
    <Box
      sx={{
        margin: "0 auto",
        padding: "0 16px",
        maxWidth: "1200px",
      }}
    >
      <CarouselComponent />
      <MenuComponent />
      <AboutComponent />
    </Box>
  );
};

export default HomePage;
