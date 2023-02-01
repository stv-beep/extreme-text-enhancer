import cohere from 'cohere-ai'
import { prompt } from './prompt'

export const apikey = import.meta.env.VITE_COHERE_API_KEY
const API_GENERATE_URL = 'https://api.cohere.ai/generate'

cohere.init(apikey)

export async function enhanceText (input, length) {
  console.log('loading...')
  const tokenLength = Math.floor(length / 3) + 70
  console.log(tokenLength)
  const data = {
    model: 'xlarge',
    prompt: prompt + `"${input}"
      Enhanced:`,
    max_tokens: tokenLength,
    temperature: 0.6,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: ['--'],
    return_likelihoods: 'NONE'
  }
  const response = await fetch(API_GENERATE_URL, {
    method: 'POST',
    headers: {
      Authorization: `BEARER ${apikey}`,
      'Content-Type': 'application/json',
      'Cohere-Version': '2022-12-06'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  console.log(response)

  const { text } = response.generations[0]
  return text
    .replace('--', '')
    .replaceAll('"', '')
    .trim()
}
