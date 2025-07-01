import { GoogleGenerativeAI } from '@google/generative-ai'

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

let genAI = null

// Initialize AI service automatically if API key is available
if (API_KEY && API_KEY !== 'your_api_key_here') {
  genAI = new GoogleGenerativeAI(API_KEY)
  console.log('✅ Gemini AI initialized successfully')
} else {
  console.warn('⚠️ Gemini API key not configured. AI features will use mock data.')
  console.warn('To enable AI features, add your API key to .env file as VITE_GEMINI_API_KEY')
}

// Initialize AI service (can be called manually if needed)
export const initializeAI = (apiKey) => {
  genAI = new GoogleGenerativeAI(apiKey)
  console.log('✅ Gemini AI initialized with provided key')
}

export const analyzeErrors = async (wrongAnswers) => {
  if (!genAI) {
    return generateMockErrorAnalysis(wrongAnswers)
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    Jesteś ekspertem od gramatyki angielskiej. Użytkownik popełnił błędy w teście dotyczącym różnic między Past Simple a Present Perfect. 

    Oto błędne odpowiedzi:
    ${wrongAnswers.map(answer => `
    Pytanie: ${answer.question}
    Wybrana odpowiedź: ${answer.selectedAnswer}
    Prawidłowa odpowiedź: ${answer.correctAnswer}
    `).join('\n')}

    Przeanalizuj te błędy i napisz szczegółową analizę w języku polskim, która zawiera:

    1. **Główne problemy** - zidentyfikuj wzorce w błędach
    2. **Spersonalizowane porady** - konkretne wskazówki dla tego użytkownika
    3. **Dodatkowe przykłady** - 2-3 przykłady podobne do popełnionych błędów
    4. **Plan nauki** - kroki które pomogą uniknąć tych błędów w przyszłości

    Formatuj odpowiedź używając Markdown (nagłówki, listy, pogrubienia).
    `

    const result = await model.generateContent(prompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error('Error analyzing with AI:', error)
    return generateMockErrorAnalysis(wrongAnswers)
  }
}

export const generateNewQuiz = async (topic = 'Past Simple vs Present Perfect') => {
  if (!genAI) {
    return generateMockQuestions()
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    Wygeneruj 10 nowych pytań testowych na temat: "${topic}" w języku angielskim z wyjaśnieniami w języku polskim.

    Format odpowiedzi to JSON array z obiektami zawierającymi:
    - id: numer pytania (1-10)
    - sentence: zdanie z luką oznaczoną jako ______
    - options: array z dwoma opcjami odpowiedzi
    - correct: indeks prawidłowej odpowiedzi (0 lub 1)
    - explanation: szczegółowe wyjaśnienie po polsku dlaczego ta odpowiedź jest prawidłowa

    Przykład formatu:
    [
      {
        "id": 1,
        "sentence": "I ______ there yesterday.",
        "options": ["went", "have gone"],
        "correct": 0,
        "explanation": "Używamy Past Simple..."
      }
    ]

    Pytania powinny być różnorodne i testować różne aspekty tematu. Zwróć tylko JSON bez dodatkowego tekstu.
    `

    const result = await model.generateContent(prompt)
    const response = result.response.text()
    
    // Clean the response to extract only JSON
    const jsonMatch = response.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error('Invalid JSON response')
    }
  } catch (error) {
    console.error('Error generating quiz with AI:', error)
    return generateMockQuestions()
  }
}

export const generateCustomQuiz = async (topic) => {
  if (!genAI) {
    return generateMockCustomQuestions(topic)
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    const prompt = `
    Wygeneruj 10 pytań testowych na temat gramatyki angielskiej: "${topic}".

    Wymagania:
    - Pytania w języku angielskim
    - Wyjaśnienia w języku polskim
    - Różnorodność poziomów trudności
    - Praktyczne przykłady

    Format odpowiedzi to JSON array z obiektami zawierającymi:
    - id: numer pytania (1-10)
    - sentence: zdanie z luką oznaczoną jako ______
    - options: array z dwoma opcjami odpowiedzi
    - correct: indeks prawidłowej odpowiedzi (0 lub 1)
    - explanation: szczegółowe wyjaśnienie po polsku

    Zwróć tylko JSON bez dodatkowego tekstu.
    `

    const result = await model.generateContent(prompt)
    const response = result.response.text()
    
    // Clean the response to extract only JSON
    const jsonMatch = response.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error('Invalid JSON response')
    }
  } catch (error) {
    console.error('Error generating custom quiz with AI:', error)
    return generateMockCustomQuestions(topic)
  }
}

// Mock functions for demo purposes
const generateMockErrorAnalysis = (wrongAnswers) => {
  return `
# 📊 Analiza Twoich Błędów

## Główne Problemy
Popełniłeś **${wrongAnswers.length}** błędów w teście. Oto główne wzorce:

- **Problem z określaniem czasu**: Trudności z rozpoznawaniem, czy czynność ma konkretny czas w przeszłości
- **Słowa kluczowe**: Brak uwagi na wskaźniki czasowe jak "yesterday", "since", "ever"
- **Skutki w teraźniejszości**: Problemy z rozpoznawaniem, czy przeszła czynność wpływa na teraźniejszość

## 🎯 Spersonalizowane Porady

1. **Naucz się słów kluczowych na pamięć**
   - Past Simple: yesterday, last week, ago, in 2020, when
   - Present Perfect: ever, never, just, already, yet, since, for

2. **Zadawaj sobie pytanie**: "Czy to ma wpływ na teraz?"
   - Jeśli TAK → Present Perfect
   - Jeśli NIE → Past Simple

3. **Zwracaj uwagę na kontekst**
   - Osoby zmarłe = zawsze Past Simple
   - Okresy zakończone = Past Simple
   - Doświadczenia bez konkretnego czasu = Present Perfect

## 📚 Dodatkowe Przykłady

**Past Simple:**
- I visited Paris in 2019. (konkretny rok)
- Mozart wrote beautiful music. (nie żyje)

**Present Perfect:**
- I have visited Paris many times. (doświadczenie)
- Someone has broken the window. (efekt widoczny teraz)

## 🗺️ Plan Nauki

1. **Tydzień 1**: Naucz się słów kluczowych
2. **Tydzień 2**: Ćwicz rozpoznawanie kontekstu
3. **Tydzień 3**: Rozwiązuj więcej testów
4. **Tydzień 4**: Skoncentruj się na trudnych przypadkach

**Powodzenia w nauce! 🚀**
  `
}

const generateMockQuestions = () => {
  return [
    {
      id: 1,
      sentence: "I ______ my lunch already.",
      options: ["ate", "have eaten"],
      correct: 1,
      explanation: "Używamy Present Perfect z 'already', które wskazuje na czynność zakończoną ale mającą znaczenie dla teraźniejszości."
    },
    {
      id: 2,
      sentence: "They ______ to Spain last summer.",
      options: ["went", "have gone"],
      correct: 0,
      explanation: "Używamy Past Simple z 'last summer', które oznacza konkretny, zakończony okres w przeszłości."
    }
    // Add more mock questions as needed...
  ]
}

const generateMockCustomQuestions = (topic) => {
  return [
    {
      id: 1,
      sentence: `This is a sample question about ${topic}. I ______ this concept.`,
      options: ["understand", "understood"],
      correct: 0,
      explanation: `To jest przykładowe pytanie wygenerowane dla tematu: ${topic}. W rzeczywistej aplikacji, AI wygenerowałoby odpowiednie pytania.`
    }
  ]
}