// SAT Question Bank — categories: math, reading, writing
// difficulty: 1 (easy) to 5 (hard)
const QUESTIONS = [
  // ===== MATH — HEART OF ALGEBRA =====
  { cat: "math", diff: 1, q: "If 3x + 7 = 22, what is the value of x?", opts: ["3", "4", "5", "6"], ans: 2, exp: "Subtract 7: 3x = 15. Divide by 3: x = 5." },
  { cat: "math", diff: 1, q: "What is the slope of the line y = 2x + 5?", opts: ["2", "5", "7", "10"], ans: 0, exp: "In y = mx + b form, m (slope) = 2." },
  { cat: "math", diff: 1, q: "If 2(x - 4) = 10, what is x?", opts: ["7", "9", "11", "13"], ans: 1, exp: "Divide by 2: x - 4 = 5. Add 4: x = 9." },
  { cat: "math", diff: 1, q: "Solve for x: x/3 + 2 = 8", opts: ["12", "15", "18", "21"], ans: 2, exp: "Subtract 2: x/3 = 6. Multiply by 3: x = 18." },
  { cat: "math", diff: 2, q: "If 4x - 3 = 2x + 9, what is x?", opts: ["4", "5", "6", "8"], ans: 2, exp: "Subtract 2x: 2x - 3 = 9. Add 3: 2x = 12. x = 6." },
  { cat: "math", diff: 2, q: "Which equation represents a line with slope -3 passing through (0, 7)?", opts: ["y = 3x + 7", "y = -3x + 7", "y = -3x - 7", "y = 7x - 3"], ans: 1, exp: "y = mx + b with m = -3, b = 7." },
  { cat: "math", diff: 2, q: "If x + y = 12 and x - y = 4, what is x?", opts: ["6", "7", "8", "10"], ans: 2, exp: "Add equations: 2x = 16, so x = 8." },
  { cat: "math", diff: 2, q: "What is the y-intercept of the line 3x - 2y = 6?", opts: ["-3", "-2", "2", "3"], ans: 0, exp: "Set x = 0: -2y = 6, so y = -3." },
  { cat: "math", diff: 3, q: "If 2x + 3y = 12 and x - y = 1, what is the value of y?", opts: ["1", "2", "3", "4"], ans: 1, exp: "From second: x = y + 1. Substitute: 2(y+1) + 3y = 12 -> 5y = 10 -> y = 2." },
  { cat: "math", diff: 3, q: "Which of the following is equivalent to (x + 3)(x - 3)?", opts: ["x^2 - 9", "x^2 + 9", "x^2 - 6x + 9", "x^2 + 6x + 9"], ans: 0, exp: "Difference of squares: (a+b)(a-b) = a^2 - b^2." },
  { cat: "math", diff: 3, q: "If f(x) = 2x - 5, what is f(3) - f(1)?", opts: ["2", "3", "4", "6"], ans: 2, exp: "f(3) = 1, f(1) = -3. 1 - (-3) = 4." },
  { cat: "math", diff: 3, q: "The equation x^2 - 5x + 6 = 0 has solutions x = a and x = b. What is a + b?", opts: ["5", "6", "-5", "-6"], ans: 0, exp: "For ax^2 + bx + c = 0, sum of roots = -b/a = 5." },
  { cat: "math", diff: 4, q: "If (x + 2)^2 = x^2 + 4x + k, what is the value of k?", opts: ["2", "4", "6", "8"], ans: 1, exp: "(x+2)^2 = x^2 + 4x + 4, so k = 4." },
  { cat: "math", diff: 4, q: "Which of the following is a solution to x^2 + 2x - 8 = 0?", opts: ["-4", "-2", "1", "3"], ans: 0, exp: "Factor: (x+4)(x-2) = 0 -> x = -4 or 2." },
  { cat: "math", diff: 4, q: "If the line y = mx + 4 passes through (2, 10), what is m?", opts: ["2", "3", "4", "5"], ans: 1, exp: "10 = 2m + 4 -> 2m = 6 -> m = 3." },
  { cat: "math", diff: 5, q: "For the system 3x + 2y = 7 and 6x + 4y = 14, which statement is true?", opts: ["No solution", "Exactly one solution", "Infinitely many solutions", "Cannot determine"], ans: 2, exp: "Second equation is 2x the first - same line, infinite solutions." },

  // ===== MATH — PROBLEM SOLVING & DATA ANALYSIS =====
  { cat: "math", diff: 1, q: "What is the mean of 4, 8, 15, 16, 23, 42?", opts: ["16", "18", "20", "22"], ans: 1, exp: "Sum = 108, count = 6. Mean = 108/6 = 18." },
  { cat: "math", diff: 1, q: "A shirt costs $40 and is on sale for 25% off. What is the sale price?", opts: ["$28", "$30", "$32", "$35"], ans: 1, exp: "25% of 40 = 10. $40 - $10 = $30." },
  { cat: "math", diff: 1, q: "What is the probability of rolling an even number on a standard die?", opts: ["1/6", "1/3", "1/2", "2/3"], ans: 2, exp: "Even outcomes: 2, 4, 6 -> 3/6 = 1/2." },
  { cat: "math", diff: 2, q: "If a car travels 240 miles in 4 hours, what is its average speed?", opts: ["50 mph", "55 mph", "60 mph", "65 mph"], ans: 2, exp: "240 / 4 = 60 mph." },
  { cat: "math", diff: 2, q: "The median of 3, 7, 9, 12, 15 is:", opts: ["7", "9", "10", "12"], ans: 1, exp: "Middle value when ordered is 9." },
  { cat: "math", diff: 2, q: "If 3 pounds of apples cost $7.50, how much do 5 pounds cost?", opts: ["$10.50", "$12.00", "$12.50", "$15.00"], ans: 2, exp: "Unit price = $2.50/lb. 5 x $2.50 = $12.50." },
  { cat: "math", diff: 2, q: "What is 15% of 200?", opts: ["25", "30", "35", "40"], ans: 1, exp: "0.15 x 200 = 30." },
  { cat: "math", diff: 3, q: "A circle has radius 4. What is its area?", opts: ["8pi", "12pi", "16pi", "20pi"], ans: 2, exp: "Area = pi * r^2 = pi * (4)^2 = 16pi." },
  { cat: "math", diff: 3, q: "If the ratio of boys to girls in a class is 3:5 and there are 15 boys, how many girls are there?", opts: ["20", "25", "30", "35"], ans: 1, exp: "3/5 = 15/x -> 3x = 75 -> x = 25." },
  { cat: "math", diff: 3, q: "A rectangle's length is twice its width. If the perimeter is 36, what is the width?", opts: ["4", "6", "8", "12"], ans: 1, exp: "2(2w + w) = 36 -> 6w = 36 -> w = 6." },
  { cat: "math", diff: 3, q: "If a population grows 10% per year, what is the growth factor?", opts: ["1.01", "1.1", "1.2", "10"], ans: 1, exp: "100% + 10% = 110% = 1.1." },
  { cat: "math", diff: 4, q: "The standard deviation of a data set is 5. If each value is multiplied by 2, the new standard deviation is:", opts: ["5", "7", "10", "25"], ans: 2, exp: "Multiplying all values by k multiplies SD by k." },
  { cat: "math", diff: 4, q: "If the average of five numbers is 20 and four of them are 15, 18, 22, and 25, what is the fifth?", opts: ["18", "20", "22", "25"], ans: 1, exp: "Total = 100. Fifth = 100 - (15+18+22+25) = 100 - 80 = 20." },
  { cat: "math", diff: 4, q: "A scatterplot shows a strong positive correlation. Which r-value is most likely?", opts: ["-0.9", "-0.2", "0.3", "0.85"], ans: 3, exp: "Strong positive -> r close to 1." },
  { cat: "math", diff: 5, q: "If 20% of a number is the same as 30% of 40, what is the number?", opts: ["50", "60", "70", "80"], ans: 1, exp: "0.3 x 40 = 12. 0.2x = 12 -> x = 60." },

  // ===== MATH — PASSPORT TO ADVANCED MATH =====
  { cat: "math", diff: 1, q: "Simplify: 2^3 x 2^4", opts: ["2^7", "2^12", "4^7", "8^7"], ans: 0, exp: "Same base: add exponents -> 2^7." },
  { cat: "math", diff: 1, q: "What is the value of 5^0?", opts: ["0", "1", "5", "undefined"], ans: 1, exp: "Any non-zero number to the 0 power equals 1." },
  { cat: "math", diff: 2, q: "If x^2 = 49, what are the possible values of x?", opts: ["7", "-7", "+/-7", "49"], ans: 2, exp: "x = +/-sqrt(49) = +/-7." },
  { cat: "math", diff: 2, q: "Simplify: (x^2 * y^3)^2", opts: ["x^4 * y^5", "x^4 * y^6", "x^2 * y^6", "x^2 * y^5"], ans: 1, exp: "Power of power: multiply exponents -> x^4 * y^6." },
  { cat: "math", diff: 2, q: "Which expression is equivalent to x^3 - 8?", opts: ["(x-2)(x^2+2x+4)", "(x+2)(x^2-2x+4)", "(x-2)(x^2-2x+4)", "(x+2)(x^2+2x+4)"], ans: 0, exp: "Difference of cubes: a^3 - b^3 = (a-b)(a^2+ab+b^2)." },
  { cat: "math", diff: 3, q: "If f(x) = x^2 - 3x + 2, what is f(-1)?", opts: ["-2", "0", "4", "6"], ans: 3, exp: "f(-1) = 1 + 3 + 2 = 6." },
  { cat: "math", diff: 3, q: "The expression (3x^2 * y)^3 simplifies to:", opts: ["27x^6 * y^3", "9x^6 * y^3", "27x^5 * y^3", "9x^5 * y^3"], ans: 0, exp: "3^3 = 27, (x^2)^3 = x^6, y^3 stays -> 27x^6 * y^3." },
  { cat: "math", diff: 3, q: "If x^3 = 27 and y^2 = 16, what is the value of x + y?", opts: ["7", "11", "13", "Both A and B"], ans: 3, exp: "x = 3, y = +/-4 -> x+y = 7 or -1. Only 7 is listed." },
  { cat: "math", diff: 4, q: "Which of the following is the factorization of x^2 - 5x - 14?", opts: ["(x-7)(x+2)", "(x+7)(x-2)", "(x-7)(x-2)", "(x+7)(x+2)"], ans: 0, exp: "Find factors of -14 that add to -5: -7 and +2." },
  { cat: "math", diff: 4, q: "If g(x) = 2x + 1 and h(x) = x^2, what is g(h(3))?", opts: ["13", "15", "19", "37"], ans: 2, exp: "h(3) = 9. g(9) = 2(9)+1 = 19." },
  { cat: "math", diff: 4, q: "The vertex of the parabola y = x^2 - 4x + 3 is at:", opts: ["(2, -1)", "(-2, 15)", "(1, 0)", "(4, 3)"], ans: 0, exp: "x = -b/2a = 2. y = 4 - 8 + 3 = -1." },
  { cat: "math", diff: 5, q: "If x > 0 and x + 1/x = 3, what is the value of x^2 + 1/x^2?", opts: ["5", "7", "9", "11"], ans: 1, exp: "Square both sides: (x + 1/x)^2 = x^2 + 2 + 1/x^2 = 9. So x^2 + 1/x^2 = 7." },
  { cat: "math", diff: 5, q: "The polynomial x^3 - 6x^2 + 11x - 6 has roots at x = 1, 2, 3. What is the value of the polynomial at x = 4?", opts: ["6", "12", "18", "24"], ans: 0, exp: "(4-1)(4-2)(4-3) = 3 x 2 x 1 = 6." },

  // ===== MATH — GEOMETRY & TRIG =====
  { cat: "math", diff: 1, q: "What is the sum of interior angles of a triangle?", opts: ["90 deg", "180 deg", "270 deg", "360 deg"], ans: 1, exp: "Triangle interior angles always sum to 180 degrees." },
  { cat: "math", diff: 1, q: "A right triangle has legs of length 3 and 4. What is the hypotenuse?", opts: ["5", "6", "7", "sqrt(7)"], ans: 0, exp: "Pythagorean theorem: sqrt(9+16) = sqrt(25) = 5." },
  { cat: "math", diff: 2, q: "The area of a circle with diameter 10 is:", opts: ["10pi", "25pi", "50pi", "100pi"], ans: 1, exp: "Radius = 5. Area = pi * (5)^2 = 25pi." },
  { cat: "math", diff: 2, q: "What is the measure of each interior angle of a regular hexagon?", opts: ["108 deg", "120 deg", "135 deg", "144 deg"], ans: 1, exp: "(6-2) x 180 / 6 = 720/6 = 120 degrees." },
  { cat: "math", diff: 2, q: "sin(30 deg) =", opts: ["1/2", "sqrt(2)/2", "sqrt(3)/2", "1"], ans: 0, exp: "sin(30 deg) = 1/2." },
  { cat: "math", diff: 3, q: "A cylinder has radius 3 and height 8. What is its volume?", opts: ["24pi", "48pi", "72pi", "96pi"], ans: 2, exp: "V = pi * r^2 * h = pi * (9) * (8) = 72pi." },
  { cat: "math", diff: 3, q: "The circumference of a circle is 20pi. What is its radius?", opts: ["5", "10", "15", "20"], ans: 1, exp: "C = 2 * pi * r = 20pi -> r = 10." },
  { cat: "math", diff: 3, q: "In a 45-45-90 triangle, if a leg has length 5, the hypotenuse is:", opts: ["5", "5*sqrt(2)", "10", "5*sqrt(3)"], ans: 1, exp: "Hypotenuse = leg x sqrt(2) = 5*sqrt(2)." },
  { cat: "math", diff: 4, q: "The distance between points (1, 2) and (4, 6) is:", opts: ["3", "4", "5", "sqrt(13)"], ans: 2, exp: "sqrt((4-1)^2 + (6-2)^2) = sqrt(9+16) = sqrt(25) = 5." },
  { cat: "math", diff: 4, q: "cos(60 deg) =", opts: ["1/2", "sqrt(2)/2", "sqrt(3)/2", "1"], ans: 0, exp: "cos(60 deg) = 1/2." },
  { cat: "math", diff: 5, q: "A sphere has volume 288pi. What is its radius?", opts: ["3", "4", "6", "8"], ans: 2, exp: "V = (4/3) * pi * r^3 = 288pi -> r^3 = 216 -> r = 6." },
  { cat: "math", diff: 5, q: "tan(45 deg) =", opts: ["0", "1", "sqrt(3)", "undefined"], ans: 1, exp: "tan(45 deg) = sin(45 deg)/cos(45 deg) = 1." },

  // ===== READING — COMMAND OF EVIDENCE & INFERENCE =====
  { cat: "reading", diff: 1, q: "The passage suggests that the author's primary purpose is to:", opts: ["entertain with a fictional story", "inform readers about a scientific discovery", "persuade readers to change their behavior", "criticize a government policy"], ans: 1, exp: "Most SAT passages aim to inform; context clues confirm this." },
  { cat: "reading", diff: 2, q: "Based on the passage, which choice best supports the claim that the character is conflicted?", opts: ["She laughed at the joke", "She paused, her hand hovering over the door", "She ran quickly down the hall", "She smiled warmly at the stranger"], ans: 1, exp: "Hesitation (hovering hand) signals internal conflict." },
  { cat: "reading", diff: 2, q: "In line 24, the author uses the phrase 'a tidal wave of change' primarily to:", opts: ["describe a natural disaster", "emphasize the magnitude of transformation", "introduce a character's nickname", "create a rhyme scheme"], ans: 1, exp: "Hyperbole emphasizes scale, not literal water." },
  { cat: "reading", diff: 3, q: "The author most likely includes the statistic about declining bee populations to:", opts: ["provide a counterargument", "support the claim that pesticides are harmful", "illustrate a historical trend", "describe the life cycle of bees"], ans: 1, exp: "Data typically supports an argument about pesticide harm." },
  { cat: "reading", diff: 3, q: "Which statement best describes the relationship between the two passages?", opts: ["They present opposing viewpoints", "They describe the same event from identical perspectives", "They are unrelated in topic and tone", "The second is a sequel to the first"], ans: 0, exp: "Paired passages typically present contrasting perspectives." },
  { cat: "reading", diff: 3, q: "The narrator's tone in the passage can best be described as:", opts: ["sarcastic and bitter", "reflective and melancholic", "excited and joyful", "neutral and detached"], ans: 1, exp: "Look for emotional word choices indicating reflection and sadness." },
  { cat: "reading", diff: 4, q: "The author's use of the word 'myth' in line 42 suggests that the commonly held belief is:", opts: ["universally accepted as true", "supported by strong evidence", "not supported by factual evidence", "a recently developed theory"], ans: 2, exp: "'Myth' implies a false but widely held belief." },
  { cat: "reading", diff: 4, q: "Which choice provides the best evidence for the answer to the previous question?", opts: ["Lines 5-8: 'The data clearly shows...'", "Lines 12-15: 'For centuries, people believed...'", "Lines 30-33: 'However, recent studies...'", "Lines 45-47: 'In conclusion, we find...'"], ans: 2, exp: "Evidence of recent studies contradicting the myth supports the answer." },
  { cat: "reading", diff: 4, q: "The passage implies that the main character's decision to leave was motivated by:", opts: ["a desire for wealth", "a need for independence", "pressure from family", "fear of punishment"], ans: 1, exp: "Independence is the most common motivation for departure in literary passages." },
  { cat: "reading", diff: 5, q: "The author develops the central argument primarily through:", opts: ["personal anecdotes and emotional appeals", "a series of rhetorical questions", "historical examples and logical reasoning", "humor and satirical commentary"], ans: 2, exp: "Logical reasoning with examples is typical of argumentative passages." },
  { cat: "reading", diff: 5, q: "As used in line 18, the word 'yield' most nearly means:", opts: ["produce", "surrender", "profit", "bend"], ans: 0, exp: "Context determines meaning; 'produce' fits scientific/economic contexts." },

  // ===== READING — WORDS IN CONTEXT =====
  { cat: "reading", diff: 1, q: "As used in line 7, 'profound' most nearly means:", opts: ["superficial", "deep and significant", "temporary", "unclear"], ans: 1, exp: "'Profound' means deep, intense, or significant." },
  { cat: "reading", diff: 2, q: "As used in line 15, 'ambiguous' most nearly means:", opts: ["clear and precise", "open to multiple interpretations", "loud and obvious", "angry and hostile"], ans: 1, exp: "'Ambiguous' means having more than one possible meaning." },
  { cat: "reading", diff: 2, q: "As used in line 22, 'meticulous' most nearly means:", opts: ["careless", "very careful and precise", "fast", "confused"], ans: 1, exp: "'Meticulous' means showing great attention to detail." },
  { cat: "reading", diff: 3, q: "As used in line 31, 'scrutiny' most nearly means:", opts: ["ignorance", "close examination", "approval", "destruction"], ans: 1, exp: "'Scrutiny' means critical observation or examination." },
  { cat: "reading", diff: 3, q: "As used in line 40, 'resilient' most nearly means:", opts: ["fragile", "able to recover quickly", "stubborn", "transparent"], ans: 1, exp: "'Resilient' means able to withstand or recover from difficulties." },
  { cat: "reading", diff: 4, q: "As used in line 8, 'pragmatic' most nearly means:", opts: ["idealistic", "practical rather than theoretical", "emotional", "unpredictable"], ans: 1, exp: "'Pragmatic' means dealing with problems in a practical rather than theoretical way." },
  { cat: "reading", diff: 4, q: "As used in line 19, 'benevolent' most nearly means:", opts: ["malicious", "kind and generous", "indifferent", "cowardly"], ans: 1, exp: "'Benevolent' means well-meaning and kindly." },
  { cat: "reading", diff: 5, q: "As used in line 27, 'ephemeral' most nearly means:", opts: ["permanent", "short-lived", "extremely large", "highly valuable"], ans: 1, exp: "'Ephemeral' means lasting for a very short time." },
  { cat: "reading", diff: 5, q: "As used in line 35, 'ubiquitous' most nearly means:", opts: ["rare", "present everywhere", "hidden", "dangerous"], ans: 1, exp: "'Ubiquitous' means found everywhere; omnipresent." },

  // ===== WRITING — STANDARD ENGLISH CONVENTIONS =====
  { cat: "writing", diff: 1, q: "Which sentence is grammatically correct?", opts: ["Each of the students have a book.", "Each of the students has a book.", "Each of the students were given a book.", "Each of the students are ready."], ans: 1, exp: "'Each' is singular and takes a singular verb." },
  { cat: "writing", diff: 1, q: "Choose the correct sentence:", opts: ["The team played well, they won the game.", "The team played well; they won the game.", "The team played well, and won the game.", "The team played well they won the game."], ans: 1, exp: "A semicolon correctly joins two independent clauses." },
  { cat: "writing", diff: 2, q: "Which choice corrects the error: 'Neither of the answers are correct.'?", opts: ["Neither of the answers is correct.", "Neither of the answers were correct.", "Neither of the answers be correct.", "Neither of the answers are correct."], ans: 0, exp: "'Neither' is singular and takes 'is'." },
  { cat: "writing", diff: 2, q: "Choose the sentence with correct comma usage:", opts: ["After dinner, we went for a walk.", "After, dinner we went for a walk.", "After dinner we went, for a walk.", "After dinner we went for, a walk."], ans: 0, exp: "An introductory phrase is followed by a comma." },
  { cat: "writing", diff: 2, q: "Which sentence is punctuated correctly?", opts: ["The book, which was on the table, is mine.", "The book which was on the table is mine.", "The book, which was on the table is mine.", "The book which was, on the table, is mine."], ans: 0, exp: "Nonessential clauses are set off by commas on both sides." },
  { cat: "writing", diff: 3, q: "Which choice corrects the modifier error: 'Running down the street, the bus was seen by Maria.'?", opts: ["Running down the street, Maria saw the bus.", "Running down the street, the bus saw Maria.", "Running down the street, the bus was seen by Maria.", "Running down the street, Maria was seen by the bus."], ans: 0, exp: "The modifier must refer to Maria, not the bus." },
  { cat: "writing", diff: 3, q: "Choose the sentence with correct subject-verb agreement:", opts: ["The list of items are on the table.", "The list of items is on the table.", "The list of items were on the table.", "The list of items have been on the table."], ans: 1, exp: "Subject is 'list' (singular), not 'items'." },
  { cat: "writing", diff: 3, q: "Which sentence uses the apostrophe correctly?", opts: ["The dog wagged it's tail.", "The dog wagged its tail.", "The dog wagged its' tail.", "The dog wagged its tail's."], ans: 1, exp: "'Its' (no apostrophe) is the possessive form." },
  { cat: "writing", diff: 4, q: "Which choice corrects the sentence: 'The reason is because I was tired.'?", opts: ["The reason is that I was tired.", "The reason is due to I was tired.", "The reason is on account of I was tired.", "The reason is since I was tired."], ans: 0, exp: "'The reason is that...' avoids the redundant 'reason is because.'" },
  { cat: "writing", diff: 4, q: "Choose the sentence with correct parallel structure:", opts: ["She likes hiking, swimming, and to bike.", "She likes hiking, swimming, and biking.", "She likes to hike, swimming, and biking.", "She likes hiking, to swim, and biking."], ans: 1, exp: "All items in a list should use the same grammatical form." },
  { cat: "writing", diff: 4, q: "Which choice corrects the comparison error: 'Sarah is taller than me.'?", opts: ["Sarah is taller than I.", "Sarah is taller than myself.", "Sarah is taller than I am.", "Both A and C"], ans: 3, exp: "'Than I' or 'than I am' are both grammatically correct." },
  { cat: "writing", diff: 5, q: "Which sentence contains no grammatical errors?", opts: ["Between you and I, this plan won't work.", "Between you and me, this plan won't work.", "Between yourself and I, this plan won't work.", "Between you and myself, this plan won't work."], ans: 1, exp: "Prepositions take objective case: 'you and me.'" },
  { cat: "writing", diff: 5, q: "Choose the sentence with correct pronoun agreement:", opts: ["Everyone should bring their own lunch.", "Everyone should bring his or her own lunch.", "Everyone should bring its own lunch.", "Everyone should bring them own lunch."], ans: 1, exp: "'Everyone' is singular; 'his or her' agrees in number." },

  // ===== WRITING — EXPRESSION OF IDEAS =====
  { cat: "writing", diff: 1, q: "Which transition word best fits: 'The experiment failed. ___, the team learned valuable lessons.'?", opts: ["However", "Therefore", "Similarly", "Meanwhile"], ans: 0, exp: "'However' signals contrast between failure and learning." },
  { cat: "writing", diff: 2, q: "Which sentence is most concise?", opts: ["Due to the fact that it was raining, we stayed inside.", "Because it was raining, we stayed inside.", "Owing to the fact that it was raining, we stayed inside.", "On account of the rain, we stayed inside."], ans: 1, exp: "'Because' is more concise than 'due to the fact that.'" },
  { cat: "writing", diff: 2, q: "Which choice best introduces a conclusion?", opts: ["In addition", "For example", "In summary", "On the other hand"], ans: 2, exp: "'In summary' signals a concluding statement." },
  { cat: "writing", diff: 3, q: "Which sentence best combines: 'The movie was long. The movie was boring.'?", opts: ["The movie was long, and it was boring.", "The movie was long and boring.", "The movie was long; it was boring.", "The movie was long, it was boring."], ans: 1, exp: "Combining adjectives creates the most concise sentence." },
  { cat: "writing", diff: 3, q: "Which choice best maintains the formal tone of the passage?", opts: ["The results were totally amazing.", "The results were quite remarkable.", "The results were, like, really cool.", "The results were, you know, pretty good."], ans: 1, exp: "'Quite remarkable' maintains academic/formal tone." },
  { cat: "writing", diff: 4, q: "Which sentence best emphasizes the main point?", opts: ["There are many reasons to exercise, and one of them is that it improves health.", "One reason to exercise is that it improves health.", "Exercise improves health, among other benefits.", "It is because exercise improves health that many people do it."], ans: 3, exp: "Cleft sentence ('It is because...') emphasizes the reason." },
  { cat: "writing", diff: 4, q: "Which choice best eliminates redundancy?", opts: ["The final outcome of the experiment was surprising.", "The outcome of the experiment was surprising.", "The final result of the experiment was surprising.", "The end result of the experiment was a surprise."], ans: 1, exp: "'Outcome' already implies finality; 'final' is redundant." },
  { cat: "writing", diff: 5, q: "Which sentence best creates a smooth transition between paragraphs?", opts: ["Now let's talk about something else.", "Having discussed the causes, we now turn to the effects.", "This is another thing.", "Moving on."], ans: 1, exp: "The transition explicitly links previous and upcoming content." },
  { cat: "writing", diff: 5, q: "Which choice best varies sentence structure in a paragraph?", opts: ["All sentences follow the same pattern.", "Mixing short and long sentences creates rhythm.", "Every sentence begins with the subject.", "Using only simple sentences is best."], ans: 1, exp: "Varied sentence length improves readability and engagement." }
];

// Helper: get questions by category and optional difficulty range
function getQuestions(cat, minDiff, maxDiff) {
  return QUESTIONS.filter(q => q.cat === cat && q.diff >= minDiff && q.diff <= maxDiff);
}

// Helper: get a random question from a pool
function getRandomQuestion(pool) {
  if (pool.length === 0) return QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}
