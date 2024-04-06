import {Box, Button, Paper, Typography} from '@mui/material';
import no_image_available from '../../../assets/no_image_available.png'
import React from 'react';
import {apiUrl} from '../../constants';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteNews, getNews} from '../../store/newsThunk';
import {selectLoading} from '../../store/newsSlice';

interface Props {
  id: string,
  title: string,
  date: string,
  image: string | null
}

const NewsItem: React.FC<Props> = ({id,title, date, image}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  let cardImage = no_image_available;

  if (image) {
    cardImage = `${apiUrl}/${image}`;
  }

  const onDelete = async () => {
    await dispatch(deleteNews(id));
    await dispatch(getNews());
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
              <Typography component={Link} to={`/news/${id}`} marginLeft={3}>Read More &gt;&gt;</Typography>
            </Box>
          </Box>
        </Box>
        <Button variant='contained' color='error' onClick={onDelete} disabled={loading}>Delete</Button>
      </Box>
    </Paper>
  );
};

export default NewsItem;