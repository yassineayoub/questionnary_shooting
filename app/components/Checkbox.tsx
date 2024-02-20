// /* eslint-disable react/no-unescaped-entities */
// import React, { use, useEffect, useRef, useState } from "react";



// const Checkbox = ({
//   questions,
//   currentQuestion,
//   setAnswers,
//   answers,
//   resetBox,
//   setResult,
//   result,
// }) => {
//   const current = questions[currentQuestion];
//   const [isChecked, setIsChecked] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(currentQuestion);

//   const handleChange = (e) => {
//     console.log(e.target.value, e.target.checked);
//     e.target.checked
//       ? setResult(...result,{ value :e.target.value})
//       : setResult(result.filter((answer) => answer.value !== e.target.value));
//   };
//   useEffect(() => {
//     console.log(result, answers, "answers");
//   }, [result, answers]);

//   return (
//     <div className="mb-5">
//       <fieldset>
//         <legend>{current.question}</legend>
//         {current.answers.map((answer, index) => (
//           <div key={index}>
//             <input
//               type="checkbox"
//               id={answer}
//               name={answer}
//               value={answer}
//               checked={
//                 result.includes(answer) ||
//                 (answers[currentIndex]
//                   ? answers[currentIndex].includes(answer)
//                   : false)
//               }
//               onChange={handleChange}
//             />
//             <label htmlFor={answer}>{answer}</label>
//           </div>
//         ))}
//       </fieldset>
//     </div>
//   );
// };

// export default Checkbox;
