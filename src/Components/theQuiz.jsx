import React, { Component } from 'react';
import axios from 'axios';
import TheAnswer from './TheAnswer';
import TheQuestion from './TheQuestion'

// let Answer = `characters/16`
let QuestionAnswer = [
  { Question: "Where was Margaery Tyrell born?", 
    Answer: "characters/16",
    Path: String.raw`born`
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
    Path: "founder.name"
  },
  {
    Question: "What are the titles of Catelyn Stark's three POV books?",
    Answer: "characters/232"},
]

class TheQuiz extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
    }
        
  }
  // for (const [key, value] of Object.entries(object1)) {
  //   console.log(`${key}: ${value}`);
  // }

  componentDidMount() {
    axios.get(`http://anapioficeandfire.com/api/${QuestionAnswer[1].Answer}`)
      .then(response => {
        const gotData = response.data;
        let myKey = QuestionAnswer[1].Path;
        let answer;
        for (const [key, value] of Object.entries(gotData)) {
          if (key === myKey){
            answer = value;
          }
        }
        this.setState({
          data: answer
        })
      })
  }


  render() {
    console.log(`this is the data,`, this.state.data)
    return (
      <div>
        <TheQuestion
        question={QuestionAnswer[1].Question}
        />
        <TheAnswer
         answer={this.state.data}
        />
      </div>
    );
  }
}

export default TheQuiz;