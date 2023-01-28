import cohere from 'cohere-ai'
cohere.init('ZuIBeaoH8WixfVnFJadKEM2d4PpV7xIgxNzuW2wj'); // This is your trial API key
(async () => {
  const response = await cohere.generate({
    model: 'xlarge',
    prompt: 'This is a sentence enhancer. Write the sentence that I give you, improving the words so that it seems much more cultured.\n--\nSentence: \"I\'m a web developer, but I think web development is very hard.\"\nEnhanced: \"I am a Web Developer, nevertheless, my opinion in this subject is that it is very arduous.\"\n--\nSentence: \"I don\'t like the mayonaisse.\"\nEnhanced: \"I abhor the mayonaisse.\"\n--\nSentence: \"I don\'t like vegetables.\"\nEnhanced: \"I reject all vegetables.\"\n--\nSentence: \"I saw the news on the TV and I was very scared of that.\"\nEnhanced: \"I was aghast at the news I saw on the TV.\"\n--\nSentence: \"I think that the transistor was the best invention in the human history.\"\nEnhanced: \"I believe that the transistor was one of the most momentous inventions in the history of humankind.\"\n--\nSentence: \"I\'ve never liked maths in school.\"\nEnhanced:',
    max_tokens: 26,
    temperature: 0.5,
    k: 0,
    p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  });
  console.log(`${response.body.generations[0].text}`);
})();