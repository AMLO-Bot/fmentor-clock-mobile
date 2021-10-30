const { default: axios } = require("axios");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  const fields = ['country_code2', 'country_code3', 'city'] ,
    API_KEY_IPGEO = process.env.API_KEY_IPGEO,
    API = `https://api.ipgeolocation.io/ipgeo`,
    url = `${API}?apiKey=${API_KEY_IPGEO}&fields=${fields.join(',')}`;
  try {   
    const {data} = await axios.get(url);
    console.log(data)
    return {
      body: JSON.stringify(data),
      statusCode: 200,
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({statusCode: 500, statusText:'falla', headers:'mama', data:'corre'})
    }
  }
}

module.exports = { handler }
