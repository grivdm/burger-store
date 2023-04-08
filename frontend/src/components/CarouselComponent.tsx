import React from 'react';
import { CardActionArea , CardContent, Typography, CardMedia } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import CarouselExample from '../examples/CarouselExample.json';

interface Item {
  title: string;
  description: string;
  image: string;
}

const items: Item[] = Object.values(CarouselExample);
console.log(items);

const CarouselItem: React.FC<{ item: Item }> = ({ item }) => {
  const { title, description, image } = item;

  return (
    <CardActionArea
      sx={{
        margin: '3 auto',
      }}
    >
      <CardMedia image={image} title={title}
        sx={{
          height: '5',
          paddingTop: '56.25%',
          margin: '3 auto',
        }}
      />
      <CardContent
        sx={{
          height: '100px',
        }}
      >
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  );
};


const CarouselComponent: React.FC = () => {
  return (
    <div id='home'>

    <Carousel
      height={400}
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
    </div>
  );
};

export default CarouselComponent;