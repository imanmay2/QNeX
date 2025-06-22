import { useEffect, useState } from "react";
import styles from "./css/testreview.module.css";
import { useParams, useLocation } from "react-router-dom";
import { Options } from "./Options";
import axios from "axios";

function TestReview() {
    let { username, id } = useParams();
    // console.log(username);
    // console.log(id);
    // let q;
    // let test;
    let [q, setQ] = useState();
    let [test, setTest] = useState();
    useEffect(() => {
        let func = async () => {
            try {
                const response1 = await axios.get(`http://localhost:8080/reviewTest/${username}/${id}`, {
                    withCredentials: true
                });
                const response2 = await axios.get(`http://localhost:8080/findTest/${id}`, {
                    withCredentials: true
                });
                // console.log(response1.data.Tests);   //ReviewTest with response.
                // console.log(response2.data.find);   //Question.
                setQ(response2.data.find);
                setTest(response1.data.Tests);
            } catch (err) {
                console.log(err.message);
            }
        }
        func();
    }, [username, id]);


    console.log(q);
    console.log(test);
    return (
        <div className={styles.testreview}>
            <Options />
            <div className={styles.main}>
                <h1 className={styles.heading}>Review Test</h1>
                <br />
                {q && q.length > 0 ? (
                    <div className={styles.testdetails}>
                        <span className={styles.testData}><p>Test: {q[0].testTitle}</p></span>
                        <span className={styles.testData}><p>Test: {q[0].testTitle}</p></span>
                        <span className={styles.testData}><p>Test: {q[0].testTitle}</p></span>
                    </div>
                ) : (
                    <div>Loading test ...</div>
                )}
            </div>
        </div>
    )
}
export { TestReview };