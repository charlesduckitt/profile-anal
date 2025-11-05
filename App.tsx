import React, { useState, useCallback, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultsScreen from './components/ResultsScreen';
import Nav from './components/Nav';
import { generateDiscAnalysis, generateHerrmannAnalysis } from './services/geminiService';
import { submitTestResults, getCompletedTests } from './services/apiService';
import { DISC_QUESTIONS, HERRMANN_QUESTIONS } from './constants';
import { type Answer, type Answers, type DiscScores, DiscType, type HerrmannScores, HerrmannQuadrant, type QuizType, type CompletedTests } from './types';

type AppState = 'start' | 'quiz' | 'calculating' | 'results';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('start');
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [completedTests, setCompletedTests] = useState<CompletedTests>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [scores, setScores] = useState<DiscScores | HerrmannScores | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load completed tests from storage on initial load
    setCompletedTests(getCompletedTests());
  }, []);

  const handleStart = (user: string, type: QuizType) => {
    setUsername(user);
    setQuizType(type);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScores(null);
    setAnalysis('');
    setError(null);
    setAppState('quiz');
  };
  
  const handleAnswer = (questionId: number, answer: Answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    const totalQuestions = quizType === 'disc' ? DISC_QUESTIONS.length : HERRMANN_QUESTIONS.length;
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setAppState('calculating');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
      setAppState('start');
      setQuizType(null);
      setUsername(null);
      setScores(null);
      setAnalysis('');
      setError(null);
      setCurrentQuestionIndex(0);
  };

  const calculateScores = useCallback(() => {
    if (quizType === 'disc') {
        const newScores: DiscScores = { [DiscType.D]: 0, [DiscType.I]: 0, [DiscType.S]: 0, [DiscType.C]: 0 };
        DISC_QUESTIONS.forEach(question => {
            const answer = answers[question.id];
            if (answer) {
                const mostOption = question.options.find(opt => opt.word === answer.most);
                const leastOption = question.options.find(opt => opt.word === answer.least);
                if (mostOption) newScores[mostOption.type]++;
                if (leastOption) newScores[leastOption.type]--;
            }
        });
        setScores(newScores);
    } else if (quizType === 'herrmann') {
        const newScores: HerrmannScores = { [HerrmannQuadrant.A]: 0, [HerrmannQuadrant.B]: 0, [HerrmannQuadrant.C]: 0, [HerrmannQuadrant.D]: 0 };
        HERRMANN_QUESTIONS.forEach(question => {
            const answer = answers[question.id];
            if (answer) {
                const mostOption = question.options.find(opt => opt.word === answer.most);
                const leastOption = question.options.find(opt => opt.word === answer.least);
                if (mostOption) newScores[mostOption.type]++;
                if (leastOption) newScores[leastOption.type]--;
            }
        });
        setScores(newScores);
    }
  }, [answers, quizType]);

  useEffect(() => {
    if (appState === 'calculating') {
      calculateScores();
    }
  }, [appState, calculateScores]);

  useEffect(() => {
    const getAnalysisAndSubmit = async () => {
      if (scores && username && quizType) {
        try {
          setError(null);
          // 1. Submit results to our mock API
          await submitTestResults(username, quizType, scores);
          // Refresh the completed tests state
          setCompletedTests(getCompletedTests());

          // 2. Generate AI analysis
          let result;
          if (quizType === 'disc') {
            result = await generateDiscAnalysis(scores as DiscScores);
          } else if (quizType === 'herrmann') {
            result = await generateHerrmannAnalysis(scores as HerrmannScores);
          }
          setAnalysis(result || '');
          setAppState('results');
        } catch (err) {
          console.error("Error during analysis/submission:", err);
          const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
          setError(`Sorry, there was an issue processing your results. Details: ${errorMessage}`);
          setAppState('results');
        }
      }
    };
    if (appState === 'calculating' && scores) {
        getAnalysisAndSubmit();
    }
  }, [scores, appState, quizType, username]);


  const renderContent = () => {
    const questions = quizType === 'disc' ? DISC_QUESTIONS : HERRMANN_QUESTIONS;
    
    switch (appState) {
      case 'quiz':
        const currentQuestion = questions[currentQuestionIndex];
        return (
          <QuestionScreen
            question={currentQuestion}
            answer={answers[currentQuestion.id] || { most: null, least: null }}
            onAnswer={(answer) => handleAnswer(currentQuestion.id, answer)}
            onNext={handleNext}
            onBack={handleBack}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
          />
        );
      case 'calculating':
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-sky-500"></div>
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mt-6">Finalizing your profile...</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Submitting results and generating personalized analysis.</p>
          </div>
        );
      case 'results':
        return (
          <ResultsScreen
            username={username}
            scores={scores}
            analysis={analysis}
            isLoading={!analysis && !error}
            error={error}
            onRestart={handleRestart}
            quizType={quizType}
          />
        );
      case 'start':
      default:
        return <StartScreen onStart={handleStart} completedTests={completedTests} />;
    }
  };

  return (
    <main className="min-h-screen flex flex-col p-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Nav username={username} onRestart={handleRestart} />
      <div className="w-full max-w-3xl mx-auto flex-grow flex items-center justify-center">
        {renderContent()}
      </div>
       <footer className="text-center py-4 mt-auto">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Noesis Hiring. Powered by Gemini API.
          </p>
        </footer>
    </main>
  );
};

export default App;