import axios from 'axios';
import 'dotenv/config';

export default async function handler(req, res) {
  try {
    console.log(process.env.RAPID_API_KEY);
    const options = {
      method: 'GET',
      url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
      params: { count: '1', wordLength: '5' },
      headers: {
        'x-rapidapi-host': 'random-words5.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_API_KEY,
      },
    };

    const response = await axios.request(options);
    const word = response.data[0];

    res.status(200).json({ data: word });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
