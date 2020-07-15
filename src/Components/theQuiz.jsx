import React, { Component } from 'react';
import axios from 'axios';
import TheAnswer from './TheAnswer';
import TheQuestion from './TheQuestion'

let index = 5;
let answer;
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
    url: null,
    pathToName: "name"
  },
  {
    Question: "What are the titles of Catelyn Stark's three POV books?",
    Answer: "characters/232"
  },
]

class TheQuiz extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
      url: null
    }

  }

  async getResponses() {
    try {
      let response = await axios.get(`http://anapioficeandfire.com/api/${QuestionAnswer[index].Answer}`)
      let gotData = response.data;
      let myKey = QuestionAnswer[index].Path;
      for(const [key, value] of Object.entries(gotData)) {
        if (key === myKey) {
          answer = value;
        }
      }
      if(index === 5) {
        this.setState({
          url: answer
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
      let secondResponse = await axios.get(answer)
      let gotData = secondResponse.data;
      let myKey = QuestionAnswer[index].pathToName;
      for(const [key, value] of Object.entries(gotData)) {
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


  componentDidMount() {
    this.getResponses();
    if(this.state.data.url){
      this.getNumber6();
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
      </div>
    );
  }
}

export default TheQuiz;