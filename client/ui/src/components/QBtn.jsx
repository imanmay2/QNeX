import "./css/QBtn.css";


function QBtn({questions_,setQ}) {


    return (
        <div className="QBtn">
            <span className="tag_head">QNeX</span>
            <div className="QuestionBtn">
                {questions_.map((question)=>{
                    return(
                        <div className="trackQ" id={question.questionNo} onClick={()=>setQ(question.questionNo-1)}>
                            {question.questionNo}
                        </div>
                    )
                })}
            </div>  
        </div>
    );
}

export {QBtn};