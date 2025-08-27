import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

const API_URL = 'https://secure.splitwise.com';

app.use(express.json());

app.get('/get_groups', async (req, res) => {
  const apiKey = req.query.apiKey;
  try {
    const response = await axios.get(`${API_URL}/api/v3.0/get_groups`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    res.status(response.status).json(response.data);
    logPretty('get_groups success:', response);
  } catch (error) {
    res.status(error.response.status).json({});
    logPretty('get_groups fail:', error);
  }
});


app.get('/get_group/:id', async (req, res) => {
  const groupId = req.params.id;
  const apiKey = req.query.apiKey;
  try {
    const response = await axios.get(`${API_URL}/api/v3.0/get_group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response.status).json({});
    logPretty('get_group/:id fail:', error);
  }
});


app.post('/create_expense', async (req, res) => {
  const apiKey = req.query.apiKey;
  try {
    const response = await axios.post(
      `${API_URL}/api/v3.0/create_expense`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(response.status).json(response.data);
    logPretty('Expense created successfully:', response);
  } catch (error) {
    res.status(error.response.status).json({});
    logPretty('Error creating expense:', error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function logPretty(message, data) {
  console.log(`${message}\n${data}\n\n`);
}