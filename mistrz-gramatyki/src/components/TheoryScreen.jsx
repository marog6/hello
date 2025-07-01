import { ArrowRight, Clock, CheckCircle, Calendar } from 'lucide-react'

const TheoryScreen = ({ onNavigate }) => {
  const handleStartQuiz = () => {
    // Import default questions and start quiz
    import('../data/defaultQuestions').then(module => {
      onNavigate('quiz', { questions: module.defaultQuestions })
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            Past Simple vs Present Perfect
          </h1>
          <p className="text-slate-400 text-lg">
            Zrozum różnice między tymi czasami przed rozpoczęciem testu
          </p>
        </div>

        {/* Theory Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Past Simple */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Past Simple</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-blue-300 mb-2">Kiedy używamy:</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Czynności zakończone w przeszłości</li>
                  <li>• Konkretny moment w przeszłości</li>
                  <li>• Rutyna w przeszłości</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-blue-300 mb-2">Słowa kluczowe:</h3>
                <div className="flex flex-wrap gap-2">
                  {['yesterday', 'last week', 'in 2020', 'ago', 'when'].map(word => (
                    <span key={word} className="bg-blue-900/30 text-blue-200 px-2 py-1 rounded text-xs">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-blue-300 mb-2">Przykłady:</h3>
                <div className="bg-slate-900/50 p-3 rounded text-sm text-slate-200">
                  <p>• I <span className="text-blue-300 font-medium">visited</span> Paris last year.</p>
                  <p>• She <span className="text-blue-300 font-medium">worked</span> there for 5 years.</p>
                  <p>• We <span className="text-blue-300 font-medium">didn't see</span> the movie yesterday.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Present Perfect */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Present Perfect</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-green-300 mb-2">Kiedy używamy:</h3>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• Doświadczenia życiowe (bez konkretnego czasu)</li>
                  <li>• Czynności z efektem w teraźniejszości</li>
                  <li>• Czynności rozpoczęte w przeszłości i trwające</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-green-300 mb-2">Słowa kluczowe:</h3>
                <div className="flex flex-wrap gap-2">
                  {['ever', 'never', 'just', 'already', 'yet', 'since', 'for'].map(word => (
                    <span key={word} className="bg-green-900/30 text-green-200 px-2 py-1 rounded text-xs">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-green-300 mb-2">Przykłady:</h3>
                <div className="bg-slate-900/50 p-3 rounded text-sm text-slate-200">
                  <p>• I <span className="text-green-300 font-medium">have visited</span> Paris many times.</p>
                  <p>• She <span className="text-green-300 font-medium">has worked</span> here since 2018.</p>
                  <p>• We <span className="text-green-300 font-medium">haven't seen</span> the movie yet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Differences */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-700/30 mb-8">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-purple-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">Kluczowe różnice</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-purple-300 font-medium mb-2">Past Simple:</h3>
              <p className="text-slate-300 text-sm">
                <span className="text-blue-300 font-medium">"When"</span> - konkretny moment w przeszłości jest ważny
              </p>
            </div>
            <div>
              <h3 className="text-purple-300 font-medium mb-2">Present Perfect:</h3>
              <p className="text-slate-300 text-sm">
                <span className="text-green-300 font-medium">"Experience"</span> - efekt lub doświadczenie jest ważne
              </p>
            </div>
          </div>
        </div>

        {/* Start Quiz Button */}
        <div className="text-center">
          <button
            onClick={handleStartQuiz}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Rozpocznij test
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TheoryScreen