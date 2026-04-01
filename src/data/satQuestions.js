export const SAT_QUESTIONS = [
  // ── MATH ──────────────────────────────────────────────
  {
    id: 'm1', section: 'Math', topic: 'Linear Equations', difficulty: 'easy',
    text: 'If 2x + 5 = 17, what is the value of x?',
    options: ['4', '5', '6', '7'], correct: 2,
    explanation: '2x + 5 = 17 → 2x = 12 → x = 6',
  },
  {
    id: 'm2', section: 'Math', topic: 'Linear Equations', difficulty: 'medium',
    text: 'A line passes through the points (0, 3) and (4, 11). What is the slope of the line?',
    options: ['1', '2', '3', '4'], correct: 1,
    explanation: 'slope = (11-3)/(4-0) = 8/4 = 2',
  },
  {
    id: 'm3', section: 'Math', topic: 'Algebra', difficulty: 'medium',
    text: 'If f(x) = 3x² - 2x + 1, what is f(2)?',
    options: ['7', '9', '11', '13'], correct: 1,
    explanation: 'f(2) = 3(4) - 2(2) + 1 = 12 - 4 + 1 = 9',
  },
  {
    id: 'm4', section: 'Math', topic: 'Geometry', difficulty: 'medium',
    text: 'A rectangle has an area of 48 cm² and a width of 6 cm. What is its perimeter?',
    options: ['22 cm', '28 cm', '32 cm', '36 cm'], correct: 1,
    explanation: 'length = 48/6 = 8. Perimeter = 2(8+6) = 28',
  },
  {
    id: 'm5', section: 'Math', topic: 'Statistics', difficulty: 'hard',
    text: 'The mean of five numbers is 14. If four of the numbers are 10, 12, 16, and 18, what is the fifth number?',
    options: ['12', '13', '14', '15'], correct: 2,
    explanation: 'Sum = 5×14 = 70. Fifth = 70 - (10+12+16+18) = 70 - 56 = 14',
  },
  {
    id: 'm6', section: 'Math', topic: 'Trigonometry', difficulty: 'hard',
    text: 'In a right triangle, the side opposite a 30° angle is 5. What is the hypotenuse?',
    options: ['5', '8', '10', '12'], correct: 2,
    explanation: 'sin(30°) = 0.5 = opposite/hypotenuse → hypotenuse = 5/0.5 = 10',
  },
  {
    id: 'm7', section: 'Math', topic: 'Nonlinear Equations', difficulty: 'hard',
    text: 'How many solutions does the equation x² - 5x + 6 = 0 have?',
    options: ['0', '1', '2', 'Infinitely many'], correct: 2,
    explanation: 'x² - 5x + 6 = (x-2)(x-3) = 0 → x = 2 or x = 3. Two solutions.',
  },
  {
    id: 'm8', section: 'Math', topic: 'Data Analysis', difficulty: 'medium',
    text: 'The probability of rolling a 6 on a fair die twice in a row is:',
    options: ['1/6', '1/12', '1/36', '1/18'], correct: 2,
    explanation: '1/6 × 1/6 = 1/36',
  },
  {
    id: 'm9', section: 'Math', topic: 'Linear Equations', difficulty: 'easy',
    text: 'Solve for y: 3y - 9 = 0',
    options: ['1', '2', '3', '4'], correct: 2,
    explanation: '3y = 9 → y = 3',
  },
  {
    id: 'm10', section: 'Math', topic: 'Algebra', difficulty: 'medium',
    text: 'Which expression is equivalent to (x + 3)²?',
    options: ['x² + 9', 'x² + 6x + 9', 'x² + 3x + 9', '2x + 6'], correct: 1,
    explanation: '(x+3)² = x² + 2(3)(x) + 9 = x² + 6x + 9',
  },

  // ── EBRW ──────────────────────────────────────────────
  {
    id: 'e1', section: 'EBRW', topic: 'Words in Context', difficulty: 'easy',
    text: 'As used in the passage, "ephemeral" most nearly means:',
    options: ['Permanent', 'Fleeting', 'Substantial', 'Ancient'], correct: 1,
    explanation: 'Ephemeral means lasting for a very short time — fleeting.',
  },
  {
    id: 'e2', section: 'EBRW', topic: 'Command of Evidence', difficulty: 'medium',
    text: 'While researching a topic, a student has noted: Mary Cassatt\'s painting The Child\'s Bath (1893) shows clear, crisp lines. Breakfast in Bed (1897) shows soft, blurred edges. Both symbolize tender relationships. Which choice best uses this information to show similarity?',
    options: [
      'Cassatt\'s Breakfast in Bed depicts a mother holding a child.',
      'The Child\'s Bath and Breakfast in Bed both show figures in poses that symbolize close, tender relationships.',
      'Cassatt completed The Child\'s Bath in 1893 and Breakfast in Bed in 1897.',
      'The figures in The Child\'s Bath hold each other, implying security.',
    ],
    correct: 1,
    explanation: 'Option B uses both paintings to highlight a similarity — the tender relationship symbolized.',
  },
  {
    id: 'e3', section: 'EBRW', topic: 'Inference', difficulty: 'hard',
    text: 'The author\'s primary purpose in using the phrase "cascade of events" is to suggest:',
    options: [
      'A quick resolution to a conflict',
      'A series of rapidly connected occurrences',
      'A random and unrelated sequence',
      'A single major turning point',
    ],
    correct: 1,
    explanation: '"Cascade" implies a flowing series of connected events, one leading to the next.',
  },
  {
    id: 'e4', section: 'EBRW', topic: 'Grammar', difficulty: 'easy',
    text: 'Which sentence is grammatically correct?',
    options: [
      'The data shows a clear trend.',
      'The data show a clear trend.',
      'The datas show a clear trend.',
      'The data is showing a clear trend always.',
    ],
    correct: 1,
    explanation: '"Data" is plural, so it takes the plural verb "show".',
  },
  {
    id: 'e5', section: 'EBRW', topic: 'Text Structure', difficulty: 'medium',
    text: 'A student wants to add a concluding sentence to a paragraph about renewable energy. Which choice best concludes the paragraph by reinforcing its main argument?',
    options: [
      'Solar panels were invented in the 1950s.',
      'Therefore, investing in renewable energy now is essential for a sustainable future.',
      'Wind turbines can be noisy for nearby residents.',
      'Many countries have different energy policies.',
    ],
    correct: 1,
    explanation: 'Option B directly reinforces the main argument about renewable energy\'s importance.',
  },
  {
    id: 'e6', section: 'EBRW', topic: 'Words in Context', difficulty: 'medium',
    text: 'The phrase "to no avail" is best replaced by:',
    options: ['without success', 'with great effort', 'immediately', 'eventually'], correct: 0,
    explanation: '"To no avail" means without success or result.',
  },
  {
    id: 'e7', section: 'EBRW', topic: 'Grammar', difficulty: 'medium',
    text: 'Select the option that correctly uses a semicolon:',
    options: [
      'She studied hard; and passed the exam.',
      'She studied hard; she passed the exam.',
      'She; studied hard and passed the exam.',
      'She studied; hard and passed the exam.',
    ],
    correct: 1,
    explanation: 'A semicolon joins two independent clauses without a conjunction.',
  },
  {
    id: 'e8', section: 'EBRW', topic: 'Inference', difficulty: 'hard',
    text: 'Based on the context, what can be inferred about the narrator\'s attitude toward the new policy?',
    options: [
      'Strong enthusiasm and full support',
      'Cautious skepticism tempered with hope',
      'Complete indifference',
      'Open hostility and rejection',
    ],
    correct: 1,
    explanation: 'Phrases like "perhaps" and "if implemented carefully" signal cautious skepticism with some hope.',
  },
  {
    id: 'e9', section: 'EBRW', topic: 'Words in Context', difficulty: 'easy',
    text: 'Which word most precisely conveys a "gradual decrease" in the context of scientific writing?',
    options: ['Drop', 'Decline', 'Plummet', 'Wane'], correct: 3,
    explanation: '"Wane" specifically suggests a gradual decrease, as in the waning of the moon.',
  },
  {
    id: 'e10', section: 'EBRW', topic: 'Command of Evidence', difficulty: 'hard',
    text: 'A researcher claims urban green spaces reduce stress. Which finding would most directly support this claim?',
    options: [
      'City parks attract more visitors in summer months.',
      'Residents living near parks report 23% lower cortisol levels than those who do not.',
      'Trees in urban areas improve air quality significantly.',
      'Green spaces increase property values in urban neighborhoods.',
    ],
    correct: 1,
    explanation: 'Lower cortisol levels directly measure stress reduction, providing the strongest evidence.',
  },
]

