"use client";

import { useEffect, useState } from "react";

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

  const handleChange = (e) => {
    if (e.target.checked) console.log(e.target.value)
    else console.log(e.target.value + ' inchecked')

  }
  const handleSubmit = (e) => {
    e.preventDefault();

  };

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
                    onChange={handleChange}
                  />
                  <label htmlFor={answer}>{answer}</label>
                </div>
              ))}




            </fieldset>
          </div>

          <div className="flex justify-center w-full gap-5">
            <button
              onClick={() => currentQuestionIndex > 0
                ? setCurrentQuestionIndex(currentQuestionIndex - 1)
                : ""}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => currentQuestionIndex < questionsList.length - 1 ? setCurrentQuestionIndex(currentQuestionIndex + 1) : ''}
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


