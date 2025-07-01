import { BookOpen, Brain, Sparkles } from 'lucide-react'

const StartScreen = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-full">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Mistrz Gramatyki AI
        </h1>
        
        {/* Subtitle */}
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          Zaawansowana aplikacja do nauki gramatyki angielskiej z wykorzystaniem sztucznej inteligencji
        </p>

        {/* Features */}
        <div className="mb-10 space-y-4">
          <div className="flex items-center text-left bg-slate-800/50 p-4 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" />
            <span className="text-slate-300">Interaktywne testy gramatyczne</span>
          </div>
          <div className="flex items-center text-left bg-slate-800/50 p-4 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-400 mr-3 flex-shrink-0" />
            <span className="text-slate-300">Spersonalizowane analizy błędów</span>
          </div>
          <div className="flex items-center text-left bg-slate-800/50 p-4 rounded-lg">
            <Brain className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
            <span className="text-slate-300">Generowanie testów przez AI</span>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => onNavigate('theory')}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Rozpocznij naukę
        </button>

        {/* Footer */}
        <p className="text-slate-500 text-sm mt-8">
          Ucz się gramatyki angielskiej w sposób inteligentny i efektywny
        </p>
      </div>
    </div>
  )
}

export default StartScreen