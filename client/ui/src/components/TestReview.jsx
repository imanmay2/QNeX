import { useEffect, useState } from "react";
import styles from "./css/testreview.module.css";
import { useParams } from "react-router-dom";
import { Options } from "./Options";
import axios from "axios";

function TestReview() {
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
                setQ(response2.data.find);
                setTest(response1.data.Tests);
            } catch (err) {
                console.log(err.message);
            }
        };
        func();
    }, [username, id]);

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
                                <div className={styles.question}>
                                    Q{ques.questionNo}. {ques.question}
                                </div>
                                <div className={styles.options}>
                                    <span>A. {ques.options.option_A}</span>
                                    <span>B.  {ques.options.option_B}</span>
                                    <span>© {ques.options.option_C}</span>
                                </div>
                            </div>
                        ))}

                        <div className={styles.btnContainer}>
                            <button className={styles.btn}>⬅ Back to Review Page</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.loading}>Loading test ...</div>
                )}
            </div>
        </div>
    );
}

export { TestReview };
