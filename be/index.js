import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

const API_URL = 'https://secure.splitwise.com';
const BEARER_TOKEN = 'u3ol04rmRnMsn1I6eA8zpAFSX1hJt9pJNHTBoX4h';

app.use(express.json());

app.get('/get_groups', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/api/v3.0/get_groups`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/get_group/:id', async (req, res) => {
  const groupId = req.params.id;
  try {
    const response = await axios.get(`${API_URL}/api/v3.0/get_group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/create_expense', async (req, res) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v3.0/create_expense`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
