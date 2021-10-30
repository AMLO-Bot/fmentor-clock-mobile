import secrets from './secrets.js'
import {getRandomItem} from './utils.js'

const fetchQuote  = async () => {
  const quoteAPI = `https://type.fit/api/quotes`
  const data = await fetch(quoteAPI), quote = await data.json()
  return getRandomItem(quote)
}

const fetchClientLocation = async () => {
  const endpoint = '/.netlify/functions/fetch-location'
  const data = await fetch(endpoint), json = await data.json()
  return json
}

export {fetchClientLocation, fetchQuote}