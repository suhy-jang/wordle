import axios from 'axios';
import 'dotenv/config';

export default async function handler(req, res) {
  try {
    const options = {
      method: 'GET',
      url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
      params: { entry: req.query.word ?? '' },
      headers: {
        'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_API_KEY,
      },
    };

    const response = await axios.request(options);
    res.status(200).json({ data: response.data.result_code });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
