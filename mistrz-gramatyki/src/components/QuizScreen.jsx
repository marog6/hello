import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react'

const QuizScreen = ({ onNavigate, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState([])
  const [isAnswered, setIsAnswered] = useState(false)

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    setShowExplanation(true)

    // Record the answer
    const newAnswer = {
      questionId: question.id,
      selectedAnswer: answerIndex,
      correctAnswer: question.correct,
      isCorrect: answerIndex === question.correct,
      question: question.sentence,
      explanation: question.explanation
    }

    setAnswers(prev => [...prev, newAnswer])
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setIsAnswered(false)
    } else {
      // Quiz completed, go to results
      const results = {
        totalQuestions: questions.length,
        correctAnswers: answers.filter(a => a.isCorrect).length + (selectedAnswer === question.correct ? 1 : 0),
        answers: [...answers, {
          questionId: question.id,
          selectedAnswer: selectedAnswer,
          correctAnswer: question.correct,
          isCorrect: selectedAnswer === question.correct,
          question: question.sentence,
          explanation: question.explanation
        }]
      }
      onNavigate('results', { results })
    }
  }

  const getOptionClass = (optionIndex) => {
    if (!isAnswered) {
      return 'bg-slate-700 hover:bg-slate-600 border-slate-600 hover:border-slate-500'
    }

    if (optionIndex === question.correct) {
      return 'bg-green-600 border-green-500 text-white'
    }

    if (optionIndex === selectedAnswer && optionIndex !== question.correct) {
      return 'bg-red-600 border-red-500 text-white'
    }

    return 'bg-slate-700 border-slate-600 opacity-50'
  }

  const getOptionIcon = (optionIndex) => {
    if (!isAnswered) return null

    if (optionIndex === question.correct) {
      return <CheckCircle className="w-5 h-5" />
    }

    if (optionIndex === selectedAnswer && optionIndex !== question.correct) {
      return <XCircle className="w-5 h-5" />
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header with Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">
              Past Simple vs Present Perfect
            </h1>
            <span className="text-slate-400">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
          <h2 className="text-xl font-medium text-white mb-6">
            Wybierz prawidłową odpowiedź:
          </h2>
          
          <div className="text-lg text-slate-200 mb-6 leading-relaxed">
            {question.sentence}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${getOptionClass(index)}`}
              >
                <span className="font-medium">{option}</span>
                {getOptionIcon(index)}
              </button>
            ))}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-700/30 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Wyjaśnienie:</h3>
            <p className="text-slate-200 leading-relaxed">{question.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div className="text-center">
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              {currentQuestion < questions.length - 1 ? 'Następne pytanie' : 'Zobacz wyniki'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizScreen