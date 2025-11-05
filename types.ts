// DISC Model Types
export enum DiscType {
  D = 'Dominance',
  I = 'Influence',
  S = 'Steadiness',
  C = 'Conscientiousness',
}

export interface DiscWordOption {
  word: string;
  type: DiscType;
}

export interface DiscQuestion {
  id: number;
  options: DiscWordOption[];
}

export type DiscScores = {
  [key in DiscType]: number;
};


// Herrmann Model Types
export enum HerrmannQuadrant {
    A = 'Analytical',
    B = 'Sequential',
    C = 'Interpersonal',
    D = 'Imaginative',
}

export interface HerrmannWordOption {
    word: string;
    type: HerrmannQuadrant;
}

export interface HerrmannQuestion {
    id: number;
    options: HerrmannWordOption[];
}

export type HerrmannScores = {
    [key in HerrmannQuadrant]: number;
};


// Generic Types
export type Answer = {
  most: string | null;
  least: string | null;
};

export type Answers = Record<number, Answer>; // key is question id

export type QuizType = 'disc' | 'herrmann';

export type CompletedTests = Record<string, QuizType[]>; // e.g. { "John Doe": ["disc"] }