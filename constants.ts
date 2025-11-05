import { type DiscQuestion, DiscType, type HerrmannQuestion, HerrmannQuadrant } from './types';

export const DISC_QUESTIONS: DiscQuestion[] = [
  {
    id: 1,
    options: [
      { word: 'Adventurous', type: DiscType.D },
      { word: 'Enthusiastic', type: DiscType.I },
      { word: 'Agreeable', type: DiscType.S },
      { word: 'Analytical', type: DiscType.C },
    ],
  },
  {
    id: 2,
    options: [
      { word: 'Assertive', type: DiscType.D },
      { word: 'Sociable', type: DiscType.I },
      { word: 'Patient', type: DiscType.S },
      { word: 'Precise', type: DiscType.C },
    ],
  },
  {
    id: 3,
    options: [
      { word: 'Competitive', type: DiscType.D },
      { word: 'Talkative', type: DiscType.I },
      { word: 'Calm', type: DiscType.S },
      { word: 'Systematic', type: DiscType.C },
    ],
  },
  {
    id: 4,
    options: [
      { word: 'Decisive', type: DiscType.D },
      { word: 'Optimistic', type: DiscType.I },
      { word: 'Stable', type: DiscType.S },
      { word: 'Cautious', type: DiscType.C },
    ],
  },
  {
    id: 5,
    options: [
      { word: 'Direct', type: DiscType.D },
      { word: 'Persuasive', type: DiscType.I },
      { word: 'Predictable', type: DiscType.S },
      { word: 'Logical', type: DiscType.C },
    ],
  },
  {
    id: 6,
    options: [
      { word: 'Bold', type: DiscType.D },
      { word: 'Inspiring', type: DiscType.I },
      { word: 'Consistent', type: DiscType.S },
      { word: 'Perfectionist', type: DiscType.C },
    ],
  },
  {
    id: 7,
    options: [
      { word: 'Problem-solver', type: DiscType.D },
      { word: 'Spontaneous', type: DiscType.I },
      { word: 'Supportive', type: DiscType.S },
      { word: 'Organized', type: DiscType.C },
    ],
  },
  {
    id: 8,
    options: [
      { word: 'Risk-taker', type: DiscType.D },
      { word: 'Charming', type: DiscType.I },
      { word: 'Good listener', type: DiscType.S },
      { word: 'Fact-finder', type: DiscType.C },
    ],
  },
    {
    id: 9,
    options: [
      { word: 'Forceful', type: DiscType.D },
      { word: 'Popular', type: DiscType.I },
      { word: 'Gentle', type: DiscType.S },
      { word: 'Accurate', type: DiscType.C },
    ],
  },
  {
    id: 10,
    options: [
      { word: 'Results-oriented', type: DiscType.D },
      { word: 'Trusting', type: DiscType.I },
      { word: 'Loyal', type: DiscType.S },
      { word: 'High-standards', type: DiscType.C },
    ],
  },
];

export const HERRMANN_QUESTIONS: HerrmannQuestion[] = [
    {
        id: 1,
        options: [
            { word: 'Logical', type: HerrmannQuadrant.A },
            { word: 'Organized', type: HerrmannQuadrant.B },
            { word: 'Expressive', type: HerrmannQuadrant.C },
            { word: 'Imaginative', type: HerrmannQuadrant.D },
        ],
    },
    {
        id: 2,
        options: [
            { word: 'Factual', type: HerrmannQuadrant.A },
            { word: 'Detailed', type: HerrmannQuadrant.B },
            { word: 'Feeling', type: HerrmannQuadrant.C },
            { word: 'Holistic', type: HerrmannQuadrant.D },
        ],
    },
    {
        id: 3,
        options: [
            { word: 'Analytical', type: HerrmannQuadrant.A },
            { word: 'Planned', type: HerrmannQuadrant.B },
            { word: 'Interpersonal', type: HerrmannQuadrant.C },
            { word: 'Conceptual', type: HerrmannQuadrant.D },
        ],
    },
    {
        id: 4,
        options: [
            { word: 'Quantitative', type: HerrmannQuadrant.A },
            { word: 'Sequential', type: HerrmannQuadrant.B },
            { word: 'Sensory', type: HerrmannQuadrant.C },
            { word: 'Innovative', type: HerrmannQuadrant.D },
        ],
    },
    {
        id: 5,
        options: [
            { word: 'Critical', type: HerrmannQuadrant.A },
            { word: 'Conservative', type: HerrmannQuadrant.B },
            { word: 'Emotional', type: HerrmannQuadrant.C },
            { word: 'Visual', type: HerrmannQuadrant.D },
        ],
    },
    {
        id: 6,
        options: [
            { word: 'Technical', type: HerrmannQuadrant.A },
            { word: 'Structured', type: HerrmannQuadrant.B },
            { word: 'Spiritual', type: HerrmannQuadrant.C },
            { word: 'Intuitive', type: HerrmannQuadrant.D },
        ],
    },
    {
        id: 7,
        options: [
            { word: 'Rational', type: HerrmannQuadrant.A },
            { word: 'Practical', type: HerrmannQuadrant.B },
            { word: 'Relational', type: HerrmannQuadrant.C },
            { word: 'Creative', type: HerrmannQuadrant.D },
        ],
    },
];