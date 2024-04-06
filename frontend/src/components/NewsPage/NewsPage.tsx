import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectComments, selectNewsById} from '../../store/newsSlice';
import React, {useEffect, useState} from 'react';
import {getComment, getNewsById, sendComment} from '../../store/newsThunk';
import {Button, Grid, TextField, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {Comment} from '../../types';
import CommentItem from './CommentItem';
const NewsPage = () => {
  const dispatch = useAppDispatch();
  const selectNews = useAppSelector(selectNewsById);
  const selectComment = useAppSelector(selectComments);
  const {id} = useParams();

  const initialComment: Comment = {
    author: '',
    text: '',
    newsId: id
  };

  console.log(initialComment)

  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    if (id) {
      dispatch(getNewsById(id));
      dispatch(getComment(id));
    }

  }, []);

  const changeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.author[0] === ' ' || comment.text[0] === ' ') {
      alert("Your name and comment can't begin from empty string.");
    } else if (comment.text === ''){
      alert("You can't send empty comment");
    } else {
      dispatch(sendComment(comment));
    }
  };

  return (
    <Grid container direction='column'>
      <Typography variant='h4'>{selectNews?.title}</Typography>
      <Typography color='gray'>{selectNews?.date}</Typography>
      <Typography>{selectNews?.content}</Typography>
      <Typography variant='h4' marginTop={4}>Comments</Typography>
      {selectComment.map((com) => {
        return<CommentItem
          key={com.id}
          id={com.id}
          text={com.text}
          author={com.author}
        />
      })}
      <Typography variant='h4' marginTop={4}>Add comment</Typography>
      <form onSubmit={onFormSubmit}>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="author"
            value={comment.author}
            onChange={changeComment}
          />
        </Grid>
        <Grid item xs marginY={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Comment"
            name="text"
            value={comment.text}
            onChange={changeComment}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained" endIcon={<SendIcon/>}>
            Send
          </Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default NewsPage;