import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

function NewsCard({ article }) {
  return (
    <Card>
      <CardActionArea href={article.url} target="_blank">
        <CardMedia
          component="img"
          height="140"
          image={article.urlToImage || 'https://via.placeholder.com/150'}
          alt={article.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NewsCard;
