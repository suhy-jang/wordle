export const getWordle = async () => {
  try {
    const wordle = await fetch('/api/word');
    const json = await wordle.json();
    return json.data.toUpperCase();
  } catch (error) {
    console.error(error);
  }
};

export const checkWordle = async (word) => {
  try {
    const wordle = await fetch(`/api/dictionary?word=${word}`);
    const json = await wordle.json();
    return json.data === '200';
  } catch (error) {
    console.error(error);
  }
};
