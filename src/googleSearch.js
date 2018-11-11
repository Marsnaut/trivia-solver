const axios = require('axios');

const GOOGLE_SEARCH_KEY= process.env.REACT_APP_GOOGLE_SEARCH_KEY

async function sendToGoogleSearch(question, choices) {

  let queryHits = {}

  choices.forEach(choice => {
    queryHits[choice] = 0
  })

  for (let i = 0; i < choices.length; i++) {
    try {
      let query = `${question} ${choices[i]}`.toLowerCase()
      const {data} = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_KEY}&cx=017951903772022677042:jotlgghrzku&q=${encodeURIComponent(query)}&num=10`)
      data.items.forEach(item => {
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

export default sendToGoogleSearch