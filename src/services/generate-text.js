import cohere from 'cohere-ai'
import { prompt } from './prompt'

export const apikey = import.meta.env.VITE_COHERE_API_KEY
const API_GENERATE_URL = 'https://api.cohere.ai/generate'

cohere.init(apikey)

export async function enhanceText (input, length) {
  const tokenLength = Math.floor(length / 3) + 30 // each token is about 3 words, so input.length/3 to get n tokens and add some more words just in case
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

  const { text } = response.generations[0]
  return text
    .replace('--', '')
    .replaceAll('"', '')
    .trim()
}
