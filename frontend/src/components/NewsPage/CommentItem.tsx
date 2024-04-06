import React from 'react';
import {Button, Grid, Paper, Typography} from '@mui/material';
import axiosApi from '../../axiosApi';

interface Props {
  id: string,
  text: string,
  author: string
}
const CommentItem: React.FC<Props> = ({id,text,author}) => {

  const deleteComment = async () => {
    try {
      await axiosApi.delete(`/comments/${id}`);

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Paper elevation={5} sx={{padding: 3, marginY: 2}}>
      <Grid container justifyContent='space-between'>
        <Grid>
          <Typography fontWeight={600}>{author}:</Typography>
          <Typography>{text}</Typography>
        </Grid>
        <Button variant='contained' color='error' onClick={deleteComment}>Delete</Button>
      </Grid>
    </Paper>
  );
};

export default CommentItem;