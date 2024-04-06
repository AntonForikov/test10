import {useEffect} from 'react';
import {Alert, CircularProgress, Grid} from '@mui/material';
import MessageItem from './MessageItem';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectLoading, selectMessageList} from '../../store/messageSlice';
import {getMessages} from '../../store/messageThunk';

const MessageList = () => {
  const messageList = useAppSelector(selectMessageList);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  return (
    <>
      {loading
        ? <Grid container justifyContent="center" mt={2}><CircularProgress/></Grid>
        : !loading && messageList.length > 0
          ? <Grid container direction="row" gap={2} justifyContent="center">
            {messageList.map((message) => {
              return <MessageItem
                key={message.id}
                message={message.message}
                author={message.author}
                image={message.image}
              />;
            })}
          </Grid>
          : <Alert severity="warning" sx={{marginTop: 2}}>There are no messages. Write something!</Alert>
      }
    </>
  );
};

export default MessageList;