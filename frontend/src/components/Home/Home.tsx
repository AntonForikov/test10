import NewsItem from "./NewsItem";
import {Alert, Button, CircularProgress, Grid, Typography} from '@mui/material';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoading, selectNewsList} from '../../store/newsSlice';
import {useEffect} from "react";
import {getNews} from "../../store/newsThunk";


const Home = () => {
    const newsList = useAppSelector(selectNewsList);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
        <>
            <Grid container justifyContent='space-between' alignItems='center' marginTop={2}>
                <Typography variant='h4'>Posts</Typography>
                <Button component={Link} to='add-new-post' variant='outlined'>Add new post</Button>
            </Grid>
            {
              loading
                ? <CircularProgress />
                : !loading && newsList.length < 1
                  ? <Alert severity="warning">There is no news in base</Alert>
                  : newsList.map((news) => {
                    return (
                      <NewsItem
                        key={news.id}
                        id={news.id}
                        date={news.date}
                        title={news.title}
                        image={news.image}
                      />
                    )
                  })
            }
        </>

    );
};

export default Home;