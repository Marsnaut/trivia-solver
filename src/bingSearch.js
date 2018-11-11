const axios = require('axios');

const AZURE_SUBSCRIPTION_KEY = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY

async function sendToBingSearch(question, choices) {

  let queryHits = {}

  choices.forEach(choice => {
    queryHits[choice] = 0
  })

  for (let i = 0; i < choices.length; i++) {
    try {
      let query = `${question} ${choices[i]}`.toLowerCase()
      const {data} = await axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/search?q=${query}`, { headers: { 'Ocp-Apim-Subscription-Key' : `${AZURE_SUBSCRIPTION_KEY}` } })
      data.webPages.value.forEach(item => {
        choices.forEach(choice => {
          if (item.snippet.toLowerCase().includes(choice.toLowerCase())) {
            queryHits[choice] += 1;
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
  }
  return queryHits;
}

export default sendToBingSearch