import React, { useEffect, useState } from 'react'
import Alert from './Alert'
/*
exemple de rendu : 
Question 1 : nom de la question (coche vert si juste, rouge si faux)  
Question 2 : nom de la question (coche vert si juste, rouge si faux) ect...

const questionsList = [
  {
    questionToAnswer: "What is your favorite color?",
    answers: ["Red", "Blue", "Green", "Yellow"],
    correctAnswers: ["Red", "Green"],
  },

*/
const TestResult = ({ questionsList, finalAnswers }) => {
  const [verifyAnswers, setVerifiedAnswers] = useState([])
  // verify if in finalAnswers, the answer is true or false regarding the question correct answer
  useEffect(() => {
    let acc = []
    questionsList.forEach((question, index) => {
      let a = {};
      a.correct = [];
      a.missing = [];
      a.false = [];

      finalAnswers[index].filter((answer) => {
        if (!question.correctAnswers.includes(answer)) {
          a.false = [...a.false, answer]
        }
      })
      question.correctAnswers.forEach((q) => {
        if (finalAnswers[index]) {
          if (finalAnswers[index]?.includes(q)) {

            a.correct = [...a.correct, q];
          }
          if (!finalAnswers[index]?.includes(q)) {

            a.missing = [...a.missing, q];
          }
          // filtrer les reponse avec .filter  et comparer avec les correctAnswers
          // si la reponse est dans les correctAnswers, alors c'est une bonne reponse
          // si la reponse n'est pas dans les correctAnswers, alors c'est une mauvaise reponse

        }
      });
      acc.push(a);
    })
    setVerifiedAnswers(acc)
  }, [finalAnswers, questionsList])

  console.log(verifyAnswers, "verifyAnswers")

  const messageToDisplay = (verifyAnswers) => {
    if (verifyAnswers.missing?.length > 0 && verifyAnswers.correct?.length > 0) {
      return <Alert type="warning" />
    } else if (verifyAnswers.missing?.length > 0 && verifyAnswers.correct?.length === 0 || verifyAnswers.false?.length > 0) {
      return <Alert type="danger" />
    } else if (verifyAnswers.correct?.length > 0 && verifyAnswers.missing?.length === 0) {
      return <Alert type="success" />
    }

  }


  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-5">Test Result</h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-center mb-5">Your Answers</h2>
        {questionsList.map((question, index) => {
          return (
            <div key={index} className="mb-5">
              <h3 className="text-xl font-bold mb-2">Question n° {index + 1} : {question.questionToAnswer}</h3>
              {/* incomplète answers */}
              { verifyAnswers.length > 0 && messageToDisplay(verifyAnswers[index])}





              <ul>
                {question.answers.map((answer, index) => {
                  return (
                    <li key={index} className="mb-2">
                      {finalAnswers[index] ? <span className="text-green-500 font-bold">{answer}</span> : <span className="text-red-500 font-bold">{answer}</span>}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TestResult