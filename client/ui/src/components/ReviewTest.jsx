import "./css/reviewTest.css";
import { Options } from "./Options";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ReviewTest() {
  const testData = [
    {
      testName: "Data Structures and Algorithm",
      createdOn: "9th June 2025",
      attemptedOn: "10th June 2025",
      scoreText: "8/10",
      percentage: 80
    },
    {
      testName: "JavaScript Basics",
      createdOn: "5th June 2025",
      attemptedOn: "6th June 2025",
      scoreText: "7/10",
      percentage: 70
    },
    {
      testName: "ReactJS Intermediate",
      createdOn: "3rd June 2025",
      attemptedOn: "4th June 2025",
      scoreText: "9/10",
      percentage: 90
    },
    {
      testName: "Python OOP Concepts",
      createdOn: "1st June 2025",
      attemptedOn: "2nd June 2025",
      scoreText: "6/10",
      percentage: 60
    },
    {
      testName: "Database Management",
      createdOn: "28th May 2025",
      attemptedOn: "29th May 2025",
      scoreText: "10/10",
      percentage: 100
    },
    {
      testName: "HTML & CSS",
      createdOn: "27th May 2025",
      attemptedOn: "28th May 2025",
      scoreText: "5/10",
      percentage: 50
    },
    {
      testName: "Operating Systems",
      createdOn: "25th May 2025",
      attemptedOn: "26th May 2025",
      scoreText: "7/10",
      percentage: 70
    },
    {
      testName: "Computer Networks",
      createdOn: "23rd May 2025",
      attemptedOn: "24th May 2025",
      scoreText: "6/10",
      percentage: 60
    }
  ];

  return (
    <div className="reviewTest">
      <Options />
      <div className="main">
        <span>Tests</span>
         <div className="tests">
        {testData.map(({ testName, createdOn, attemptedOn, scoreText, percentage }, i) => {
          return (

           
              <div className="testCard"  key={i}>
                <div className="testInfo">
                  <p><strong>Test:</strong>{testName}</p>
                  <p><strong>Created on:</strong>{createdOn}</p>
                  <p><strong>Attempted on:</strong>{attemptedOn}</p>
                  <span className="btn">Review Test</span>
                </div>
                <div className="progressContainer">
                  <CircularProgressbar
                    value={percentage}
                    text={scoreText}
                    styles={buildStyles({
                      textColor: "#5BA4E7",
                      pathColor: "#5BA4E7",
                      trailColor: "#e0e0e0"
                    })}
                  />
                </div>
              </div>
            
          )

        })}
        </div>
      </div>
    </div>
  );
}

export { ReviewTest };
