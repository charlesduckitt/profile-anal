import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  DiscScores,
  DiscType,
  HerrmannScores,
  HerrmannQuadrant,
  QuizType,
} from "../types";
import { downloadAsMarkdown } from "../services/downloadService";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ResultsScreenProps {
  username: string | null;
  scores: DiscScores | HerrmannScores | null;
  analysis: string;
  isLoading: boolean;
  error: string | null;
  onRestart: () => void;
  quizType: QuizType | null;
}

const COLORS = {
  disc: {
    [DiscType.D]: "#ef4444", // red-500
    [DiscType.I]: "#f59e0b", // amber-500
    [DiscType.S]: "#10b981", // emerald-500
    [DiscType.C]: "#3b82f6", // blue-500
  },
  herrmann: {
    [HerrmannQuadrant.A]: "#3b82f6", // blue-500
    [HerrmannQuadrant.B]: "#10b981", // emerald-500
    [HerrmannQuadrant.C]: "#ef4444", // red-500
    [HerrmannQuadrant.D]: "#f59e0b", // amber-500
  },
};

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  username,
  scores,
  analysis,
  isLoading,
  error,
  onRestart,
  quizType,
}) => {
  if (!scores || !quizType) {
    return (
      <div className="text-center p-8">
        <p className="text-slate-600 dark:text-slate-300">
          No results to display. Please take an assessment first.
        </p>
        <button
          onClick={onRestart}
          className="mt-4 px-6 py-2 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700"
        >
          Start Over
        </button>
      </div>
    );
  }

  const chartData = Object.entries(scores).map(([name, value]) => ({
    name: name.charAt(0),
    fullName: name,
    value: value,
  }));

  const dominantTrait = Object.keys(scores).reduce((a, b) =>
    (scores as any)[a] > (scores as any)[b] ? a : b
  );
  const typeColors = COLORS[quizType];

  const handleDownload = () => {
    if (username && quizType && scores && analysis) {
      downloadAsMarkdown(username, quizType, scores, analysis);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 sm:p-8 animate-fade-in w-full">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2 text-center">
        Your {quizType === "disc" ? "DISC Profile" : "Thinking Style Profile"}
      </h1>
      {dominantTrait && (
        <p className="text-center text-xl text-slate-600 dark:text-slate-300 mb-8">
          Your primary trait appears to be{" "}
          <span
            className="font-bold"
            style={{ color: (typeColors as any)[dominantTrait] }}
          >
            {dominantTrait}
          </span>
          .
        </p>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
          Your Scores
        </h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis
                dataKey="name"
                tick={{ fill: "currentColor" }}
                className="font-semibold text-slate-600 dark:text-slate-300"
              />
              <YAxis
                tick={{ fill: "currentColor" }}
                className="text-slate-600 dark:text-slate-300"
              />
              <Tooltip
                cursor={{ fill: "rgba(128, 128, 128, 0.1)" }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid #ccc",
                  borderRadius: "0.5rem",
                }}
                labelFormatter={(label) =>
                  chartData.find((d) => d.name === label)?.fullName || ""
                }
              />
              <Bar dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={(typeColors as any)[entry.fullName]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
          Personalized Analysis for {username}
        </h2>
        {isLoading && (
          <div className="flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <div className="w-8 h-8 border-2 border-dashed rounded-full animate-spin border-sky-500"></div>
            <p className="ml-4 text-slate-600 dark:text-slate-300">
              Generating your analysis...
            </p>
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}
        {analysis && !error && (
          <div className="prose prose-slate dark:prose-invert max-w-none bg-slate-50 dark:bg-white p-6 rounded-lg">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {analysis}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-8 py-3 bg-slate-600 text-white font-bold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Start Over
        </button>
        <button
          onClick={handleDownload}
          disabled={isLoading || !!error}
          className="w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-bold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download Results
        </button>
      </div>
    </div>
  );
};

export default ResultsScreen;
