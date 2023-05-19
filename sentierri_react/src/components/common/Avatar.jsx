import React from 'react';
import { Avatar } from '@material-ui/core';

function Avatar({ image, alt, shape }) {
  return <Avatar src={image} alt={alt} variant={shape} />;
}

export default Avatar;

// This code creates an AvatarComponent that displays user or item images in a circular or square shape using the Avatar component from @material-ui/core. The image prop is used to specify the image source. The alt prop is used to specify the alternative text for the image. The shape prop is used to specify the shape of the avatar ("circle" or "square").