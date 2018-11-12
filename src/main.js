const axios = require('axios');
const GOOGLE_VISION_KEY = process.env.REACT_APP_GOOGLE_VISION_KEY

async function app(currentImageProcessing) {
  try {
    const body = {
      "requests": [
        { "features": [{ "type": "TEXT_DETECTION"}],
          "image": { "source": { "imageUri": currentImageProcessing }}
        }
      ]
    }

    const {data} = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_KEY}`, body)
    return sendToGoogleVision(data)
  } catch (err) {
    console.log('Error retrieving data - don\'t worry the API Key is domain restricted');
  } 
}

async function sendToGoogleVision(googleVisionResult) {

  let fullText = googleVisionResult.responses[0].fullTextAnnotation.text
  let questionStartIndex;
  let questionEndIndex;

  const cleanQuestion = (question) => {
    let firstWord = question[0]
    let filteredQuestion = question.filter(word => word !== '10.')
    return (firstWord[firstWord.length - 1] === 'K') ? filteredQuestion.slice(1).join(' ') : filteredQuestion.join(' ')
  }
  
  const getQuestion = (text) => {
    const apiResult = text.split('\n')
    // Question Start
    let startBreak = false;
    for (let i = 0; i < apiResult.length; i++) {
      if (!startBreak) {
        if (apiResult[i][0] === 'W' || apiResult[i][0] === 'H') {
          questionStartIndex = i;
          startBreak = true;
        }
      }
    }

    apiResult.forEach((fragment, idx) => {
      if (fragment.slice(-1) === '?') {
        questionEndIndex = idx + 1;
      }
    })

    let question = apiResult.slice(questionStartIndex, questionEndIndex).filter(word => word !== 'HO')
    return cleanQuestion(question);
  }

  const getChoices = (text) => {
    if (!questionEndIndex) {getQuestion(text)}
    return text.split('\n').slice(questionEndIndex).filter(str => str !== '').filter(str => str !== 'Swipe left to reaveal comments').slice(0,3);
  }

  const question = getQuestion(fullText);
  const choices = getChoices(fullText);

  return [question, choices]
}

export default app
