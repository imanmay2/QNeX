import "./css/QBtn.css";


function QBtn() {
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
  },
  {
    questionNo: 4,
    question: "What is CS?",
    optionA: "Computer",
    optionB: "CS",
    optionC: "Computer Science",
    correctAnswer: "C",
    createdOn: "2025-06-12"
  },
  {
    questionNo: 5,
    question: "Which language runs in a web browser?",
    optionA: "Java",
    optionB: "C",
    optionC: "JavaScript",
    correctAnswer: "C",
    createdOn: "2025-06-12"
  },
  {
    questionNo: 6,
    question: "What does HTML stand for?",
    optionA: "Hyper Text Markup Language",
    optionB: "HighText Machine Language",
    optionC: "Hyperloop Machine Language",
    correctAnswer: "A",
    createdOn: "2025-06-12"
  }
];

    return (
        <div className="QBtn">
            <span className="tag_head">QNeX</span>
            <div className="QuestionBtn">
                {questions.map((question)=>{
                    return(
                        <div className="trackQ" id={question.questionNo}>
                            {question.questionNo}
                        </div>
                    )
                })}
            </div>
            
        </div>
    );
}

export {QBtn};