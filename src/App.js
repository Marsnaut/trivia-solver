import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
  }

  handleClick(evt) {
    evt.preventDefault()
    this.setState({
      [evt.target.name]: 'hi'
    })
  }

  render() {
    return (
      <div id="welcome" className="welcome">
        <main>
          <header>
            <section className="hero">

              <div class="ui internally celled grid">
              
                <div className="row">
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6654.jpg" />
                  </div>
                  <div className="ten wide column">
                  <button className="ui top fluid button olive" tabIndex="0" name="question1" onClick={this.handleClick}><i className="sync alternate icon"></i>Evaluate Question</button>
                    <div className="ui attached segment">
                      <p>
                        > STARTING EVALUATION ... <br />
                        processing image ... <br />
                        retrieved question: <br />
                        retrieved choices: <br />
                        running through secret sauce ... <br />
                        and more secret sauce... <br />
                        interpreting results ... <br />
                        <br />
                        > TOP ANSWER: David Hockney, certainty: 0.44 <br />
                        Run Time: 4.87 seconds <br />
                        <br />
                        > RESULT: Correct (within time constraint of 10 seconds) <br />
                        {/* <p>{this.state.question1}</p> */}
                      </p>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6656.jpg" />
                  </div>
                </div>

                <div className="row">
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6660.jpg" />
                  </div>
                  <div className="ten wide column">
                  <div className="ui top attached button" tabindex="0"><i className="sync alternate icon"></i>Evaluate Question</div>
                    <div className="ui attached segment">
                      <p>
                        Starting evaluation ... <br />
                        Sending to Google Vision API ... <br />
                        Retrieved Question: <br />
                        Retrieved Choices: <br />
                        Querying Source 1 ... <br />
                        Querying Source 2 ... <br />
                        Interpreting Results ... <br />
                        Top Answer: David Hockney, certainty: 0.44 <br />
                        Run Time: 4.87 seconds <br />
                        <br />
                        Checking Answer ... <br />
                        ANSWERED CORRECTLY <br />
                      </p>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6663.jpg" />
                  </div>
                </div>

                <div className="row">
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6670.jpg" />
                  </div>
                  <div className="ten wide column">
                  <div className="ui top attached button" tabindex="0"><i className="sync alternate icon"></i>Evaluate Question</div>
                    <div className="ui attached segment">
                      <p>
                        Starting evaluation ... <br />
                        Sending to Google Vision API ... <br />
                        Retrieved Question: <br />
                        Retrieved Choices: <br />
                        Querying Source 1 ... <br />
                        Querying Source 2 ... <br />
                        Interpreting Results ... <br />
                        Top Answer: David Hockney, certainty: 0.44 <br />
                        Run Time: 4.87 seconds <br />
                        <br />
                        Checking Answer ... <br />
                        ANSWERED CORRECTLY <br />
                      </p>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6671.jpg" />
                  </div>
                </div>

                <div className="row">
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6672.jpg" />
                  </div>
                  <div className="ten wide column">
                  <div className="ui top attached button" tabindex="0"><i className="sync alternate icon"></i>Evaluate Question</div>
                    <div className="ui attached segment">
                      <p>
                        Starting evaluation ... <br />
                        Sending to Google Vision API ... <br />
                        Retrieved Question: <br />
                        Retrieved Choices: <br />
                        Querying Source 1 ... <br />
                        Querying Source 2 ... <br />
                        Interpreting Results ... <br />
                        Top Answer: David Hockney, certainty: 0.44 <br />
                        Run Time: 4.87 seconds <br />
                        <br />
                        Checking Answer ... <br />
                        ANSWERED CORRECTLY <br />
                      </p>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6673.jpg" />
                  </div>
                </div>

                <div className="row">
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6680.jpg" />
                  </div>
                  <div className="ten wide column">
                  <div className="ui top attached button" tabindex="0"><i className="sync alternate icon"></i>Evaluate Question</div>
                    <div className="ui attached segment">
                      <p>
                        Starting evaluation ... <br />
                        Sending to Google Vision API ... <br />
                        Retrieved Question: <br />
                        Retrieved Choices: <br />
                        Running through Secret Sauce ... <br />
                        And more Secret Sauce... <br />
                        Interpreting Results ... <br />
                        Top Answer: David Hockney, certainty: 0.44 <br />
                        Run Time: 4.87 seconds <br />
                        <br />
                        Checking Answer ... <br />
                        ANSWERED CORRECTLY <br />
                      </p>
                    </div>
                  </div>
                  <div className="three wide column">
                    <img src="https://triviapoints.files.wordpress.com/2018/02/img_6681.jpg" />
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
