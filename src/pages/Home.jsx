import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Pagination,
} from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../services/newsService';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const articlesPerPage = 20;

  const handleSearch = async () => {
    setLoading(true);
    console.log('Fetching news with:', { query, source, date });
    const { articles: newsData, totalResults } = await fetchNews(query, source, date);
    console.log('Fetched news data:', newsData);
    setArticles(newsData);
    setTotalResults(totalResults);
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedArticles = articles.slice((page - 1) * articlesPerPage, page * articlesPerPage);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            News Aggregator
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              placeholder="Search News"
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ bgcolor: 'white', borderRadius: 1, mr: 2 }}
            />
            {/* <IconButton color="inherit" onClick={handleSearch}>
              <SearchIcon />
            </IconButton> */}
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4} md={4}>
            <FormControl fullWidth>
              <InputLabel>Source</InputLabel>
              <Select
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <MenuItem value="">All Sources</MenuItem>
                <MenuItem value="bbc-news">BBC News</MenuItem>
                <MenuItem value="the-guardian">The Guardian</MenuItem>
                <MenuItem value="the-new-york-times">The New York Times</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
              Apply Filters
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid container spacing={3}>
              {paginatedArticles.map((article, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <NewsCard article={article} />
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={Math.ceil(totalResults / articlesPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default Home;
