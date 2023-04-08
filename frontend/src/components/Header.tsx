import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import AnchorLink from "react-anchor-link-smooth-scroll";
import CartButton from "./CartButton";



const StyledButton = styled(Button)({
  color: "#inherit",
  "&:hover": {
    color: "#fff",
  },
  a: {
    color: "#fff",
    textDecoration: "none",
  },
});

const Header = () => {
  const { t } = useTranslation();

  return (
    <AppBar
      sx={{
        top: 0,
        backgroundColor: "#333",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      position="sticky"
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Typography variant="h4" component="div">
              Burger Store
            </Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="center">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2 }}>
                <StyledButton color="inherit">
                  <AnchorLink href="#home">{t("header.home")}</AnchorLink>
                </StyledButton>
              </Box>
              <Box sx={{ mr: 2 }}>
                <StyledButton color="inherit">
                  <AnchorLink href="#menu">{t("header.menu")}</AnchorLink>
                </StyledButton>
              </Box>
              <Box sx={{ mr: 2 }}>
                <StyledButton color="inherit">
                  <AnchorLink href="#about">{t("header.about")}</AnchorLink>
                </StyledButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2} container justifyContent="flex-end">
            <StyledButton color="inherit">
              <CartButton />
            </StyledButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
