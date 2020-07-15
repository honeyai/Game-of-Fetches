import React, { Component } from 'react';
import axios from 'axios';
import TheAnswer from './TheAnswer';
import TheQuestion from './TheQuestion'

let index = 0;
let answer;
let theListAnswer = [];
let QuestionAnswer = [
  {
    Question: "Where was Margaery Tyrell born?",
    Answer: "characters/16",
    Path: `born`
  },
  {
    Question: "What region is House Targaryen in?",
    Answer: "houses/378",
    Path: "region"
  },
  {
    Question: "What's the coat of arms of House Lannister?",
    Answer: "houses/229",
    Path: "coatOfArms"
  },
  {
    Question: "What is the second seat of House Baratheon?",
    Answer: "houses/17",
    Path: "seats[1]"
  },
  {
    Question: "What is Robert Baratheon's second alias?",
    Answer: "characters/901",
    Path: "aliases[1]"
  },
  {
    Question: "What's the name of the founder of House Stark?",
    Answer: "houses/362",
    Path: "founder",
    pathToName: "name"
  },
  {
    Question: "What are the titles of Catelyn Stark's three POV books?",
    Answer: "characters/232",
    Path: "povBooks",
    pathToName: "name"
  },
]

class TheQuiz extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      // url: null
    }

  }

  async getResponses() {
    try {
      let response = await axios.get(`http://anapioficeandfire.com/api/${QuestionAnswer[index].Answer}`)
      let gotData = response.data;
      let myKey = QuestionAnswer[index].Path;
      for (const [key, value] of Object.entries(gotData)) {
        if (key === myKey) {
          answer = value;
        }
      }
      if (index === 5) {
        this.setState({
          url: answer.name
        })
      }
      this.setState({
        data: answer
      })
    } catch (error) {
      console.error(error.message)
    }
  }


  async getNumber6() {
    try {
      let secondResponse = await axios.get(`https://www.anapioficeandfire.com/api/characters/209`)
      let gotData = secondResponse.data;
      let myKey = QuestionAnswer[index].pathToName;
      for (const [key, value] of Object.entries(gotData)) {
        if (key === myKey) {
          answer = value;
        }
      }
      this.setState({
        data: answer
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  async getNumber7() {
    try {
      let secondResponse = await axios.get("https://anapioficeandfire.com/api/books/1");
      let thirdResponse = await axios.get("https://anapioficeandfire.com/api/books/2");
      let fourthResponse = await axios.get("https://anapioficeandfire.com/api/books/3");
      let array = [secondResponse, thirdResponse, fourthResponse];
      let myKey = QuestionAnswer[index].pathToName;
      array.forEach(index => {
        for (const [key, value] of Object.entries(index.data)) {
          if (key === myKey) {
            theListAnswer.push(value)
          }
        }
        this.setState({
          data: theListAnswer
        })
      })
    } catch(error) {
      console.error(error.message)
    }
  }

  next() {
    index++;
  }

  previous() {
    index--;
  }

  componentDidMount() {
    this.getResponses();
    if(index === 5){
      this.getNumber6();
    } else if( index === 6){
      this.getNumber7();
    }
  }

  render() {
    console.log(`this is the data,`, this.state.data)
    return (
      <div>
        <TheQuestion
          question={QuestionAnswer[index].Question}
        />
        <TheAnswer
          answer={this.state.data}
        />
      {/* <button onClick={()=> {this.previous()}}>Back</button>
      <button onClick={()=> {this.next()}}>Next</button> */}
      </div>
    );
  }
}

export default TheQuiz;