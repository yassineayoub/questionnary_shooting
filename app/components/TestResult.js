import React, { use, useEffect, useState } from 'react'
import Alert from './Alert'
/*


*/
const TestResult = ({ questionsList, finalAnswers }) => {
  const [verifyAnswers, setVerifiedAnswers] = useState([])
  const [score, setScore] = useState(0)
  const totalQuestions = questionsList.length;
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
        }
      });
      acc.push(a);
    })
    setVerifiedAnswers(acc)
  }, [finalAnswers, questionsList])
  useEffect(() => {
    let score = 0;
    verifyAnswers.forEach((question) => {
      if (question.false.length === 0 && question.missing.length === 0) {
        score++
      }
    })
    setScore(score)
  }, [verifyAnswers])

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
      <h1 className="text-4xl font-bold text-center mb-5">Score : {score} / {totalQuestions}</h1>
      <div className="flex flex-col  justify-center">
        {questionsList.map((question, index) => {
          return (
            <div key={index} className="mb-5">

              <h3 className="text-xl font-bold mb-2">Question n° {index + 1} : {question.questionToAnswer}</h3>
              <span>{verifyAnswers.length > 0 && messageToDisplay(verifyAnswers[index])}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TestResult