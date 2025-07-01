import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StartScreen from './components/StartScreen'
import TheoryScreen from './components/TheoryScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'
import CustomTestScreen from './components/CustomTestScreen'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('start')
  const [quizResults, setQuizResults] = useState(null)
  const [currentQuestions, setCurrentQuestions] = useState([])

  const navigateToScreen = (screen, data = null) => {
    setCurrentScreen(screen)
    if (data) {
      if (data.results) setQuizResults(data.results)
      if (data.questions) setCurrentQuestions(data.questions)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {currentScreen === 'start' && (
        <StartScreen onNavigate={navigateToScreen} />
      )}
      {currentScreen === 'theory' && (
        <TheoryScreen onNavigate={navigateToScreen} />
      )}
      {currentScreen === 'quiz' && (
        <QuizScreen 
          onNavigate={navigateToScreen} 
          questions={currentQuestions}
        />
      )}
      {currentScreen === 'results' && (
        <ResultsScreen 
          onNavigate={navigateToScreen} 
          results={quizResults}
        />
      )}
      {currentScreen === 'custom' && (
        <CustomTestScreen onNavigate={navigateToScreen} />
      )}
    </div>
  )
}

export default App
