"use client";

import { use, useEffect, useRef, useState } from "react";

const questionsList = [
  {
    questionToAnswer: "What is your favorite color?",
    answers: ["Red", "Blue", "Green", "Yellow"],
    correctAnswers: ["Red", "Green"]
  },
  {
    questionToAnswer: "What is your favorite food?",
    answers: ["Pizza", "Pasta", "Burger", "Fries"],
    correctAnswers: ["Pizza"]
  },
  {
    questionToAnswer: "What is your favorite animal?",
    answers: ["Dog", "Cat", "Elephant", "Lion"],
    correctAnswers: ["Dog"]
  },
];



export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState([]);
  const [validatedAnswers, setValidatedAnswers] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const prevButton = useRef('prev')
  const nextButton = useRef('next')



  const removeCheckedFromList = (array, itemToRemove) => {
    return array.filter(value => value !== itemToRemove)
  }
  const handleChange = (e) => {
    e.target.checked ? setCheckedAnswers([...checkedAnswers, e.target.value]) : setCheckedAnswers(removeCheckedFromList(checkedAnswers, e.target.value))
    console.log(checkedAnswers)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const handleButton = (e, val) => {
    if (val === 'next' && currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      // insert checked Answers in Validated answers array at correct index
      let arrayToPush = validatedAnswers;

      if (validatedAnswers.length <= 0) {
        console.log('<=0')
        setValidatedAnswers([checkedAnswers])

      } else {
        console.log('sup',currentQuestionIndex)
        arrayToPush[currentQuestionIndex] = checkedAnswers
        setValidatedAnswers(arrayToPush)
      }
      setCheckedAnswers([]);
    }

    if (val === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      // if going Prev, fullfill the checked answers from validated answers
      setCheckedAnswers(validatedAnswers[currentQuestionIndex - 1])

    }

  }
useEffect(() => {
  console.log('validatedAnswers', validatedAnswers)
}, [currentQuestionIndex, checkedAnswers, validatedAnswers])

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-400/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Questionnaire&nbsp;
        </p>
      </div>
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Questionnaire</h1>
        <p className="text-gray-600">
          Please fill out the following questionnaire to the best of your
          ability.
        </p>
      </div>
      <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-5">
            <fieldset>
              <legend>{questionsList[currentQuestionIndex].questionToAnswer}</legend>
              {questionsList[currentQuestionIndex].answers.map((answer, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={answer}
                    name={answer}
                    value={answer}
                    checked={(checkedAnswers.includes(answer))}
                    onChange={handleChange}
                  />
                  <label htmlFor={answer}>{answer}</label>
                </div>
              ))}




            </fieldset>
          </div>

          <div className="flex justify-center w-full gap-5">
            <button
              type="button"
              ref={prevButton}
              onClick={(e) => handleButton(e, 'prev')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
            <button
              type="button"
              ref={nextButton}
              onClick={(e) => handleButton(e, 'next')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}


