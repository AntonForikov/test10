import NewsItem from "./NewsItem";
import {Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectNewsList} from "../../store/newsSlice";
import {useEffect} from "react";
import {getNews} from "../../store/newsThunk";


const Home = () => {
    const newsList = useAppSelector(selectNewsList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getNews());
    }, [dispatch]);

    return (
        <>
            <Grid container justifyContent='space-between' alignItems='center' marginTop={2}>
                <Typography variant='h4'>Posts</Typography>
                <Button component={Link} to='add-new-post' variant='outlined'>Add new post</Button>
            </Grid>
            {newsList.map((news) => {
                return (
                    <NewsItem
                        key={news.id}
                        id={news.id}
                        date={news.date}
                        title={news.title}
                        image={news.image}
                    />
                )
            })}
        </>
    );
};

export default Home;