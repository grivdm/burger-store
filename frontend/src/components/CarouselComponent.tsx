import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardActionArea , CardContent, Typography, CardMedia } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { css } from '@emotion/react';

interface Item {
  title: string;
  description: string;
  image: string;
}

const StyledCardActionArea = styled(CardActionArea)({
  margin: '3 auto',
});

const mediaStyle = css`
  height: 10;
  padding-top: 56.25%;
  margin: 3 auto;
`;

const StyledCardMedia = styled(CardMedia)(mediaStyle);

const StyledCardContent = styled(CardContent)({
  height: '100px',
});

const CarouselItem: React.FC<{ item: Item }> = ({ item }) => {
  const { title, description, image } = item;

  return (
    <StyledCardActionArea>
      <StyledCardMedia image={image} title={title} />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {description}
        </Typography>
      </StyledCardContent>
    </StyledCardActionArea>
  );
};

const items: Item[] = [
  {
    title: 'Classic Burger',
    description: 'Our classic burger is made with a juicy beef patty, lettuce, tomato, and our secret sauce.',
    image: 'https://source.unsplash.com/random/1920x1080',
  },
  {
    title: 'Cheeseburger',
    description: 'Our cheeseburger is made with a juicy beef patty, cheese, lettuce, tomato, and our secret sauce.',
    image: 'https://source.unsplash.com/random/1920x1080',
  },
  {
    title: 'Bacon Cheeseburger',
    description: 'Our bacon cheeseburger is made with a juicy beef patty, cheese, bacon, lettuce, tomato, and our secret sauce.',
    image: 'https://source.unsplash.com/random/1920x1080',
  },
];

const CarouselComponent: React.FC = () => {
  return (
    <Carousel
      fullHeightHover={false} 
      animation="slide"
      autoPlay={true}
      interval={10000}
      // navButtonsAlwaysVisible={true}
      navButtonsProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 0,
          color: '#FFF',
          margin: 0,
          height: '100%',
        },
      }}
    >
      {items.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </Carousel>
  );
};

export default CarouselComponent;