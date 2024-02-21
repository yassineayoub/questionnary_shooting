"use client";

import { useEffect, useState } from "react";
import Button from "./components/Button";
import TestResult from "./components/TestResult";

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
    correctAnswers: ["Dog", "Elephant"],
  },
];

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validatedAnswers, setValidatedAnswers] = useState([checkedAnswers]);

  const removeCheckedFromList = (array, itemToRemove) => {
    return array.filter((value) => value !== itemToRemove);
  };


  const handleClickNext = () => {
    if (currentQuestionIndex === questionsList.length - 1) return;
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    // on next click, erase the checked answers
    setValidatedAnswers([...validatedAnswers, checkedAnswers])
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
    setIsSubmitted(true);
  };

  useEffect(() => {
    console.log(checkedAnswers, validatedAnswers, 'array to push')
    console.log(currentQuestionIndex, "currentQuestionIndex")

  }, [checkedAnswers, currentQuestionIndex, validatedAnswers]);

  return (



    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Questionnaire</h1>
        <p className="text-gray-600">Les questions sont à choix multiples. Vous pouvez cocher plusieurs réponses.</p>
      </div>

      <form className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8" onSubmit={handleSubmit}>
        <p className="text-gray-700 mb-4">
          Question {currentQuestionIndex + 1} / {questionsList.length}
        </p>

        <div className="mb-6">
          <fieldset>
            <legend className="font-bold mb-4 text-gray-800">{questionsList[currentQuestionIndex].questionToAnswer}</legend>
            {questionsList[currentQuestionIndex].answers.map((answer, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={answer}
                  className="mr-2"
                  name={answer}
                  value={answer}
                  checked={validatedAnswers[currentQuestionIndex]?.includes(answer) ? true : false}
                  onChange={handleChangeCheckbox}
                />
                <label htmlFor={answer} className="text-gray-800">{answer}</label>
              </div>
            ))}
          </fieldset>
        </div>
        {currentQuestionIndex === 0
          ? <div className="flex justify-end">
            <Button name="Suivant" color="cyan" onClick={handleClickNext} />
          </div>

          : <div className="flex justify-between">
            <Button name="Précédent" color="cyan" onClick={handleClickPrev} />
            {currentQuestionIndex + 1 !== questionsList.length
              ? <Button name="Suivant" color="cyan" onClick={handleClickNext} />
              : <Button name="Terminer" color="red" onClick={handleSubmit} />
            }
          </div>
        }
      </form>

      {isSubmitted && <TestResult questionsList={questionsList} finalAnswers={validatedAnswers} />}
    </main>
  );
}
