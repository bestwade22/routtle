import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography } from '@mui/material';
import GeneralApi from '@/api/GeneralController';
import useErrorHook from '@/hooks/useErrorHook';

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleError, showError, errorMessage } = useErrorHook({
    isShowing: false,
    errorType: null,
    message: '',
  });
  const fetchNews = async () => {
    const response = await GeneralApi(
      {},
      'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json'
    );
    if (response.result !== 'Success') {
        handleError('networkError', response.error.errMsg);
        return;
      }
    setNews(response.data.articles);
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', pt: 4 }}>
      <Typography variant="h2" component="h1">
        Top Headlines
      </Typography>
      {loading ? (
        <Typography variant="body1">Loading...</Typography>
      ) : error ? (
        <Typography variant="body1">{error}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {news.map((item) => (
            <Card
              key={item.urlToImage}
              sx={{ m: 2, width: 'calc(100% - 16px)' }}
            >
              <CardContent>
                <Typography variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
                <Typography variant="body2">
                  Source: {item.source.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default NewsComponent;
