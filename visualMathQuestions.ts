// Original math practice. Diagrams and worked visuals are generated from exact data.
// SAT SPR entries have no q.answer sentinel; acceptedAnswers are graded by numericResponse.ts.
export const VISUAL_MATH_QUESTIONS = [
  {
    "id": "sat-spr-original-01",
    "testType": "sat",
    "format": "spr",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "If 3x + 7 = 28, what is the value of x?",
    "choices": [],
    "acceptedAnswers": [
      "7"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Subtract 7 to obtain 3x = 21. Dividing by 3 gives x = 7."
  },
  {
    "id": "sat-spr-original-02",
    "testType": "sat",
    "format": "spr",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "If 5x − 8 = −23, what is the value of x?",
    "choices": [],
    "acceptedAnswers": [
      "-3"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Add 8 to both sides: 5x = −15. Divide by 5 to obtain x = −3."
  },
  {
    "id": "sat-spr-original-03",
    "testType": "sat",
    "format": "spr",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "If 4x + 1 = 3, what is the value of x?",
    "choices": [],
    "acceptedAnswers": [
      "1/2"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Subtract 1 and divide by 4: x = 2/4 = 1/2. The exact equivalent decimal 0.5 also represents this number."
  },
  {
    "id": "sat-spr-original-04",
    "testType": "sat",
    "format": "spr",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "The graph shows y = 2x + 5. What is the y-coordinate where the line crosses the y-axis?",
    "choices": [],
    "acceptedAnswers": [
      "5"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "At the y-axis, x = 0. Substitution gives y = 2(0) + 5 = 5.",
    "stimulus": {
      "type": "chart",
      "title": "Line y = 2x + 5",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": -2,
          "y": 1
        },
        {
          "x": 0,
          "y": 5
        },
        {
          "x": 2,
          "y": 9
        }
      ],
      "note": "Coordinates are exact; the plotted line or points, not the picture’s proportions, determine the answer.",
      "lines": [
        {
          "label": "y = 2x + 5",
          "points": [
            {
              "x": -2,
              "y": 1
            },
            {
              "x": 2,
              "y": 9
            }
          ]
        }
      ]
    }
  },
  {
    "id": "sat-spr-original-05",
    "testType": "sat",
    "format": "spr",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "The system x + y = 10 and 2x − y = 2 has one solution. What is its x-coordinate?",
    "choices": [],
    "acceptedAnswers": [
      "4"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Add the equations to eliminate y: 3x = 12. Thus x = 4; substitution gives y = 6."
  },
  {
    "id": "sat-spr-original-06",
    "testType": "sat",
    "format": "spr",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "If 3x = 2, what is the value of x? Enter an exact fraction or an allowed decimal.",
    "choices": [],
    "acceptedAnswers": [
      "2/3"
    ],
    "rounding": {
      "mode": "listed",
      "acceptedDecimals": [
        ".6666",
        ".6667",
        "0.666",
        "0.667"
      ],
      "note": "Exact fraction is preferred. Only the explicitly listed rounded/truncated decimal values are accepted; there is no blanket numeric tolerance. The optional leading zero changes available digit space.",
      "precisionByEntry": {
        ".6666": 4,
        ".6667": 4,
        "0.666": 3,
        "0.667": 3
      }
    },
    "explanation": "Dividing by 3 gives x = 2/3. Its decimal repeats. Accepted decimal entries include .6666 or .6667 without a leading zero, and 0.666 or 0.667 with a leading zero."
  },
  {
    "id": "sat-spr-original-07",
    "testType": "sat",
    "format": "spr",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "If x² − 9 = 0, what is one possible value of x? Enter only one answer.",
    "choices": [],
    "acceptedAnswers": [
      "-3",
      "3"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Factor x² − 9 as (x − 3)(x + 3). Either x = 3 or x = −3 makes one factor zero, so either single value is accepted."
  },
  {
    "id": "sat-spr-original-08",
    "testType": "sat",
    "format": "spr",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "If (x − 2)(x − 5) = 0, what is one possible value of x? Enter only one answer.",
    "choices": [],
    "acceptedAnswers": [
      "2",
      "5"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "The zero-product property gives x − 2 = 0 or x − 5 = 0. The solutions are 2 and 5; enter one of them."
  },
  {
    "id": "sat-spr-original-09",
    "testType": "sat",
    "format": "spr",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "The positive number x satisfies x² = 1/4. What is x?",
    "choices": [],
    "acceptedAnswers": [
      "1/2"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Taking square roots gives x = ±1/2. The requirement that x be positive selects 1/2, not −1/2."
  },
  {
    "id": "sat-spr-original-10",
    "testType": "sat",
    "format": "spr",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "The function f is defined by f(x) = 2^(x + 1). What is f(3)?",
    "choices": [],
    "acceptedAnswers": [
      "16"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Substitute 3: f(3) = 2^(3 + 1) = 2⁴ = 16."
  },
  {
    "id": "sat-spr-original-11",
    "testType": "sat",
    "format": "spr",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "For x ≠ 4, g(x) = (x² − 16)/(x − 4). What is g(7)?",
    "choices": [],
    "acceptedAnswers": [
      "11"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Factor x² − 16 = (x − 4)(x + 4). At x = 7 the denominator is nonzero, so g(7) = 7 + 4 = 11."
  },
  {
    "id": "sat-spr-original-12",
    "testType": "sat",
    "format": "spr",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "If √(3x + 1) = 4, what is the value of x?",
    "choices": [],
    "acceptedAnswers": [
      "5"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Square both sides: 3x + 1 = 16, so x = 5. Check in the original equation: √16 = 4, so the value is valid."
  },
  {
    "id": "sat-spr-original-13",
    "testType": "sat",
    "format": "spr",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "What is the arithmetic mean of 3, 5, 7, and 9?",
    "choices": [],
    "acceptedAnswers": [
      "6"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "The sum is 24 and there are four values. The mean is 24/4 = 6.",
    "stimulus": {
      "type": "table",
      "title": "Four observations",
      "columns": [
        "Observation",
        "Value"
      ],
      "rows": [
        [
          "A",
          "3"
        ],
        [
          "B",
          "5"
        ],
        [
          "C",
          "7"
        ],
        [
          "D",
          "9"
        ]
      ],
      "note": "Original exact values for this practice problem."
    }
  },
  {
    "id": "sat-spr-original-14",
    "testType": "sat",
    "format": "spr",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "A club has 80 members. If 30% of its members volunteer, how many members volunteer?",
    "choices": [],
    "acceptedAnswers": [
      "24"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Thirty percent is 0.30. Multiply 80 by 0.30 to obtain 24 members. Enter the number without a percent sign."
  },
  {
    "id": "sat-spr-original-15",
    "testType": "sat",
    "format": "spr",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "The ratio of red tiles to blue tiles is 4 to 7. If there are 33 tiles altogether, how many are red?",
    "choices": [],
    "acceptedAnswers": [
      "12"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "There are 4 + 7 = 11 equal ratio parts. Each part contains 33/11 = 3 tiles. The red portion is 4 × 3 = 12."
  },
  {
    "id": "sat-spr-original-16",
    "testType": "sat",
    "format": "spr",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "A cyclist travels 2 miles in 3 minutes at a constant speed. What is the speed in miles per minute?",
    "choices": [],
    "acceptedAnswers": [
      "2/3"
    ],
    "rounding": {
      "mode": "listed",
      "acceptedDecimals": [
        ".6666",
        ".6667",
        "0.666",
        "0.667"
      ],
      "note": "Exact fraction is preferred. Only the explicitly listed rounded/truncated decimal values are accepted; there is no blanket numeric tolerance. The optional leading zero changes available digit space.",
      "precisionByEntry": {
        ".6666": 4,
        ".6667": 4,
        "0.666": 3,
        "0.667": 3
      }
    },
    "explanation": "Divide distance by time: 2/3 mile per minute. Do not invert the ratio. Use the exact fraction or an approved repeating-decimal entry."
  },
  {
    "id": "sat-spr-original-17",
    "testType": "sat",
    "format": "spr",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "A workshop lasts 2.5 hours. How many minutes does it last?",
    "choices": [],
    "acceptedAnswers": [
      "150"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "Multiply by 60 minutes per hour: 2.5 × 60 = 150 minutes. Enter only 150, without a unit."
  },
  {
    "id": "sat-spr-original-18",
    "testType": "sat",
    "format": "spr",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "A bag contains 5 blue, 7 red, and 3 green counters. One counter is selected at random, with every counter equally likely. What is the probability it is blue?",
    "choices": [],
    "acceptedAnswers": [
      "1/3"
    ],
    "rounding": {
      "mode": "listed",
      "acceptedDecimals": [
        ".3333",
        "0.333"
      ],
      "note": "Exact fraction is preferred. Only the explicitly listed rounded/truncated decimal values are accepted; there is no blanket numeric tolerance. The optional leading zero changes available digit space.",
      "precisionByEntry": {
        ".3333": 4,
        "0.333": 3
      }
    },
    "explanation": "There are 15 counters altogether, of which 5 are blue. The probability is 5/15 = 1/3."
  },
  {
    "id": "sat-spr-original-19",
    "testType": "sat",
    "format": "spr",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "A triangle has base 8 units and perpendicular height 5 units. What is its area in square units?",
    "choices": [],
    "acceptedAnswers": [
      "20"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "The area is (1/2) × base × height = (1/2) × 8 × 5 = 20.",
    "stimulus": {
      "type": "geometry",
      "kind": "triangle",
      "title": "Right triangle with base 8 and height 5",
      "vertices": [
        {
          "x": 15,
          "y": 85,
          "label": "A"
        },
        {
          "x": 85,
          "y": 85,
          "label": "B"
        },
        {
          "x": 15,
          "y": 15,
          "label": "C"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "base",
          "value": 8
        },
        {
          "from": 0,
          "to": 2,
          "label": "height",
          "value": 5
        }
      ],
      "note": "Angle A is a right angle; AC is perpendicular to AB. Schematic, not to scale."
    }
  },
  {
    "id": "sat-spr-original-20",
    "testType": "sat",
    "format": "spr",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "A rectangle has length 7 units and perimeter 22 units. What is its width in units?",
    "choices": [],
    "acceptedAnswers": [
      "4"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "For width w, 2(7 + w) = 22. Dividing by 2 gives 7 + w = 11, so w = 4.",
    "stimulus": {
      "type": "geometry",
      "kind": "rectangle",
      "title": "Rectangle with unknown width",
      "vertices": [
        {
          "x": 15,
          "y": 25,
          "label": "A"
        },
        {
          "x": 85,
          "y": 25,
          "label": "B"
        },
        {
          "x": 85,
          "y": 75,
          "label": "C"
        },
        {
          "x": 15,
          "y": 75,
          "label": "D"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "length",
          "value": 7
        },
        {
          "from": 1,
          "to": 2,
          "label": "width",
          "value": "w"
        }
      ],
      "note": "Schematic rectangle; adjacent sides are perpendicular. Use labeled dimensions, not visual scale."
    }
  },
  {
    "id": "sat-spr-original-21",
    "testType": "sat",
    "format": "spr",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "A circle has radius 3 units and area A square units. What is A/π?",
    "choices": [],
    "acceptedAnswers": [
      "9"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "A = πr² = 9π. Dividing by π gives A/π = 9.",
    "stimulus": {
      "type": "geometry",
      "kind": "circle",
      "title": "Circle of radius 3",
      "dimensions": [
        {
          "label": "radius",
          "value": 3
        }
      ],
      "note": "Schematic circle. The labeled radius, not image size, determines the measurement."
    }
  },
  {
    "id": "sat-spr-original-22",
    "testType": "sat",
    "format": "spr",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "A right triangle has perpendicular legs of lengths 5 and 12. What is its hypotenuse length?",
    "choices": [],
    "acceptedAnswers": [
      "13"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "The Pythagorean theorem gives c² = 5² + 12² = 169. A length is positive, so c = 13.",
    "stimulus": {
      "type": "geometry",
      "kind": "triangle",
      "title": "Right triangle",
      "vertices": [
        {
          "x": 15,
          "y": 85,
          "label": "A"
        },
        {
          "x": 85,
          "y": 85,
          "label": "B"
        },
        {
          "x": 15,
          "y": 15,
          "label": "C"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "leg",
          "value": 12
        },
        {
          "from": 0,
          "to": 2,
          "label": "leg",
          "value": 5
        },
        {
          "from": 1,
          "to": 2,
          "label": "hypotenuse",
          "value": "c"
        }
      ],
      "note": "Angle A is 90°. Schematic, not to scale."
    }
  },
  {
    "id": "sat-spr-original-23",
    "testType": "sat",
    "format": "spr",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "Two triangles are similar. A side of length 4 in the smaller triangle corresponds to a side of length 10 in the larger. A second smaller side of length 6 corresponds to a side of length x. What is x?",
    "choices": [],
    "acceptedAnswers": [
      "15"
    ],
    "rounding": {
      "mode": "exact"
    },
    "explanation": "The enlargement factor is 10/4 = 2.5. Multiply the corresponding side 6 by 2.5 to obtain x = 15."
  },
  {
    "id": "sat-spr-original-24",
    "testType": "sat",
    "format": "spr",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Student-produced response",
    "question": "In a right triangle, an acute angle θ has opposite side length 4 and hypotenuse length 6. What is sin θ?",
    "choices": [],
    "acceptedAnswers": [
      "2/3"
    ],
    "rounding": {
      "mode": "listed",
      "acceptedDecimals": [
        ".6666",
        ".6667",
        "0.666",
        "0.667"
      ],
      "note": "Exact fraction is preferred. Only the explicitly listed rounded/truncated decimal values are accepted; there is no blanket numeric tolerance. The optional leading zero changes available digit space.",
      "precisionByEntry": {
        ".6666": 4,
        ".6667": 4,
        "0.666": 3,
        "0.667": 3
      }
    },
    "explanation": "For an acute angle in a right triangle, sin θ = opposite/hypotenuse = 4/6 = 2/3."
  },
  {
    "id": "sat-visual-mcq-01",
    "testType": "sat",
    "format": "mcq",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The line passes through the plotted points (0, 1) and (2, 5). What is its slope?",
    "choices": [
      "1/2",
      "2",
      "3",
      "4"
    ],
    "answer": 1,
    "explanation": "Slope is the change in y divided by the change in x: (5 − 1)/(2 − 0) = 4/2 = 2. The worked plot connects the same exact coordinates.",
    "stimulus": {
      "type": "chart",
      "title": "Two points on a line",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 1
        },
        {
          "x": 2,
          "y": 5
        }
      ],
      "note": "Coordinates are exact; the plotted line or points, not the picture’s proportions, determine the answer.",
      "lines": [
        {
          "label": "Line through the points",
          "points": [
            {
              "x": 0,
              "y": 1
            },
            {
              "x": 2,
              "y": 5
            }
          ]
        }
      ]
    },
    "explanationStimulus": {
      "type": "chart",
      "title": "Worked slope: rise 4, run 2",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 1
        },
        {
          "x": 2,
          "y": 1
        },
        {
          "x": 2,
          "y": 5
        }
      ],
      "note": "From (0,1), move right 2 and up 4 to reach (2,5); slope = 4/2 = 2.",
      "lines": [
        {
          "label": "Line",
          "points": [
            {
              "x": 0,
              "y": 1
            },
            {
              "x": 2,
              "y": 5
            }
          ]
        },
        {
          "label": "Run and rise",
          "points": [
            {
              "x": 0,
              "y": 1
            },
            {
              "x": 2,
              "y": 1
            },
            {
              "x": 2,
              "y": 5
            }
          ]
        }
      ]
    }
  },
  {
    "id": "sat-visual-mcq-02",
    "testType": "sat",
    "format": "mcq",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The graph shows y = x + 1 and y = −x + 5. What is the x-coordinate of their intersection?",
    "choices": [
      "1",
      "3",
      "4",
      "2"
    ],
    "answer": 3,
    "explanation": "At the intersection, x + 1 = −x + 5. Thus 2x = 4 and x = 2. Both lines then have y = 3.",
    "stimulus": {
      "type": "chart",
      "title": "Two linear functions",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 1
        },
        {
          "x": 4,
          "y": 5
        },
        {
          "x": 0,
          "y": 5
        },
        {
          "x": 4,
          "y": 1
        }
      ],
      "note": "Coordinates are exact; the plotted line or points, not the picture’s proportions, determine the answer.",
      "lines": [
        {
          "label": "y = x + 1",
          "points": [
            {
              "x": 0,
              "y": 1
            },
            {
              "x": 4,
              "y": 5
            }
          ]
        },
        {
          "label": "y = −x + 5",
          "points": [
            {
              "x": 0,
              "y": 5
            },
            {
              "x": 4,
              "y": 1
            }
          ]
        }
      ]
    },
    "explanationStimulus": {
      "type": "chart",
      "title": "Worked intersection at (2,3)",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 1
        },
        {
          "x": 4,
          "y": 5
        },
        {
          "x": 0,
          "y": 5
        },
        {
          "x": 4,
          "y": 1
        },
        {
          "x": 2,
          "y": 3
        }
      ],
      "note": "The shared point is (2,3); the requested x-coordinate is 2.",
      "lines": [
        {
          "label": "y = x + 1",
          "points": [
            {
              "x": 0,
              "y": 1
            },
            {
              "x": 4,
              "y": 5
            }
          ]
        },
        {
          "label": "y = −x + 5",
          "points": [
            {
              "x": 0,
              "y": 5
            },
            {
              "x": 4,
              "y": 1
            }
          ]
        }
      ]
    }
  },
  {
    "id": "sat-visual-mcq-03",
    "testType": "sat",
    "format": "mcq",
    "domain": "Algebra",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The plotted line has equation y = 2x + 4. What is its x-intercept?",
    "choices": [
      "−2",
      "0",
      "2",
      "4"
    ],
    "answer": 0,
    "explanation": "At an x-intercept, y = 0. Solve 0 = 2x + 4 to obtain x = −2. The y-intercept, 4, answers a different question.",
    "stimulus": {
      "type": "chart",
      "title": "Line y = 2x + 4",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": -2,
          "y": 0
        },
        {
          "x": 0,
          "y": 4
        },
        {
          "x": 1,
          "y": 6
        }
      ],
      "note": "Coordinates are exact; the plotted line or points, not the picture’s proportions, determine the answer.",
      "lines": [
        {
          "label": "y = 2x + 4",
          "points": [
            {
              "x": -2,
              "y": 0
            },
            {
              "x": 1,
              "y": 6
            }
          ]
        }
      ]
    },
    "explanationStimulus": {
      "type": "chart",
      "title": "Worked x-intercept",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": -2,
          "y": 0
        },
        {
          "x": 0,
          "y": 4
        },
        {
          "x": 1,
          "y": 6
        }
      ],
      "note": "The line meets y = 0 at (−2,0), so its x-intercept is −2.",
      "lines": [
        {
          "label": "y = 2x + 4",
          "points": [
            {
              "x": -2,
              "y": 0
            },
            {
              "x": 1,
              "y": 6
            }
          ]
        }
      ]
    }
  },
  {
    "id": "sat-visual-mcq-04",
    "testType": "sat",
    "format": "mcq",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The graph represents f(x) = (x − 2)² + 1. What is the minimum value of f(x)?",
    "choices": [
      "0",
      "2",
      "1",
      "3"
    ],
    "answer": 2,
    "explanation": "The square (x − 2)² is nonnegative. It is zero at x = 2, making the minimum output 1. The vertex is (2,1).",
    "stimulus": {
      "type": "chart",
      "title": "Quadratic function",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 5
        },
        {
          "x": 1,
          "y": 2
        },
        {
          "x": 2,
          "y": 1
        },
        {
          "x": 3,
          "y": 2
        },
        {
          "x": 4,
          "y": 5
        }
      ],
      "note": "Exact sampled values from f(x) = (x − 2)² + 1; segments illustrate the curve, not a piecewise-linear definition.",
      "lines": [
        {
          "label": "Sampled quadratic curve",
          "points": [
            {
              "x": 0,
              "y": 5
            },
            {
              "x": 1,
              "y": 2
            },
            {
              "x": 2,
              "y": 1
            },
            {
              "x": 3,
              "y": 2
            },
            {
              "x": 4,
              "y": 5
            }
          ]
        }
      ]
    },
    "explanationStimulus": {
      "type": "chart",
      "title": "Worked vertex: (2,1)",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 5
        },
        {
          "x": 1,
          "y": 2
        },
        {
          "x": 2,
          "y": 1
        },
        {
          "x": 3,
          "y": 2
        },
        {
          "x": 4,
          "y": 5
        }
      ],
      "note": "The lowest point occurs at x=2 with f(x)=1; the equation establishes the global minimum.",
      "lines": [
        {
          "label": "Sampled quadratic curve",
          "points": [
            {
              "x": 0,
              "y": 5
            },
            {
              "x": 1,
              "y": 2
            },
            {
              "x": 2,
              "y": 1
            },
            {
              "x": 3,
              "y": 2
            },
            {
              "x": 4,
              "y": 5
            }
          ]
        }
      ]
    }
  },
  {
    "id": "sat-visual-mcq-05",
    "testType": "sat",
    "format": "mcq",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The table gives values of f(x) = a·b^x, where a and b are positive constants. What is b?",
    "choices": [
      "3",
      "2",
      "6",
      "12"
    ],
    "answer": 1,
    "explanation": "For each increase of 1 in x, the output doubles: 6/3 = 2 and 12/6 = 2. Thus the exponential growth factor b is 2.",
    "stimulus": {
      "type": "table",
      "title": "Exponential outputs",
      "columns": [
        "x",
        "f(x)"
      ],
      "rows": [
        [
          "0",
          "3"
        ],
        [
          "1",
          "6"
        ],
        [
          "2",
          "12"
        ]
      ],
      "note": "Original exact values for this practice problem."
    }
  },
  {
    "id": "sat-visual-mcq-06",
    "testType": "sat",
    "format": "mcq",
    "domain": "Advanced Math",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The plotted points lie on f(x) = x² − 4x + 3. Which value is a zero of f?",
    "choices": [
      "−1",
      "0",
      "2",
      "3"
    ],
    "answer": 3,
    "explanation": "Factor f(x) = (x − 1)(x − 3). The zeros are 1 and 3, and only 3 appears among the choices. The graph’s x-axis crossings agree.",
    "stimulus": {
      "type": "chart",
      "title": "Quadratic samples",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 3
        },
        {
          "x": 1,
          "y": 0
        },
        {
          "x": 2,
          "y": -1
        },
        {
          "x": 3,
          "y": 0
        },
        {
          "x": 4,
          "y": 3
        }
      ],
      "note": "Exact sampled values of x²−4x+3; straight connectors are only a visual guide.",
      "lines": [
        {
          "label": "Sampled quadratic curve",
          "points": [
            {
              "x": 0,
              "y": 3
            },
            {
              "x": 1,
              "y": 0
            },
            {
              "x": 2,
              "y": -1
            },
            {
              "x": 3,
              "y": 0
            },
            {
              "x": 4,
              "y": 3
            }
          ]
        }
      ]
    }
  },
  {
    "id": "sat-visual-mcq-07",
    "testType": "sat",
    "format": "mcq",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The table shows the number of books read by four students. What is the mean number of books?",
    "choices": [
      "5",
      "6",
      "7",
      "8"
    ],
    "answer": 0,
    "explanation": "The sum is 3 + 5 + 5 + 7 = 20 books. Dividing by four students gives a mean of 5 books.",
    "stimulus": {
      "type": "table",
      "title": "Books read",
      "columns": [
        "Student",
        "Books"
      ],
      "rows": [
        [
          "A",
          "3"
        ],
        [
          "B",
          "5"
        ],
        [
          "C",
          "5"
        ],
        [
          "D",
          "7"
        ]
      ],
      "note": "Original exact values for this practice problem."
    }
  },
  {
    "id": "sat-visual-mcq-08",
    "testType": "sat",
    "format": "mcq",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "A survey’s results are shown. If one of the 60 responses is chosen at random, what is the probability it indicates walking?",
    "choices": [
      "1/2",
      "1/5",
      "1/3",
      "2/3"
    ],
    "answer": 2,
    "explanation": "There are 20 walking responses among 60 total responses, giving 20/60 = 1/3.",
    "stimulus": {
      "type": "table",
      "title": "Travel choices in a survey",
      "columns": [
        "Choice",
        "Responses"
      ],
      "rows": [
        [
          "Walking",
          "20"
        ],
        [
          "Bicycle",
          "10"
        ],
        [
          "Bus",
          "30"
        ]
      ],
      "note": "Each respondent selected exactly one choice. These are invented practice data, not a representative population survey."
    }
  },
  {
    "id": "sat-visual-mcq-09",
    "testType": "sat",
    "format": "mcq",
    "domain": "Problem Solving and Data Analysis",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The points show the total cost of notebooks at a constant price per notebook. What is the cost of one notebook?",
    "choices": [
      "$2.50",
      "$3.00",
      "$3.50",
      "$5.00"
    ],
    "answer": 2,
    "explanation": "The plotted costs are proportional to quantity. Dividing $10.50 by 3 notebooks gives $3.50 per notebook. Therefore the correct choice is $3.50.",
    "stimulus": {
      "type": "chart",
      "title": "Notebook purchases",
      "xLabel": "Notebooks",
      "yLabel": "Total cost ($)",
      "points": [
        {
          "x": 1,
          "y": 3.5
        },
        {
          "x": 2,
          "y": 7
        },
        {
          "x": 3,
          "y": 10.5
        }
      ],
      "note": "Original exact practice values; all notebooks have the same unit price.",
      "lines": [
        {
          "label": "Constant unit price",
          "points": [
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 3,
              "y": 10.5
            }
          ]
        }
      ]
    }
  },
  {
    "id": "sat-visual-mcq-10",
    "testType": "sat",
    "format": "mcq",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "Rectangle ABCD has adjacent side lengths 9 and 4. What is its area?",
    "choices": [
      "13",
      "26",
      "18",
      "36"
    ],
    "answer": 3,
    "explanation": "A rectangle’s area is length × width: 9 × 4 = 36 square units. Adding side lengths instead would not give area.",
    "stimulus": {
      "type": "geometry",
      "kind": "rectangle",
      "title": "Rectangle ABCD",
      "vertices": [
        {
          "x": 15,
          "y": 25,
          "label": "A"
        },
        {
          "x": 85,
          "y": 25,
          "label": "B"
        },
        {
          "x": 85,
          "y": 75,
          "label": "C"
        },
        {
          "x": 15,
          "y": 75,
          "label": "D"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "length",
          "value": 9
        },
        {
          "from": 1,
          "to": 2,
          "label": "width",
          "value": 4
        }
      ],
      "note": "Schematic rectangle; adjacent sides are perpendicular. Use labeled dimensions, not visual scale."
    },
    "explanationStimulus": {
      "type": "geometry",
      "kind": "rectangle",
      "title": "Worked area: 9 × 4 = 36",
      "vertices": [
        {
          "x": 15,
          "y": 25,
          "label": "A"
        },
        {
          "x": 85,
          "y": 25,
          "label": "B"
        },
        {
          "x": 85,
          "y": 75,
          "label": "C"
        },
        {
          "x": 15,
          "y": 75,
          "label": "D"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "length",
          "value": 9
        },
        {
          "from": 1,
          "to": 2,
          "label": "width",
          "value": 4
        }
      ],
      "note": "Schematic rectangle; adjacent sides are perpendicular. Use labeled dimensions, not visual scale."
    }
  },
  {
    "id": "sat-visual-mcq-11",
    "testType": "sat",
    "format": "mcq",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "Triangle ABC has a right angle at A, with AB = 8 and AC = 6. What is BC?",
    "choices": [
      "10",
      "12",
      "14",
      "100"
    ],
    "answer": 0,
    "explanation": "BC is opposite the right angle, so BC² = 8² + 6² = 100. The positive hypotenuse length is √100 = 10.",
    "stimulus": {
      "type": "geometry",
      "kind": "triangle",
      "title": "Right triangle ABC",
      "vertices": [
        {
          "x": 15,
          "y": 85,
          "label": "A"
        },
        {
          "x": 85,
          "y": 85,
          "label": "B"
        },
        {
          "x": 15,
          "y": 15,
          "label": "C"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "AB",
          "value": 8
        },
        {
          "from": 0,
          "to": 2,
          "label": "AC",
          "value": 6
        },
        {
          "from": 1,
          "to": 2,
          "label": "BC",
          "value": "?"
        }
      ],
      "note": "Angle A is a right angle. Drawing is schematic."
    },
    "explanationStimulus": {
      "type": "geometry",
      "kind": "triangle",
      "title": "Worked hypotenuse: 10",
      "vertices": [
        {
          "x": 15,
          "y": 85,
          "label": "A"
        },
        {
          "x": 85,
          "y": 85,
          "label": "B"
        },
        {
          "x": 15,
          "y": 15,
          "label": "C"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "AB",
          "value": 8
        },
        {
          "from": 0,
          "to": 2,
          "label": "AC",
          "value": 6
        },
        {
          "from": 1,
          "to": 2,
          "label": "BC",
          "value": 10
        }
      ],
      "note": "8² + 6² = 100, and √100 = 10."
    }
  },
  {
    "id": "sat-visual-mcq-12",
    "testType": "sat",
    "format": "mcq",
    "domain": "Geometry & Trigonometry",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "A circle has radius 5. What is its circumference?",
    "choices": [
      "5π",
      "10π",
      "20π",
      "25π"
    ],
    "answer": 1,
    "explanation": "Circumference is 2πr, so 2π(5) = 10π. The expression 25π would be the area, not the circumference.",
    "stimulus": {
      "type": "geometry",
      "kind": "circle",
      "title": "Circle with radius 5",
      "dimensions": [
        {
          "label": "radius",
          "value": 5
        }
      ],
      "note": "Schematic circle. The labeled radius, not image size, determines the measurement."
    },
    "explanationStimulus": {
      "type": "geometry",
      "kind": "circle",
      "title": "Worked circumference: 2π(5) = 10π",
      "dimensions": [
        {
          "label": "radius",
          "value": 5
        }
      ],
      "note": "The diameter is 10, so circumference = π × diameter = 10π."
    }
  },
  {
    "id": "act-visual-mcq-01",
    "testType": "act",
    "format": "mcq",
    "domain": "Number & Quantity",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The table gives four integers. What is the sum of their absolute values?",
    "choices": [
      "0",
      "4",
      "10",
      "14"
    ],
    "answer": 3,
    "explanation": "The absolute values are 3, 5, 2, and 4. Their sum is 14; the signs do not cancel when absolute values are added.",
    "stimulus": {
      "type": "table",
      "title": "Four integers",
      "columns": [
        "Entry",
        "Value"
      ],
      "rows": [
        [
          "A",
          "-3"
        ],
        [
          "B",
          "5"
        ],
        [
          "C",
          "-2"
        ],
        [
          "D",
          "4"
        ]
      ],
      "note": "Original exact values for this practice problem."
    }
  },
  {
    "id": "act-visual-mcq-02",
    "testType": "act",
    "format": "mcq",
    "domain": "Number & Quantity",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "A recipe uses the amounts shown. What fraction of a cup of liquid is used altogether?",
    "choices": [
      "7/8",
      "1/2",
      "5/8",
      "1"
    ],
    "answer": 0,
    "explanation": "Use eighths: 1/2 = 4/8 and 3/8 stays 3/8. The total is 7/8 cup.",
    "stimulus": {
      "type": "table",
      "title": "Recipe liquids",
      "columns": [
        "Liquid",
        "Cups"
      ],
      "rows": [
        [
          "Water",
          "1/2"
        ],
        [
          "Milk",
          "3/8"
        ]
      ],
      "note": "Original exact values for this practice problem."
    }
  },
  {
    "id": "act-visual-mcq-03",
    "testType": "act",
    "format": "mcq",
    "domain": "Number & Quantity",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "A scale drawing uses 1 centimeter to represent 8 meters. Which actual distance corresponds to 3.5 centimeters?",
    "choices": [
      "12 meters",
      "24 meters",
      "28 meters",
      "35 meters"
    ],
    "answer": 2,
    "explanation": "Multiply the drawing length by 8 meters per centimeter: 3.5 × 8 = 28 meters.",
    "stimulus": {
      "type": "table",
      "title": "Scale drawing key",
      "columns": [
        "Drawing length",
        "Actual distance"
      ],
      "rows": [
        [
          "1 cm",
          "8 m"
        ],
        [
          "3.5 cm",
          "?"
        ]
      ],
      "note": "Original exact values for this practice problem."
    }
  },
  {
    "id": "act-visual-mcq-04",
    "testType": "act",
    "format": "mcq",
    "domain": "Algebra & Functions",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The graph shows y = 3x and y = −x + 8. What is the y-coordinate of their intersection?",
    "choices": [
      "2",
      "6",
      "8",
      "12"
    ],
    "answer": 1,
    "explanation": "At the intersection, 3x = −x + 8, so x = 2. Substitute into y = 3x to obtain the requested y-coordinate 6.",
    "stimulus": {
      "type": "chart",
      "title": "A system of lines",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 0
        },
        {
          "x": 3,
          "y": 9
        },
        {
          "x": 0,
          "y": 8
        },
        {
          "x": 4,
          "y": 4
        }
      ],
      "note": "Coordinates are exact; the plotted line or points, not the picture’s proportions, determine the answer.",
      "lines": [
        {
          "label": "y = 3x",
          "points": [
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 3,
              "y": 9
            }
          ]
        },
        {
          "label": "y = −x + 8",
          "points": [
            {
              "x": 0,
              "y": 8
            },
            {
              "x": 4,
              "y": 4
            }
          ]
        }
      ]
    },
    "explanationStimulus": {
      "type": "chart",
      "title": "Worked solution: (2,6)",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": 0,
          "y": 0
        },
        {
          "x": 3,
          "y": 9
        },
        {
          "x": 0,
          "y": 8
        },
        {
          "x": 4,
          "y": 4
        },
        {
          "x": 2,
          "y": 6
        }
      ],
      "note": "The lines share (2,6); choose y=6, not the x-coordinate2.",
      "lines": [
        {
          "label": "y = 3x",
          "points": [
            {
              "x": 0,
              "y": 0
            },
            {
              "x": 3,
              "y": 9
            }
          ]
        },
        {
          "label": "y = −x + 8",
          "points": [
            {
              "x": 0,
              "y": 8
            },
            {
              "x": 4,
              "y": 4
            }
          ]
        }
      ]
    }
  },
  {
    "id": "act-visual-mcq-05",
    "testType": "act",
    "format": "mcq",
    "domain": "Algebra & Functions",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The table lists a linear function. What is f(5)?",
    "choices": [
      "9",
      "10",
      "11",
      "13"
    ],
    "answer": 2,
    "explanation": "The output increases by 2 whenever x increases by 1, and f(0)=1. Therefore f(x)=2x+1 and f(5)=11.",
    "stimulus": {
      "type": "table",
      "title": "Linear function",
      "columns": [
        "x",
        "f(x)"
      ],
      "rows": [
        [
          "0",
          "1"
        ],
        [
          "1",
          "3"
        ],
        [
          "2",
          "5"
        ]
      ],
      "note": "Original exact values for this practice problem."
    }
  },
  {
    "id": "act-visual-mcq-06",
    "testType": "act",
    "format": "mcq",
    "domain": "Algebra & Functions",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The graph represents y = (x + 1)². What is the x-coordinate of its vertex?",
    "choices": [
      "−2",
      "0",
      "1",
      "−1"
    ],
    "answer": 3,
    "explanation": "Vertex form y=(x−h)²+k has vertex(h,k). Here h=−1 and k=0, so the x-coordinate is −1.",
    "stimulus": {
      "type": "chart",
      "title": "Quadratic samples",
      "xLabel": "x",
      "yLabel": "y",
      "points": [
        {
          "x": -3,
          "y": 4
        },
        {
          "x": -2,
          "y": 1
        },
        {
          "x": -1,
          "y": 0
        },
        {
          "x": 0,
          "y": 1
        },
        {
          "x": 1,
          "y": 4
        }
      ],
      "note": "Exact points sampled from (x+1)². The equation, not straight connecting segments, defines the parabola.",
      "lines": [
        {
          "label": "Sampled quadratic curve",
          "points": [
            {
              "x": -3,
              "y": 4
            },
            {
              "x": -2,
              "y": 1
            },
            {
              "x": -1,
              "y": 0
            },
            {
              "x": 0,
              "y": 1
            },
            {
              "x": 1,
              "y": 4
            }
          ]
        }
      ]
    }
  },
  {
    "id": "act-visual-mcq-07",
    "testType": "act",
    "format": "mcq",
    "domain": "Geometry",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "A rectangle has width 5 and length 11. What is its perimeter?",
    "choices": [
      "32",
      "55",
      "16",
      "30"
    ],
    "answer": 0,
    "explanation": "Perimeter counts all four sides: 2(11+5)=32. The product 55 is its area.",
    "stimulus": {
      "type": "geometry",
      "kind": "rectangle",
      "title": "Rectangle: length11, width5",
      "vertices": [
        {
          "x": 15,
          "y": 25,
          "label": "A"
        },
        {
          "x": 85,
          "y": 25,
          "label": "B"
        },
        {
          "x": 85,
          "y": 75,
          "label": "C"
        },
        {
          "x": 15,
          "y": 75,
          "label": "D"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "length",
          "value": 11
        },
        {
          "from": 1,
          "to": 2,
          "label": "width",
          "value": 5
        }
      ],
      "note": "Schematic rectangle; adjacent sides are perpendicular. Use labeled dimensions, not visual scale."
    },
    "explanationStimulus": {
      "type": "geometry",
      "kind": "rectangle",
      "title": "Worked perimeter: 11+5+11+5 = 32",
      "vertices": [
        {
          "x": 15,
          "y": 25,
          "label": "A"
        },
        {
          "x": 85,
          "y": 25,
          "label": "B"
        },
        {
          "x": 85,
          "y": 75,
          "label": "C"
        },
        {
          "x": 15,
          "y": 75,
          "label": "D"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "length",
          "value": 11
        },
        {
          "from": 1,
          "to": 2,
          "label": "width",
          "value": 5
        }
      ],
      "note": "The opposite sides have equal lengths; add all four side lengths."
    }
  },
  {
    "id": "act-visual-mcq-08",
    "testType": "act",
    "format": "mcq",
    "domain": "Geometry",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "In right triangle ABC, angle A is 90°, AB = 12, and AC = 9. What is BC?",
    "choices": [
      "21",
      "18",
      "15",
      "225"
    ],
    "answer": 2,
    "explanation": "BC²=12²+9²=225, so BC=15. The squared value225 is not a length.",
    "stimulus": {
      "type": "geometry",
      "kind": "triangle",
      "title": "Right triangle ABC",
      "vertices": [
        {
          "x": 15,
          "y": 85,
          "label": "A"
        },
        {
          "x": 85,
          "y": 85,
          "label": "B"
        },
        {
          "x": 15,
          "y": 15,
          "label": "C"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "AB",
          "value": 12
        },
        {
          "from": 0,
          "to": 2,
          "label": "AC",
          "value": 9
        },
        {
          "from": 1,
          "to": 2,
          "label": "BC",
          "value": "?"
        }
      ],
      "note": "Angle A is90°. Schematic, not to scale."
    },
    "explanationStimulus": {
      "type": "geometry",
      "kind": "triangle",
      "title": "Worked hypotenuse: 15",
      "vertices": [
        {
          "x": 15,
          "y": 85,
          "label": "A"
        },
        {
          "x": 85,
          "y": 85,
          "label": "B"
        },
        {
          "x": 15,
          "y": 15,
          "label": "C"
        }
      ],
      "dimensions": [
        {
          "from": 0,
          "to": 1,
          "label": "AB",
          "value": 12
        },
        {
          "from": 0,
          "to": 2,
          "label": "AC",
          "value": 9
        },
        {
          "from": 1,
          "to": 2,
          "label": "BC",
          "value": 15
        }
      ],
      "note": "12²+9²=225; taking the positive square root gives15."
    }
  },
  {
    "id": "act-visual-mcq-09",
    "testType": "act",
    "format": "mcq",
    "domain": "Geometry",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "A circle has radius 4. What is its area?",
    "choices": [
      "8π",
      "16π",
      "4π",
      "32π"
    ],
    "answer": 1,
    "explanation": "Area is πr²=π(4²)=16π. Circumference would be8π, which is a different measure.",
    "stimulus": {
      "type": "geometry",
      "kind": "circle",
      "title": "Circle with radius4",
      "dimensions": [
        {
          "label": "radius",
          "value": 4
        }
      ],
      "note": "Schematic circle. The labeled radius, not image size, determines the measurement."
    },
    "explanationStimulus": {
      "type": "geometry",
      "kind": "circle",
      "title": "Worked area: π(4²)=16π",
      "dimensions": [
        {
          "label": "radius",
          "value": 4
        }
      ],
      "note": "Square the radius4 to get16, then multiply byπ."
    }
  },
  {
    "id": "act-visual-mcq-10",
    "testType": "act",
    "format": "mcq",
    "domain": "Statistics & Probability",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The line shown is a model relating study hours x to a practice score y. According to the line, what score is predicted at x = 4?",
    "choices": [
      "60",
      "65",
      "70",
      "75"
    ],
    "answer": 3,
    "explanation": "The line passes through(0,55) and(2,65), so its slope is5 and its equation is y=5x+55. At x=4 the predicted score is75. A prediction from an invented model is not a guaranteed individual result.",
    "stimulus": {
      "type": "chart",
      "title": "Illustrative linear model",
      "xLabel": "Study hours",
      "yLabel": "Practice score",
      "points": [
        {
          "x": 0,
          "y": 55
        },
        {
          "x": 2,
          "y": 65
        },
        {
          "x": 4,
          "y": 75
        }
      ],
      "note": "Invented numerical model for algebra practice, not empirical evidence that study time causes a specific score.",
      "lines": [
        {
          "label": "y = 5x +55",
          "points": [
            {
              "x": 0,
              "y": 55
            },
            {
              "x": 4,
              "y": 75
            }
          ]
        }
      ]
    },
    "explanationStimulus": {
      "type": "chart",
      "title": "Worked prediction at x=4",
      "xLabel": "Study hours",
      "yLabel": "Practice score",
      "points": [
        {
          "x": 0,
          "y": 55
        },
        {
          "x": 2,
          "y": 65
        },
        {
          "x": 4,
          "y": 75
        }
      ],
      "note": "Substitute x=4 into the supplied model: y=5(4)+55=75.",
      "lines": [
        {
          "label": "y = 5x+55",
          "points": [
            {
              "x": 0,
              "y": 55
            },
            {
              "x": 4,
              "y": 75
            }
          ]
        }
      ]
    }
  },
  {
    "id": "act-visual-mcq-11",
    "testType": "act",
    "format": "mcq",
    "domain": "Statistics & Probability",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The table gives the outcomes of 20 equally weighted trials. If one recorded trial is selected at random, what is the probability that its outcome was B?",
    "choices": [
      "3/10",
      "1/5",
      "2/5",
      "1/2"
    ],
    "answer": 0,
    "explanation": "Outcome B occurred6 times out of20. Thus the probability for a uniformly selected recorded trial is6/20=3/10. This is not a claim about an unobserved population.",
    "stimulus": {
      "type": "table",
      "title": "Recorded trial outcomes",
      "columns": [
        "Outcome",
        "Count"
      ],
      "rows": [
        [
          "A",
          "4"
        ],
        [
          "B",
          "6"
        ],
        [
          "C",
          "10"
        ]
      ],
      "note": "Invented complete record of20 trials; one of these recorded trials is chosen uniformly."
    }
  },
  {
    "id": "act-visual-mcq-12",
    "testType": "act",
    "format": "mcq",
    "domain": "Statistics & Probability",
    "difficulty": "Medium",
    "questionType": "Visual reasoning",
    "question": "The table shows the ordered values of five observations. What is their median?",
    "choices": [
      "5",
      "6",
      "7",
      "8"
    ],
    "answer": 2,
    "explanation": "The median of five ordered observations is the third value. In2,5,7,8,13, the third value is7.",
    "stimulus": {
      "type": "table",
      "title": "Five ordered observations",
      "columns": [
        "Position",
        "Value"
      ],
      "rows": [
        [
          "1",
          "2"
        ],
        [
          "2",
          "5"
        ],
        [
          "3",
          "7"
        ],
        [
          "4",
          "8"
        ],
        [
          "5",
          "13"
        ]
      ],
      "note": "Original exact values for this practice problem."
    }
  }
];
export const VISUAL_MATH_REFERENCES = [
  {
    "title": "SAT student-produced response overview",
    "url": "https://satsuite.collegeboard.org/sat/whats-on-the-test/math/student-produced"
  },
  {
    "title": "SAT School Day Bluebook directions, Spring2026",
    "url": "https://satsuite.collegeboard.org/media/pdf/english-sat-essay-test-directions-bb.pdf"
  },
  {
    "title": "Enhanced ACT frequently asked questions",
    "url": "https://www.act.org/content/act/en/products-and-services/the-act-educator/the-act-test/enhancements-k12/faqs.html"
  }
];
