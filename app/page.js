"use client";

import { use, useEffect, useRef, useState } from "react";

const questionsList = [
  {
    questionToAnswer: "What is your favorite color?",
    answers: ["Red", "Blue", "Green", "Yellow"],
    correctAnswers: ["Red", "Green"],
  },
  {
    questionToAnswer: "What is your favorite food?",
    answers: ["Pizza", "Pasta", "Burger", "Fries"],
    correctAnswers: ["Pizza"],
  },
  {
    questionToAnswer: "What is your favorite animal?",
    answers: ["Dog", "Cat", "Elephant", "Lion"],
    correctAnswers: ["Dog"],
  },
];

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [validatedAnswers, setValidatedAnswers] = useState([checkedAnswers]);

  const removeCheckedFromList = (array, itemToRemove) => {
    return array.filter((value) => value !== itemToRemove);
  };


  const handleClickNext = () => {
    if (currentQuestionIndex === questionsList.length - 1) return;
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    // on next click, erase the checked answers
    setCheckedAnswers([]);
    // for the last question : if there are checked answers, insert them in validated answers
    if (validatedAnswers[currentQuestionIndex + 1] && validatedAnswers[currentQuestionIndex + 1].length > 0) {
      setCheckedAnswers(validatedAnswers[currentQuestionIndex + 1]);
    }
  };

  const handleClickPrev = () => {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    // on prev click, fullfill the checked answers from validated answers
    setCheckedAnswers(validatedAnswers[currentQuestionIndex - 1]);

  };

  const handleChangeCheckbox = (e) => {
    let isChecked = e.target.checked;
    let value = e.target.value;
    let arrayToPush = [...validatedAnswers];
    arrayToPush[currentQuestionIndex] = [...checkedAnswers, value];
    if (isChecked) {
      setCheckedAnswers([...checkedAnswers, value]);
      setValidatedAnswers(validatedAnswers[currentQuestionIndex] = arrayToPush);

    } else {
      setCheckedAnswers(removeCheckedFromList(checkedAnswers, value));
      arrayToPush[currentQuestionIndex] = removeCheckedFromList(validatedAnswers[currentQuestionIndex], value);
      setValidatedAnswers(arrayToPush)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(checkedAnswers, validatedAnswers, 'array to push')
    console.log(currentQuestionIndex, "currentQuestionIndex")

  }, [checkedAnswers, currentQuestionIndex, validatedAnswers]);

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
        <p>
          Question {currentQuestionIndex + 1} / {questionsList.length}
        </p>
      </div>
      <form className="flex flex-col w-full gap-5" onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-5">
            <fieldset>
              <legend>
                {questionsList[currentQuestionIndex].questionToAnswer}
              </legend>
              {questionsList[currentQuestionIndex].answers.map(
                (answer, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      id={answer}
                      name={answer}
                      value={answer}
                      defaultChecked={false}
                      checked={validatedAnswers[currentQuestionIndex]?.includes(answer) ? true : false}
                      onChange={handleChangeCheckbox}
                    />
                    <label htmlFor={answer}>{answer}</label>
                  </div>
                )
              )}
            </fieldset>
          </div>

          <div className="flex justify-center w-full gap-5">
            <button
              type="button"
              onClick={handleClickPrev}
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleClickNext}
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
