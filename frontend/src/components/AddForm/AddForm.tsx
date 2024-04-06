import {Button, Grid, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, {useRef, useState} from 'react';
import {Message} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectLoading} from '../../store/messageSlice';
import FileInput from './FileInput';
import {getMessages, sendMessage} from '../../store/messageThunk';

const initialMessage: Message = {
  author: '',
  message: '',
  image: null
};
const AddForm = () => {
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<Message>(initialMessage);
  const [fileName, setFileName] = useState('');
  const resetButtonRef = useRef<HTMLInputElement>(null);

  const resetFileInput = () => {
    if (resetButtonRef.current) {
      resetButtonRef.current.click();
    }
  };

  const changeMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMessage((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      setMessage(prevState => ({
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
    if (message.message[0] === ' ' || message.message === '') {
      alert("You can't send message started from whitespace or it can't be empty!");
    } else {
      try {
        await dispatch(sendMessage(message));
        await dispatch(getMessages());
      } catch (e) {
        console.error(e);
        alert('Please check URL or run backend server.');
      } finally {
        resetFileInput();
        setMessage(initialMessage);
        setFileName('');
      }
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2} marginBottom={2}>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            label="Author"
            name="author"
            value={message.author}
            onChange={changeMessageHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            variant="outlined"
            label="Message"
            name="message"
            value={message.message}
            onChange={changeMessageHandler}
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