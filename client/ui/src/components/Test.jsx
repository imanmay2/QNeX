import "./css/test.css";
import { Options } from "./Options";
import { QBtn } from "./QBtn";
function Test(){
  const questions = [
  {
    questionNo: 1,
    question: "What is CS?",
    optionA: "Computer",
    optionB: "CS",
    optionC: "Computer Science",
    correctAnswer: "C",
    createdOn: "2025-06-12"
  },
  {
    questionNo: 2,
    question: "Which language runs in a web browser?",
    optionA: "Java",
    optionB: "C",
    optionC: "JavaScript",
    correctAnswer: "C",
    createdOn: "2025-06-12"
  },
  {
    questionNo: 3,
    question: "What does HTML stand for?",
    optionA: "Hyper Text Markup Language",
    optionB: "HighText Machine Language",
    optionC: "Hyperloop Machine Language",
    correctAnswer: "A",
    createdOn: "2025-06-12"
  }
];

  return(
    <div className="test">
      <QBtn/>
      <div className="main_">
        
      </div>
    </div>
  )
}

export {Test};