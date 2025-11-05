import React from 'react';

interface NavProps {
  username: string | null;
  onRestart: () => void;
}

const Nav: React.FC<NavProps> = ({ username, onRestart }) => {
  return (
    <header className="w-full max-w-3xl mx-auto py-4 px-2 mb-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Noesis <span className="text-sky-500">Hiring</span>
        </div>
        <div className="flex items-center gap-4">
          {username && (
            <span className="text-slate-600 dark:text-slate-300 hidden sm:block">
              Welcome, <span className="font-semibold">{username}</span>
            </span>
          )}
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg shadow-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm"
          >
            Start Over
          </button>
        </div>
      </div>
    </header>
  );
};

export default Nav;