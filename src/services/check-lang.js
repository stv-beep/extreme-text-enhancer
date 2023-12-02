import { apikey } from './generate-text'
const API_DETECT_LANGUAGE_URL = 'https://api.cohere.ai/detect-language'

export async function checkLang (input) {
  const data = {
    texts: [input]
  }
  const { results } = await fetch(API_DETECT_LANGUAGE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `BEARER ${apikey}`,
      'Content-Type': 'application/json',
      'Cohere-Version': '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  const [{ language_code }] = results
  return language_code === 'en'
}