export const SAT_TOPICS = {
  ebrw: {
    title: 'English Reading & Writing',
    total: 327,
    sections: [
      {
        name: 'Craft and Structure',
        topics: [
          { name: 'Words in Context', count: 48, difficulties: ['easy', 'medium', 'hard'] },
          { name: 'Text Structure and Purpose', count: 19, difficulties: ['easy', 'medium'] },
          { name: 'Cross-Text Connections', count: 24, difficulties: ['medium', 'hard'] },
        ],
      },
      {
        name: 'Information and Ideas',
        topics: [
          { name: 'Central Ideas and Details', count: 54, difficulties: ['easy', 'medium', 'hard'] },
          { name: 'Command of Evidence', count: 47, difficulties: ['medium', 'hard'] },
          { name: 'Inferences', count: 31, difficulties: ['hard'] },
        ],
      },
      {
        name: 'Standard English Conventions',
        topics: [
          { name: 'Boundaries', count: 27, difficulties: ['easy', 'medium'] },
          { name: 'Form, Structure, and Sense', count: 77, difficulties: ['easy', 'medium', 'hard'] },
        ],
      },
    ],
  },
  math: {
    title: 'Math',
    total: 420,
    sections: [
      {
        name: 'Algebra',
        topics: [
          { name: 'Linear equations in one variable', count: 65, difficulties: ['easy', 'medium', 'hard'] },
          { name: 'Linear functions', count: 18, difficulties: ['easy', 'medium'] },
          { name: 'Systems of two linear equations', count: 12, difficulties: ['medium', 'hard'] },
        ],
      },
      {
        name: 'Advanced Math',
        topics: [
          { name: 'Nonlinear equations in one variable', count: 45, difficulties: ['medium', 'hard'] },
          { name: 'Nonlinear functions', count: 27, difficulties: ['hard'] },
        ],
      },
      {
        name: 'Problem-Solving and Data Analysis',
        topics: [
          { name: 'Ratios, rates, and proportions', count: 38, difficulties: ['easy', 'medium'] },
          { name: 'Statistics and probability', count: 42, difficulties: ['medium', 'hard'] },
        ],
      },
      {
        name: 'Geometry and Trigonometry',
        topics: [
          { name: 'Lines, angles, and triangles', count: 45, difficulties: ['easy', 'medium', 'hard'] },
          { name: 'Right triangles and trigonometry', count: 38, difficulties: ['medium', 'hard'] },
        ],
      },
    ],
  },
}

export const MOCK_TESTS = [
  { id: 1, name: 'SAT Practice Test 1', status: 'completed', score: 1420, date: 'Mar 14' },
  { id: 2, name: 'SAT Practice Test 2', status: 'in-progress', done: 45, total: 98 },
  { id: 3, name: 'SAT Practice Test 3', status: 'not-started', total: 98 },
  { id: 4, name: 'SAT Practice Test 4', status: 'not-started', total: 98 },
  { id: 5, name: 'SAT Practice Test 5', status: 'not-started', total: 98 },
  { id: 6, name: 'SAT Practice Test 6', status: 'not-started', total: 98 },
]