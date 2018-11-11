import React, { Component } from 'react';
import './App.css';
import app from './main';
import sendToGoogleSearch from './googleSearch';
import sendToBingSearch from './bingSearch';

class App extends Component {
  constructor() {
    super()
    this.state = {
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      audienceQuestion: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      isHidden: true,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  onMountHeader() {
    let decodeString = "____-------__//||\\!@#$$%#^&&*()_+";
    class Decoder {
      constructor (el) {
        this.el = el;
        this.words = ["Trivia Solver","I am a robot","I solve questions","Created by Jimmy"];
        this.index = 0;
        this.startStr=this.words[this.index];
        this.encodedStr="";
        this.decodedStr="";
        this.done=true;
        this.letters=[];
        for (let i=0; i<this.startStr.length; i++) {
          this.letters.push(this.startStr.charAt(i));
        }
      }
      encode (start) {
        this.encodedStr = "";
        if (!start) {
          for (let i=0; i<this.startStr.length; i++) {
              let randPos=Math.floor(Math.random() * Math.floor(decodeString.length));
              this.encodedStr+=decodeString.charAt(randPos);
          }
        } else {
          for (let i=0; i<this.startStr.length; i++) {
            let randPos=Math.floor(Math.random() * Math.floor(decodeString.length));
            if (this.letters[i] !== "") {
              this.encodedStr+=decodeString.charAt(randPos);
            } else {
              this.encodedStr+=this.startStr.charAt(i);
            }
          }
        }
        this.el.innerHTML=this.encodedStr;
      }
      nextIndex() {
        this.index ++;
        if (this.index === this.words.length) this.index=0;
        return this.index;
      }
      reset () {
        this.startStr=this.words[this.nextIndex()];
        this.encodedStr="";
        this.decodedStr="";
        this.done=true;
        this.letters=[];
        for (let i=0; i<this.startStr.length; i++) {
          this.letters.push(this.startStr.charAt(i));
        }
        this.encode(false);
        this.decode();
      }
      decode () {
        let decoder = this;
        let interval = setInterval(function () {
          let randPos=Math.floor(Math.random() * Math.floor(decoder.startStr.length));
          if (decoder.letters[randPos] !== "")
            decoder.letters[randPos]=""
          else {
            for (let i=0;i<decoder.letters.length;i++) {
              if (decoder.letters[i] !== "") {
                decoder.letters[i]=""
                break;
              }
            }
          }
          if (!decoder.done) {
            decoder.encode(true);
          }
          decoder.done=true;
          for (let i=0;i<decoder.letters.length;i++)
            if (decoder.letters[i] !== "") decoder.done=false;
          
          if (decoder.done) {
            clearInterval(interval);
            setTimeout(function () {
              decoder.reset();
            },250)
            
          }
        }, 150);
      
      }
    }
    let header = new Decoder(document.getElementById("header"));
    header.encode(false);
    header.decode();
  }

  componentDidMount() {
    this.onMountHeader()
  }

  handleFormChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  async handleClick(evt) {

    let startTime = new Date();
    let temp = ['> STARTING EVALUATION ... ', <br />];
    evt.preventDefault()
    
    console.log(evt.target.name)

    let pictureToProcess = evt.target.name || evt.target.id
    let pictureUrl = evt.target.id

    this.setState({
      [pictureToProcess] : temp
    })

    temp.push('processing image ...', <br />)

    let googleVisionResults;

    if (pictureToProcess === 'audienceQuestion') {
      googleVisionResults = [this.state.question, [this.state.choice1, this.state.choice2, this.state.choice3]]
    } else {
      googleVisionResults = await app(pictureUrl)
    }

    temp.push('retrieved question: ', <span className="greenify">{googleVisionResults[0]}</span>, <br />)

    this.setState(prevState => ({
      pictureToProcess: {...prevState.pictureToProcess, temp }
    }))

    let choicesJoined = googleVisionResults[1].join(', ')
    temp.push('retrieved choices: ', <span className="greenify">{choicesJoined}</span>, <br />)

    this.setState(prevState => ({
      pictureToProcess: {...prevState.pictureToProcess, temp }
    }))
    
    temp.push('running through secret sauce ...', <br />)

    let googleResults = await sendToGoogleSearch(googleVisionResults[0], googleVisionResults[1])

    this.setState(prevState => ({
      pictureToProcess: {...prevState.pictureToProcess, temp }
    }))

    temp.push('and more secret sauce ...', <br />)

    let bingResults = await sendToBingSearch(googleVisionResults[0], googleVisionResults[1])
    
    this.setState(prevState => ({
      pictureToProcess: {...prevState.pictureToProcess, temp }
    }))

    temp.push('interpreting results ...', <br />, <br />)

      // finalAnswer: Object with combined count from Google and bing
      let finalAnswer = Object.assign({}, googleResults);
      let keys = Object.keys(bingResults)
      keys.forEach(key => {
        if (finalAnswer[key]) finalAnswer[key] += bingResults[key]
      })

      // probability: Object with total probabilities
      let totalHits = Object.values(finalAnswer).reduce((a,b) => a + b)
      let probability = Object.assign({}, finalAnswer);
      Object.keys(probability).forEach(key => probability[key] = (probability[key] / totalHits).toFixed(2) )

      // answers sorted by number of hits (greatest to lowest)
      let sortedKeys;
      let certainty;
        if (googleVisionResults[0].includes('not')) {
          sortedKeys = Object.keys(finalAnswer).sort(function(a, b) { return finalAnswer[a] - finalAnswer[b] })
          certainty = `certainty: ${ 1 - probability[sortedKeys[0]]}`
        } else {
          sortedKeys = Object.keys(finalAnswer).sort(function(a, b) { return finalAnswer[a] - finalAnswer[b] }).reverse();
          certainty = `certainty: ${probability[sortedKeys[0]]}`
        }

      let topAnswer = `${sortedKeys[0]}`

    temp.push(<span className="blink_me orangeify">> Top Answer: </span>, <span className="blink_me orangeify">{topAnswer}</span>, ` ${certainty}`, <br />)

    this.setState(prevState => ({
      pictureToProcess: {...prevState.pictureToProcess, temp }
    }))

    let endTime = new Date();
    let timeDiff = endTime - startTime; //in ms
    timeDiff /= 1000; // strip the ms

    temp.push(`Run Time: ${timeDiff.toFixed(2)} seconds`, <br />)

    this.setState(prevState => ({
      pictureToProcess: {...prevState.pictureToProcess, temp }
    }))
  
    let displayResult;

    switch(pictureToProcess) {
      case 'question1':
      displayResult = topAnswer  === 'Kryptonite' ? 'CORRECT!' : 'INCORRECT!'
        break;
      case 'question2':
        displayResult = topAnswer  === 'Binary fission' ? 'CORRECT!' : 'INCORRECT!'
        break;
      case 'question3':
        displayResult = topAnswer  === 'David Hockney' ? 'CORRECT!' : 'INCORRECT!'
        break;
      case 'question4':
        displayResult = topAnswer  === 'Benjamin Harrison' ? 'CORRECT!' : 'INCORRECT!'
        break;
      case 'question5':
        displayResult = topAnswer  === 'Big Mac' ? 'CORRECT!' : 'INCORRECT!'
        break;
      default:
        displayResult = `If this is a user-generated question, can't I make anything up? CORRECT!`
        break;
    }

    if (!displayResult.includes('INCORRECT')) {
      temp.push(<span className="greenify">{displayResult}</span>, <br />)
    } else {
      temp.push(<span className="redify">{displayResult}</span>, <br />)
    }

    // temp.push(`${displayResult}`, <br />)

    this.setState(prevState => ({
      pictureToProcess: {...prevState.pictureToProcess, temp }
    }))
  }

  render() {
    return (
      <div id="welcome" className="welcome">
  
        <main>
          <header>
            <section className="hero">

              <div className="ui internally celled grid">
              
                <div className="row">
                  <div className="three wide column">
                    <img alt="question" src="https://triviapoints.files.wordpress.com/2018/02/img_6654.jpg" />
                  </div>
                  <div className="ten wide column">
                  <button className="ui top fluid button" tabIndex="0" name="question1" id="https://triviapoints.files.wordpress.com/2018/02/img_6654.jpg" onClick={this.handleClick}><i id="https://triviapoints.files.wordpress.com/2018/02/img_6654.jpg" className="sync alternate icon"></i>Evaluate Question</button>
                    <div className="ui attached segment">
                      <div>
                        <p>{this.state.question1}</p>
                      </div>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img alt="answer" src="https://triviapoints.files.wordpress.com/2018/02/img_6656.jpg" />
                  </div>
                </div>

               <div className="row">
                  <div className="three wide column">
                    <img alt="question" src="https://triviapoints.files.wordpress.com/2018/02/img_6660.jpg" />
                  </div>
                  <div className="ten wide column">
                  <button className="ui top fluid button" tabIndex="0" name="question2" id="https://triviapoints.files.wordpress.com/2018/02/img_6660.jpg" onClick={this.handleClick}><i id="https://triviapoints.files.wordpress.com/2018/02/img_6660.jpg" className="sync alternate icon"></i>Evaluate Question</button>
                    <div className="ui attached segment">
                      <div>
                        <p>{this.state.question2}</p>
                      </div>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img alt="answer" src="https://triviapoints.files.wordpress.com/2018/02/img_6663.jpg" />
                  </div>
                </div>

                <div className="row">
                  <div className="three wide column">
                    <img alt="question" src="https://triviapoints.files.wordpress.com/2018/02/img_6670.jpg" />
                  </div>
                  <div className="ten wide column">
                  <button className="ui top fluid button" tabIndex="0" name="question3" id="https://triviapoints.files.wordpress.com/2018/02/img_6670.jpg" onClick={this.handleClick}><i id="https://triviapoints.files.wordpress.com/2018/02/img_6670.jpg" className="sync alternate icon"></i>Evaluate Question</button>
                    <div className="ui attached segment">
                      <div>
                        <p>{this.state.question3}</p>
                      </div>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img alt="answer" src="https://triviapoints.files.wordpress.com/2018/02/img_6671.jpg" />
                  </div>
                </div>

                <div className="row">
                  <div className="three wide column">
                    <img alt="question" src="https://triviapoints.files.wordpress.com/2018/02/img_6672.jpg" />
                  </div>
                  <div className="ten wide column">
                  <button className="ui top fluid button" tabIndex="0" name="question4" id="https://triviapoints.files.wordpress.com/2018/02/img_6672.jpg" onClick={this.handleClick}><i id="https://triviapoints.files.wordpress.com/2018/02/img_6672.jpg" className="sync alternate icon"></i>Evaluate Question</button>
                    <div className="ui attached segment">
                      <div>
                        <p>{this.state.question4}</p>
                      </div>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img alt="answer" src="https://triviapoints.files.wordpress.com/2018/02/img_6673.jpg" />
                  </div>
                </div>

                <div className="row">
                  <div className="three wide column">
                    <img alt="question" src="https://triviapoints.files.wordpress.com/2018/02/img_6680.jpg" />
                  </div>
                  <div className="ten wide column">
                  <button className="ui top fluid button" tabIndex="0" name="question5" id="https://triviapoints.files.wordpress.com/2018/02/img_6680.jpg" onClick={this.handleClick}><i id="https://triviapoints.files.wordpress.com/2018/02/img_6680.jpg" className="sync alternate icon"></i>Evaluate Question</button>
                    <div className="ui attached segment">
                      <div>
                        <p>{this.state.question5}</p>
                      </div>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img alt="answer" src="https://triviapoints.files.wordpress.com/2018/02/img_6681.jpg" />
                  </div>
                </div>

                <div className="row">
                  <div className="three wide column">
                    {!this.state.isHidden && (
                      <div class="ui form">
                      <div class="field">
                        <label>Question:</label>
                          <input type="text" name="question" onChange={this.handleFormChange} />
                        <label>Choices:</label>
                          <input type="text" name="choice1" onChange={this.handleFormChange} />
                          <input type="text" name="choice2" onChange={this.handleFormChange} />
                          <input type="text" name="choice3" onChange={this.handleFormChange} />
                      </div>
                      <button className="ui inverted button" name="audienceQuestion" onClick={this.handleClick}>
                        Submit Me
                      </button>
                    </div>

                    )
                  }
                   <br />
                  </div>

                  <div className="ten wide column">
                  <button className="ui huge ui fluid button red" tabIndex="0" name="audienceQuestion"  onClick={this.toggleHidden.bind(this)}>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                    <i id="audienceQuestion" className="hand point down icon"></i>
                      <p id="audienceQuestion">DO NOT PRESS THIS BUTTON</p>
                  </button>

                  {!this.state.isHidden && (
                      <div className="ui attached segment">
                      <div>
                        <p>{this.state.audienceQuestion}</p>
                      </div>
                    </div>
                    )
                  }
                  </div>

                  
                  <div className="three wide column">
                    {!this.state.isHidden && (
                        <img alt="final question" src="https://www.proedgeskills.com/wp-content/uploads/2018/01/ps-questions-answers-800-500.jpg" />
                    )
                  }

                  </div>
                 
                </div>

              </div>


            </section>
          </header>
        </main>
      </div>
    )
  }
}

export default App;
