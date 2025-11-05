import { QuizType, CompletedTests, DiscScores, HerrmannScores } from '../types';

const STORAGE_KEY = 'noesisHiring_completedTests';

/**
 * Retrieves the record of completed tests from localStorage.
 * @returns {CompletedTests} An object where keys are usernames and values are arrays of completed quiz types.
 */
export const getCompletedTests = (): CompletedTests => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Failed to parse completed tests from localStorage", error);
    return {};
  }
};

/**
 * Saves the record of completed tests to localStorage.
 * @param {CompletedTests} data The data to save.
 */
const saveCompletedTests = (data: CompletedTests) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save completed tests to localStorage", error);
  }
};

/**
 * Simulates submitting test results to a backend API endpoint.
 * This function logs the data to the console and updates localStorage to mark the test as completed for the user.
 * @param {string} username The name of the user.
 * @param {QuizType} quizType The type of quiz taken ('disc' or 'herrmann').
 * @param {DiscScores | HerrmannScores} scores The user's scores.
 * @returns {Promise<void>} A promise that resolves when the submission is complete.
 */
export const submitTestResults = async (
  username: string,
  quizType: QuizType,
  scores: DiscScores | HerrmannScores
): Promise<void> => {
  console.log("--- SIMULATING API SUBMISSION ---");
  console.log("Endpoint: /api/recruitment/assessment");
  console.log("Method: POST");
  console.log("Payload:", {
    username,
    quizType,
    scores,
    submittedAt: new Date().toISOString(),
  });
  console.log("--- END OF SIMULATION ---");

  // Update localStorage to prevent re-taking the test
  const completedTests = getCompletedTests();
  const userTests = completedTests[username] || [];
  
  if (!userTests.includes(quizType)) {
    userTests.push(quizType);
  }

  completedTests[username] = userTests;
  saveCompletedTests(completedTests);
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));
};