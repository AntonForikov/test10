import React from 'react';
import {Button, Grid, Paper, Typography} from '@mui/material';
import {useAppDispatch} from '../../app/hooks';
import {deleteComment, getComment} from '../../store/newsThunk';

interface Props {
  id: string,
  text: string,
  author: string,
  newsId: string | null
}
const CommentItem: React.FC<Props> = ({id,text,author, newsId}) => {
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    await dispatch(deleteComment(id));
    if(newsId) await dispatch(getComment(newsId));
  }

  return (
    <Paper elevation={5} sx={{padding: 3, marginY: 2}}>
      <Grid container justifyContent='space-between'>
        <Grid>
          <Typography fontWeight={600}>{author}:</Typography>
          <Typography>{text}</Typography>
        </Grid>
        <Button variant='contained' color='error' onClick={onDelete}>Delete</Button>
      </Grid>
    </Paper>
  );
};

export default CommentItem;