import React, { useState, useMemo } from 'react';
import { CompletedTests, QuizType } from '../types';

interface StartScreenProps {
  onStart: (username: string, type: QuizType) => void;
  completedTests: CompletedTests;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, completedTests }) => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const userCompletedTests = useMemo(() => {
    return completedTests[username.trim()] || [];
  }, [username, completedTests]);

  const hasCompletedDisc = userCompletedTests.includes('disc');
  const hasCompletedHerrmann = userCompletedTests.includes('herrmann');

  const isUsernameValid = username.trim().length > 2;

  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-8 w-full text-center animate-fade-in">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
        Welcome to Noesis Hiring
      </h1>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
        Unlock insights into yourself. Please enter your full name to begin.
      </p>

      <div className="mb-8 max-w-sm mx-auto">
        <label htmlFor="username" className="sr-only">Full Name</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 text-lg border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition dark:bg-slate-700 dark:text-white"
          aria-required="true"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 text-left">
        {/* DISC Assessment Card */}
        <div className={`bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col transition-opacity ${!isUsernameValid || hasCompletedDisc ? 'opacity-60' : ''}`}>
          <h2 className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-3">DISC Assessment</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
            Understand your behavioral style. The DISC model focuses on Dominance, Influence, Steadiness, and Conscientiousness.
          </p>
          <button
            onClick={() => onStart(username.trim(), 'disc')}
            disabled={!isUsernameValid || hasCompletedDisc}
            className="w-full mt-auto px-6 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform enabled:hover:scale-105 disabled:cursor-not-allowed"
            aria-label={hasCompletedDisc ? 'DISC assessment already completed' : 'Start DISC Assessment'}
          >
            {hasCompletedDisc ? 'Completed' : 'Start DISC Assessment'}
          </button>
        </div>

        {/* Herrmann Model Card */}
        <div className={`bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 flex flex-col transition-opacity ${!isUsernameValid || hasCompletedHerrmann ? 'opacity-60' : ''}`}>
          <h2 className="text-2xl font-bold text-amber-500 dark:text-amber-400 mb-3">Herrmann Model</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
            Discover your preferred thinking style across four quadrants: Analytical, Sequential, Interpersonal, and Imaginative.
          </p>
          <button
            onClick={() => onStart(username.trim(), 'herrmann')}
            disabled={!isUsernameValid || hasCompletedHerrmann}
            className="w-full mt-auto px-6 py-3 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 ease-in-out transform enabled:hover:scale-105 disabled:cursor-not-allowed"
            aria-label={hasCompletedHerrmann ? 'Herrmann assessment already completed' : 'Start Herrmann Assessment'}
          >
            {hasCompletedHerrmann ? 'Completed' : 'Start Herrmann Assessment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;