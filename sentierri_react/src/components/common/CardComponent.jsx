import React from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

function CardComponent({ image, title, description, actions }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component="img" alt={title} height="140" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {actions.map(action => (
          <Button key={action.label} size="small" color="primary">
            {action.label}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}

export default CardComponent;

// This code creates a CardComponent that displays content in a rectangular container with support
// for images, titles, descriptions, and actions using Card, CardActionArea, CardActions, CardContent,
// CardMedia, Button, and Typography components from @material-ui/core.
// The image, title, and description props are used to specify the image, title, and description of the card.
// The actions prop is used to specify the actions. Each action should have a label property.