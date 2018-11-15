# Black Box Trivia

Built for a Stackathon project at Fullstack Academy in 4 days. [Stackathon Presentation](https://www.youtube.com/watch?v=WeijjGtC30Y&list=PLx0iOsdUOUmnmSuYRD63kcCzzr5hpr3cW)


## Overview:
This is a Single-Page Application (SPA) that uses React, with an optical character recoginition (OCR) API and search APIs, to find answers to common trivia questions. A list of five pre-populated questions/answers is shown from a popular game called Trivia HQ. 

The app is not fully optimized and should be used for simple questions. At the bottom, you are able to test your own question and answers to check the accuracy of the app.

## Demo:
General Demo

![General Demo](https://i.imgur.com/KPMZwm9.gif)

Single Question

![Single Question](https://i.imgur.com/ZYYJYMr.gif)

Custom Question with edge case

![Custom Question](https://i.imgur.com/OBHRTCB.gif)

## Start the App:
* Clone this repository and then cd into it.
* Run `npm i` to download all dependencies
* After all the dependencies are downloaded and installed, type `npm start` to automatically open the app.

## API Keys:
* The following APIs were used:
  * Google Vision
  * Google Custom Search
  * Bing Search

* If you have your own API keys, you can go to create a file to store your environmental variables and pass them to the front-end.


## Notes:
* The server is configured to automatically open the app in your browser, thanks to Facebook's [Create-React-App](https://github.com/facebook/create-react-app). 

* The browser should automatically open Black Box Trivia for you. If it doesn't load, please navigate directly to [http://localhost:3000/](http://localhost:3000/)
