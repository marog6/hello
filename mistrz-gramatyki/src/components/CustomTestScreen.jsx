import { useState } from 'react'
import { Wand2, ArrowLeft, Loader, Lightbulb } from 'lucide-react'
import { generateCustomQuiz } from '../services/aiService'

const CustomTestScreen = ({ onNavigate }) => {
  const [topic, setTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')

  const suggestedTopics = [
    'Strona bierna (Passive Voice)',
    'Zdania warunkowe (Conditionals)',
    'Czas Present Continuous',
    'Past Perfect vs Past Simple',
    'Modal verbs (can, must, should)',
    'Future tenses (will, going to)',
    'Gerund vs Infinitive',
    'Reported speech (mowa zależna)',
    'Relative clauses (zdania względne)',
    'Comparative and superlative'
  ]

  const handleTopicClick = (suggestedTopic) => {
    setTopic(suggestedTopic)
  }

  const handleGenerateTest = async () => {
    if (!topic.trim()) {
      setError('Proszę wpisać temat testu')
      return
    }

    setError('')
    setIsGenerating(true)

    try {
      const questions = await generateCustomQuiz(topic.trim())
      onNavigate('quiz', { questions })
    } catch (error) {
      console.error('Error generating custom quiz:', error)
      setError('Wystąpił błąd podczas generowania testu. Spróbuj ponownie.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isGenerating) {
      handleGenerateTest()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('start')}
            className="text-slate-400 hover:text-white transition-colors duration-200 mb-6 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Powrót
          </button>
          
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-full">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Generator Własnych Testów
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Wpisz dowolne zagadnienie gramatyczne, a sztuczna inteligencja wygeneruje dla Ciebie spersonalizowany test
            </p>
          </div>
        </div>

        {/* Main Input Section */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
          <label htmlFor="topic" className="block text-white font-medium mb-3">
            Temat testu:
          </label>
          
          <div className="mb-4">
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="np. strona bierna, zdania warunkowe, present perfect..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 mb-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerateTest}
            disabled={isGenerating || !topic.trim()}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Generuję test AI...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 mr-2" />
                Wygeneruj test AI
              </>
            )}
          </button>
        </div>

        {/* Suggested Topics */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
            <h2 className="text-lg font-semibold text-white">Popularne tematy</h2>
          </div>
          
          <p className="text-slate-400 text-sm mb-4">
            Kliknij na jeden z poniższych tematów, aby szybko wygenerować test
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestedTopics.map((suggestedTopic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(suggestedTopic)}
                disabled={isGenerating}
                className="text-left bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 rounded-lg p-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-slate-300 text-sm">{suggestedTopic}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-700/30">
          <h3 className="text-lg font-semibold text-white mb-3">💡 Jak to działa?</h3>
          <ul className="text-slate-300 space-y-2 text-sm">
            <li>• AI przeanalizuje wybrany temat gramatyczny</li>
            <li>• Wygeneruje 10 unikalnych pytań dostosowanych do poziomu</li>
            <li>• Każde pytanie będzie zawierać szczegółowe wyjaśnienie</li>
            <li>• Test będzie w pełni interaktywny z natychmiastowym feedback</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CustomTestScreen