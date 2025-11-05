import React from "react";
import Logo from "../assets/logo.webp";

interface NavProps {
  username: string | null;
  onRestart: () => void;
}

const Nav: React.FC<NavProps> = ({ username, onRestart }) => {
  return (
    <header className="w-full mb-4 bg-transparent dark:bg-slate-900">
      <div className="max-w-3xl mx-auto py-4 px-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo image — imported above. Vite will bundle this import and replace with the
                correct hashed URL in production. The textual site name is visually hidden
                so it only appears if the image fails (browser will display the image alt). */}
            <img src={Logo} alt="Noesis Hiring" className="h-16 w-auto" />
            <span className="sr-only">Noesis Hiring</span>
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
      </div>
    </header>
  );
};

export default Nav;
