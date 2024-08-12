import axios from 'axios';

const API_KEY = '80fabacd2efd41f682594566e1fea0bd';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (query = 'latest', source = '', date = '') => {
  try {
    console.log('Sending request with params:', { query, source, date });
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        sources: source,
        from: date,
        apiKey: API_KEY,
        pageSize: 100,
      },
    });
    console.log('API response:', response.data);
    return { articles: response.data.articles, totalResults: response.data.totalResults };
  } catch (error) {
    console.error('Error fetching news:', error);
    return { articles: [], totalResults: 0 };
  }
};

