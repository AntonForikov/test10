import React from 'react';
import {CardMedia, Grid, Paper, styled, Typography} from '@mui/material';
import no_image_available from '../../../assets/no_image_available.png'
import {apiUrl} from '../../constants';

interface Props {
  message: string,
  author: string,
  image: string | null
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%'
});
const MessageItem: React.FC<Props> = ({message, author, image}) => {
  let cardImage = no_image_available;

  if (image) {
    cardImage = `${apiUrl}/${image}`;
  }

  return (
    <Paper elevation={5} sx={{padding: 3, width: 300}}>
      <Grid container direction='column'>
        <ImageCardMedia image={cardImage} />
        <Grid container direction='column' marginTop={2}>
          <Typography>Author: {author}</Typography>
          <Typography>Message: {message}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MessageItem;