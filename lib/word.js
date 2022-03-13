export const getWordle = async () => {
  try {
    const wordle = await fetch('/api/word');
    const json = await wordle.json();
    return json.data.toUpperCase();
  } catch (error) {
    console.error(error);
  }
};
