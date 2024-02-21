/*
-------------
Display the result of the test
-------------
*/
import React, { use, useEffect, useState } from 'react'
import Alert from './Alert'
import Button from "./Button";

const TestResult = ({ questionsList, finalAnswers, correctAnswers }) => {
  const [verifyAnswers, setVerifiedAnswers] = useState([])
  const [score, setScore] = useState(0)
  const totalQuestions = questionsList.length;

  const handleRetry = () => {
    window.location.reload()
  }

  useEffect(() => {
    let acc = []
    questionsList.forEach((question, index) => {
      let a = {};
      a.correct = [];
      a.missing = [];
      a.false = [];
      finalAnswers[index].filter((answer) => {
        if (!correctAnswers[index].includes(answer)) {
          a.false = [...a.false, answer]
        }
      })
      correctAnswers[index].forEach((q) => {
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
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-center mb-5 text-gray-800">Score : {score} / {totalQuestions}</h1>
      <div className="w-full max-w-lg">
        {questionsList.map((question, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md mb-5 p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800 ">Question n° {index + 1} : <span>{question.question}</span> </h3>
            {verifyAnswers.length > 0 && messageToDisplay(verifyAnswers[index])}
          </div>
        ))}
      </div>
      <Button name="Reessayer" color='blue' onClick={handleRetry} />
    </div>
  )
}

export default TestResult