/* eslint-disable camelcase */
import cohere from 'cohere-ai'
import { prompt } from './prompt'

const apikey = import.meta.env.VITE_COHERE_API_KEY // 'ZuIBeaoH8WixfVnFJadKEM2d4PpV7xIgxNzuW2wj'
const API_GENERATE_URL = 'https://api.cohere.ai/generate'
const API_DETECT_LANGUAGE_URL = 'https://api.cohere.ai/detect-language'

cohere.init(apikey)

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
  console.log(language_code)
  return language_code === 'en'
}

export async function enhanceText (input) {
  console.log('loading...')
  const data = {
    model: 'xlarge',
    prompt: prompt + `"${input}"
      Enhanced:`,
    max_tokens: 40,
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
