import {Box, Button, Paper, Typography} from '@mui/material';
import no_image_available from '../../../assets/no_image_available.png'
import React from 'react';
import {apiUrl} from '../../constants';

interface Props {
  title: string,
  date: string,
  image: string | null
}

const NewsItem: React.FC<Props> = ({title, date, image}) => {
  let cardImage = no_image_available;

  if (image) {
    cardImage = `${apiUrl}/${image}`;
  }
  return (
    <Paper elevation={5} sx={{padding: 3, marginY: 2}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Box sx={{display: 'flex'}}>
          <Box>
            <img src={cardImage} width={100}/>
          </Box>
          <Box marginLeft={3} sx={{display: 'flex', flexDirection: 'column',  justifyContent: 'space-between'}}>
            <Typography>{title}</Typography>
            <Box sx={{display: 'flex'}}>
              <Typography>{date}</Typography>
              <Typography>Read More</Typography>
            </Box>
          </Box>
        </Box>
        <Button variant='contained' color='error'>Delete</Button>
      </Box>
    </Paper>
  );
};

export default NewsItem;