import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { css } from "@emotion/react";

interface Props {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Header: React.FC<Props> = ({ isLoggedIn, handleLogout }) => {
  const { t } = useTranslation();
  const buttonStyles = css`
  color: inherit;
  &:hover {
    color: #fff;
  }
`;

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Typography variant="h4" component="div">
              Burger Store
            </Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="center">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2 }}>
                <Button>{t("header.home")}</Button>
              </Box>
              <Box sx={{ mr: 2 }}>
                <Button color="inherit">{t("header.menu")}</Button>
              </Box>
              <Box sx={{ mr: 2 }}>
                <Button color="inherit">{t("header.contacts")}</Button>
              </Box>
              <Box sx={{ mr: 2 }}>
                <Button color="inherit">{t("header.about")}</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2} container justifyContent="flex-end">
            <ShoppingCartIcon sx={{ fontSize: "2rem" }} />
          </Grid>
        </Grid>
      </StyledToolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#333",
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
});

export default Header;
