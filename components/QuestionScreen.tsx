import React from 'react';
import { type DiscQuestion, type HerrmannQuestion, type Answer } from '../types';

interface QuestionScreenProps {
  question: DiscQuestion | HerrmannQuestion;
  answer: Answer;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onBack: () => void;
  currentIndex: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const percentage = total > 0 ? ((current + 1) / total) * 100 : 0;
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 mb-4">
      <div
        className="bg-sky-600 h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};


const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  answer,
  onAnswer,
  onNext,
  onBack,
  currentIndex,
  totalQuestions,
}) => {
  const isComplete = answer.most && answer.least;

  const handleSelect = (word: string, type: 'most' | 'least') => {
    const otherType = type === 'most' ? 'least' : 'most';
    if (answer[otherType] === word) {
      onAnswer({ ...answer, [type]: word, [otherType]: null });
    } else {
      onAnswer({ ...answer, [type]: word });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 sm:p-8 animate-fade-in">
      <ProgressBar current={currentIndex} total={totalQuestions} />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
        Question {currentIndex + 1} of {totalQuestions}
      </p>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        From this group, which word describes you...
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">Most Like Me</h3>
            <div className="w-full space-y-3">
                {question.options.map(({ word }) => (
                    <button
                        key={`most-${word}`}
                        onClick={() => handleSelect(word, 'most')}
                        className={`w-full p-4 rounded-lg text-center font-medium transition-all duration-200 border-2 ${
                            answer.most === word
                            ? 'bg-green-500 border-green-500 text-white shadow-lg scale-105'
                            : 'bg-slate-100 dark:bg-slate-700 border-transparent hover:border-green-400 dark:text-slate-200'
                        }`}
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
         <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">Least Like Me</h3>
            <div className="w-full space-y-3">
                {question.options.map(({ word }) => (
                    <button
                        key={`least-${word}`}
                        onClick={() => handleSelect(word, 'least')}
                        className={`w-full p-4 rounded-lg text-center font-medium transition-all duration-200 border-2 ${
                            answer.least === word
                            ? 'bg-red-500 border-red-500 text-white shadow-lg scale-105'
                            : 'bg-slate-100 dark:bg-slate-700 border-transparent hover:border-red-400 dark:text-slate-200'
                        }`}
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          disabled={currentIndex === 0}
          className="px-6 py-2 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-lg shadow-sm hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isComplete}
          className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform enabled:hover:scale-105"
        >
          {currentIndex === totalQuestions - 1 ? 'Finish & Analyze' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;