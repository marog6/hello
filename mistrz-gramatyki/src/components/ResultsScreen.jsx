import { useState } from 'react'
import { Trophy, Target, RotateCcw, Brain, Sparkles, Plus, Loader } from 'lucide-react'
import { analyzeErrors, generateNewQuiz } from '../services/aiService'
import { defaultQuestions } from '../data/defaultQuestions'

const ResultsScreen = ({ onNavigate, results }) => {
  const [aiAnalysis, setAiAnalysis] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false)

  const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100)
  const wrongAnswers = results.answers.filter(answer => !answer.isCorrect)

  const getResultMessage = () => {
    if (percentage >= 90) return { message: "Doskonały wynik! Jesteś mistrzem gramatyki! 🏆", emoji: "🎉", color: "text-yellow-400" }
    if (percentage >= 80) return { message: "Świetny wynik! Bardzo dobrze opanowałeś temat! 🌟", emoji: "⭐", color: "text-green-400" }
    if (percentage >= 70) return { message: "Dobry wynik! Jesteś na dobrej drodze! 👍", emoji: "💪", color: "text-blue-400" }
    if (percentage >= 60) return { message: "Nieźle! Jeszcze trochę praktyki i będzie idealnie! 📚", emoji: "📖", color: "text-purple-400" }
    return { message: "Potrzebujesz więcej praktyki, ale nie poddawaj się! 💪", emoji: "🎯", color: "text-orange-400" }
  }

  const resultInfo = getResultMessage()

  const handleAnalyzeErrors = async () => {
    if (wrongAnswers.length === 0) return

    setIsAnalyzing(true)
    try {
      const analysis = await analyzeErrors(wrongAnswers)
      setAiAnalysis(analysis)
    } catch (error) {
      console.error('Error analyzing errors:', error)
      setAiAnalysis('Przepraszamy, wystąpił błąd podczas analizy. Spróbuj ponownie później.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleGenerateNewQuiz = async () => {
    setIsGeneratingQuiz(true)
    try {
      const newQuestions = await generateNewQuiz()
      onNavigate('quiz', { questions: newQuestions })
    } catch (error) {
      console.error('Error generating new quiz:', error)
    } finally {
      setIsGeneratingQuiz(false)
    }
  }

  const retryQuiz = () => {
    onNavigate('quiz', { questions: defaultQuestions })
  }

  // Component for rendering markdown-style text
  const renderAnalysis = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold text-white mb-4">{line.substring(2)}</h1>
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold text-blue-300 mb-3 mt-6">{line.substring(3)}</h2>
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-white mb-2">{line.slice(2, -2)}</p>
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="text-slate-300 mb-1 ml-4">{line.substring(2)}</li>
      }
      if (line.trim() === '') {
        return <br key={index} />
      }
      return <p key={index} className="text-slate-300 mb-2">{line}</p>
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Wyniki Testu</h1>
          <p className="text-slate-400">Past Simple vs Present Perfect</p>
        </div>

        {/* Results Card */}
        <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 mb-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">{resultInfo.emoji}</div>
            <div className="text-5xl font-bold text-white mb-2">
              {results.correctAnswers}/{results.totalQuestions}
            </div>
            <div className={`text-2xl font-semibold ${resultInfo.color} mb-4`}>
              {percentage}%
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">
              {resultInfo.message}
            </p>
          </div>

          {/* Progress Visualization */}
          <div className="bg-slate-700 rounded-full h-4 mb-6">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Retry Quiz */}
          <button
            onClick={retryQuiz}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Spróbuj ponownie
          </button>

          {/* Analyze Errors */}
          {wrongAnswers.length > 0 && (
            <button
              onClick={handleAnalyzeErrors}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <Loader className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Brain className="w-5 h-5 mr-2" />
              )}
              {isAnalyzing ? 'Analizuję...' : 'Analizuj moje błędy z AI'}
            </button>
          )}

          {/* Generate New Quiz */}
          <button
            onClick={handleGenerateNewQuiz}
            disabled={isGeneratingQuiz}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingQuiz ? (
              <Loader className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 mr-2" />
            )}
            {isGeneratingQuiz ? 'Generuję...' : 'Nowy test (AI)'}
          </button>
        </div>

        {/* Custom Test Generator */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-8">
          <div className="flex items-center mb-4">
            <Plus className="w-6 h-6 text-yellow-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">Stwórz własny test</h2>
          </div>
          <p className="text-slate-400 mb-4">
            Wpisz dowolne zagadnienie gramatyczne, a AI wygeneruje dla Ciebie spersonalizowany test
          </p>
          <button
            onClick={() => onNavigate('custom')}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Przejdź do generatora
          </button>
        </div>

        {/* AI Analysis */}
        {aiAnalysis && (
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-700/30 mb-8">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Analiza AI</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              {renderAnalysis(aiAnalysis)}
            </div>
          </div>
        )}

        {/* Back to Start */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('start')}
            className="text-slate-400 hover:text-white transition-colors duration-200"
          >
            ← Powrót do strony głównej
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsScreen