import React from 'react';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { css } from '@emotion/react';
import CarouselComponent from '../components/CarouselComponent';
import MenuComponent from '../components/MenuComponent';


const cardStyle = css`
  max-width: 345px;
`;

const mediaStyle = css`
  height: 0;
  padding-top: 56.25%; /* 16:9 */
`;

const StyledCard = styled(Card)(cardStyle);
const StyledCardMedia = styled(CardMedia)(mediaStyle);

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box width="100%">
          <CarouselComponent />
        </Box>
      {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to Burger Store
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            We have the best burgers in town!
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <StyledCardMedia
              image="https://source.unsplash.com/random/640x360"
              title="Burger"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Classic Burger
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Our classic burger is made with a juicy beef patty, lettuce, tomato, and our secret sauce.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard>
            <StyledCardMedia
              image="https://source.unsplash.com/random/640x360"
              title="Cheeseburger"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Cheeseburger
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Our cheeseburger is made with a juicy beef patty, cheese, lettuce, tomato, and our secret sauce.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid> */}
      <MenuComponent />
    </Container>
  );
};

export default HomePage;