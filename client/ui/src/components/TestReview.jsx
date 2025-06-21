import { useEffect } from "react";
import styles from "./css/testreview.module.css";
import { useParams,useLocation } from "react-router-dom";
import { Options } from "./Options";
import axios from "axios";

function TestReview() {
    let { username,id } = useParams();
    useEffect(() => {
        let func = async () => {
            try {
                const response1 = await axios.get(`http://localhost:8080/reviewTest/${username}/${id}`);
                const response2 = await axios.get(`http://localhost:8080/findTest/${id}`);
                console.log(response1.data.find);
                console.log(response2.data.Tests);
            } catch(err) {
                
                console.log(err.message);
            }

        }
        func();
    }, [username, id]);
    return (
        <div className={styles.testreview}>
            <Options />
            <div className={styles.main}>

                <h2 className={styles.heading}>Review Test</h2>
            </div>

        </div>
    )
}
export { TestReview };