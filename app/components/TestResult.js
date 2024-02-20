import React, { useEffect, useState } from 'react'
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
  console.table(finalAnswers)
  // verify if in finalAnswers, the answer is true or false regarding the question correct answer
  useEffect(() => {
    let acc = []
    questionsList.forEach((question, index) => {
      let a = [];
      question.correctAnswers.forEach((q) => {
        if (finalAnswers[index].includes(q)) {
          a.push(true)
        } 
        if (finalAnswers[index].length === 0 || finalAnswers[index].length !== question.correctAnswers.length || !finalAnswers[index].includes(q)) {
          a.push(false)
        }
      });
      acc.push(a);
    })
    setVerifiedAnswers(acc)
  }, [finalAnswers])

  console.log(verifyAnswers, "verifyAnswers")

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-5">Test Result</h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-center mb-5">Your Answers</h2>
        {questionsList.map((question, index) => {
          return (
            <div key={index} className="mb-5">
              <h3 className="text-xl font-bold mb-2">Question n° {index + 1} : {question.questionToAnswer}</h3>
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