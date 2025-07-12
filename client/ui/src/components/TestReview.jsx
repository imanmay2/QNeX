import { useEffect, useState } from "react";
import styles from "./css/testreview.module.css";
import { useParams } from "react-router-dom";
import { Options } from "./Options";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function TestReview() {
    const navigate = useNavigate();
    useEffect(()=>{
        let auth=(async()=>{
            try{
                let response=await axios.get("http://localhost:8080/authenticate",{withCredentials:true});
            if(response.data.flag==="false"){
                navigate("/");
                return;
            }
           
            } catch(err){
                console.error(err.message);
            }

        })

        auth();
    },[navigate])
    const { username, id } = useParams();
    const [q, setQ] = useState();
    const [test, setTest] = useState();

    useEffect(() => {
        const func = async () => {
            try {
                const response1 = await axios.get(`http://localhost:8080/reviewTest/${username}/${id}`, {
                    withCredentials: true
                });
                const response2 = await axios.get(`http://localhost:8080/findTest/${id}`, {
                    withCredentials: true
                });

                setTest(response1.data.Tests);
                setQ(response2.data.find);

                console.log(q);
                console.log(test);
            } catch (err) {
                console.log(err.message);
            }
        };
        func();
    }, [username, id]);
    let [tracker, setTracker] = useState(-1);
    return (
        <div className={styles.testreview}>
            <Options />
            <div className={styles.main}>
                <h1 className={styles.heading}>📝 Review Test</h1>

                {q && q.length > 0 ? (
                    <div className={styles.margin}>
                        <div className={styles.analyze}>Start Analyzing Your Test</div>
                        {q[0].questions_.map((ques, index) => (
                            <div key={index} className={styles.Q_}>
                                {/* {setTracker(tracker+1)} */}
                                <div className={styles.question}>
                                    Q{ques.questionNo}. {ques.question}
                                </div>
                                <div className={`${styles.options}`}>

                                    {/* Use ternary for comparasion */}
                                    <span className={
                                        'A' === ques.ans
                                            ? styles.correctanswer
                                            : ('A' === test[0].response[index]
                                                ? styles.wronganswer
                                                : "")
                                    }>
                                        A. {ques.options.option_A}
                                    </span>

                                    <span className={
                                        'B' === ques.ans
                                            ? styles.correctanswer
                                            : ('B' === test[0].response[index]
                                                ? styles.wronganswer
                                                : "")
                                    }>
                                        B. {ques.options.option_B}
                                    </span>

                                    <span className={
                                        'C' === ques.ans
                                            ? styles.correctanswer
                                            : ('C' === test[0].response[index]
                                                ? styles.wronganswer
                                                : "")
                                    }>
                                        C. {ques.options.option_C}
                                    </span>

                                </div>
                            </div>
                        ))}

                        <div className={styles.btnContainer}>
                            <button className={styles.btn}>⬅ Back to Review Page</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.loading}>Loading Test....</div>
                )}
            </div>
        </div>
    );
}

export { TestReview };