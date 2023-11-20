const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10000';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '94be559db4mshbdd38f0bcf1590ep1eb01fjsn248ac7172cc5',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
};

try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
} catch (error) {
    console.error(error);
}