import React from 'react'

const alertStyle = {
  info: {
    className: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
    message: "Info alert! Change a few things up and try submitting again."
  },
  danger: {
    className: "text-red-600   dark:text-red-600",
    message: "Mauvaise réponse(s)"
  },
  success: {
    className: "text-green-600   dark:text-green-600",
    message: "Bonne réponse(s)"
  },
  warning: {
    className: "text-yellow-600   dark:text-red-600",
    message: "La réponse est  incomplète"
  },


}


const Alert = ({ type }) => {
  const { className, message } = alertStyle[type]
  return (

    <div className={className} role="alert">
      <span className="font-medium text">{message}</span>
    </div>



  )
}

export default Alert