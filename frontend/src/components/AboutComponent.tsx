import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

const AboutComponent: React.FC = () => {
    const { t } = useTranslation();
  return (
    <Container maxWidth="md" id='about'>
      <Box width="100%">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" gutterBottom>
                {t("homePage.about")}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutComponent;