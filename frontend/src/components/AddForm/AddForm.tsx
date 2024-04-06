import {Button, Grid, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, {useRef, useState} from 'react';
import {News} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectLoading} from '../../store/newsSlice';
import FileInput from './FileInput';
import {getNews, sendNews} from '../../store/newsThunk';
import {useNavigate} from 'react-router-dom';

const initialMessage: News = {
  title: '',
  content: '',
  image: null
};
const AddForm = () => {
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const [news, setNews] = useState<News>(initialMessage);
  const [fileName, setFileName] = useState('');
  const resetButtonRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const resetFileInput = () => {
    if (resetButtonRef.current) {
      resetButtonRef.current.click();
    }
  };

  const changeNewsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNews((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setNews(prevState => ({
        ...prevState,
        [name]: files[0]
      }))
    }
    if (files && files[0]) {
      setFileName(files[0].name);
    } else {
      setFileName('');
    }
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (news.title[0] === ' ' || news.title === '') {
      alert("You can't send news started from whitespace or it can't be empty!");
    } else {
      try {
        await dispatch(sendNews(news));
        await dispatch(getNews());
        navigate('/');
      } catch (e) {
        console.error(e);
        alert('Please check URL or run backend server.');
      } finally {
        resetFileInput();
        setNews(initialMessage);
        setFileName('');
      }
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2} marginBottom={2} maxWidth={600} margin='auto'>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            name="title"
            value={news.title}
            onChange={changeNewsHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            label="Content"
            name="content"
            value={news.content}
            onChange={changeNewsHandler}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            onChange={fileInputChangeHandler}
            fileName={fileName}
            name="image"
            label="Image"
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" variant="contained" endIcon={<SendIcon/>} disabled={loading}>
            Send
          </Button>
        </Grid>
      </Grid>
      <input
        style={{display: 'none'}}
        ref={resetButtonRef}
        type="reset"
      />
    </form>
  );
};

export default AddForm;