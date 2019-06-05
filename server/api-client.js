const axios = require('axios');
const JSON = require('circular-json');

exports.getPlaylist = async (req, res) => {
  try {
    const data = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        'Authorization': 'Bearer BQA6rtwwz5Ha8ZBa6b2B7FOgsMJvGEtm8cYOI0zw7cH63SODyWYw0srgu8KzSSqq8cb6Xb8qanlNnWrY9KST25rK6Dbi9i5BOADtoT-Dpdpener69V3Bn-7TQ4iVFFddPLLgGtZ7G47uhyMZ9DHacXhv-KMfTVhjlw',
        'Content-Type': 'application/json'
        }
    });
    res.send(JSON.stringify(data));
    res.status(200);
  } catch (e) {
    res.status(500);
  }
}
