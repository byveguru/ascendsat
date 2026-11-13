// Original instructional content. Lesson checks also appear in the practice bank.
export const PHYSICS_1_CONTENT = {
  "lessons": [
    {
      "id": "physics1-lesson-1-1",
      "title": "1.1 Position, displacement, and average velocity",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Position, displacement, and average velocity"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Begin by defining an origin, a positive direction, and the object you will track. Position tells you where the object is relative to that origin. Displacement is final position minus initial position, so it includes direction. Distance is the length of the path actually traveled; it cannot be negative. These quantities coincide only for motion along one direction without a reversal. A negative position does not mean an object is moving negatively, and a positive displacement does not tell you its position at every earlier time.\n\nAverage velocity is displacement divided by elapsed time. Average speed is distance divided by elapsed time. Both use the whole interval, but their numerators describe different things. On a position-versus-time graph, the slope between two points gives average velocity. A horizontal segment represents an object staying at one position, even if that position is far from the origin. A steeper slope has a greater velocity magnitude; the vertical height of the graph represents position, not speed."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A cart starts at x=2 m, moves to x=8 m in3 s, then returns to x=5 m over the next3 s. Step1: its displacement for the full6 s is 5−2=+3 m. Step2: its distance is 6+3=9 m. Step3: average velocity is (+3 m)/(6 s)=+0.5 m/s, while average speed is 9/6=1.5 m/s. The different results describe the same journey without contradiction.\n\nIf you choose the opposite positive direction, all position coordinates and velocities change sign consistently, but distance and speed remain unchanged. A graph of this journey has a positive slope first and a negative slope later. The straight line joining its endpoints has the full-interval average slope, not the slope of either separate trip."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Mark an origin beside a straight track and record a toy cart's position every second. Use the same reference point on the cart each time. Plot position vertically and time horizontally, labeling units. Compare the endpoint slope with the slopes on individual segments. Repeat with a stop and a reversal. Position uncertainty from a wide marker becomes especially important when the displacement between samples is small. Increasing the measurement interval can reduce its relative effect but also hides short changes in motion. Explain that tradeoff instead of calling every irregularity an experimental mistake."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "A common error is averaging two speeds without checking the time spent at each speed. Another is reporting the final position as the displacement. Self-check: for a round trip to the starting position, displacement and average velocity are zero even though distance and average speed can be positive. This statement requires a nonzero elapsed time. Before calculating, write the requested quantity in words and identify whether direction belongs in the answer."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-1-1-1",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "For the6 s journey from 2 m to 8 m to 5 m, what is average velocity?",
          "passage": "Original hypothetical instructional setup. A cart starts at x = 2 m, reaches x = 8 m after 3 s, then returns to x = 5 m over the next 3 s. Take rightward as positive.",
          "choices": [
            "+0.5 m/s",
            "+1.5 m/s",
            "+3 m/s",
            "−0.5 m/s"
          ],
          "answer": 0,
          "explanation": "Net displacement is +3 m over6 s. Distance9 m would give average speed, not velocity.",
          "lessonTitle": "1.1 Position, displacement, and average velocity"
        },
        {
          "id": "physics1-mcq-1-1-2",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What does a horizontal section of a position–time graph represent?",
          "passage": "Original hypothetical instructional setup. A cart starts at x = 2 m, reaches x = 8 m after 3 s, then returns to x = 5 m over the next 3 s. Take rightward as positive.",
          "choices": [
            "An object remaining at one position",
            "An object moving with maximum speed",
            "An object at the origin necessarily",
            "An object whose acceleration increases steadily"
          ],
          "answer": 0,
          "explanation": "The graph height is constant, so displacement during any part of that section is zero.",
          "lessonTitle": "1.1 Position, displacement, and average velocity"
        },
        {
          "id": "physics1-mcq-1-1-3",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "An object completes a round trip in20 s. Which quantity must be zero?",
          "passage": "Original hypothetical instructional setup. A cart starts at x = 2 m, reaches x = 8 m after 3 s, then returns to x = 5 m over the next 3 s. Take rightward as positive.",
          "choices": [
            "Average velocity for the whole trip",
            "Total distance",
            "Average speed",
            "Instantaneous speed at every moment"
          ],
          "answer": 0,
          "explanation": "The final and initial positions coincide, so net displacement is zero over a nonzero elapsed time.",
          "lessonTitle": "1.1 Position, displacement, and average velocity"
        },
        {
          "id": "physics1-mcq-1-1-4",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which measurement is needed to determine average speed but not average velocity?",
          "passage": "Original hypothetical instructional setup. A cart starts at x = 2 m, reaches x = 8 m after 3 s, then returns to x = 5 m over the next 3 s. Take rightward as positive.",
          "choices": [
            "The total length of the traveled path",
            "The elapsed time",
            "The starting position",
            "The ending position"
          ],
          "answer": 0,
          "explanation": "Average speed uses path length; average velocity uses only net displacement and elapsed time.",
          "lessonTitle": "1.1 Position, displacement, and average velocity"
        }
      ]
    },
    {
      "id": "physics1-lesson-1-2",
      "title": "1.2 Velocity graphs and constant acceleration",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Velocity graphs and constant acceleration"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Velocity describes how quickly position changes, including direction. Acceleration describes how quickly velocity changes. On a velocity–time graph, slope gives acceleration, while signed area gives displacement. These two graphical operations answer different questions: a horizontal line can produce a large displacement while having zero acceleration. An object with negative velocity and positive acceleration is slowing down until its velocity reaches zero. Afterward, if the positive acceleration continues, it speeds up in the positive direction.\n\nFor constant acceleration, v=v₀+at and Δx=v₀t+½at² connect the same interval. The equation v²=v₀²+2aΔx removes time. Choose an equation because it connects known quantities to the requested unknown, not because it is the first equation on a reference sheet. Every quantity must refer to the same object and time interval, and these constant-acceleration equations do not apply unchanged when acceleration varies."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A cart has v₀=−6 m/s and constant a=+2 m/s² for 4 s. Its final velocity is −6+2(4)=+2 m/s. It stops momentarily at t=3 s, so the motion reverses. Displacement is (−6)(4)+½(2)(4²)=−8 m. On the velocity graph, the triangular negative area from 0 to 3 s is −9 m and the positive area from 3 to 4 s is +1 m. Their signed sum is −8 m, while the total distance is 9+1=10 m.\n\nThis comparison reveals why replacing displacement with distance in v²=v₀²+2aΔx fails for a reversing path. The entire interval's displacement has a sign, and the squared final velocity does not retain the final direction. Use a sign argument or the linear velocity equation to recover that direction."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Use a motion sensor to obtain a cart's velocity graph on a slightly tilted track. First check whether the plotted points support an approximately straight line before using a constant-acceleration model. Determine acceleration from a fitted slope over an interval rather than from one noisy pair. Compare displacement from graph area with independently measured endpoint positions. If you use a linear fit, report which interval was fitted: a collision or turnaround caused by a bumper can interrupt the assumed constant acceleration. A turnaround caused only by a constant force does not interrupt it."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Acceleration is not the same as speed. Opposite signs for velocity and acceleration mean decreasing speed, not necessarily motion in the positive direction. Also distinguish a signed graph area from the total area magnitude. Self-check: a cart's velocity can be zero at one instant while acceleration is nonzero. At that instant it can be reversing, rather than remaining at rest."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-1-2-1",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "For v₀=−6 m/s and a=+2 m/s², when does the cart first stop?",
          "passage": "Original hypothetical instructional setup. A cart starts with velocity −6 m/s and has constant acceleration +2 m/s² for 4 s. Take the initial time as zero.",
          "choices": [
            "3 s",
            "2 s",
            "4 s",
            "6 s"
          ],
          "answer": 0,
          "explanation": "Set0=−6+2t. The cart changes direction at 3 s if acceleration continues.",
          "lessonTitle": "1.2 Velocity graphs and constant acceleration",
          "stimulus": {
            "type": "chart",
            "title": "Velocity during the four-second interval",
            "xLabel": "Time (s)",
            "yLabel": "Velocity (m/s)",
            "xMin": 0,
            "xMax": 4,
            "yMin": -6,
            "yMax": 2,
            "points": [
              {
                "x": 0,
                "y": -6
              },
              {
                "x": 3,
                "y": 0
              },
              {
                "x": 4,
                "y": 2
              }
            ],
            "lines": [
              {
                "label": "Velocity",
                "points": [
                  {
                    "x": 0,
                    "y": -6
                  },
                  {
                    "x": 4,
                    "y": 2
                  }
                ]
              }
            ],
            "note": "Original hypothetical model; the line describes constant acceleration."
          }
        },
        {
          "id": "physics1-mcq-1-2-2",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is displacement over the4 s interval in the worked example?",
          "passage": "Original hypothetical instructional setup. A cart starts with velocity −6 m/s and has constant acceleration +2 m/s² for 4 s. Take the initial time as zero.",
          "choices": [
            "−8 m",
            "+8 m",
            "10 m",
            "−24 m"
          ],
          "answer": 0,
          "explanation": "Using−6(4)+½(2)(16) gives−8 m. The distance is 10 m because the cart reverses.",
          "lessonTitle": "1.2 Velocity graphs and constant acceleration",
          "stimulus": {
            "type": "chart",
            "title": "Velocity during the four-second interval",
            "xLabel": "Time (s)",
            "yLabel": "Velocity (m/s)",
            "xMin": 0,
            "xMax": 4,
            "yMin": -6,
            "yMax": 2,
            "points": [
              {
                "x": 0,
                "y": -6
              },
              {
                "x": 3,
                "y": 0
              },
              {
                "x": 4,
                "y": 2
              }
            ],
            "lines": [
              {
                "label": "Velocity",
                "points": [
                  {
                    "x": 0,
                    "y": -6
                  },
                  {
                    "x": 4,
                    "y": 2
                  }
                ]
              }
            ],
            "note": "Original hypothetical model; the line describes constant acceleration."
          }
        },
        {
          "id": "physics1-mcq-1-2-3",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A horizontal nonzero line on a velocity–time graph indicates what?",
          "passage": "Original hypothetical instructional setup. A cart starts with velocity −6 m/s and has constant acceleration +2 m/s² for 4 s. Take the initial time as zero.",
          "choices": [
            "Constant nonzero velocity and zero acceleration",
            "Zero velocity and increasing acceleration",
            "Constant acceleration with increasing velocity",
            "Zero displacement over every interval"
          ],
          "answer": 0,
          "explanation": "Its slope is zero, but its signed area over a nonzero time interval is nonzero.",
          "lessonTitle": "1.2 Velocity graphs and constant acceleration",
          "stimulus": {
            "type": "chart",
            "title": "Velocity during the four-second interval",
            "xLabel": "Time (s)",
            "yLabel": "Velocity (m/s)",
            "xMin": 0,
            "xMax": 4,
            "yMin": -6,
            "yMax": 2,
            "points": [
              {
                "x": 0,
                "y": -6
              },
              {
                "x": 3,
                "y": 0
              },
              {
                "x": 4,
                "y": 2
              }
            ],
            "lines": [
              {
                "label": "Velocity",
                "points": [
                  {
                    "x": 0,
                    "y": -6
                  },
                  {
                    "x": 4,
                    "y": 2
                  }
                ]
              }
            ],
            "note": "Original hypothetical model; the line describes constant acceleration."
          }
        },
        {
          "id": "physics1-mcq-1-2-4",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A moving object has negative velocity and positive acceleration. Before it stops, its speed is doing what?",
          "passage": "Original hypothetical instructional setup. A cart starts with velocity −6 m/s and has constant acceleration +2 m/s² for 4 s. Take the initial time as zero.",
          "choices": [
            "Decreasing",
            "Increasing necessarily",
            "Remaining constant necessarily",
            "Equaling its acceleration"
          ],
          "answer": 0,
          "explanation": "Acceleration acts opposite the current velocity direction, reducing the magnitude of velocity.",
          "lessonTitle": "1.2 Velocity graphs and constant acceleration",
          "stimulus": {
            "type": "chart",
            "title": "Velocity during the four-second interval",
            "xLabel": "Time (s)",
            "yLabel": "Velocity (m/s)",
            "xMin": 0,
            "xMax": 4,
            "yMin": -6,
            "yMax": 2,
            "points": [
              {
                "x": 0,
                "y": -6
              },
              {
                "x": 3,
                "y": 0
              },
              {
                "x": 4,
                "y": 2
              }
            ],
            "lines": [
              {
                "label": "Velocity",
                "points": [
                  {
                    "x": 0,
                    "y": -6
                  },
                  {
                    "x": 4,
                    "y": 2
                  }
                ]
              }
            ],
            "note": "Original hypothetical model; the line describes constant acceleration."
          }
        }
      ]
    },
    {
      "id": "physics1-lesson-1-3",
      "title": "1.3 Projectile motion and independent components",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Projectile motion and independent components"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "A projectile model describes an object after launch when gravity is its only significant force. Neglect air resistance and take the local gravitational field as uniform. Choose horizontal x and upward y axes. Horizontal acceleration is zero, while vertical acceleration is −g. The two component motions share time but have different accelerations. A horizontal velocity can remain constant while the total velocity changes because its vertical component changes.\n\nResolve launch velocity using v₀x=v₀cosθ and v₀y=v₀sinθ when θ is measured above horizontal. Apply constant-acceleration relations separately to each axis. The horizontal range is v₀x times flight time. Determine flight time from the vertical motion and the actual final height, rather than assuming launch and landing heights match. At the highest point, vertical velocity is zero but horizontal velocity generally is not. Gravity continues to act there."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Use g=10 m/s² for this instructional example. A ball launches horizontally from a20 m platform at 5 m/s. Vertically,−20=0t+½(−10)t², so the positive flight time is 2 s. Horizontally, range=5(2)=10 m. Just before impact, v_y=−10(2)=−20 m/s and v_x=5 m/s. Speed is√(5²+20²)=√425≈20.6 m/s, not25 m/s, because perpendicular components combine through the Pythagorean theorem.\n\nIf a second ball is simply dropped from the same height at the same moment, the ideal model predicts the same flight time. Its horizontal motion differs, but its initial vertical velocity and vertical acceleration match. This conclusion would need reconsideration if air resistance, a different release height, or a vertical launch component were important."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Film a horizontal launch beside a vertical ruler with the camera perpendicular to the plane of motion. Establish a length scale in both directions and check the frame rate. Plot x against t and y against t². A linear x-versus-time relation and a linear y-versus-time-squared relation support the ideal model for a horizontal launch. Parallax or an initial downward push can mimic departures from the model. Repeating releases is more informative than assuming the first trial exactly satisfies every ideal condition."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not use a total speed as though it were the vertical component. Do not assume acceleration vanishes at the top of a trajectory. In a same-height angled launch, ascent and descent times are equal in the ideal model; a cliff landing breaks that symmetry. Self-check: doubling horizontal launch speed from the same platform doubles horizontal range but leaves flight time unchanged under the stated assumptions."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-1-3-1",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A ball launches horizontally at 5 m/s from 20 m. With g=10 m/s², its ideal flight time is what?",
          "passage": "Original hypothetical instructional setup. A ball launches horizontally at 5 m/s from a 20 m platform. Use g = 10 m/s² and neglect air resistance.",
          "choices": [
            "2 s",
            "1 s",
            "4 s",
            "5 s"
          ],
          "answer": 0,
          "explanation": "Vertical motion gives20=5t², so t=2 s independently of horizontal launch speed.",
          "lessonTitle": "1.3 Projectile motion and independent components"
        },
        {
          "id": "physics1-mcq-1-3-2",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "At the top of an angled projectile trajectory, which statement is correct?",
          "passage": "Original hypothetical instructional setup. A ball launches horizontally at 5 m/s from a 20 m platform. Use g = 10 m/s² and neglect air resistance.",
          "choices": [
            "Vertical velocity is zero but vertical acceleration is −g",
            "Total velocity and acceleration are both zero",
            "Horizontal acceleration equals−g",
            "Gravity stops until the projectile descends"
          ],
          "answer": 0,
          "explanation": "Gravity acts continuously; only the vertical velocity component becomes momentarily zero.",
          "lessonTitle": "1.3 Projectile motion and independent components"
        },
        {
          "id": "physics1-mcq-1-3-3",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Doubling horizontal launch speed from an unchanged platform changes the range by which factor?",
          "passage": "Original hypothetical instructional setup. A ball launches horizontally at 5 m/s from a 20 m platform. Use g = 10 m/s² and neglect air resistance.",
          "choices": [
            "2",
            "1",
            "√2",
            "4"
          ],
          "answer": 0,
          "explanation": "The vertical flight time is unchanged and range equals horizontal speed times that time.",
          "lessonTitle": "1.3 Projectile motion and independent components"
        },
        {
          "id": "physics1-mcq-1-3-4",
          "domain": "Physics 1: Kinematics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why can two balls with different horizontal speeds land simultaneously when released from the same height?",
          "passage": "Original hypothetical instructional setup. A ball launches horizontally at 5 m/s from a 20 m platform. Use g = 10 m/s² and neglect air resistance.",
          "choices": [
            "Their vertical initial conditions and accelerations can be identical",
            "Horizontal speed cancels gravity",
            "Both balls must have zero total velocity",
            "Their total distances are equal"
          ],
          "answer": 0,
          "explanation": "The ideal projectile model treats perpendicular components independently while using a shared time.",
          "lessonTitle": "1.3 Projectile motion and independent components"
        }
      ]
    },
    {
      "id": "physics1-lesson-2-1",
      "title": "2.1 Free-body diagrams and Newton’s second law",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Free-body diagrams and Newton’s second law"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Choose a single object or explicitly defined system before drawing forces. A free-body diagram shows external forces acting on that object, not its velocity, acceleration, or the forces it exerts on other objects. Label each force by its physical interaction: gravity from Earth, a normal force from a surface, tension from a rope, or friction from contact. A force is not added merely because an object is moving in a particular direction.\n\nNewton's second law states that net external force equals mass times acceleration for a constant-mass system. Resolve forces into components along chosen axes and add those components with signs. The net force is a vector sum, not a separate physical interaction that belongs beside the individual forces on the diagram. Zero acceleration means balanced external forces. It allows either rest or constant nonzero velocity; no net force is required to maintain uniform straight-line motion."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. The horizontal net force is +6 N, so a_x=6/2=+3 m/s². Vertically, the cart has no acceleration. If g=10 m/s², its weight is 20 N downward and the normal force is 20 N upward. Those vertical forces cancel without altering the horizontal result.\n\nSuppose the cart is initially moving left. The rightward net force still produces rightward acceleration, so the cart initially slows. Its motion direction does not determine the net force direction. A later moment at zero velocity does not require a new force diagram if the interactions remain the same. The diagram changes only when a contact, rope direction, or other interaction changes."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Pull the same cart with several approximately constant measured forces and determine acceleration from velocity-time slopes. Plot net force vertically against acceleration horizontally. A straight line through the origin has slope mass when friction is negligible or separately accounted for. If a small frictional force acts, a force sensor reading for the pull is not automatically the net force. Describe how you will estimate friction or include its effect in the model. Keep total cart mass constant when testing the force-acceleration relation."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "The normal force does not automatically equal weight in every situation. That equality followed from zero vertical acceleration and the absence of other vertical force components here. Also avoid pairing forces as a third-law pair when both act on the same cart: such forces can balance, but a third-law pair acts on different objects. Self-check: changing mass while keeping net force fixed changes acceleration inversely."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-2-1-1",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What acceleration results from 10 N right and4 N left on a2 kg cart?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. It does not accelerate vertically. Use g = 10 m/s².",
          "choices": [
            "3 m/s² right",
            "7 m/s² right",
            "3 m/s² left",
            "12 m/s² right"
          ],
          "answer": 0,
          "explanation": "Net horizontal force is 6 N right; divide by 2 kg.",
          "lessonTitle": "2.1 Free-body diagrams and Newton’s second law"
        },
        {
          "id": "physics1-mcq-2-1-2",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "An object moves at constant nonzero velocity. What must be true?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. It does not accelerate vertically. Use g = 10 m/s².",
          "choices": [
            "Its net external force is zero",
            "No forces of any kind act",
            "Its acceleration points along its velocity",
            "Its weight must be zero"
          ],
          "answer": 0,
          "explanation": "Constant velocity gives zero acceleration, allowing multiple balanced external forces.",
          "lessonTitle": "2.1 Free-body diagrams and Newton’s second law"
        },
        {
          "id": "physics1-mcq-2-1-3",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which arrow should not be added as a force on a free-body diagram?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. It does not accelerate vertically. Use g = 10 m/s².",
          "choices": [
            "An arrow labeled velocity",
            "Tension from a rope",
            "Gravitational force from Earth",
            "Normal force from a floor"
          ],
          "answer": 0,
          "explanation": "Velocity describes motion; the other labels identify physical force interactions.",
          "lessonTitle": "2.1 Free-body diagrams and Newton’s second law"
        },
        {
          "id": "physics1-mcq-2-1-4",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "For a force-versus-acceleration graph at constant mass, what does the slope represent?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. It does not accelerate vertically. Use g = 10 m/s².",
          "choices": [
            "Mass",
            "Velocity",
            "Kinetic energy",
            "Displacement"
          ],
          "answer": 0,
          "explanation": "Newton’s second law F_net=ma makes the slope ΔF_net/Δa equal mass.",
          "lessonTitle": "2.1 Free-body diagrams and Newton’s second law"
        }
      ]
    },
    {
      "id": "physics1-lesson-2-2",
      "title": "2.2 Friction, inclines, and contact forces",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Friction, inclines, and contact forces"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Static friction adjusts to prevent relative sliding up to a maximum magnitude μ_sN. It need not equal that maximum. Kinetic friction is commonly modeled as μ_kN while two surfaces slide. Friction's direction opposes relative motion or the tendency for relative sliding at the contact, not necessarily the object's velocity relative to the ground. A rolling tire can experience forward static friction even while the vehicle moves forward.\n\nOn an incline of angleθ, choose axes parallel and perpendicular to the surface. Weight has downhill component mg sinθ and into-surface component mg cosθ. A block remaining in contact without perpendicular acceleration has N=mg cosθ if no additional perpendicular forces act. This is why simply inserting N=mg on every surface can produce an incorrect friction force. Keep the components separate until the equations show which forces balance."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Take a2 kg block on a30° incline, g=10 m/s², and μ_s=0.60. The downhill weight component is 20sin30°=10 N. The normal force is 20cos30°≈17.3 N. Maximum static friction is 0.60(17.3)≈10.4 N. Because only10 N is needed to prevent sliding, static friction can hold the block with an actual magnitude10 N uphill. It is not10.4 N automatically.\n\nNow let the block slide downward with μ_k=0.20. Kinetic friction is approximately3.46 N uphill, leaving downhill net force10−3.46=6.54 N. Acceleration is 6.54/2≈3.27 m/s² downhill. State whether the block is already sliding or initially at rest before choosing the friction model; the two cases answer different physical questions."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Slowly raise an adjustable ramp until a block just begins to slide. At this threshold, mg sinθ≈μ_smg cosθ, so μ_s≈tanθ. Repeat the measurement and discuss uncertainty in identifying the instant of impending motion. To estimate μ_k instead, measure acceleration while the block slides on a known slope and solve mg sinθ−μ_kmg cosθ=ma. The two experiments investigate different coefficients and should not be combined as though the same friction condition held throughout."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Friction is not always at its maximum value, and the coefficient itself has no units. A force balance valid perpendicular to an incline does not imply equilibrium parallel to it. Self-check: without friction, acceleration down a fixed incline is gsinθ and does not depend on mass in this model. A heavier block has a proportionally larger gravitational component and proportionally larger inertia."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-2-2-1",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A resting block needs10 N of friction, while μ_sN=10.4 N. Its static friction is what?",
          "passage": "Original hypothetical instructional setup. A 2 kg block rests on a 30° incline with coefficient of static friction 0.60. Use g = 10 m/s². When a sliding comparison is requested, take the coefficient of kinetic friction as 0.40.",
          "choices": [
            "10 N",
            "10.4 N",
            "0.4 N",
            "20.4 N"
          ],
          "answer": 0,
          "explanation": "Static friction adjusts to the required value below its limiting magnitude.",
          "lessonTitle": "2.2 Friction, inclines, and contact forces"
        },
        {
          "id": "physics1-mcq-2-2-2",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "For a block on an incline with no perpendicular acceleration and no other perpendicular forces, N equals what?",
          "passage": "Original hypothetical instructional setup. A 2 kg block rests on a 30° incline with coefficient of static friction 0.60. Use g = 10 m/s². When a sliding comparison is requested, take the coefficient of kinetic friction as 0.40.",
          "choices": [
            "mg cosθ",
            "mg sinθ",
            "mg",
            "μmg"
          ],
          "answer": 0,
          "explanation": "Resolve weight perpendicular to the surface; its perpendicular component is mgcosθ.",
          "lessonTitle": "2.2 Friction, inclines, and contact forces"
        },
        {
          "id": "physics1-mcq-2-2-3",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why can a block remain at rest on a slope even when μ_sN exceeds mg sinθ?",
          "passage": "Original hypothetical instructional setup. A 2 kg block rests on a 30° incline with coefficient of static friction 0.60. Use g = 10 m/s². When a sliding comparison is requested, take the coefficient of kinetic friction as 0.40.",
          "choices": [
            "Actual static friction can be smaller than its maximum",
            "Gravity stops acting",
            "The normal force points uphill",
            "Static friction always points downhill"
          ],
          "answer": 0,
          "explanation": "The maximum is a bound; static friction matches the downhill component while equilibrium is possible.",
          "lessonTitle": "2.2 Friction, inclines, and contact forces"
        },
        {
          "id": "physics1-mcq-2-2-4",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "For frictionless sliding on a fixed incline, doubling mass changes downhill acceleration how?",
          "passage": "Original hypothetical instructional setup. A 2 kg block rests on a 30° incline with coefficient of static friction 0.60. Use g = 10 m/s². When a sliding comparison is requested, take the coefficient of kinetic friction as 0.40.",
          "choices": [
            "It remains unchanged",
            "It doubles",
            "It halves",
            "It increases by four"
          ],
          "answer": 0,
          "explanation": "Both the downhill gravitational force and inertia double, leaving acceleration gsinθ unchanged.",
          "lessonTitle": "2.2 Friction, inclines, and contact forces"
        }
      ]
    },
    {
      "id": "physics1-lesson-2-3",
      "title": "2.3 Interactions, tension, and circular motion",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Interactions, tension, and circular motion"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "For uniform circular motion, speed is constant but velocity direction changes. Acceleration points toward the circle’s center with magnitude v²/r.The required inward net force is mv²/r.“Centripetal force” means the inward net force, not a new physical interaction to add to tension, friction or gravity. Identify which real forces supply its components. The velocity is tangent to the path, while acceleration points inward. These perpendicular directions are compatible because velocity describes current motion and acceleration describes its change."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A 0.50 kg object moves in a horizontal circle of radius2 m at 4 m/s. The inward acceleration is 4²/2=8 m/s², so the required inward force is 0.50(8)=4 N. If a horizontal string supplies the only horizontal force, its tension is 4 N. Doubling speed to 8 m/s at the same radius requires0.50(64)/2=16 N, four times as much.\n\nSeparately, consider two carts of masses2 kg and3 kg connected by a light horizontal string on a frictionless track. A 10 N external pull on the3 kg cart accelerates the5 kg system at 2 m/s². The2 kg cart is pulled only by string tension horizontally, so T=2(2)=4 N. The3 kg cart has 10−T=3(2), confirming the same tension. Do not assign the external pull directly to each cart."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "For a rotating stopper experiment, keep radius and stopper mass fixed while varying period. Infer speed as2πr/T_period and compare inward force with v². The symbolT for tension can be confused withT for period, so label variables clearly in your graph and explanation. Measure several revolutions to reduce timing uncertainty. A conical pendulum's string tension has vertical and inward components; the full tension is not simply mv²/r unless the string is horizontal and other assumptions justify it."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "A passenger feeling pushed outward in a turning vehicle does not imply an extra outward force on their inertial-frame free-body diagram. The seat or friction supplies inward acceleration. Self-check: when an ideal string breaks, the object initially travels along the tangent, not radially outward, because the inward force disappears while its instantaneous velocity remains."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-2-3-1",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A 0.5 kg object travels at 4 m/s in a circle of radius2 m. Required inward force is what?",
          "passage": "Original hypothetical instructional setup. A 0.50 kg object moves in a horizontal circle of radius 2 m at 4 m/s. A horizontal string supplies the only horizontal force. A comparison trial doubles the speed.",
          "choices": [
            "4 N",
            "1 N",
            "2 N",
            "8 N"
          ],
          "answer": 0,
          "explanation": "Use mv²/r=0.5(16)/2=4 N.",
          "lessonTitle": "2.3 Interactions, tension, and circular motion"
        },
        {
          "id": "physics1-mcq-2-3-2",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why do a third-law pair of forces not cancel on one object’s free-body diagram?",
          "passage": "Original hypothetical instructional setup. A 0.50 kg object moves in a horizontal circle of radius 2 m at 4 m/s. A horizontal string supplies the only horizontal force. A comparison trial doubles the speed.",
          "choices": [
            "They act on different objects",
            "They always have different magnitudes",
            "They occur at different times",
            "One is not a real force"
          ],
          "answer": 0,
          "explanation": "Each member acts on the other interacting object; only one appears on a diagram of a single object.",
          "lessonTitle": "2.3 Interactions, tension, and circular motion"
        },
        {
          "id": "physics1-mcq-2-3-3",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Doubling speed at fixed mass and radius changes required inward force by which factor?",
          "passage": "Original hypothetical instructional setup. A 0.50 kg object moves in a horizontal circle of radius 2 m at 4 m/s. A horizontal string supplies the only horizontal force. A comparison trial doubles the speed.",
          "choices": [
            "4",
            "1/2",
            "2",
            "8"
          ],
          "answer": 0,
          "explanation": "The inward force is proportional to the square of speed.",
          "lessonTitle": "2.3 Interactions, tension, and circular motion"
        },
        {
          "id": "physics1-mcq-2-3-4",
          "domain": "Physics 1: Force and Translational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Immediately after the only string providing circular force breaks, the object initially moves in which direction?",
          "passage": "Original hypothetical instructional setup. A 0.50 kg object moves in a horizontal circle of radius 2 m at 4 m/s. A horizontal string supplies the only horizontal force. A comparison trial doubles the speed.",
          "choices": [
            "Tangent to its former circle",
            "Directly toward the former center",
            "Directly away from the former center",
            "Along an increasingly tight circle"
          ],
          "answer": 0,
          "explanation": "Its instantaneous velocity is tangential, and the missing inward force no longer changes that direction.",
          "lessonTitle": "2.3 Interactions, tension, and circular motion"
        }
      ]
    },
    {
      "id": "physics1-lesson-3-1",
      "title": "3.1 Work and the kinetic-energy theorem",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Work and the kinetic-energy theorem"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Work measures energy transfer by a force acting through displacement. For a constant force and straight displacement, W=FΔxcosθ, whereθ is the angle between the force and the displacement. A force parallel to displacement does positive work; an opposite force does negative work; a perpendicular force does zero work. Work is a scalar with units joules. A force can act for a long time without doing work on an object that does not move.\n\nThe net work on a particle equals its change in kinetic energy, ΔK=½mv_f²−½mv_i². Add the work done by all external forces on the chosen object. An individual force's work need not equalΔK when other forces also transfer energy. For a variable force along one dimension, the signed area under a force-position graph gives work. A triangular area therefore requires the factor½, even when the peak force is easy to read."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A 2 kg cart starts at 3 m/s. A constant8 N horizontal pull acts over4 m while2 N of friction opposes motion. The pull does+32 J of work and friction does−8 J. Gravity and the normal force are perpendicular to horizontal displacement and do zero work. Net work is +24 J. Initial kinetic energy is½(2)(3²)=9 J, so final kinetic energy is 33 J. Solve½(2)v_f²=33 to obtain v_f=√33≈5.74 m/s.\n\nThe tempting equation8(4)=½mv_f² omits both the initial kinetic energy and friction. An energy accounting table makes those omissions visible. If the applied force instead rose linearly from 0 to 8 N over4 m, its work would be½(4)(8)=16 J, not32 J. Friction would still need to be included separately."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Attach a force sensor to a cart and measure force as a function of position during a pull. Numerically estimate the graph's area with rectangles or trapezoids, then compare with the change in measured kinetic energy. Choose sufficiently small position intervals where force changes rapidly. A nonzero force reading with little displacement contributes little work. Include the cart's initial speed and identify frictional transfer rather than attributing every disagreement to rounding. The area operation depends on the graph axes: area under force-time gives impulse instead."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not put a vector sign on kinetic energy; it depends on speed squared. A reversing cart can have the same kinetic energy before and after despite different velocities. Also distinguish net work from the work done by one named force. Self-check: a constant inward force during uniform circular motion is perpendicular to instantaneous displacement and does no work, even though it changes velocity direction."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-3-1-1",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "For the2 kg cart in the example, what is the net work?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart starts at 3 m/s. A constant 8 N horizontal pull acts over 4 m while 2 N of friction opposes motion.",
          "choices": [
            "24 J",
            "32 J",
            "8 J",
            "40 J"
          ],
          "answer": 0,
          "explanation": "The pull contributes32 J and friction−8 J; perpendicular forces contribute zero.",
          "lessonTitle": "3.1 Work and the kinetic-energy theorem"
        },
        {
          "id": "physics1-mcq-3-1-2",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What does area under a force-position graph represent?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart starts at 3 m/s. A constant 8 N horizontal pull acts over 4 m while 2 N of friction opposes motion.",
          "choices": [
            "Work",
            "Impulse",
            "Acceleration",
            "Power"
          ],
          "answer": 0,
          "explanation": "Force times displacement has units newton-meters, or joules.",
          "lessonTitle": "3.1 Work and the kinetic-energy theorem"
        },
        {
          "id": "physics1-mcq-3-1-3",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A force is perpendicular to an object’s displacement. Its work over that displacement is what?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart starts at 3 m/s. A constant 8 N horizontal pull acts over 4 m while 2 N of friction opposes motion.",
          "choices": [
            "Zero",
            "FΔx",
            "−FΔx",
            "Always positive"
          ],
          "answer": 0,
          "explanation": "The cosine of 90° is zero, so the force transfers no energy through that displacement.",
          "lessonTitle": "3.1 Work and the kinetic-energy theorem"
        },
        {
          "id": "physics1-mcq-3-1-4",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why is the final speed in the example not found from 32 J alone?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart starts at 3 m/s. A constant 8 N horizontal pull acts over 4 m while 2 N of friction opposes motion.",
          "choices": [
            "Initial kinetic energy and frictional work must also be included",
            "Kinetic energy is a vector",
            "Work cannot be negative",
            "The normal force always does positive work"
          ],
          "answer": 0,
          "explanation": "The work-energy theorem uses net work and a change in kinetic energy, not final kinetic energy alone.",
          "lessonTitle": "3.1 Work and the kinetic-energy theorem"
        }
      ]
    },
    {
      "id": "physics1-lesson-3-2",
      "title": "3.2 Conservative interactions and potential energy",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Conservative interactions and potential energy"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Potential energy belongs to an interacting system, not simply to an isolated object. Near Earth's surface, the Earth-object system changes gravitational potential energy byΔU_g=mgΔy. Its zero level is arbitrary; differences determine the energy transfer. For an ideal spring, U_s=½kx² whenx is measured from the spring's unstretched length. Compression and extension by the same magnitude store the same spring energy even though spring-force directions differ.\n\nA conservative force's work equals minus the change in its associated potential energy. If you include gravity throughΔU_g in a system-energy equation, do not also count gravity's work as a separate transfer in that same equation. For a system with no external work and no dissipative transfer, K+U remains constant. Conservation of total energy can still hold when mechanical energyK+U decreases: friction can increase internal thermal energy."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Use g=10 m/s². A 0.50 kg cart is released from rest3 m above the bottom of a frictionless track. The Earth-cart system losesmgΔy=0.50(10)(3)=15 J of gravitational potential energy, gaining15 J of kinetic energy. Thus½(0.50)v²=15 andv=√60≈7.75 m/s. If the bottom includes a horizontal ideal spring withk=200 N/m, maximum compression occurs when the cart is momentarily at rest and½kx²=15. Thereforex=√(30/200)≈0.387 m.\n\nA higher or lower chosen zero for gravitational potential energy changes both initial and final values by the same constant; it does not changev orx. A cart can be momentarily at rest at maximum compression while experiencing a nonzero spring force and acceleration."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Compare maximum spring compression for several release heights. Under the ideal model,x²=(2mg/k)h, so a plot ofx² versusheight should be approximately linear. Track losses can produce smaller compression than predicted. Keep mass, spring, and release procedure fixed while varying height. Measuringx from the spring's unstretched position matters: an offset in the ruler's zero produces a systematic error in the squared quantity. Explain whether the chosen system includes Earth, the cart, and the spring before deciding which transfers count as external."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Mechanical energy is not conserved automatically just because an energy equation is convenient. Identify friction, motor input, or energy carried away before usingK_i+U_i=K_f+U_f. Self-check: doubling release height makes the bottom speed and maximum compression increase by√2 in this model, not by 2. The square relationships in kinetic and spring energy determine those factors."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-3-2-1",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What gravitational energy is released by the0.50 kg cart falling3 m with g=10 m/s²?",
          "passage": "Original hypothetical instructional setup. A 0.50 kg cart is released from rest 3 m above the bottom of a frictionless track. At the bottom it can compress a horizontal ideal spring of constant 200 N/m. Use g = 10 m/s².",
          "choices": [
            "15 J",
            "1.5 J",
            "30 J",
            "60 J"
          ],
          "answer": 0,
          "explanation": "Use mgh=0.50×10×3.",
          "lessonTitle": "3.2 Conservative interactions and potential energy"
        },
        {
          "id": "physics1-mcq-3-2-2",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Changing the gravitational potential-energy zero changes which prediction?",
          "passage": "Original hypothetical instructional setup. A 0.50 kg cart is released from rest 3 m above the bottom of a frictionless track. At the bottom it can compress a horizontal ideal spring of constant 200 N/m. Use g = 10 m/s².",
          "choices": [
            "Neither speed nor compression",
            "Only speed",
            "Only compression",
            "Both speed and compression"
          ],
          "answer": 0,
          "explanation": "Only potential-energy differences enter the prediction; adding the same constant cancels.",
          "lessonTitle": "3.2 Conservative interactions and potential energy"
        },
        {
          "id": "physics1-mcq-3-2-3",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "At maximum ideal spring compression, which statement can be true?",
          "passage": "Original hypothetical instructional setup. A 0.50 kg cart is released from rest 3 m above the bottom of a frictionless track. At the bottom it can compress a horizontal ideal spring of constant 200 N/m. Use g = 10 m/s².",
          "choices": [
            "The cart is momentarily at rest with nonzero acceleration",
            "The spring force must be zero",
            "Spring energy must be zero",
            "All energy has disappeared"
          ],
          "answer": 0,
          "explanation": "The compressed spring exerts a force even when cart velocity is instantaneously zero.",
          "lessonTitle": "3.2 Conservative interactions and potential energy"
        },
        {
          "id": "physics1-mcq-3-2-4",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Doubling release height changes bottom speed by which factor for the frictionless model?",
          "passage": "Original hypothetical instructional setup. A 0.50 kg cart is released from rest 3 m above the bottom of a frictionless track. At the bottom it can compress a horizontal ideal spring of constant 200 N/m. Use g = 10 m/s².",
          "choices": [
            "√2",
            "1/2",
            "2",
            "4"
          ],
          "answer": 0,
          "explanation": "Since v²=2gh, speed scales as the square root of height.",
          "lessonTitle": "3.2 Conservative interactions and potential energy"
        }
      ]
    },
    {
      "id": "physics1-lesson-3-3",
      "title": "3.3 Power, efficiency, and energy accounting",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Power, efficiency, and energy accounting"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Power is the rate at which energy is transferred. Average power is work or energy transfer divided by elapsed time. For a constant force parallel to a constant velocity, instantaneous mechanical power isFv. More generally, only the force component along velocity contributes. Power has units watts, equivalent to joules per second. Two machines can perform the same work while having different powers because one completes the transfer faster.\n\nEfficiency compares useful output energy with total input energy over the same interval. In a consistent accounting model, efficiency cannot exceed100%. Energy that is not useful output has not vanished: it may become thermal energy, sound, or other transfers. Define “useful” for the task and state the system boundary. A motor's electrical input power need not equal its mechanical output power. Conservation of energy applies to all transfers, while efficiency describes their usefulness for a particular goal."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A motor lifts a40 kg load vertically5 m in10 s at approximately constant speed. Use g=10 m/s². Useful gravitational energy gain is 40(10)(5)=2000 J. Average useful output power is 2000/10=200 W. If the motor draws500 W electrically for 10 s, input energy is 5000 J and efficiency is 2000/5000=0.40, or40%. The remaining3000 J is transferred through heating or other non-useful channels in this simplified accounting.\n\nAt constant speed, lifting tension approximately balances400 N of weight. The vertical speed is 0.5 m/s, soFv=400(0.5)=200 W, confirming the output-power calculation. During startup, the load's kinetic energy can also change; thenmgh alone would not account for the entire mechanical output over that interval."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Measure a small motor's electrical voltage and current and the height and time of a lifted known mass. Estimate electrical input power asVI for an approximately steadyDC supply and useful output asmgΔh/Δt. Record whether the load is accelerating at the endpoints. Repeat trials and compare total energies over matching intervals. A slowly lifting motor can have high efficiency but low power; a powerful motor can be inefficient. Your graph or explanation should keep those comparisons separate rather than ranking machines by one number alone."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not confuse newtons, joules, and watts: they describe force, energy, and transfer rate. An efficiency calculation with output and input from different durations can falsely exceed100%. Self-check: lifting the same load through the same height in half the time requires twice the average useful power, but not twice the useful energy gain."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-3-3-1",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is useful output power when40 kg rises5 m in10 s, with g=10 m/s²?",
          "passage": "Original hypothetical instructional setup. A motor lifts a 40 kg load vertically 5 m in 10 s at constant speed. It draws 500 W electrically. Use g = 10 m/s².",
          "choices": [
            "200 W",
            "20 W",
            "400 W",
            "2000 W"
          ],
          "answer": 0,
          "explanation": "Useful energy is 2000 J, transferred in10 s.",
          "lessonTitle": "3.3 Power, efficiency, and energy accounting"
        },
        {
          "id": "physics1-mcq-3-3-2",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A motor supplies200 W useful power while drawing500 W. Its efficiency is what?",
          "passage": "Original hypothetical instructional setup. A motor lifts a 40 kg load vertically 5 m in 10 s at constant speed. It draws 500 W electrically. Use g = 10 m/s².",
          "choices": [
            "40%",
            "2.5%",
            "60%",
            "250%"
          ],
          "answer": 0,
          "explanation": "Efficiency equals useful output divided by input,200/500=0.40.",
          "lessonTitle": "3.3 Power, efficiency, and energy accounting"
        },
        {
          "id": "physics1-mcq-3-3-3",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Lifting the same load to the same height in half the time requires what?",
          "passage": "Original hypothetical instructional setup. A motor lifts a 40 kg load vertically 5 m in 10 s at constant speed. It draws 500 W electrically. Use g = 10 m/s².",
          "choices": [
            "Twice the average useful power",
            "Twice the useful energy",
            "Half the useful power",
            "Unchanged useful power"
          ],
          "answer": 0,
          "explanation": "The energy gain is unchanged, and dividing it by half the time doubles average power.",
          "lessonTitle": "3.3 Power, efficiency, and energy accounting"
        },
        {
          "id": "physics1-mcq-3-3-4",
          "domain": "Physics 1: Work, Energy, and Power",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why may mgh alone underestimate mechanical output during a lift’s startup?",
          "passage": "Original hypothetical instructional setup. A motor lifts a 40 kg load vertically 5 m in 10 s at constant speed. It draws 500 W electrically. Use g = 10 m/s².",
          "choices": [
            "The load can also gain kinetic energy",
            "Gravity has no effect during startup",
            "Watts and joules are identical quantities",
            "Useful output always exceeds electrical input"
          ],
          "answer": 0,
          "explanation": "If the load accelerates, mechanical output increases both potential and kinetic energy.",
          "lessonTitle": "3.3 Power, efficiency, and energy accounting"
        }
      ]
    },
    {
      "id": "physics1-lesson-4-1",
      "title": "4.1 Momentum, impulse, and force-time graphs",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Momentum, impulse, and force-time graphs"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Linear momentum is the vectorp=mv. Its direction follows velocity, and its units are kilogram-meters per second. Impulse is the change in momentum. For a constant net force,J=F_netΔt; for a time-varying force, impulse is signed area under the net force-time graph. A large force acting briefly can produce the same impulse as a smaller force acting longer. The corresponding accelerations and injury risks can still differ.\n\nApply the impulse-momentum theorem to a clearly chosen object and interval. Include initial momentum with its sign. A rebound reverses velocity, often making the magnitude of momentum change larger than for a stop. External impulse changes the total momentum of a system. Internal interactions can redistribute momentum among its objects while canceling in the system sum. Conservation of momentum is justified when net external impulse is negligible over the interaction interval, not simply because the word “collision” appears."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Its initial momentum is +3 kg·m/s and final momentum is −2 kg·m/s, so impulse is −5 N·s. If contact lasts0.010 s, average net force on the ball is −5/0.010=−500 N. The negative sign identifies the direction of the momentum change. Stopping the same incoming ball without rebound would require−3 N·s, a smaller impulse magnitude.\n\nFor a triangular net-force pulse with height1000 N and base0.010 s, area magnitude is½(1000)(0.010)=5 N·s. A constant500 N force over the same interval has the same area but a lower peak. Use the graph's actual shape rather than multiplying peak force by duration indiscriminately."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Use a force sensor and a cart bumper to record several collision pulses. Compare area under each pulse with the change in momentum calculated from measured velocities. Keep sensor signs consistent with the motion detector's axis. A spring bumper can lengthen contact time and reduce peak force without changing the required impulse when initial and final velocities match. If final velocities differ, equal impulse should not be assumed. Distinguish evidence about average force from evidence about peak force; one does not determine the other without the pulse shape."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Impulse is not energy, even though both involve a force and a graph area. Force-time area uses time, while work uses displacement. Self-check: doubling contact time for the same momentum change halves average force magnitude. It does not necessarily halve the peak if the force-time shape changes as well."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-4-1-1",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What impulse acts on a0.20 kg ball changing velocity from +15 to−10 m/s?",
          "passage": "Original hypothetical instructional setup. A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Contact lasts 0.010 s.",
          "choices": [
            "−5 N·s",
            "−1 N·s",
            "+5 N·s",
            "−2 N·s"
          ],
          "answer": 0,
          "explanation": "Impulse is m(v_f−v_i)=0.20(−10−15)=−5 N·s.",
          "lessonTitle": "4.1 Momentum, impulse, and force-time graphs"
        },
        {
          "id": "physics1-mcq-4-1-2",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A triangular1000 N pulse lasts0.010 s. Its impulse magnitude is what?",
          "passage": "Original hypothetical instructional setup. A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Contact lasts 0.010 s.",
          "choices": [
            "5 N·s",
            "10 N·s",
            "0.1 N·s",
            "100 N·s"
          ],
          "answer": 0,
          "explanation": "The triangular area is one-half times base times height.",
          "lessonTitle": "4.1 Momentum, impulse, and force-time graphs"
        },
        {
          "id": "physics1-mcq-4-1-3",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Lengthening contact time while preserving momentum change does what to average force magnitude?",
          "passage": "Original hypothetical instructional setup. A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Contact lasts 0.010 s.",
          "choices": [
            "Reduces it",
            "Increases it necessarily",
            "Leaves it unchanged necessarily",
            "Makes it zero"
          ],
          "answer": 0,
          "explanation": "Average force magnitude is impulse magnitude divided by duration for a fixed-direction impulse.",
          "lessonTitle": "4.1 Momentum, impulse, and force-time graphs"
        },
        {
          "id": "physics1-mcq-4-1-4",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What must be small to justify system momentum conservation during an interaction?",
          "passage": "Original hypothetical instructional setup. A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Contact lasts 0.010 s.",
          "choices": [
            "Net external impulse",
            "Every internal force",
            "The system’s kinetic energy",
            "Every object’s velocity"
          ],
          "answer": 0,
          "explanation": "External impulse changes system momentum; internal forces cancel within a complete system.",
          "lessonTitle": "4.1 Momentum, impulse, and force-time graphs"
        }
      ]
    },
    {
      "id": "physics1-lesson-4-2",
      "title": "4.2 Collisions and choosing a system",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Collisions and choosing a system"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "For a collision between two objects, choose both objects as the system when their interaction force is difficult to measure. If external impulse during the collision is negligible, total momentum before equals total momentum after. Use signed velocities along a stated axis. A system can conserve momentum while its kinetic energy changes. In an elastic collision, kinetic energy is also conserved. In an inelastic collision, some kinetic energy becomes internal energy or other forms; total energy still remains accounted for.\n\nA perfectly inelastic collision means the objects move together immediately afterward. It does not mean their shared velocity is zero or that all kinetic energy disappears. Write one common final velocity for a sticking event. If they do not stick, momentum alone generally leaves more than one unknown; you need additional information or an appropriate collision model."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A 2 kg cart moving at +3 m/s hits a stationary1 kg cart, and the carts stick. Their initial momentum is 2(3)+1(0)=6 kg·m/s. The total mass afterward is 3 kg, so common velocity is 6/3=+2 m/s. Initial kinetic energy is½(2)(3²)=9 J. Final kinetic energy is½(3)(2²)=6 J. The3 J decrease in kinetic energy is consistent with deformation, heating, or sound. It is not a failure of momentum conservation.\n\nIf the second cart instead approached at −3 m/s, initial momentum would be6−3=3 kg·m/s and shared final velocity would be+1 m/s. Replacing negative velocity by its speed would predict the wrong result. The collision's duration can be short enough that horizontal track friction is negligible, even if friction matters over a much longer trip."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Use two carts with hook-and-loop bumpers on a level track. Measure masses including attached equipment, and record velocities immediately before and after contact. Compare total momenta and kinetic energies separately. Use the same axis for both motion records. Track tilt can create an external impulse; measuring velocities too far from the collision can exaggerate its importance. Explain why measuring near contact is a model choice rather than selectively discarding inconvenient data."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Never conserve the momentum of only one cart while ignoring the other cart's interaction force. Avoid assuming kinetic-energy conservation merely because momentum is conserved. Self-check: in the worked sticking event, the heavier cart slows and the lighter cart speeds up, but their individual momentum changes are equal in magnitude and opposite in direction when external impulse is negligible."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-4-2-1",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A 2 kg cart at 3 m/s sticks to a stationary1 kg cart. Their shared final velocity is what?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart moving at +3 m/s hits a stationary 1 kg cart. They stick. Neglect external horizontal impulse.",
          "choices": [
            "2 m/s in the original direction",
            "1 m/s in the original direction",
            "3 m/s in the original direction",
            "6 m/s in the original direction"
          ],
          "answer": 0,
          "explanation": "Conserved momentum6 kg·m/s is shared by total mass3 kg.",
          "lessonTitle": "4.2 Collisions and choosing a system"
        },
        {
          "id": "physics1-mcq-4-2-2",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What happens to kinetic energy in that sticking event?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart moving at +3 m/s hits a stationary 1 kg cart. They stick. Neglect external horizontal impulse.",
          "choices": [
            "It decreases from 9 J to 6 J",
            "It remains9 J",
            "It increases from 6 J to 9 J",
            "It becomes zero"
          ],
          "answer": 0,
          "explanation": "Compute kinetic energy separately before and after; the missing3 J enters non-kinetic forms.",
          "lessonTitle": "4.2 Collisions and choosing a system"
        },
        {
          "id": "physics1-mcq-4-2-3",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which event definition guarantees that two objects share one final velocity immediately after contact?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart moving at +3 m/s hits a stationary 1 kg cart. They stick. Neglect external horizontal impulse.",
          "choices": [
            "A perfectly inelastic sticking collision",
            "Any elastic collision",
            "Any collision in one dimension",
            "Any collision involving equal masses"
          ],
          "answer": 0,
          "explanation": "Sticking constrains both objects to the same post-collision velocity.",
          "lessonTitle": "4.2 Collisions and choosing a system"
        },
        {
          "id": "physics1-mcq-4-2-4",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why can momentum be conserved even when kinetic energy decreases?",
          "passage": "Original hypothetical instructional setup. A 2 kg cart moving at +3 m/s hits a stationary 1 kg cart. They stick. Neglect external horizontal impulse.",
          "choices": [
            "Internal interactions can convert kinetic energy without changing total system momentum",
            "Energy conservation is never valid for collisions",
            "Momentum has no direction",
            "Internal forces vanish during collisions"
          ],
          "answer": 0,
          "explanation": "Momentum and kinetic energy are different quantities; internal energy transfer need not create external impulse.",
          "lessonTitle": "4.2 Collisions and choosing a system"
        }
      ]
    },
    {
      "id": "physics1-lesson-4-3",
      "title": "4.3 Center of mass, recoil, and explosions",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Center of mass, recoil, and explosions"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "The center of mass is a mass-weighted position representing the translational motion of a system. For two objects on one axis,x_cm=(m₁x₁+m₂x₂)/(m₁+m₂). Its velocity is total momentum divided by total mass. Internal forces can move the objects relative to one another without changing the system center-of-mass motion when net external force is zero. This is why an explosion can scatter pieces in opposite directions while the center of mass continues its previous path.\n\nIn a recoil or explosion, kinetic energy can increase because stored chemical, spring, or other internal energy becomes kinetic energy. Momentum can remain conserved at the same time. Equal and opposite momenta do not imply equal and opposite velocities unless the masses are equal. Identify the original system and include every important recoiling part before applying conservation."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Two carts initially at rest on a frictionless track push apart using an internal spring. CartA has mass1 kg and moves at −3 m/s afterward. CartB has mass3 kg. Initial total momentum is zero, so1(−3)+3v_B=0 andv_B=+1 m/s. Their momenta are −3 and+3 kg·m/s. Their kinetic energies are 4.5 J and1.5 J, totaling6 J supplied by spring energy. The smaller mass has the greater speed and kinetic energy in this zero-total-momentum example.\n\nAt some instant letA be atx=−3 m andB atx=+1 m relative to their initial common location. Thenx_cm=[1(−3)+3(1)]/4=0. The unequal displacements are exactly what preserves the mass-weighted center. An arithmetic mean of positions would incorrectly give−1 m."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Place different masses on carts separated by a compressed spring. Measure both final velocities and test whetherm_Av_A+m_Bv_B is approximately zero. A camera can also track the center of mass if positions and masses are known. Do not expect equal speeds for unequal masses. Check whether the spring or latch has appreciable mass; if it moves separately, it can carry momentum that your two-cart system omitted. Repeating with different mass ratios tests the inverse-speed relationship more convincingly than one trial."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "A system initially at rest does not force every part to remain at rest. It constrains the total momentum when external impulse is negligible. Self-check: if the3 kg cart's mass were doubled whileA's final momentum remained−3 kg·m/s, B's required speed would be0.5 m/s. The same momentum carried by a greater mass requires less speed."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-4-3-1",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A 1 kg cart recoils at −3 m/s from a3 kg cart initially at rest together. The3 kg cart moves at what velocity?",
          "passage": "Original hypothetical instructional setup. Two carts start at rest and push apart using an internal spring on a frictionless track. Cart A has mass 1 kg and moves at −3 m/s afterward; cart B has mass 3 kg.",
          "choices": [
            "+1 m/s",
            "+3 m/s",
            "−1 m/s",
            "+9 m/s"
          ],
          "answer": 0,
          "explanation": "Zero total momentum requires−3+3v=0.",
          "lessonTitle": "4.3 Center of mass, recoil, and explosions"
        },
        {
          "id": "physics1-mcq-4-3-2",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "For two fragments with equal and opposite momenta, which conclusion always follows?",
          "passage": "Original hypothetical instructional setup. Two carts start at rest and push apart using an internal spring on a frictionless track. Cart A has mass 1 kg and moves at −3 m/s afterward; cart B has mass 3 kg.",
          "choices": [
            "Their total momentum is zero",
            "Their speeds are equal",
            "Their kinetic energies are equal",
            "Their masses are equal"
          ],
          "answer": 0,
          "explanation": "Momentum vectors sum to zero; unequal masses can have different speeds and kinetic energies.",
          "lessonTitle": "4.3 Center of mass, recoil, and explosions"
        },
        {
          "id": "physics1-mcq-4-3-3",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why can kinetic energy increase in an isolated explosion?",
          "passage": "Original hypothetical instructional setup. Two carts start at rest and push apart using an internal spring on a frictionless track. Cart A has mass 1 kg and moves at −3 m/s afterward; cart B has mass 3 kg.",
          "choices": [
            "Stored internal energy is converted into kinetic energy",
            "Momentum conservation creates new energy",
            "The system gains mass automatically",
            "External work must always be positive"
          ],
          "answer": 0,
          "explanation": "Conservation of total energy allows internal energy to change form.",
          "lessonTitle": "4.3 Center of mass, recoil, and explosions"
        },
        {
          "id": "physics1-mcq-4-3-4",
          "domain": "Physics 1: Linear Momentum",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which quantity remains unchanged for an initially resting isolated system during internal push-off?",
          "passage": "Original hypothetical instructional setup. Two carts start at rest and push apart using an internal spring on a frictionless track. Cart A has mass 1 kg and moves at −3 m/s afterward; cart B has mass 3 kg.",
          "choices": [
            "Center-of-mass velocity",
            "Every object’s position",
            "Total kinetic energy necessarily",
            "The distance between objects"
          ],
          "answer": 0,
          "explanation": "With zero net external force, total momentum and center-of-mass velocity remain constant.",
          "lessonTitle": "4.3 Center of mass, recoil, and explosions"
        }
      ]
    },
    {
      "id": "physics1-lesson-5-1",
      "title": "5.1 Torque and rotational equilibrium",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Torque and rotational equilibrium"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Torque describes how a force tends to change rotation about a chosen axis. Its magnitude isτ=rFsinθ, withr measured from the axis to the force's application point andθ the angle between that position vector and force. Equivalently, multiply the force by its perpendicular lever arm. Choose a sign convention, such as counterclockwise positive, and add torques algebraically for planar problems. A large force applied through the axis produces no torque about that axis.\n\nStatic equilibrium requires both zero net force and zero net torque. Either condition alone is insufficient. A pair of equal and opposite forces can produce zero net force while still creating a turning tendency if their lines of action differ. Choose a convenient torque axis, often through an unknown support force, to remove that force's torque from the calculation. The force still exists and must appear in the translational force balance."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A uniform4 m beam of weight100 N is supported at its two ends. A 200 N load hangs1 m from the left end. LetR_L andR_R be upward support forces. Vertical equilibrium givesR_L+R_R=300 N. Taking torques about the left end, R_R(4)−100(2)−200(1)=0, soR_R=100 N. ThenR_L=200 N. The beam's own weight acts at its midpoint because it is uniform, not at whichever end is convenient.\n\nCheck by taking torques about the right end: the left support contributes clockwise200(4), beam weight contributes counterclockwise100(2), and load contributes counterclockwise200(3). The signed sum is −800+200+600=0. Both axis choices describe the same equilibrium, providing a valuable independent check."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Balance a meterstick on a pivot with hanging masses at known positions. Include the stick's own weight if its center of mass is not at the pivot. Vary the lever arm for one mass and predict the other mass's required position. Record perpendicular distances, not just lengths along an angled string. A small support width makes the exact axis uncertain, so repeated balance positions can reveal the range consistent with equilibrium. Compare predictions from force and torque balances separately."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Torque has unitsN·m, but it is not energy even though those units share dimensions. Work requires angular displacement as well as torque. Self-check: moving the200 N load toward the right support increasesR_R and decreasesR_L while their sum remains300 N. If your result changes the total upward support without changing total weight, revisit the force equation."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-5-1-1",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "In the worked beam example, what is the right support force?",
          "passage": "Original hypothetical instructional setup. A uniform 4 m beam weighs 100 N and is supported at both ends. A 200 N load hangs 1 m from the left end. The beam is stationary.",
          "choices": [
            "100 N",
            "75 N",
            "150 N",
            "200 N"
          ],
          "answer": 0,
          "explanation": "About the left end,4R_R=100(2)+200(1)=400 N·m.",
          "lessonTitle": "5.1 Torque and rotational equilibrium"
        },
        {
          "id": "physics1-mcq-5-1-2",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A force passes directly through the selected axis. Its torque about that axis is what?",
          "passage": "Original hypothetical instructional setup. A uniform 4 m beam weighs 100 N and is supported at both ends. A 200 N load hangs 1 m from the left end. The beam is stationary.",
          "choices": [
            "Zero",
            "rF necessarily",
            "Maximum",
            "Equal to the beam’s weight"
          ],
          "answer": 0,
          "explanation": "Its perpendicular lever arm is zero.",
          "lessonTitle": "5.1 Torque and rotational equilibrium"
        },
        {
          "id": "physics1-mcq-5-1-3",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which conditions are necessary for a rigid object to remain in static equilibrium?",
          "passage": "Original hypothetical instructional setup. A uniform 4 m beam weighs 100 N and is supported at both ends. A 200 N load hangs 1 m from the left end. The beam is stationary.",
          "choices": [
            "Zero net force and zero net torque",
            "Zero net force only",
            "Zero net torque only",
            "Equal masses on every side regardless of distances"
          ],
          "answer": 0,
          "explanation": "Both translational and rotational accelerations must vanish.",
          "lessonTitle": "5.1 Torque and rotational equilibrium"
        },
        {
          "id": "physics1-mcq-5-1-4",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Moving a fixed hanging load toward the right support of the same beam does what?",
          "passage": "Original hypothetical instructional setup. A uniform 4 m beam weighs 100 N and is supported at both ends. A 200 N load hangs 1 m from the left end. The beam is stationary.",
          "choices": [
            "Increases the right reaction while preserving the total support force",
            "Increases both reactions",
            "Decreases both reactions",
            "Leaves each reaction unchanged"
          ],
          "answer": 0,
          "explanation": "The changing torque distribution shifts support forces; their sum still balances total weight.",
          "lessonTitle": "5.1 Torque and rotational equilibrium"
        }
      ]
    },
    {
      "id": "physics1-lesson-5-2",
      "title": "5.2 Rotational inertia and angular acceleration",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Rotational inertia and angular acceleration"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Angular displacement, angular velocity, and angular acceleration describe rotation in radians, radians per second, and radians per second squared. A point farther from the axis travels farther for the same angular displacement: arc lengths=rθ. Its tangential speed isv=rω and tangential acceleration isa_t=rα. A rotating rigid object sharesω andα across its points, but those points can have different tangential speeds because their radii differ.\n\nRotational inertiaI measures resistance to angular acceleration about a specified axis. For point masses,I=Σmr². Mass far from the axis contributes strongly because radius is squared. An object's rotational inertia is not determined by mass alone; shape and axis matter. For a fixed axis and constantI, net external torque equalsIα. Do not substitute mass forI or use a translational acceleration where an angular acceleration is required."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Two0.50 kg point masses sit on a light rigid rod, each0.20 m from its central axis. Their total rotational inertia is 2(0.50)(0.20²)=0.040 kg·m². A net torque0.12 N·m producesα=0.12/0.040=3 rad/s². Starting from rest under this constant torque, after 2 s the angular speed is 6 rad/s. A mass at 0.20 m then has tangential speed0.20(6)=1.2 m/s.\n\nMove both masses to 0.40 m without changing their masses. The rotational inertia becomes2(0.50)(0.40²)=0.16 kg·m², four times larger. With the same applied torque, angular acceleration is 0.12/0.16=0.75 rad/s², one quarter of the previous value. The comparison isolates mass distribution rather than total mass."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Mount adjustable masses on a rotating bar and apply a repeatable torque using a hanging mass and a string around a small axle. The string tension can differ from the hanging mass's weight when that mass accelerates, so derive the coupled equations rather than equating tension tomg automatically. Plot net torque against measured angular acceleration for a fixed mass arrangement. Repeat at a larger radius. Bearing friction contributes an opposing torque that may need to be estimated or included as an intercept."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "A kilogram-meter-squared unit belongs to rotational inertia, not angular momentum. Axis labels are essential: the same object can have differentI about different axes. Self-check: doubling every point mass's distance from the axis quadruplesI if the masses are unchanged. If you also change the applied torque, a new calculation is needed before comparing angular accelerations."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-5-2-1",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is I for two0.50 kg point masses at 0.20 m from an axis?",
          "passage": "Original hypothetical instructional setup. Two 0.50 kg point masses sit on a light rigid rod, each 0.20 m from its central fixed axis. A constant net torque of 0.12 N·m acts for 2 s from rest.",
          "choices": [
            "0.040 kg·m²",
            "0.20 kg·m²",
            "0.10 kg·m²",
            "0.020 kg·m²"
          ],
          "answer": 0,
          "explanation": "Add both mr² contributions:2(0.50)(0.20²).",
          "lessonTitle": "5.2 Rotational inertia and angular acceleration"
        },
        {
          "id": "physics1-mcq-5-2-2",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A 0.12 N·m net torque acts on I=0.040 kg·m². Angular acceleration is what?",
          "passage": "Original hypothetical instructional setup. Two 0.50 kg point masses sit on a light rigid rod, each 0.20 m from its central fixed axis. A constant net torque of 0.12 N·m acts for 2 s from rest.",
          "choices": [
            "3 rad/s²",
            "0.0048 rad/s²",
            "0.33 rad/s²",
            "12 rad/s²"
          ],
          "answer": 0,
          "explanation": "Useα=τ_net/I=0.12/0.040.",
          "lessonTitle": "5.2 Rotational inertia and angular acceleration"
        },
        {
          "id": "physics1-mcq-5-2-3",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which property is shared by all points of a rotating rigid body?",
          "passage": "Original hypothetical instructional setup. Two 0.50 kg point masses sit on a light rigid rod, each 0.20 m from its central fixed axis. A constant net torque of 0.12 N·m acts for 2 s from rest.",
          "choices": [
            "Angular velocity",
            "Tangential speed",
            "Radius from the axis",
            "Centripetal acceleration magnitude"
          ],
          "answer": 0,
          "explanation": "All points turn through the same angle per time, but v=rω depends on radius.",
          "lessonTitle": "5.2 Rotational inertia and angular acceleration"
        },
        {
          "id": "physics1-mcq-5-2-4",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Moving unchanged point masses to twice their original radius changes rotational inertia by which factor?",
          "passage": "Original hypothetical instructional setup. Two 0.50 kg point masses sit on a light rigid rod, each 0.20 m from its central fixed axis. A constant net torque of 0.12 N·m acts for 2 s from rest.",
          "choices": [
            "4",
            "1/4",
            "2",
            "8"
          ],
          "answer": 0,
          "explanation": "Each contribution contains r², so doubling radius quadruples I.",
          "lessonTitle": "5.2 Rotational inertia and angular acceleration"
        }
      ]
    },
    {
      "id": "physics1-lesson-5-3",
      "title": "5.3 Rolling constraints and translational-rotational dynamics",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Rolling constraints and translational-rotational dynamics"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Rolling without slipping connects translation of the center of mass with rotation about it. On a stationary surface, v_cm=Rω and a_cm=Rα for a circular rolling object of radiusR. The instantaneous contact point is at rest relative to the surface, but other points on the object generally are not. The top of an ideal rolling wheel has speed2v_cm relative to the ground. These speed relations do not imply that every point has zero acceleration at contact.\n\nRolling dynamics can require bothΣF=ma_cm andΣτ_cm=I_cmα. Static friction often supplies the torque needed to spin up an object, even though no slipping occurs. The friction force must be determined from the equations and checked against its maximum allowed magnitude. Do not replace it automatically byμ_sN. The no-slip relation is a constraint supported by adequate friction, not a universal property of every rotating wheel."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A uniform solid cylinder rolls down a fixed30° incline without slipping. Useg=10 m/s² andI_cm=½mR². Choose downhill positive. Translation givesmg sinθ−f=ma. Torque about the center givesfR=Iα=½mR²(a/R), hencef=½ma uphill. Substituting givesmg sinθ=1.5ma and a=(2/3)g sinθ=3.33 m/s². Friction has magnitude(1/3)mg sinθ, notμ_smg cosθ unless the limiting condition happens to hold.\n\nFor a thin hoop withI_cm=mR² under the same conditions,a=(1/2)g sinθ=2.50 m/s². Its larger rotational inertia relative tomR² makes it accelerate more slowly. Radius and mass cancel in each ideal result, but shape does not."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Release a solid cylinder and a hoop from the same height on the same rough incline. Record motion and confirm thatv_cm≈Rω before using the rolling constraint. Changing the incline angle can eventually cause slipping if available static friction is too small. A video mark on the rim helps estimateω. Compare not only arrival time but also the measured relation between translational and angular speed. Equal total mass does not make rolling times equal when mass distributions differ."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Static friction does not always dissipate mechanical energy. In ideal no-slip rolling on a fixed surface, the contact point has no displacement relative to the surface, and gravitational potential energy can become translational plus rotational kinetic energy. Real deformation can still create rolling resistance. Self-check: using onlyK=½mv² predicts excessive speed because it omits the energy of rotation."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-5-3-1",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A solid cylinder rolls without slipping down30° with g=10 m/s². Its acceleration is what?",
          "passage": "Original hypothetical instructional setup. A uniform solid cylinder rolls down a fixed 30° incline without slipping. Use g = 10 m/s² and I_cm = (1/2)mR².",
          "choices": [
            "10/3 m/s²",
            "5 m/s²",
            "2.5 m/s²",
            "10 m/s²"
          ],
          "answer": 0,
          "explanation": "With I=½mR², acceleration is (2/3)g sin30°.",
          "lessonTitle": "5.3 Rolling constraints and translational-rotational dynamics"
        },
        {
          "id": "physics1-mcq-5-3-2",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which relation applies to rolling without slipping on a stationary surface?",
          "passage": "Original hypothetical instructional setup. A uniform solid cylinder rolls down a fixed 30° incline without slipping. Use g = 10 m/s² and I_cm = (1/2)mR².",
          "choices": [
            "v_cm=Rω",
            "v_cm=ω/R",
            "v_cm=R²ω",
            "v_cm=0 always"
          ],
          "answer": 0,
          "explanation": "The no-slip constraint equates center translation speed with rim speed relative to the center.",
          "lessonTitle": "5.3 Rolling constraints and translational-rotational dynamics"
        },
        {
          "id": "physics1-mcq-5-3-3",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why does a hoop roll down the same incline more slowly than a solid cylinder?",
          "passage": "Original hypothetical instructional setup. A uniform solid cylinder rolls down a fixed 30° incline without slipping. Use g = 10 m/s² and I_cm = (1/2)mR².",
          "choices": [
            "It has greater I/(mR²), requiring more rotational energy for the same translational speed",
            "It has no gravitational force",
            "Static friction must remove all its energy",
            "Its acceleration always depends on mass alone"
          ],
          "answer": 0,
          "explanation": "A larger dimensionless rotational inertia reduces rolling acceleration.",
          "lessonTitle": "5.3 Rolling constraints and translational-rotational dynamics"
        },
        {
          "id": "physics1-mcq-5-3-4",
          "domain": "Physics 1: Torque and Rotational Dynamics",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "In ideal rolling on a fixed surface, static friction can do what?",
          "passage": "Original hypothetical instructional setup. A uniform solid cylinder rolls down a fixed 30° incline without slipping. Use g = 10 m/s² and I_cm = (1/2)mR².",
          "choices": [
            "Supply torque without dissipating mechanical energy",
            "Always convert all potential energy to heat",
            "Always equal μ_sN",
            "Guarantee slipping"
          ],
          "answer": 0,
          "explanation": "Static contact can provide torque while the contact point does not slide along the surface.",
          "lessonTitle": "5.3 Rolling constraints and translational-rotational dynamics"
        }
      ]
    },
    {
      "id": "physics1-lesson-6-1",
      "title": "6.1 Rotational kinetic energy and angular work",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Rotational kinetic energy and angular work"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "A rigid body rotating about a fixed axis has kinetic energyK_rot=½Iω². A rolling body also has translational kinetic energy of its center of mass, soK_total=½mv_cm²+½I_cmω². UsingI about the center in the second term avoids double-counting center-of-mass translation. The relevant inertia must correspond to the stated axis; the numerical value cannot be borrowed from a different arrangement.\n\nA constant torque through angular displacementΔθ does workW=τΔθ when the torque component and angle refer to the same axis and sign convention. Angles must be in radians for this relation in standard SI units. Net rotational work changes rotational kinetic energy for fixed-axis rotation. Rotational power isP=τω. These relations parallel translation, but the underlying physical quantities and units remain distinct."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A flywheel hasI=0.50 kg·m² and initially rotates at 4 rad/s. A net constant torque2 N·m acts through3rad. Net work is 2(3)=6 J. Initial rotational energy is½(0.50)(4²)=4 J, so final energy is 10 J. Therefore½(0.50)ω_f²=10 andω_f=√40≈6.32 rad/s. The torque does not add6 rad/s to the angular speed; work changes a squared-speed quantity.\n\nFor a rolling solid cylinder withI_cm=½mR², substitutingω=v/R givesK_total=½mv²+¼mv²=¾mv². A 1 kg cylinder rolling at 2 m/s has total kinetic energy3 J:2 J translational and1 J rotational. Those components describe different parts of the same motion rather than competing energy estimates."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Apply a measured torque to a flywheel and record angular speed before and after a measured rotation. CompareτΔθ withΔ(½Iω²). If bearing resistance is appreciable, use the net torque or account for dissipated energy separately. At a fixed angular speed, a motor's power output rises with delivered torque. Convert revolutions to radians using2πrad per revolution; forgetting that conversion can create a large systematic discrepancy while the unit labels otherwise look plausible."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not add½mv² to a fixed-axis energy formula if the chosenI already includes the relevant motion about that fixed axis. For rolling, use the center-of-mass decomposition explicitly. Self-check: doubling angular speed at fixedI quadruples rotational kinetic energy. A final angular speed requires both the energy calculation and a direction statement if its sign matters."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-6-1-1",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What work does2 N·m of constant torque do through3rad?",
          "passage": "Original hypothetical instructional setup. A flywheel has rotational inertia 0.50 kg·m² and initially rotates at 4 rad/s. A constant net torque 2 N·m acts through 3 rad.",
          "choices": [
            "6 J",
            "1.5 J",
            "2/3 J",
            "12 J"
          ],
          "answer": 0,
          "explanation": "Multiply torque by angular displacement in radians.",
          "lessonTitle": "6.1 Rotational kinetic energy and angular work"
        },
        {
          "id": "physics1-mcq-6-1-2",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "The flywheel’s energy rises from 4 J to 10 J with I=0.50 kg·m². Its final angular speed is what?",
          "passage": "Original hypothetical instructional setup. A flywheel has rotational inertia 0.50 kg·m² and initially rotates at 4 rad/s. A constant net torque 2 N·m acts through 3 rad.",
          "choices": [
            "√40 rad/s",
            "√20 rad/s",
            "10 rad/s",
            "24 rad/s"
          ],
          "answer": 0,
          "explanation": "Solve½(0.50)ω²=10.",
          "lessonTitle": "6.1 Rotational kinetic energy and angular work"
        },
        {
          "id": "physics1-mcq-6-1-3",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A solid cylinder has m=1 kg,v=2 m/s,I=½mR² and rolls without slipping. Total kinetic energy is what?",
          "passage": "Original hypothetical instructional setup. A flywheel has rotational inertia 0.50 kg·m² and initially rotates at 4 rad/s. A constant net torque 2 N·m acts through 3 rad.",
          "choices": [
            "3 J",
            "1 J",
            "2 J",
            "4 J"
          ],
          "answer": 0,
          "explanation": "Translation contributes2 J and rotation1 J.",
          "lessonTitle": "6.1 Rotational kinetic energy and angular work"
        },
        {
          "id": "physics1-mcq-6-1-4",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Doubling angular speed at unchanged I changes rotational kinetic energy by what factor?",
          "passage": "Original hypothetical instructional setup. A flywheel has rotational inertia 0.50 kg·m² and initially rotates at 4 rad/s. A constant net torque 2 N·m acts through 3 rad.",
          "choices": [
            "4",
            "1/2",
            "2",
            "8"
          ],
          "answer": 0,
          "explanation": "K_rot is proportional to ω².",
          "lessonTitle": "6.1 Rotational kinetic energy and angular work"
        }
      ]
    },
    {
      "id": "physics1-lesson-6-2",
      "title": "6.2 Angular momentum and rotational collisions",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Angular momentum and rotational collisions"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Angular momentum about a fixed axis isL=Iω for a rigid body rotating about that axis. For a particle, its magnitude about a point isL=rmv sinθ, whereθ is the angle between the position vector and momentum. The sign or direction follows a consistent rotational convention. Angular momentum depends on the selected axis, so define that axis before comparing initial and final values.\n\nNet external torque produces a change in angular momentum. When external angular impulse is negligible, total angular momentum of the chosen system is conserved. Rotational kinetic energy need not be conserved during an internal rearrangement or a sticking collision. Internal work can change energy while preserving total angular momentum. An apparatus bearing can exert a force through its axis without producing a torque about that same axis, although real bearing friction may provide an external torque."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A platform hasI_i=2 kg·m² and angular velocity3 rad/s. A student pulls held masses inward, reducing total rotational inertia toI_f=1 kg·m². Neglect external torque. Initial angular momentum is 2(3)=6 kg·m²/s, so final angular velocity is 6/1=6 rad/s. Initial rotational energy is½(2)(3²)=9 J; final energy is½(1)(6²)=18 J. The9 J increase comes from work done while pulling inward, not from a violation of conservation.\n\nFor a separate sticking collision, a stationary ring with inertia1 kg·m² is dropped coaxially onto a disk with inertia2 kg·m² rotating at 3 rad/s. The shared final angular speed is 6/(2+1)=2 rad/s. Here energy decreases from 9 J to 6 J through the slipping contact before both rotate together."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Use a rotating platform with inward and outward mass positions. Measure total rotational inertia or calculate it from a justified model before testingI_iω_i≈I_fω_f. Include the platform, person, and masses in the system. For the ring-on-disk experiment, align the axes and measure angular speeds immediately around the interaction to limit accumulated bearing-friction torque. Compare angular momentum and energy independently; agreement for one does not prove agreement for the other."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "ConservingIω does not implyI orω is separately constant. Also do not conserve only the disk's angular momentum after an external ring joins it; include both in the before-and-after system. Self-check: reducingI by a factor2 at constantL doublesω and doublesK=L²/(2I), requiring an energy source for that increase."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-6-2-1",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A system has I=2 kg·m² andω=3 rad/s. What is its angular momentum?",
          "passage": "Original hypothetical instructional setup. A rotating platform and held masses have initial total rotational inertia 2 kg·m² and angular speed 3 rad/s. Pulling the masses inward reduces total inertia to 1 kg·m². Neglect external torque.",
          "choices": [
            "6 kg·m²/s",
            "3 kg·m²/s",
            "9 kg·m²/s",
            "12 kg·m²/s"
          ],
          "answer": 0,
          "explanation": "Use L=Iω.",
          "lessonTitle": "6.2 Angular momentum and rotational collisions"
        },
        {
          "id": "physics1-mcq-6-2-2",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "At fixed angular momentum, halving total rotational inertia does what to angular speed?",
          "passage": "Original hypothetical instructional setup. A rotating platform and held masses have initial total rotational inertia 2 kg·m² and angular speed 3 rad/s. Pulling the masses inward reduces total inertia to 1 kg·m². Neglect external torque.",
          "choices": [
            "Doubles it",
            "Halves it",
            "Leaves it unchanged",
            "Quadruples it"
          ],
          "answer": 0,
          "explanation": "I_iω_i=I_fω_f requires inverse scaling.",
          "lessonTitle": "6.2 Angular momentum and rotational collisions"
        },
        {
          "id": "physics1-mcq-6-2-3",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Why can pulling masses inward increase rotational kinetic energy?",
          "passage": "Original hypothetical instructional setup. A rotating platform and held masses have initial total rotational inertia 2 kg·m² and angular speed 3 rad/s. Pulling the masses inward reduces total inertia to 1 kg·m². Neglect external torque.",
          "choices": [
            "The person does internal work while external torque remains negligible",
            "Angular momentum creates energy",
            "Moment of inertia must stay constant",
            "No energy conservation law applies"
          ],
          "answer": 0,
          "explanation": "Internal energy can supply work even when system angular momentum is conserved.",
          "lessonTitle": "6.2 Angular momentum and rotational collisions"
        },
        {
          "id": "physics1-mcq-6-2-4",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A stationary I=1 ring sticks coaxially to an I=2 disk initially at 3 rad/s. Final angular speed is what?",
          "passage": "Original hypothetical instructional setup. A rotating platform and held masses have initial total rotational inertia 2 kg·m² and angular speed 3 rad/s. Pulling the masses inward reduces total inertia to 1 kg·m². Neglect external torque.",
          "choices": [
            "2 rad/s",
            "1 rad/s",
            "3 rad/s",
            "6 rad/s"
          ],
          "answer": 0,
          "explanation": "Initial angular momentum6 is shared by final inertia3.",
          "lessonTitle": "6.2 Angular momentum and rotational collisions"
        }
      ]
    },
    {
      "id": "physics1-lesson-6-3",
      "title": "6.3 Angular impulse and translating representations",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Angular impulse and translating representations"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Angular impulse is torque accumulated over time. A constant net torque givesΔL=τ_netΔt; a variable torque gives the signed area under a torque-time graph. A torque-angle graph answers a different question: its signed area is rotational work. Reading the horizontal axis first prevents confusing changes in angular momentum with changes in kinetic energy.\n\nFor a rigid object rotating about a fixed axis with constantI, the slope of an angular-velocity graph isα, andIα gives net torque. The slope of angular momentum versus time gives torque directly. Translating a description into several graphs tests whether your model is internally consistent. A zero torque can coexist with nonzero angular velocity. A constant nonzero torque produces linearly changing angular momentum, not an immediately constant new angular velocity."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "An initially stationary wheel hasI=0.80 kg·m². A positive torque rises linearly from 0 to 4 N·m during 2 s, then remains4 N·m for 1 s. Angular impulse is the triangle's area½(2)(4)=4 N·m·s plus rectangle4(1)=4 N·m·s, totaling8 kg·m²/s. Thus finalω=L/I=8/0.80=10 rad/s. Final rotational kinetic energy is½(0.80)(10²)=40 J.\n\nThe torque-time area is 8, while kinetic energy is 40; those numbers are not supposed to match because their units and meanings differ. During the initial2 s,α rises linearly, soω curves upward. During the last1 s,α=4/0.80=5 rad/s² andω increases linearly. The graph must be continuous at the transition."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Collect torque and angular velocity using a rotary sensor. Predict the angular-momentum change from torque-time area, then compare it withI(ω_f−ω_i). Offset-correct the torque sensor before integrating; a constant offset accumulates into a larger area error over a long interval. When a torque changes sign, preserve signed areas instead of adding their magnitudes. If you draw an ideal graph, state which aspects are measured and which are simplified approximations to the data."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not infer torque from the height of an angular-velocity graph; use its slope. A rotating object does not require a continuing positive torque if resistance is negligible. Self-check: equal positive and negative angular impulses produce zero net change inL, but the wheel can rotate through a substantial angle during the interaction. Zero net change is not the same as no motion."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-6-3-1",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is the total angular impulse of the described triangular-plus-rectangular pulse?",
          "passage": "Original hypothetical instructional setup. An initially stationary wheel has rotational inertia 0.80 kg·m². Positive torque rises linearly from 0 to 4 N·m over 2 s, then stays at 4 N·m for 1 s.",
          "choices": [
            "8 N·m·s",
            "4 N·m·s",
            "12 N·m·s",
            "40 N·m·s"
          ],
          "answer": 0,
          "explanation": "The2 s triangle contributes4 and the1 s rectangle contributes4.",
          "lessonTitle": "6.3 Angular impulse and translating representations",
          "stimulus": {
            "type": "chart",
            "title": "Applied torque pulse",
            "xLabel": "Time (s)",
            "yLabel": "Net torque (N·m)",
            "xMin": 0,
            "xMax": 3,
            "yMin": 0,
            "yMax": 4,
            "points": [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 2,
                "y": 4
              },
              {
                "x": 3,
                "y": 4
              }
            ],
            "lines": [
              {
                "label": "Net torque",
                "points": [
                  {
                    "x": 0,
                    "y": 0
                  },
                  {
                    "x": 2,
                    "y": 4
                  },
                  {
                    "x": 3,
                    "y": 4
                  }
                ]
              }
            ],
            "note": "Original hypothetical piecewise-linear torque model."
          }
        },
        {
          "id": "physics1-mcq-6-3-2",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is final angular speed if that impulse acts on an initially stationary I=0.80 kg·m² wheel?",
          "passage": "Original hypothetical instructional setup. An initially stationary wheel has rotational inertia 0.80 kg·m². Positive torque rises linearly from 0 to 4 N·m over 2 s, then stays at 4 N·m for 1 s.",
          "choices": [
            "10 rad/s",
            "6.4 rad/s",
            "8 rad/s",
            "40 rad/s"
          ],
          "answer": 0,
          "explanation": "Final angular momentum is 8, soω=8/0.80=10.",
          "lessonTitle": "6.3 Angular impulse and translating representations",
          "stimulus": {
            "type": "chart",
            "title": "Applied torque pulse",
            "xLabel": "Time (s)",
            "yLabel": "Net torque (N·m)",
            "xMin": 0,
            "xMax": 3,
            "yMin": 0,
            "yMax": 4,
            "points": [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 2,
                "y": 4
              },
              {
                "x": 3,
                "y": 4
              }
            ],
            "lines": [
              {
                "label": "Net torque",
                "points": [
                  {
                    "x": 0,
                    "y": 0
                  },
                  {
                    "x": 2,
                    "y": 4
                  },
                  {
                    "x": 3,
                    "y": 4
                  }
                ]
              }
            ],
            "note": "Original hypothetical piecewise-linear torque model."
          }
        },
        {
          "id": "physics1-mcq-6-3-3",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which graph area gives rotational work rather than angular impulse?",
          "passage": "Original hypothetical instructional setup. An initially stationary wheel has rotational inertia 0.80 kg·m². Positive torque rises linearly from 0 to 4 N·m over 2 s, then stays at 4 N·m for 1 s.",
          "choices": [
            "Torque versus angular displacement",
            "Torque versus time",
            "Angular momentum versus time",
            "Angular velocity versus time"
          ],
          "answer": 0,
          "explanation": "Work integrates torque over angular displacement, while impulse integrates torque over time.",
          "lessonTitle": "6.3 Angular impulse and translating representations",
          "stimulus": {
            "type": "chart",
            "title": "Applied torque pulse",
            "xLabel": "Time (s)",
            "yLabel": "Net torque (N·m)",
            "xMin": 0,
            "xMax": 3,
            "yMin": 0,
            "yMax": 4,
            "points": [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 2,
                "y": 4
              },
              {
                "x": 3,
                "y": 4
              }
            ],
            "lines": [
              {
                "label": "Net torque",
                "points": [
                  {
                    "x": 0,
                    "y": 0
                  },
                  {
                    "x": 2,
                    "y": 4
                  },
                  {
                    "x": 3,
                    "y": 4
                  }
                ]
              }
            ],
            "note": "Original hypothetical piecewise-linear torque model."
          }
        },
        {
          "id": "physics1-mcq-6-3-4",
          "domain": "Physics 1: Energy and Momentum of Rotating Systems",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "A wheel’s angular velocity is constant and nonzero. Its net torque is what for constant I?",
          "passage": "Original hypothetical instructional setup. An initially stationary wheel has rotational inertia 0.80 kg·m². Positive torque rises linearly from 0 to 4 N·m over 2 s, then stays at 4 N·m for 1 s.",
          "choices": [
            "Zero",
            "Positive necessarily",
            "Negative necessarily",
            "Equal to its angular momentum"
          ],
          "answer": 0,
          "explanation": "Zero angular acceleration implies zero net torque; rotation itself can continue.",
          "lessonTitle": "6.3 Angular impulse and translating representations",
          "stimulus": {
            "type": "chart",
            "title": "Applied torque pulse",
            "xLabel": "Time (s)",
            "yLabel": "Net torque (N·m)",
            "xMin": 0,
            "xMax": 3,
            "yMin": 0,
            "yMax": 4,
            "points": [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 2,
                "y": 4
              },
              {
                "x": 3,
                "y": 4
              }
            ],
            "lines": [
              {
                "label": "Net torque",
                "points": [
                  {
                    "x": 0,
                    "y": 0
                  },
                  {
                    "x": 2,
                    "y": 4
                  },
                  {
                    "x": 3,
                    "y": 4
                  }
                ]
              }
            ],
            "note": "Original hypothetical piecewise-linear torque model."
          }
        }
      ]
    },
    {
      "id": "physics1-lesson-7-1",
      "title": "7.1 Recognizing simple harmonic motion from the restoring force",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Recognizing simple harmonic motion from the restoring force"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Simple harmonic motion is periodic motion governed by a net restoring force proportional to displacement from a stable equilibrium: $F_{net}=-kx$. The displacement x is measured from equilibrium, not from the end of an unstretched spring unless those positions coincide. The minus sign states that force points toward equilibrium. A periodic motion is not automatically simple harmonic; the force-displacement relationship must have the appropriate form. Newton’s second law gives $a=-(k/m)x$, so acceleration and displacement have opposite signs.\n\nFor an ideal mass-spring oscillator, $\\omega=\\sqrt{k/m}$ and $T=2\\pi\\sqrt{m/k}$. Angular frequency is measured in radians per second; ordinary frequency is measured in cycles per second and satisfies $f=1/T$. A cosine model $x=A\\cos(\\omega t)$ describes release from rest at maximum positive displacement. A different starting condition requires a phase choice. During a cycle, the object passes equilibrium with its greatest speed and reaches zero speed at the endpoints, where the acceleration magnitude is greatest."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A hypothetical horizontal oscillator has mass 0.50 kg, spring constant 200 N/m and amplitude 0.10 m. Its angular frequency is $\\sqrt{200/0.50}=20$ rad/s, and its period is $2\\pi/20=\\pi/10$ s, approximately 0.314 s. Its maximum speed is $\\omega A=2.0$ m/s. Its maximum acceleration magnitude is $\\omega^2A=40$ m/s².\n\nAt x = +0.050 m, the net force is −10 N, so the acceleration is −20 m/s². That sign does not tell you the direction of velocity: the object passes this position once moving right and once moving left during each cycle. Draw force and velocity arrows separately. At equilibrium the net force is zero at that instant, but the object generally has nonzero velocity and continues through equilibrium rather than stopping there."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Measure displacement versus time with a motion sensor and identify successive positive turning points to determine the period. Compare periods after changing mass while keeping the same spring; a plot of $T^2$ versus mass should be approximately linear with slope $4\\pi^2/k$. Use repeated cycles rather than timing one short cycle to reduce fractional timing uncertainty. Keep amplitudes within the spring’s approximately linear range and check whether friction causes amplitude to decay. A linear model is an idealization supported over a measured range, not a promise that every real spring is Hookean at every stretch."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not use the maximum acceleration at equilibrium: acceleration is zero there in the ideal model. Do not confuse frequency with angular frequency or assume that a positive displacement means positive acceleration. Increasing the amplitude of an ideal linear oscillator changes maximum speed and energy but does not change its period. Check the model assumptions before applying that amplitude-independent result to a real system."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-7-1-1",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is the angular frequency for m = 0.50 kg and k = 200 N/m?",
          "passage": "Original hypothetical instructional setup. A hypothetical horizontal oscillator has m = 0.50 kg, k = 200 N/m and amplitude 0.10 m. Displacement is measured from equilibrium. Neglect friction.",
          "choices": [
            "20 rad/s",
            "10 rad/s",
            "400 rad/s",
            "0.050 rad/s"
          ],
          "answer": 0,
          "explanation": "Use the square root of k/m, not k/m itself: sqrt(400) = 20 rad/s.",
          "lessonTitle": "7.1 Recognizing simple harmonic motion from the restoring force"
        },
        {
          "id": "physics1-mcq-7-1-2",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Where is the acceleration magnitude greatest in ideal spring motion?",
          "passage": "Original hypothetical instructional setup. A hypothetical horizontal oscillator has m = 0.50 kg, k = 200 N/m and amplitude 0.10 m. Displacement is measured from equilibrium. Neglect friction.",
          "choices": [
            "At the turning points",
            "At equilibrium",
            "At every point equally",
            "Only where velocity is positive"
          ],
          "answer": 0,
          "explanation": "The restoring acceleration magnitude is proportional to the magnitude of displacement.",
          "lessonTitle": "7.1 Recognizing simple harmonic motion from the restoring force"
        },
        {
          "id": "physics1-mcq-7-1-3",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "At x = +0.050 m in the described oscillator, what is the acceleration?",
          "passage": "Original hypothetical instructional setup. A hypothetical horizontal oscillator has m = 0.50 kg, k = 200 N/m and amplitude 0.10 m. Displacement is measured from equilibrium. Neglect friction.",
          "choices": [
            "−20 m/s²",
            "+20 m/s²",
            "−10 m/s²",
            "0 m/s²"
          ],
          "answer": 0,
          "explanation": "The spring force is −200(0.050) = −10 N; dividing by 0.50 kg gives −20 m/s².",
          "lessonTitle": "7.1 Recognizing simple harmonic motion from the restoring force"
        },
        {
          "id": "physics1-mcq-7-1-4",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What happens to the ideal period if the amplitude doubles while m and k stay fixed?",
          "passage": "Original hypothetical instructional setup. A hypothetical horizontal oscillator has m = 0.50 kg, k = 200 N/m and amplitude 0.10 m. Displacement is measured from equilibrium. Neglect friction.",
          "choices": [
            "It stays the same",
            "It doubles",
            "It halves",
            "It becomes four times as large"
          ],
          "answer": 0,
          "explanation": "The ideal period depends on m and k. The larger amplitude changes energy and maximum speed, not the period.",
          "lessonTitle": "7.1 Recognizing simple harmonic motion from the restoring force"
        }
      ]
    },
    {
      "id": "physics1-lesson-7-2",
      "title": "7.2 Energy, phase, and graphs in oscillating systems",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Energy, phase, and graphs in oscillating systems"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "An ideal horizontal spring oscillator trades kinetic energy with elastic potential energy. With potential energy zero at equilibrium, total mechanical energy is $E=\\frac12kA^2$, elastic potential energy is $U=\\frac12kx^2$, and kinetic energy is $K=E-U$. The potential energy depends on the square of displacement, so equal positive and negative displacements have the same potential energy. Energy conservation determines the speed magnitude at a position; it does not determine which direction the object is moving.\n\nIf displacement is a cosine in time, velocity is a phase-shifted sinusoid and acceleration is opposite in phase to displacement. You do not need calculus to compare the graphs: velocity is zero at displacement extrema, and acceleration is zero when displacement crosses equilibrium. Draw a complete cycle with a consistent initial condition. A position-time graph and an energy-position graph have different horizontal axes, so their shapes should not be compared as though they describe the same relationship."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical oscillator with k = 80 N/m, mass 0.20 kg and amplitude 0.15 m. Total energy is 0.5(80)(0.15²) = 0.90 J. At displacement x = 0.075 m, which is half the amplitude, elastic potential energy is 0.5(80)(0.075²) = 0.225 J. The remaining 0.675 J is kinetic. The speed is $\\sqrt{2K/m}=\\sqrt{6.75}$ m/s, approximately 2.60 m/s.\n\nAt equilibrium all 0.90 J is kinetic, giving a maximum speed of 3.0 m/s. At either turning point the object is instantaneously at rest, so all the energy is elastic potential energy. Halving the amplitude would reduce total energy to one quarter, not one half, because energy is proportional to amplitude squared. If friction acts, mechanical energy decreases as some energy becomes thermal, and the ideal constant-energy graph no longer applies."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Use measured displacement and speed to calculate energy at several times in a cycle. Plot elastic, kinetic and total mechanical energy on the same time axis. The two component energies vary at twice the oscillation frequency, because each reaches its maximum twice per full position cycle. A slowly falling total-energy curve is evidence of dissipation or measurement bias; it is not a reason to invent a time-varying spring constant without further investigation. State the reference used for potential energy and include the same system boundaries throughout the calculation."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "A turning point has zero speed but does not generally have zero acceleration. At half the amplitude, potential energy is one quarter of the total, so kinetic energy is three quarters; speed is not half its maximum. For a vertical spring, measure displacement from the equilibrium position and account consistently for gravity, rather than adding a second gravitational term to an already shifted effective spring-energy model without justification."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-7-2-1",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is total energy for k = 80 N/m and amplitude 0.15 m?",
          "passage": "Original hypothetical instructional setup. A hypothetical ideal spring oscillator has k = 80 N/m, mass 0.20 kg and amplitude 0.15 m.",
          "choices": [
            "0.90 J",
            "6.0 J",
            "0.225 J",
            "1.8 J"
          ],
          "answer": 0,
          "explanation": "Total energy at a turning point is one half kA² = 0.90 J.",
          "lessonTitle": "7.2 Energy, phase, and graphs in oscillating systems"
        },
        {
          "id": "physics1-mcq-7-2-2",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "At half the amplitude, what fraction of total energy is kinetic?",
          "passage": "Original hypothetical instructional setup. A hypothetical ideal spring oscillator has k = 80 N/m, mass 0.20 kg and amplitude 0.15 m.",
          "choices": [
            "3/4",
            "1/4",
            "1/2",
            "1"
          ],
          "answer": 0,
          "explanation": "Elastic energy is proportional to x². At x = A/2 it is one quarter of the total; the rest is kinetic.",
          "lessonTitle": "7.2 Energy, phase, and graphs in oscillating systems"
        },
        {
          "id": "physics1-mcq-7-2-3",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "If the amplitude halves, what happens to total mechanical energy in otherwise identical ideal motion?",
          "passage": "Original hypothetical instructional setup. A hypothetical ideal spring oscillator has k = 80 N/m, mass 0.20 kg and amplitude 0.15 m.",
          "choices": [
            "It becomes one quarter as large",
            "It halves",
            "It stays the same",
            "It doubles"
          ],
          "answer": 0,
          "explanation": "Energy depends on amplitude squared, so the factor is (1/2)².",
          "lessonTitle": "7.2 Energy, phase, and graphs in oscillating systems"
        },
        {
          "id": "physics1-mcq-7-2-4",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What information does energy conservation alone fail to determine at a given nonzero displacement?",
          "passage": "Original hypothetical instructional setup. A hypothetical ideal spring oscillator has k = 80 N/m, mass 0.20 kg and amplitude 0.15 m.",
          "choices": [
            "The direction of velocity",
            "The speed magnitude",
            "The elastic potential energy",
            "The kinetic energy when total energy is known"
          ],
          "answer": 0,
          "explanation": "Two passages through a position can have equal speed and opposite directions; scalar energy does not select the direction.",
          "lessonTitle": "7.2 Energy, phase, and graphs in oscillating systems"
        }
      ]
    },
    {
      "id": "physics1-lesson-7-3",
      "title": "7.3 Pendulums, experimental linearization, and model limits",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Pendulums, experimental linearization, and model limits"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "A simple pendulum models a small bob suspended from a light string of length L, with negligible friction and a sufficiently small swing angle. The tangential component of gravity acts toward the lowest point. For small angles measured in radians, the restoring effect is approximately proportional to displacement along the arc. Under these assumptions, the period is $T=2\\pi\\sqrt{L/g}$. The mass cancels, so an ideal small-angle pendulum’s period does not depend on the bob’s mass.\n\nThe length is measured from the pivot to the bob’s center of mass. The formula is an approximation, not a universal rule for every suspended object. A large-angle swing has a longer period than this approximation predicts. An extended rigid body can require a physical-pendulum model that accounts for rotational inertia. For this course’s simple model, state the small-angle and point-mass assumptions rather than quietly treating a real apparatus as perfect."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A hypothetical pendulum has L = 0.80 m in a location where g = 9.8 m/s². Its predicted period is $2\\pi\\sqrt{0.80/9.8}$, approximately 1.80 s. Increasing length to 3.20 m multiplies L by four and the period by two, to about 3.59 s. Doubling bob mass at the original length does not change the ideal period.\n\nTo estimate g experimentally, square the relationship: $T^2=(4\\pi^2/g)L$. A graph of T² versus L has theoretical slope $4\\pi^2/g$. If an experiment gives slope 4.00 s²/m, then g = 4π²/4.00 ≈ 9.87 m/s². Slope units matter: reversing the axes would require a different calculation. A nonzero fitted intercept can reveal a length-offset error or other systematic limitation, rather than proving that gravity changes with length."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Choose several well-separated lengths, release the bob without pushing it, and keep a modest, similar angle for each trial. Time ten complete cycles and divide by ten to reduce the influence of reaction time. Repeat trials and report the spread. A single timing at one length cannot establish the predicted square-root relationship. Change only the length when testing its effect, and record the pivot-to-center distance rather than just the string’s visible free portion. Plot transformed variables only after deriving which relationship should be linear."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not use T proportional to L: it is proportional to the square root of L in this model. Do not interpret the mass-independent result as evidence that gravitational force is the same for all masses; acceleration and the period result arise after mass cancels in the governing relationship. A valid conclusion states the tested range and acknowledges damping, timing uncertainty and the small-angle approximation."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-7-3-1",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What happens to the ideal pendulum period when length is multiplied by four?",
          "passage": "Original hypothetical instructional setup. A hypothetical small-angle simple pendulum has length 0.80 m and g = 9.8 m/s². A comparison length is 3.20 m. In a separate hypothetical experiment, the slope of T² versus L is 4.00 s²/m.",
          "choices": [
            "It doubles",
            "It quadruples",
            "It halves",
            "It is unchanged"
          ],
          "answer": 0,
          "explanation": "The period scales with sqrt(L), so the multiplier is sqrt(4) = 2.",
          "lessonTitle": "7.3 Pendulums, experimental linearization, and model limits"
        },
        {
          "id": "physics1-mcq-7-3-2",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What should be plotted against L to obtain a predicted straight line?",
          "passage": "Original hypothetical instructional setup. A hypothetical small-angle simple pendulum has length 0.80 m and g = 9.8 m/s². A comparison length is 3.20 m. In a separate hypothetical experiment, the slope of T² versus L is 4.00 s²/m.",
          "choices": [
            "T²",
            "T",
            "1/T",
            "The bob mass"
          ],
          "answer": 0,
          "explanation": "Squaring the period equation gives T² = (4π²/g)L.",
          "lessonTitle": "7.3 Pendulums, experimental linearization, and model limits"
        },
        {
          "id": "physics1-mcq-7-3-3",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What length should be used for the simple-pendulum model?",
          "passage": "Original hypothetical instructional setup. A hypothetical small-angle simple pendulum has length 0.80 m and g = 9.8 m/s². A comparison length is 3.20 m. In a separate hypothetical experiment, the slope of T² versus L is 4.00 s²/m.",
          "choices": [
            "Pivot to the bob’s center of mass",
            "Only the exposed string",
            "The bob diameter",
            "The horizontal swing width"
          ],
          "answer": 0,
          "explanation": "The model length locates the effective point mass relative to the pivot.",
          "lessonTitle": "7.3 Pendulums, experimental linearization, and model limits"
        },
        {
          "id": "physics1-mcq-7-3-4",
          "domain": "Physics 1: Oscillations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which change leaves the ideal small-angle period unchanged at the same location?",
          "passage": "Original hypothetical instructional setup. A hypothetical small-angle simple pendulum has length 0.80 m and g = 9.8 m/s². A comparison length is 3.20 m. In a separate hypothetical experiment, the slope of T² versus L is 4.00 s²/m.",
          "choices": [
            "Doubling bob mass",
            "Doubling length",
            "Reducing length to one quarter",
            "Changing g"
          ],
          "answer": 0,
          "explanation": "Mass cancels from the ideal period formula; L and g remain.",
          "lessonTitle": "7.3 Pendulums, experimental linearization, and model limits"
        }
      ]
    },
    {
      "id": "physics1-lesson-8-1",
      "title": "8.1 Hydrostatic pressure and force transmission",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Hydrostatic pressure and force transmission"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Density is mass per unit volume, $\\rho=m/V$. Pressure is force per unit area, $p=F/A$, and a fluid at rest exerts pressure normal to a surface. In a uniform fluid under gravity, pressure increases with depth according to $p=p_{surface}+\\rho gh$. Depth is vertical distance below the chosen surface; the shape of a container or the length of a curved tube does not replace this vertical distance.\n\nAbsolute pressure includes the pressure acting at the surface. Gauge pressure is the difference relative to atmospheric pressure. Identify which quantity a question or instrument reports before adding atmospheric pressure. At the same depth in the same connected, stationary fluid, pressures are equal. If the surface pressures differ or the fluids have different densities, begin from an identified reference pressure and account for each vertical segment instead of applying a memorized equality without checking its conditions."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "In a hypothetical open freshwater tank, a point 2.0 m below the surface has gauge pressure (1000 kg/m³)(9.8 m/s²)(2.0 m) = 19,600 Pa. With atmospheric pressure taken as 101,000 Pa, its absolute pressure is 120,600 Pa. A point at the same depth in a wider tank has the same hydrostatic pressure even though the total water mass differs.\n\nFor an ideal hydraulic system, an added pressure is transmitted through a connected enclosed fluid. If a 100 N input force acts on area 0.020 m², the added pressure is 5000 Pa. Applied to a 0.100 m² output piston at the same height, this produces 500 N. The device does not create energy: an input displacement of 0.050 m corresponds to output displacement 0.010 m, because displaced volumes match. Input and output work are both 5 J before losses."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Measure pressure at several depths and plot gauge pressure against depth. The slope should be approximately ρg for a uniform-density fluid. A sensor reading at the surface identifies the offset that separates gauge from absolute pressure. Keep fluid type and surface conditions controlled, and avoid placing a sensor against a wall in a way that blocks its inlet. When comparing piston forces, measure effective areas, not diameters; doubling a circular piston’s diameter multiplies its area by four."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not add atmospheric pressure twice. Do not confuse a pressure reading in pascals with a force in newtons; force also depends on area. Hydraulic force multiplication is accompanied by a smaller output displacement, consistent with conservation of energy. State when piston heights and friction are neglected, because hydrostatic differences and mechanical losses can change a real device’s output."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-8-1-1",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is gauge pressure 2.0 m below an open freshwater surface when g = 9.8 m/s²?",
          "passage": "Original hypothetical instructional setup. A hypothetical open freshwater tank has density 1000 kg/m³, atmospheric pressure 101,000 Pa and g = 9.8 m/s². A separate ideal hydraulic system at equal piston heights applies 100 N to area 0.020 m²; output area is 0.100 m².",
          "choices": [
            "19,600 Pa",
            "120,600 Pa",
            "1960 Pa",
            "101,000 Pa"
          ],
          "answer": 0,
          "explanation": "Gauge pressure here is ρgh. Absolute pressure would additionally include surface atmospheric pressure.",
          "lessonTitle": "8.1 Hydrostatic pressure and force transmission"
        },
        {
          "id": "physics1-mcq-8-1-2",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "How does container width affect hydrostatic pressure at a fixed depth in the same stationary fluid?",
          "passage": "Original hypothetical instructional setup. A hypothetical open freshwater tank has density 1000 kg/m³, atmospheric pressure 101,000 Pa and g = 9.8 m/s². A separate ideal hydraulic system at equal piston heights applies 100 N to area 0.020 m²; output area is 0.100 m².",
          "choices": [
            "It does not change that pressure",
            "Wider always means higher pressure",
            "Narrower always means zero pressure",
            "Pressure equals total water mass"
          ],
          "answer": 0,
          "explanation": "The pressure-depth relation depends on surface pressure, density and vertical depth, not container width.",
          "lessonTitle": "8.1 Hydrostatic pressure and force transmission"
        },
        {
          "id": "physics1-mcq-8-1-3",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What output force results from added pressure 5000 Pa on area 0.100 m²?",
          "passage": "Original hypothetical instructional setup. A hypothetical open freshwater tank has density 1000 kg/m³, atmospheric pressure 101,000 Pa and g = 9.8 m/s². A separate ideal hydraulic system at equal piston heights applies 100 N to area 0.020 m²; output area is 0.100 m².",
          "choices": [
            "500 N",
            "50 N",
            "5000 N",
            "0.000020 N"
          ],
          "answer": 0,
          "explanation": "Force is pressure times area: 5000 × 0.100 = 500 N.",
          "lessonTitle": "8.1 Hydrostatic pressure and force transmission"
        },
        {
          "id": "physics1-mcq-8-1-4",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "In an ideal equal-height hydraulic system, why does the larger piston move a smaller distance?",
          "passage": "Original hypothetical instructional setup. A hypothetical open freshwater tank has density 1000 kg/m³, atmospheric pressure 101,000 Pa and g = 9.8 m/s². A separate ideal hydraulic system at equal piston heights applies 100 N to area 0.020 m²; output area is 0.100 m².",
          "choices": [
            "The displaced fluid volumes must be equal",
            "Energy is created at the smaller piston",
            "The larger piston has no pressure",
            "The fluid vanishes during transfer"
          ],
          "answer": 0,
          "explanation": "For incompressible fluid without leaks, A_in d_in = A_out d_out, preserving volume and ideal work.",
          "lessonTitle": "8.1 Hydrostatic pressure and force transmission"
        }
      ]
    },
    {
      "id": "physics1-lesson-8-2",
      "title": "8.2 Buoyancy, floating equilibrium, and apparent weight",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Buoyancy, floating equilibrium, and apparent weight"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "Archimedes’ principle states that the buoyant force equals the weight of fluid displaced by an object: $F_B=\\rho_{fluid}gV_{displaced}$. Use the submerged volume, not automatically the object’s total volume. The buoyant force results from the pressure variation over the object’s surface; deeper parts generally experience greater pressure. The displaced fluid’s density belongs in the formula, not the object’s density.\n\nFor an object floating in equilibrium without other vertical forces, buoyant force equals weight. Therefore the fraction of total volume submerged is the object’s average density divided by the fluid density. This statement assumes a uniform surrounding fluid and includes the object’s entire average density, including an enclosed air space if present. An object held fully submerged may also experience tension or an applied force. Draw a force diagram before equating buoyancy with weight, because they are equal only under the appropriate equilibrium conditions."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. Its mass is 1.8 kg and its weight is 17.64 N for g = 9.8 m/s². Floating in freshwater of density 1000 kg/m³, it displaces 1.8/1000 = 0.0018 m³. Thus 60% of its volume is submerged. The buoyant force is 17.64 N, equal to its weight.\n\nIf the same block is pushed completely below the surface, buoyancy becomes (1000)(9.8)(0.0030) = 29.4 N. A downward holding force of 29.4 − 17.64 = 11.76 N is needed for equilibrium. Removing that force gives an upward net force; do not claim the upward force is always just the block’s weight. For a denser object hanging from a scale while fully submerged, the scale tension is its weight minus buoyancy, provided it is stationary and no other vertical force acts."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Compare an object’s weight in air with the scale reading while it is fully submerged without touching the container. The difference estimates buoyancy. Independently measure displaced volume and compare with ρgV. Check for trapped bubbles, contact forces and incomplete submersion. To investigate floating fractions, use objects of known average density and measure their submerged volume rather than only the visible depth unless their shape makes those ratios equivalent. A tapered object’s depth fraction is not generally its volume fraction."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not assume a heavier object must sink: average density and available displacement matter. Do not use the object’s total volume for a partially submerged object. A fully submerged object in a uniform incompressible fluid has approximately depth-independent buoyancy even though the absolute pressure increases with depth. This model can fail for compressible objects or fluids with significant density changes, so state which idealizations justify the calculation."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-8-2-1",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What fraction of a freely floating 600 kg/m³ block is submerged in 1000 kg/m³ water?",
          "passage": "Original hypothetical instructional setup. A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. It is placed in freshwater of density 1000 kg/m³. Use g = 9.8 m/s².",
          "choices": [
            "60%",
            "40%",
            "100%",
            "167%"
          ],
          "answer": 0,
          "explanation": "Floating equilibrium gives V_sub/V_total = ρ_object/ρ_fluid = 0.60.",
          "lessonTitle": "8.2 Buoyancy, floating equilibrium, and apparent weight"
        },
        {
          "id": "physics1-mcq-8-2-2",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What fluid volume does the described floating 1.8 kg block displace?",
          "passage": "Original hypothetical instructional setup. A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. It is placed in freshwater of density 1000 kg/m³. Use g = 9.8 m/s².",
          "choices": [
            "0.0018 m³",
            "0.0030 m³",
            "1.8 m³",
            "0.00060 m³"
          ],
          "answer": 0,
          "explanation": "The displaced water mass equals the block mass in floating equilibrium: V = m/ρ.",
          "lessonTitle": "8.2 Buoyancy, floating equilibrium, and apparent weight"
        },
        {
          "id": "physics1-mcq-8-2-3",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What downward force holds the described block fully submerged at rest?",
          "passage": "Original hypothetical instructional setup. A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. It is placed in freshwater of density 1000 kg/m³. Use g = 9.8 m/s².",
          "choices": [
            "11.76 N",
            "17.64 N",
            "29.4 N",
            "0 N"
          ],
          "answer": 0,
          "explanation": "Full-submersion buoyancy is 29.4 N. Subtract the 17.64 N weight to obtain the required additional downward force.",
          "lessonTitle": "8.2 Buoyancy, floating equilibrium, and apparent weight"
        },
        {
          "id": "physics1-mcq-8-2-4",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which density belongs in the buoyant-force formula?",
          "passage": "Original hypothetical instructional setup. A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. It is placed in freshwater of density 1000 kg/m³. Use g = 9.8 m/s².",
          "choices": [
            "The displaced fluid’s density",
            "The object’s density in every case",
            "The average of object and fluid densities",
            "No density is needed"
          ],
          "answer": 0,
          "explanation": "Buoyancy equals the displaced fluid’s weight; its density determines that weight.",
          "lessonTitle": "8.2 Buoyancy, floating equilibrium, and apparent weight"
        }
      ]
    },
    {
      "id": "physics1-lesson-8-3",
      "title": "8.3 Continuity and Bernoulli reasoning with explicit assumptions",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Continuity and Bernoulli reasoning with explicit assumptions"
        },
        {
          "type": "subheading",
          "text": "Build the model"
        },
        {
          "type": "text",
          "text": "For steady flow of an incompressible fluid through a pipe without leaks, volume flow rate is constant: $Q=Av$. A smaller cross-sectional area therefore corresponds to a greater average flow speed. This continuity statement is about conserving volume for the specified model; it does not by itself determine pressure. Distinguish area from radius: halving a circular pipe’s radius reduces its area to one quarter and multiplies speed by four for the same flow rate.\n\nBernoulli’s equation connects pressure, speed and height along a streamline for an ideal, steady, incompressible flow with negligible viscous losses and no unaccounted pump work: $p+\\frac12\\rho v^2+\\rho gh=constant$. Every term has pressure units. A speed increase at equal height corresponds to a pressure decrease in that model. A real pump, frictional loss, unsteady flow or changing fluid density requires additional accounting. Do not use the equation to claim that every fast-moving fluid anywhere necessarily has lower pressure than every slow-moving fluid."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "A hypothetical horizontal pipe carries water steadily. At section 1, area is 0.0040 m² and speed is 1.0 m/s. At section 2, area is 0.0010 m². Continuity gives speed 4.0 m/s at section 2 and a volume flow rate of 0.0040 m³/s at both sections.\n\nFor an ideal horizontal flow, the height terms cancel. Thus $p_2-p_1=\\frac12\\rho(v_1^2-v_2^2)$. With water density 1000 kg/m³, the pressure change is 0.5(1000)(1 − 16) = −7500 Pa. The pressure at section 2 is 7.5 kPa lower, not 7.5 kPa in absolute terms unless a reference pressure is also given. If section 2 were higher, part of the pressure change would additionally account for gravitational potential energy."
        },
        {
          "type": "subheading",
          "text": "Investigate and connect"
        },
        {
          "type": "text",
          "text": "Use a flow meter or timed collection to estimate Q and compare calculated speeds at known areas. Pressure taps at matched heights can test the predicted pressure difference. Separate measurement uncertainty from model inadequacy: a persistent energy loss can arise from viscosity or turbulence even when the measurements are careful. Record whether a pump lies between measurement points. For an ideal tank draining through a small opening, equating surface and outlet atmospheric pressures and neglecting the large surface’s speed gives the familiar outlet-speed estimate sqrt(2gh); explain those assumptions before using the shortcut."
        },
        {
          "type": "subheading",
          "text": "Common errors and model limits"
        },
        {
          "type": "text",
          "text": "Do not set pressure equal at two pipe sections simply because their heights match when the fluid is flowing. Do not infer pressure from continuity alone. Do not insert flow rate Q where the equation needs speed v: first divide Q by area. Check signs, units and whether an answer is a difference or an absolute pressure. These checks often catch a physically impossible result before a calculator does."
        }
      ],
      "practiceQuestions": [
        {
          "id": "physics1-mcq-8-3-1",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is section 2 speed for the described area change?",
          "passage": "Original hypothetical instructional setup. A hypothetical horizontal pipe carries water steadily. Section 1 has area 0.0040 m² and speed 1.0 m/s; section 2 has area 0.0010 m². Use density 1000 kg/m³ and neglect viscosity and pump work.",
          "choices": [
            "4.0 m/s",
            "0.25 m/s",
            "1.0 m/s",
            "16 m/s"
          ],
          "answer": 0,
          "explanation": "Equal volume flow requires 0.0040(1.0) = 0.0010 v₂, giving v₂ = 4.0 m/s.",
          "lessonTitle": "8.3 Continuity and Bernoulli reasoning with explicit assumptions"
        },
        {
          "id": "physics1-mcq-8-3-2",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What is p₂ − p₁ in the described ideal horizontal water flow?",
          "passage": "Original hypothetical instructional setup. A hypothetical horizontal pipe carries water steadily. Section 1 has area 0.0040 m² and speed 1.0 m/s; section 2 has area 0.0010 m². Use density 1000 kg/m³ and neglect viscosity and pump work.",
          "choices": [
            "−7500 Pa",
            "+7500 Pa",
            "−15000 Pa",
            "0 Pa"
          ],
          "answer": 0,
          "explanation": "Use one half ρ(v₁² − v₂²): 500(1 − 16) = −7500 Pa.",
          "lessonTitle": "8.3 Continuity and Bernoulli reasoning with explicit assumptions"
        },
        {
          "id": "physics1-mcq-8-3-3",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "Which assumption is required for the stated continuity relation Av = constant?",
          "passage": "Original hypothetical instructional setup. A hypothetical horizontal pipe carries water steadily. Section 1 has area 0.0040 m² and speed 1.0 m/s; section 2 has area 0.0010 m². Use density 1000 kg/m³ and neglect viscosity and pump work.",
          "choices": [
            "Steady incompressible flow without leaks",
            "Zero speed everywhere",
            "Equal pipe radii everywhere",
            "An absent pressure difference everywhere"
          ],
          "answer": 0,
          "explanation": "Volume conservation gives the same Q through each section under these conditions.",
          "lessonTitle": "8.3 Continuity and Bernoulli reasoning with explicit assumptions"
        },
        {
          "id": "physics1-mcq-8-3-4",
          "domain": "Physics 1: Fluids",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Physical modeling and reasoning",
          "question": "What must be included if a pump adds energy between the two sections?",
          "passage": "Original hypothetical instructional setup. A hypothetical horizontal pipe carries water steadily. Section 1 has area 0.0040 m² and speed 1.0 m/s; section 2 has area 0.0010 m². Use density 1000 kg/m³ and neglect viscosity and pump work.",
          "choices": [
            "The pump’s energy contribution",
            "A claim that Bernoulli forbids pumps",
            "The object’s buoyant volume only",
            "An automatic assumption that both pressures are equal"
          ],
          "answer": 0,
          "explanation": "The simple constant-total form cannot ignore external energy input from a pump.",
          "lessonTitle": "8.3 Continuity and Bernoulli reasoning with explicit assumptions"
        }
      ]
    }
  ],
  "mcq": [
    {
      "id": "physics1-mcq-1-1-1",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "For the6 s journey from 2 m to 8 m to 5 m, what is average velocity?",
      "passage": "Original hypothetical instructional setup. A cart starts at x = 2 m, reaches x = 8 m after 3 s, then returns to x = 5 m over the next 3 s. Take rightward as positive.",
      "choices": [
        "+0.5 m/s",
        "+1.5 m/s",
        "+3 m/s",
        "−0.5 m/s"
      ],
      "answer": 0,
      "explanation": "Net displacement is +3 m over6 s. Distance9 m would give average speed, not velocity.",
      "lessonTitle": "1.1 Position, displacement, and average velocity"
    },
    {
      "id": "physics1-mcq-1-1-2",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What does a horizontal section of a position–time graph represent?",
      "passage": "Original hypothetical instructional setup. A cart starts at x = 2 m, reaches x = 8 m after 3 s, then returns to x = 5 m over the next 3 s. Take rightward as positive.",
      "choices": [
        "An object remaining at one position",
        "An object moving with maximum speed",
        "An object at the origin necessarily",
        "An object whose acceleration increases steadily"
      ],
      "answer": 0,
      "explanation": "The graph height is constant, so displacement during any part of that section is zero.",
      "lessonTitle": "1.1 Position, displacement, and average velocity"
    },
    {
      "id": "physics1-mcq-1-1-3",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "An object completes a round trip in20 s. Which quantity must be zero?",
      "passage": "Original hypothetical instructional setup. A cart starts at x = 2 m, reaches x = 8 m after 3 s, then returns to x = 5 m over the next 3 s. Take rightward as positive.",
      "choices": [
        "Average velocity for the whole trip",
        "Total distance",
        "Average speed",
        "Instantaneous speed at every moment"
      ],
      "answer": 0,
      "explanation": "The final and initial positions coincide, so net displacement is zero over a nonzero elapsed time.",
      "lessonTitle": "1.1 Position, displacement, and average velocity"
    },
    {
      "id": "physics1-mcq-1-1-4",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which measurement is needed to determine average speed but not average velocity?",
      "passage": "Original hypothetical instructional setup. A cart starts at x = 2 m, reaches x = 8 m after 3 s, then returns to x = 5 m over the next 3 s. Take rightward as positive.",
      "choices": [
        "The total length of the traveled path",
        "The elapsed time",
        "The starting position",
        "The ending position"
      ],
      "answer": 0,
      "explanation": "Average speed uses path length; average velocity uses only net displacement and elapsed time.",
      "lessonTitle": "1.1 Position, displacement, and average velocity"
    },
    {
      "id": "physics1-mcq-1-2-1",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "For v₀=−6 m/s and a=+2 m/s², when does the cart first stop?",
      "passage": "Original hypothetical instructional setup. A cart starts with velocity −6 m/s and has constant acceleration +2 m/s² for 4 s. Take the initial time as zero.",
      "choices": [
        "3 s",
        "2 s",
        "4 s",
        "6 s"
      ],
      "answer": 0,
      "explanation": "Set0=−6+2t. The cart changes direction at 3 s if acceleration continues.",
      "lessonTitle": "1.2 Velocity graphs and constant acceleration",
      "stimulus": {
        "type": "chart",
        "title": "Velocity during the four-second interval",
        "xLabel": "Time (s)",
        "yLabel": "Velocity (m/s)",
        "xMin": 0,
        "xMax": 4,
        "yMin": -6,
        "yMax": 2,
        "points": [
          {
            "x": 0,
            "y": -6
          },
          {
            "x": 3,
            "y": 0
          },
          {
            "x": 4,
            "y": 2
          }
        ],
        "lines": [
          {
            "label": "Velocity",
            "points": [
              {
                "x": 0,
                "y": -6
              },
              {
                "x": 4,
                "y": 2
              }
            ]
          }
        ],
        "note": "Original hypothetical model; the line describes constant acceleration."
      }
    },
    {
      "id": "physics1-mcq-1-2-2",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is displacement over the4 s interval in the worked example?",
      "passage": "Original hypothetical instructional setup. A cart starts with velocity −6 m/s and has constant acceleration +2 m/s² for 4 s. Take the initial time as zero.",
      "choices": [
        "−8 m",
        "+8 m",
        "10 m",
        "−24 m"
      ],
      "answer": 0,
      "explanation": "Using−6(4)+½(2)(16) gives−8 m. The distance is 10 m because the cart reverses.",
      "lessonTitle": "1.2 Velocity graphs and constant acceleration",
      "stimulus": {
        "type": "chart",
        "title": "Velocity during the four-second interval",
        "xLabel": "Time (s)",
        "yLabel": "Velocity (m/s)",
        "xMin": 0,
        "xMax": 4,
        "yMin": -6,
        "yMax": 2,
        "points": [
          {
            "x": 0,
            "y": -6
          },
          {
            "x": 3,
            "y": 0
          },
          {
            "x": 4,
            "y": 2
          }
        ],
        "lines": [
          {
            "label": "Velocity",
            "points": [
              {
                "x": 0,
                "y": -6
              },
              {
                "x": 4,
                "y": 2
              }
            ]
          }
        ],
        "note": "Original hypothetical model; the line describes constant acceleration."
      }
    },
    {
      "id": "physics1-mcq-1-2-3",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A horizontal nonzero line on a velocity–time graph indicates what?",
      "passage": "Original hypothetical instructional setup. A cart starts with velocity −6 m/s and has constant acceleration +2 m/s² for 4 s. Take the initial time as zero.",
      "choices": [
        "Constant nonzero velocity and zero acceleration",
        "Zero velocity and increasing acceleration",
        "Constant acceleration with increasing velocity",
        "Zero displacement over every interval"
      ],
      "answer": 0,
      "explanation": "Its slope is zero, but its signed area over a nonzero time interval is nonzero.",
      "lessonTitle": "1.2 Velocity graphs and constant acceleration",
      "stimulus": {
        "type": "chart",
        "title": "Velocity during the four-second interval",
        "xLabel": "Time (s)",
        "yLabel": "Velocity (m/s)",
        "xMin": 0,
        "xMax": 4,
        "yMin": -6,
        "yMax": 2,
        "points": [
          {
            "x": 0,
            "y": -6
          },
          {
            "x": 3,
            "y": 0
          },
          {
            "x": 4,
            "y": 2
          }
        ],
        "lines": [
          {
            "label": "Velocity",
            "points": [
              {
                "x": 0,
                "y": -6
              },
              {
                "x": 4,
                "y": 2
              }
            ]
          }
        ],
        "note": "Original hypothetical model; the line describes constant acceleration."
      }
    },
    {
      "id": "physics1-mcq-1-2-4",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A moving object has negative velocity and positive acceleration. Before it stops, its speed is doing what?",
      "passage": "Original hypothetical instructional setup. A cart starts with velocity −6 m/s and has constant acceleration +2 m/s² for 4 s. Take the initial time as zero.",
      "choices": [
        "Decreasing",
        "Increasing necessarily",
        "Remaining constant necessarily",
        "Equaling its acceleration"
      ],
      "answer": 0,
      "explanation": "Acceleration acts opposite the current velocity direction, reducing the magnitude of velocity.",
      "lessonTitle": "1.2 Velocity graphs and constant acceleration",
      "stimulus": {
        "type": "chart",
        "title": "Velocity during the four-second interval",
        "xLabel": "Time (s)",
        "yLabel": "Velocity (m/s)",
        "xMin": 0,
        "xMax": 4,
        "yMin": -6,
        "yMax": 2,
        "points": [
          {
            "x": 0,
            "y": -6
          },
          {
            "x": 3,
            "y": 0
          },
          {
            "x": 4,
            "y": 2
          }
        ],
        "lines": [
          {
            "label": "Velocity",
            "points": [
              {
                "x": 0,
                "y": -6
              },
              {
                "x": 4,
                "y": 2
              }
            ]
          }
        ],
        "note": "Original hypothetical model; the line describes constant acceleration."
      }
    },
    {
      "id": "physics1-mcq-1-3-1",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A ball launches horizontally at 5 m/s from 20 m. With g=10 m/s², its ideal flight time is what?",
      "passage": "Original hypothetical instructional setup. A ball launches horizontally at 5 m/s from a 20 m platform. Use g = 10 m/s² and neglect air resistance.",
      "choices": [
        "2 s",
        "1 s",
        "4 s",
        "5 s"
      ],
      "answer": 0,
      "explanation": "Vertical motion gives20=5t², so t=2 s independently of horizontal launch speed.",
      "lessonTitle": "1.3 Projectile motion and independent components"
    },
    {
      "id": "physics1-mcq-1-3-2",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "At the top of an angled projectile trajectory, which statement is correct?",
      "passage": "Original hypothetical instructional setup. A ball launches horizontally at 5 m/s from a 20 m platform. Use g = 10 m/s² and neglect air resistance.",
      "choices": [
        "Vertical velocity is zero but vertical acceleration is −g",
        "Total velocity and acceleration are both zero",
        "Horizontal acceleration equals−g",
        "Gravity stops until the projectile descends"
      ],
      "answer": 0,
      "explanation": "Gravity acts continuously; only the vertical velocity component becomes momentarily zero.",
      "lessonTitle": "1.3 Projectile motion and independent components"
    },
    {
      "id": "physics1-mcq-1-3-3",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Doubling horizontal launch speed from an unchanged platform changes the range by which factor?",
      "passage": "Original hypothetical instructional setup. A ball launches horizontally at 5 m/s from a 20 m platform. Use g = 10 m/s² and neglect air resistance.",
      "choices": [
        "2",
        "1",
        "√2",
        "4"
      ],
      "answer": 0,
      "explanation": "The vertical flight time is unchanged and range equals horizontal speed times that time.",
      "lessonTitle": "1.3 Projectile motion and independent components"
    },
    {
      "id": "physics1-mcq-1-3-4",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why can two balls with different horizontal speeds land simultaneously when released from the same height?",
      "passage": "Original hypothetical instructional setup. A ball launches horizontally at 5 m/s from a 20 m platform. Use g = 10 m/s² and neglect air resistance.",
      "choices": [
        "Their vertical initial conditions and accelerations can be identical",
        "Horizontal speed cancels gravity",
        "Both balls must have zero total velocity",
        "Their total distances are equal"
      ],
      "answer": 0,
      "explanation": "The ideal projectile model treats perpendicular components independently while using a shared time.",
      "lessonTitle": "1.3 Projectile motion and independent components"
    },
    {
      "id": "physics1-mcq-2-1-1",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What acceleration results from 10 N right and4 N left on a2 kg cart?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. It does not accelerate vertically. Use g = 10 m/s².",
      "choices": [
        "3 m/s² right",
        "7 m/s² right",
        "3 m/s² left",
        "12 m/s² right"
      ],
      "answer": 0,
      "explanation": "Net horizontal force is 6 N right; divide by 2 kg.",
      "lessonTitle": "2.1 Free-body diagrams and Newton’s second law"
    },
    {
      "id": "physics1-mcq-2-1-2",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "An object moves at constant nonzero velocity. What must be true?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. It does not accelerate vertically. Use g = 10 m/s².",
      "choices": [
        "Its net external force is zero",
        "No forces of any kind act",
        "Its acceleration points along its velocity",
        "Its weight must be zero"
      ],
      "answer": 0,
      "explanation": "Constant velocity gives zero acceleration, allowing multiple balanced external forces.",
      "lessonTitle": "2.1 Free-body diagrams and Newton’s second law"
    },
    {
      "id": "physics1-mcq-2-1-3",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which arrow should not be added as a force on a free-body diagram?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. It does not accelerate vertically. Use g = 10 m/s².",
      "choices": [
        "An arrow labeled velocity",
        "Tension from a rope",
        "Gravitational force from Earth",
        "Normal force from a floor"
      ],
      "answer": 0,
      "explanation": "Velocity describes motion; the other labels identify physical force interactions.",
      "lessonTitle": "2.1 Free-body diagrams and Newton’s second law"
    },
    {
      "id": "physics1-mcq-2-1-4",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "For a force-versus-acceleration graph at constant mass, what does the slope represent?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart on a horizontal frictionless track is pulled rightward by 10 N and leftward by 4 N. It does not accelerate vertically. Use g = 10 m/s².",
      "choices": [
        "Mass",
        "Velocity",
        "Kinetic energy",
        "Displacement"
      ],
      "answer": 0,
      "explanation": "Newton’s second law F_net=ma makes the slope ΔF_net/Δa equal mass.",
      "lessonTitle": "2.1 Free-body diagrams and Newton’s second law"
    },
    {
      "id": "physics1-mcq-2-2-1",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A resting block needs10 N of friction, while μ_sN=10.4 N. Its static friction is what?",
      "passage": "Original hypothetical instructional setup. A 2 kg block rests on a 30° incline with coefficient of static friction 0.60. Use g = 10 m/s². When a sliding comparison is requested, take the coefficient of kinetic friction as 0.40.",
      "choices": [
        "10 N",
        "10.4 N",
        "0.4 N",
        "20.4 N"
      ],
      "answer": 0,
      "explanation": "Static friction adjusts to the required value below its limiting magnitude.",
      "lessonTitle": "2.2 Friction, inclines, and contact forces"
    },
    {
      "id": "physics1-mcq-2-2-2",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "For a block on an incline with no perpendicular acceleration and no other perpendicular forces, N equals what?",
      "passage": "Original hypothetical instructional setup. A 2 kg block rests on a 30° incline with coefficient of static friction 0.60. Use g = 10 m/s². When a sliding comparison is requested, take the coefficient of kinetic friction as 0.40.",
      "choices": [
        "mg cosθ",
        "mg sinθ",
        "mg",
        "μmg"
      ],
      "answer": 0,
      "explanation": "Resolve weight perpendicular to the surface; its perpendicular component is mgcosθ.",
      "lessonTitle": "2.2 Friction, inclines, and contact forces"
    },
    {
      "id": "physics1-mcq-2-2-3",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why can a block remain at rest on a slope even when μ_sN exceeds mg sinθ?",
      "passage": "Original hypothetical instructional setup. A 2 kg block rests on a 30° incline with coefficient of static friction 0.60. Use g = 10 m/s². When a sliding comparison is requested, take the coefficient of kinetic friction as 0.40.",
      "choices": [
        "Actual static friction can be smaller than its maximum",
        "Gravity stops acting",
        "The normal force points uphill",
        "Static friction always points downhill"
      ],
      "answer": 0,
      "explanation": "The maximum is a bound; static friction matches the downhill component while equilibrium is possible.",
      "lessonTitle": "2.2 Friction, inclines, and contact forces"
    },
    {
      "id": "physics1-mcq-2-2-4",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "For frictionless sliding on a fixed incline, doubling mass changes downhill acceleration how?",
      "passage": "Original hypothetical instructional setup. A 2 kg block rests on a 30° incline with coefficient of static friction 0.60. Use g = 10 m/s². When a sliding comparison is requested, take the coefficient of kinetic friction as 0.40.",
      "choices": [
        "It remains unchanged",
        "It doubles",
        "It halves",
        "It increases by four"
      ],
      "answer": 0,
      "explanation": "Both the downhill gravitational force and inertia double, leaving acceleration gsinθ unchanged.",
      "lessonTitle": "2.2 Friction, inclines, and contact forces"
    },
    {
      "id": "physics1-mcq-2-3-1",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A 0.5 kg object travels at 4 m/s in a circle of radius2 m. Required inward force is what?",
      "passage": "Original hypothetical instructional setup. A 0.50 kg object moves in a horizontal circle of radius 2 m at 4 m/s. A horizontal string supplies the only horizontal force. A comparison trial doubles the speed.",
      "choices": [
        "4 N",
        "1 N",
        "2 N",
        "8 N"
      ],
      "answer": 0,
      "explanation": "Use mv²/r=0.5(16)/2=4 N.",
      "lessonTitle": "2.3 Interactions, tension, and circular motion"
    },
    {
      "id": "physics1-mcq-2-3-2",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why do a third-law pair of forces not cancel on one object’s free-body diagram?",
      "passage": "Original hypothetical instructional setup. A 0.50 kg object moves in a horizontal circle of radius 2 m at 4 m/s. A horizontal string supplies the only horizontal force. A comparison trial doubles the speed.",
      "choices": [
        "They act on different objects",
        "They always have different magnitudes",
        "They occur at different times",
        "One is not a real force"
      ],
      "answer": 0,
      "explanation": "Each member acts on the other interacting object; only one appears on a diagram of a single object.",
      "lessonTitle": "2.3 Interactions, tension, and circular motion"
    },
    {
      "id": "physics1-mcq-2-3-3",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Doubling speed at fixed mass and radius changes required inward force by which factor?",
      "passage": "Original hypothetical instructional setup. A 0.50 kg object moves in a horizontal circle of radius 2 m at 4 m/s. A horizontal string supplies the only horizontal force. A comparison trial doubles the speed.",
      "choices": [
        "4",
        "1/2",
        "2",
        "8"
      ],
      "answer": 0,
      "explanation": "The inward force is proportional to the square of speed.",
      "lessonTitle": "2.3 Interactions, tension, and circular motion"
    },
    {
      "id": "physics1-mcq-2-3-4",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Immediately after the only string providing circular force breaks, the object initially moves in which direction?",
      "passage": "Original hypothetical instructional setup. A 0.50 kg object moves in a horizontal circle of radius 2 m at 4 m/s. A horizontal string supplies the only horizontal force. A comparison trial doubles the speed.",
      "choices": [
        "Tangent to its former circle",
        "Directly toward the former center",
        "Directly away from the former center",
        "Along an increasingly tight circle"
      ],
      "answer": 0,
      "explanation": "Its instantaneous velocity is tangential, and the missing inward force no longer changes that direction.",
      "lessonTitle": "2.3 Interactions, tension, and circular motion"
    },
    {
      "id": "physics1-mcq-3-1-1",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "For the2 kg cart in the example, what is the net work?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart starts at 3 m/s. A constant 8 N horizontal pull acts over 4 m while 2 N of friction opposes motion.",
      "choices": [
        "24 J",
        "32 J",
        "8 J",
        "40 J"
      ],
      "answer": 0,
      "explanation": "The pull contributes32 J and friction−8 J; perpendicular forces contribute zero.",
      "lessonTitle": "3.1 Work and the kinetic-energy theorem"
    },
    {
      "id": "physics1-mcq-3-1-2",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What does area under a force-position graph represent?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart starts at 3 m/s. A constant 8 N horizontal pull acts over 4 m while 2 N of friction opposes motion.",
      "choices": [
        "Work",
        "Impulse",
        "Acceleration",
        "Power"
      ],
      "answer": 0,
      "explanation": "Force times displacement has units newton-meters, or joules.",
      "lessonTitle": "3.1 Work and the kinetic-energy theorem"
    },
    {
      "id": "physics1-mcq-3-1-3",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A force is perpendicular to an object’s displacement. Its work over that displacement is what?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart starts at 3 m/s. A constant 8 N horizontal pull acts over 4 m while 2 N of friction opposes motion.",
      "choices": [
        "Zero",
        "FΔx",
        "−FΔx",
        "Always positive"
      ],
      "answer": 0,
      "explanation": "The cosine of 90° is zero, so the force transfers no energy through that displacement.",
      "lessonTitle": "3.1 Work and the kinetic-energy theorem"
    },
    {
      "id": "physics1-mcq-3-1-4",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why is the final speed in the example not found from 32 J alone?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart starts at 3 m/s. A constant 8 N horizontal pull acts over 4 m while 2 N of friction opposes motion.",
      "choices": [
        "Initial kinetic energy and frictional work must also be included",
        "Kinetic energy is a vector",
        "Work cannot be negative",
        "The normal force always does positive work"
      ],
      "answer": 0,
      "explanation": "The work-energy theorem uses net work and a change in kinetic energy, not final kinetic energy alone.",
      "lessonTitle": "3.1 Work and the kinetic-energy theorem"
    },
    {
      "id": "physics1-mcq-3-2-1",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What gravitational energy is released by the0.50 kg cart falling3 m with g=10 m/s²?",
      "passage": "Original hypothetical instructional setup. A 0.50 kg cart is released from rest 3 m above the bottom of a frictionless track. At the bottom it can compress a horizontal ideal spring of constant 200 N/m. Use g = 10 m/s².",
      "choices": [
        "15 J",
        "1.5 J",
        "30 J",
        "60 J"
      ],
      "answer": 0,
      "explanation": "Use mgh=0.50×10×3.",
      "lessonTitle": "3.2 Conservative interactions and potential energy"
    },
    {
      "id": "physics1-mcq-3-2-2",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Changing the gravitational potential-energy zero changes which prediction?",
      "passage": "Original hypothetical instructional setup. A 0.50 kg cart is released from rest 3 m above the bottom of a frictionless track. At the bottom it can compress a horizontal ideal spring of constant 200 N/m. Use g = 10 m/s².",
      "choices": [
        "Neither speed nor compression",
        "Only speed",
        "Only compression",
        "Both speed and compression"
      ],
      "answer": 0,
      "explanation": "Only potential-energy differences enter the prediction; adding the same constant cancels.",
      "lessonTitle": "3.2 Conservative interactions and potential energy"
    },
    {
      "id": "physics1-mcq-3-2-3",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "At maximum ideal spring compression, which statement can be true?",
      "passage": "Original hypothetical instructional setup. A 0.50 kg cart is released from rest 3 m above the bottom of a frictionless track. At the bottom it can compress a horizontal ideal spring of constant 200 N/m. Use g = 10 m/s².",
      "choices": [
        "The cart is momentarily at rest with nonzero acceleration",
        "The spring force must be zero",
        "Spring energy must be zero",
        "All energy has disappeared"
      ],
      "answer": 0,
      "explanation": "The compressed spring exerts a force even when cart velocity is instantaneously zero.",
      "lessonTitle": "3.2 Conservative interactions and potential energy"
    },
    {
      "id": "physics1-mcq-3-2-4",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Doubling release height changes bottom speed by which factor for the frictionless model?",
      "passage": "Original hypothetical instructional setup. A 0.50 kg cart is released from rest 3 m above the bottom of a frictionless track. At the bottom it can compress a horizontal ideal spring of constant 200 N/m. Use g = 10 m/s².",
      "choices": [
        "√2",
        "1/2",
        "2",
        "4"
      ],
      "answer": 0,
      "explanation": "Since v²=2gh, speed scales as the square root of height.",
      "lessonTitle": "3.2 Conservative interactions and potential energy"
    },
    {
      "id": "physics1-mcq-3-3-1",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is useful output power when40 kg rises5 m in10 s, with g=10 m/s²?",
      "passage": "Original hypothetical instructional setup. A motor lifts a 40 kg load vertically 5 m in 10 s at constant speed. It draws 500 W electrically. Use g = 10 m/s².",
      "choices": [
        "200 W",
        "20 W",
        "400 W",
        "2000 W"
      ],
      "answer": 0,
      "explanation": "Useful energy is 2000 J, transferred in10 s.",
      "lessonTitle": "3.3 Power, efficiency, and energy accounting"
    },
    {
      "id": "physics1-mcq-3-3-2",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A motor supplies200 W useful power while drawing500 W. Its efficiency is what?",
      "passage": "Original hypothetical instructional setup. A motor lifts a 40 kg load vertically 5 m in 10 s at constant speed. It draws 500 W electrically. Use g = 10 m/s².",
      "choices": [
        "40%",
        "2.5%",
        "60%",
        "250%"
      ],
      "answer": 0,
      "explanation": "Efficiency equals useful output divided by input,200/500=0.40.",
      "lessonTitle": "3.3 Power, efficiency, and energy accounting"
    },
    {
      "id": "physics1-mcq-3-3-3",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Lifting the same load to the same height in half the time requires what?",
      "passage": "Original hypothetical instructional setup. A motor lifts a 40 kg load vertically 5 m in 10 s at constant speed. It draws 500 W electrically. Use g = 10 m/s².",
      "choices": [
        "Twice the average useful power",
        "Twice the useful energy",
        "Half the useful power",
        "Unchanged useful power"
      ],
      "answer": 0,
      "explanation": "The energy gain is unchanged, and dividing it by half the time doubles average power.",
      "lessonTitle": "3.3 Power, efficiency, and energy accounting"
    },
    {
      "id": "physics1-mcq-3-3-4",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why may mgh alone underestimate mechanical output during a lift’s startup?",
      "passage": "Original hypothetical instructional setup. A motor lifts a 40 kg load vertically 5 m in 10 s at constant speed. It draws 500 W electrically. Use g = 10 m/s².",
      "choices": [
        "The load can also gain kinetic energy",
        "Gravity has no effect during startup",
        "Watts and joules are identical quantities",
        "Useful output always exceeds electrical input"
      ],
      "answer": 0,
      "explanation": "If the load accelerates, mechanical output increases both potential and kinetic energy.",
      "lessonTitle": "3.3 Power, efficiency, and energy accounting"
    },
    {
      "id": "physics1-mcq-4-1-1",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What impulse acts on a0.20 kg ball changing velocity from +15 to−10 m/s?",
      "passage": "Original hypothetical instructional setup. A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Contact lasts 0.010 s.",
      "choices": [
        "−5 N·s",
        "−1 N·s",
        "+5 N·s",
        "−2 N·s"
      ],
      "answer": 0,
      "explanation": "Impulse is m(v_f−v_i)=0.20(−10−15)=−5 N·s.",
      "lessonTitle": "4.1 Momentum, impulse, and force-time graphs"
    },
    {
      "id": "physics1-mcq-4-1-2",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A triangular1000 N pulse lasts0.010 s. Its impulse magnitude is what?",
      "passage": "Original hypothetical instructional setup. A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Contact lasts 0.010 s.",
      "choices": [
        "5 N·s",
        "10 N·s",
        "0.1 N·s",
        "100 N·s"
      ],
      "answer": 0,
      "explanation": "The triangular area is one-half times base times height.",
      "lessonTitle": "4.1 Momentum, impulse, and force-time graphs"
    },
    {
      "id": "physics1-mcq-4-1-3",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Lengthening contact time while preserving momentum change does what to average force magnitude?",
      "passage": "Original hypothetical instructional setup. A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Contact lasts 0.010 s.",
      "choices": [
        "Reduces it",
        "Increases it necessarily",
        "Leaves it unchanged necessarily",
        "Makes it zero"
      ],
      "answer": 0,
      "explanation": "Average force magnitude is impulse magnitude divided by duration for a fixed-direction impulse.",
      "lessonTitle": "4.1 Momentum, impulse, and force-time graphs"
    },
    {
      "id": "physics1-mcq-4-1-4",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What must be small to justify system momentum conservation during an interaction?",
      "passage": "Original hypothetical instructional setup. A 0.20 kg ball approaches a wall at +15 m/s and rebounds at −10 m/s. Contact lasts 0.010 s.",
      "choices": [
        "Net external impulse",
        "Every internal force",
        "The system’s kinetic energy",
        "Every object’s velocity"
      ],
      "answer": 0,
      "explanation": "External impulse changes system momentum; internal forces cancel within a complete system.",
      "lessonTitle": "4.1 Momentum, impulse, and force-time graphs"
    },
    {
      "id": "physics1-mcq-4-2-1",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A 2 kg cart at 3 m/s sticks to a stationary1 kg cart. Their shared final velocity is what?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart moving at +3 m/s hits a stationary 1 kg cart. They stick. Neglect external horizontal impulse.",
      "choices": [
        "2 m/s in the original direction",
        "1 m/s in the original direction",
        "3 m/s in the original direction",
        "6 m/s in the original direction"
      ],
      "answer": 0,
      "explanation": "Conserved momentum6 kg·m/s is shared by total mass3 kg.",
      "lessonTitle": "4.2 Collisions and choosing a system"
    },
    {
      "id": "physics1-mcq-4-2-2",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What happens to kinetic energy in that sticking event?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart moving at +3 m/s hits a stationary 1 kg cart. They stick. Neglect external horizontal impulse.",
      "choices": [
        "It decreases from 9 J to 6 J",
        "It remains9 J",
        "It increases from 6 J to 9 J",
        "It becomes zero"
      ],
      "answer": 0,
      "explanation": "Compute kinetic energy separately before and after; the missing3 J enters non-kinetic forms.",
      "lessonTitle": "4.2 Collisions and choosing a system"
    },
    {
      "id": "physics1-mcq-4-2-3",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which event definition guarantees that two objects share one final velocity immediately after contact?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart moving at +3 m/s hits a stationary 1 kg cart. They stick. Neglect external horizontal impulse.",
      "choices": [
        "A perfectly inelastic sticking collision",
        "Any elastic collision",
        "Any collision in one dimension",
        "Any collision involving equal masses"
      ],
      "answer": 0,
      "explanation": "Sticking constrains both objects to the same post-collision velocity.",
      "lessonTitle": "4.2 Collisions and choosing a system"
    },
    {
      "id": "physics1-mcq-4-2-4",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why can momentum be conserved even when kinetic energy decreases?",
      "passage": "Original hypothetical instructional setup. A 2 kg cart moving at +3 m/s hits a stationary 1 kg cart. They stick. Neglect external horizontal impulse.",
      "choices": [
        "Internal interactions can convert kinetic energy without changing total system momentum",
        "Energy conservation is never valid for collisions",
        "Momentum has no direction",
        "Internal forces vanish during collisions"
      ],
      "answer": 0,
      "explanation": "Momentum and kinetic energy are different quantities; internal energy transfer need not create external impulse.",
      "lessonTitle": "4.2 Collisions and choosing a system"
    },
    {
      "id": "physics1-mcq-4-3-1",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A 1 kg cart recoils at −3 m/s from a3 kg cart initially at rest together. The3 kg cart moves at what velocity?",
      "passage": "Original hypothetical instructional setup. Two carts start at rest and push apart using an internal spring on a frictionless track. Cart A has mass 1 kg and moves at −3 m/s afterward; cart B has mass 3 kg.",
      "choices": [
        "+1 m/s",
        "+3 m/s",
        "−1 m/s",
        "+9 m/s"
      ],
      "answer": 0,
      "explanation": "Zero total momentum requires−3+3v=0.",
      "lessonTitle": "4.3 Center of mass, recoil, and explosions"
    },
    {
      "id": "physics1-mcq-4-3-2",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "For two fragments with equal and opposite momenta, which conclusion always follows?",
      "passage": "Original hypothetical instructional setup. Two carts start at rest and push apart using an internal spring on a frictionless track. Cart A has mass 1 kg and moves at −3 m/s afterward; cart B has mass 3 kg.",
      "choices": [
        "Their total momentum is zero",
        "Their speeds are equal",
        "Their kinetic energies are equal",
        "Their masses are equal"
      ],
      "answer": 0,
      "explanation": "Momentum vectors sum to zero; unequal masses can have different speeds and kinetic energies.",
      "lessonTitle": "4.3 Center of mass, recoil, and explosions"
    },
    {
      "id": "physics1-mcq-4-3-3",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why can kinetic energy increase in an isolated explosion?",
      "passage": "Original hypothetical instructional setup. Two carts start at rest and push apart using an internal spring on a frictionless track. Cart A has mass 1 kg and moves at −3 m/s afterward; cart B has mass 3 kg.",
      "choices": [
        "Stored internal energy is converted into kinetic energy",
        "Momentum conservation creates new energy",
        "The system gains mass automatically",
        "External work must always be positive"
      ],
      "answer": 0,
      "explanation": "Conservation of total energy allows internal energy to change form.",
      "lessonTitle": "4.3 Center of mass, recoil, and explosions"
    },
    {
      "id": "physics1-mcq-4-3-4",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which quantity remains unchanged for an initially resting isolated system during internal push-off?",
      "passage": "Original hypothetical instructional setup. Two carts start at rest and push apart using an internal spring on a frictionless track. Cart A has mass 1 kg and moves at −3 m/s afterward; cart B has mass 3 kg.",
      "choices": [
        "Center-of-mass velocity",
        "Every object’s position",
        "Total kinetic energy necessarily",
        "The distance between objects"
      ],
      "answer": 0,
      "explanation": "With zero net external force, total momentum and center-of-mass velocity remain constant.",
      "lessonTitle": "4.3 Center of mass, recoil, and explosions"
    },
    {
      "id": "physics1-mcq-5-1-1",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "In the worked beam example, what is the right support force?",
      "passage": "Original hypothetical instructional setup. A uniform 4 m beam weighs 100 N and is supported at both ends. A 200 N load hangs 1 m from the left end. The beam is stationary.",
      "choices": [
        "100 N",
        "75 N",
        "150 N",
        "200 N"
      ],
      "answer": 0,
      "explanation": "About the left end,4R_R=100(2)+200(1)=400 N·m.",
      "lessonTitle": "5.1 Torque and rotational equilibrium"
    },
    {
      "id": "physics1-mcq-5-1-2",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A force passes directly through the selected axis. Its torque about that axis is what?",
      "passage": "Original hypothetical instructional setup. A uniform 4 m beam weighs 100 N and is supported at both ends. A 200 N load hangs 1 m from the left end. The beam is stationary.",
      "choices": [
        "Zero",
        "rF necessarily",
        "Maximum",
        "Equal to the beam’s weight"
      ],
      "answer": 0,
      "explanation": "Its perpendicular lever arm is zero.",
      "lessonTitle": "5.1 Torque and rotational equilibrium"
    },
    {
      "id": "physics1-mcq-5-1-3",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which conditions are necessary for a rigid object to remain in static equilibrium?",
      "passage": "Original hypothetical instructional setup. A uniform 4 m beam weighs 100 N and is supported at both ends. A 200 N load hangs 1 m from the left end. The beam is stationary.",
      "choices": [
        "Zero net force and zero net torque",
        "Zero net force only",
        "Zero net torque only",
        "Equal masses on every side regardless of distances"
      ],
      "answer": 0,
      "explanation": "Both translational and rotational accelerations must vanish.",
      "lessonTitle": "5.1 Torque and rotational equilibrium"
    },
    {
      "id": "physics1-mcq-5-1-4",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Moving a fixed hanging load toward the right support of the same beam does what?",
      "passage": "Original hypothetical instructional setup. A uniform 4 m beam weighs 100 N and is supported at both ends. A 200 N load hangs 1 m from the left end. The beam is stationary.",
      "choices": [
        "Increases the right reaction while preserving the total support force",
        "Increases both reactions",
        "Decreases both reactions",
        "Leaves each reaction unchanged"
      ],
      "answer": 0,
      "explanation": "The changing torque distribution shifts support forces; their sum still balances total weight.",
      "lessonTitle": "5.1 Torque and rotational equilibrium"
    },
    {
      "id": "physics1-mcq-5-2-1",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is I for two0.50 kg point masses at 0.20 m from an axis?",
      "passage": "Original hypothetical instructional setup. Two 0.50 kg point masses sit on a light rigid rod, each 0.20 m from its central fixed axis. A constant net torque of 0.12 N·m acts for 2 s from rest.",
      "choices": [
        "0.040 kg·m²",
        "0.20 kg·m²",
        "0.10 kg·m²",
        "0.020 kg·m²"
      ],
      "answer": 0,
      "explanation": "Add both mr² contributions:2(0.50)(0.20²).",
      "lessonTitle": "5.2 Rotational inertia and angular acceleration"
    },
    {
      "id": "physics1-mcq-5-2-2",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A 0.12 N·m net torque acts on I=0.040 kg·m². Angular acceleration is what?",
      "passage": "Original hypothetical instructional setup. Two 0.50 kg point masses sit on a light rigid rod, each 0.20 m from its central fixed axis. A constant net torque of 0.12 N·m acts for 2 s from rest.",
      "choices": [
        "3 rad/s²",
        "0.0048 rad/s²",
        "0.33 rad/s²",
        "12 rad/s²"
      ],
      "answer": 0,
      "explanation": "Useα=τ_net/I=0.12/0.040.",
      "lessonTitle": "5.2 Rotational inertia and angular acceleration"
    },
    {
      "id": "physics1-mcq-5-2-3",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which property is shared by all points of a rotating rigid body?",
      "passage": "Original hypothetical instructional setup. Two 0.50 kg point masses sit on a light rigid rod, each 0.20 m from its central fixed axis. A constant net torque of 0.12 N·m acts for 2 s from rest.",
      "choices": [
        "Angular velocity",
        "Tangential speed",
        "Radius from the axis",
        "Centripetal acceleration magnitude"
      ],
      "answer": 0,
      "explanation": "All points turn through the same angle per time, but v=rω depends on radius.",
      "lessonTitle": "5.2 Rotational inertia and angular acceleration"
    },
    {
      "id": "physics1-mcq-5-2-4",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Moving unchanged point masses to twice their original radius changes rotational inertia by which factor?",
      "passage": "Original hypothetical instructional setup. Two 0.50 kg point masses sit on a light rigid rod, each 0.20 m from its central fixed axis. A constant net torque of 0.12 N·m acts for 2 s from rest.",
      "choices": [
        "4",
        "1/4",
        "2",
        "8"
      ],
      "answer": 0,
      "explanation": "Each contribution contains r², so doubling radius quadruples I.",
      "lessonTitle": "5.2 Rotational inertia and angular acceleration"
    },
    {
      "id": "physics1-mcq-5-3-1",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A solid cylinder rolls without slipping down30° with g=10 m/s². Its acceleration is what?",
      "passage": "Original hypothetical instructional setup. A uniform solid cylinder rolls down a fixed 30° incline without slipping. Use g = 10 m/s² and I_cm = (1/2)mR².",
      "choices": [
        "10/3 m/s²",
        "5 m/s²",
        "2.5 m/s²",
        "10 m/s²"
      ],
      "answer": 0,
      "explanation": "With I=½mR², acceleration is (2/3)g sin30°.",
      "lessonTitle": "5.3 Rolling constraints and translational-rotational dynamics"
    },
    {
      "id": "physics1-mcq-5-3-2",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which relation applies to rolling without slipping on a stationary surface?",
      "passage": "Original hypothetical instructional setup. A uniform solid cylinder rolls down a fixed 30° incline without slipping. Use g = 10 m/s² and I_cm = (1/2)mR².",
      "choices": [
        "v_cm=Rω",
        "v_cm=ω/R",
        "v_cm=R²ω",
        "v_cm=0 always"
      ],
      "answer": 0,
      "explanation": "The no-slip constraint equates center translation speed with rim speed relative to the center.",
      "lessonTitle": "5.3 Rolling constraints and translational-rotational dynamics"
    },
    {
      "id": "physics1-mcq-5-3-3",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why does a hoop roll down the same incline more slowly than a solid cylinder?",
      "passage": "Original hypothetical instructional setup. A uniform solid cylinder rolls down a fixed 30° incline without slipping. Use g = 10 m/s² and I_cm = (1/2)mR².",
      "choices": [
        "It has greater I/(mR²), requiring more rotational energy for the same translational speed",
        "It has no gravitational force",
        "Static friction must remove all its energy",
        "Its acceleration always depends on mass alone"
      ],
      "answer": 0,
      "explanation": "A larger dimensionless rotational inertia reduces rolling acceleration.",
      "lessonTitle": "5.3 Rolling constraints and translational-rotational dynamics"
    },
    {
      "id": "physics1-mcq-5-3-4",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "In ideal rolling on a fixed surface, static friction can do what?",
      "passage": "Original hypothetical instructional setup. A uniform solid cylinder rolls down a fixed 30° incline without slipping. Use g = 10 m/s² and I_cm = (1/2)mR².",
      "choices": [
        "Supply torque without dissipating mechanical energy",
        "Always convert all potential energy to heat",
        "Always equal μ_sN",
        "Guarantee slipping"
      ],
      "answer": 0,
      "explanation": "Static contact can provide torque while the contact point does not slide along the surface.",
      "lessonTitle": "5.3 Rolling constraints and translational-rotational dynamics"
    },
    {
      "id": "physics1-mcq-6-1-1",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What work does2 N·m of constant torque do through3rad?",
      "passage": "Original hypothetical instructional setup. A flywheel has rotational inertia 0.50 kg·m² and initially rotates at 4 rad/s. A constant net torque 2 N·m acts through 3 rad.",
      "choices": [
        "6 J",
        "1.5 J",
        "2/3 J",
        "12 J"
      ],
      "answer": 0,
      "explanation": "Multiply torque by angular displacement in radians.",
      "lessonTitle": "6.1 Rotational kinetic energy and angular work"
    },
    {
      "id": "physics1-mcq-6-1-2",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "The flywheel’s energy rises from 4 J to 10 J with I=0.50 kg·m². Its final angular speed is what?",
      "passage": "Original hypothetical instructional setup. A flywheel has rotational inertia 0.50 kg·m² and initially rotates at 4 rad/s. A constant net torque 2 N·m acts through 3 rad.",
      "choices": [
        "√40 rad/s",
        "√20 rad/s",
        "10 rad/s",
        "24 rad/s"
      ],
      "answer": 0,
      "explanation": "Solve½(0.50)ω²=10.",
      "lessonTitle": "6.1 Rotational kinetic energy and angular work"
    },
    {
      "id": "physics1-mcq-6-1-3",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A solid cylinder has m=1 kg,v=2 m/s,I=½mR² and rolls without slipping. Total kinetic energy is what?",
      "passage": "Original hypothetical instructional setup. A flywheel has rotational inertia 0.50 kg·m² and initially rotates at 4 rad/s. A constant net torque 2 N·m acts through 3 rad.",
      "choices": [
        "3 J",
        "1 J",
        "2 J",
        "4 J"
      ],
      "answer": 0,
      "explanation": "Translation contributes2 J and rotation1 J.",
      "lessonTitle": "6.1 Rotational kinetic energy and angular work"
    },
    {
      "id": "physics1-mcq-6-1-4",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Doubling angular speed at unchanged I changes rotational kinetic energy by what factor?",
      "passage": "Original hypothetical instructional setup. A flywheel has rotational inertia 0.50 kg·m² and initially rotates at 4 rad/s. A constant net torque 2 N·m acts through 3 rad.",
      "choices": [
        "4",
        "1/2",
        "2",
        "8"
      ],
      "answer": 0,
      "explanation": "K_rot is proportional to ω².",
      "lessonTitle": "6.1 Rotational kinetic energy and angular work"
    },
    {
      "id": "physics1-mcq-6-2-1",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A system has I=2 kg·m² andω=3 rad/s. What is its angular momentum?",
      "passage": "Original hypothetical instructional setup. A rotating platform and held masses have initial total rotational inertia 2 kg·m² and angular speed 3 rad/s. Pulling the masses inward reduces total inertia to 1 kg·m². Neglect external torque.",
      "choices": [
        "6 kg·m²/s",
        "3 kg·m²/s",
        "9 kg·m²/s",
        "12 kg·m²/s"
      ],
      "answer": 0,
      "explanation": "Use L=Iω.",
      "lessonTitle": "6.2 Angular momentum and rotational collisions"
    },
    {
      "id": "physics1-mcq-6-2-2",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "At fixed angular momentum, halving total rotational inertia does what to angular speed?",
      "passage": "Original hypothetical instructional setup. A rotating platform and held masses have initial total rotational inertia 2 kg·m² and angular speed 3 rad/s. Pulling the masses inward reduces total inertia to 1 kg·m². Neglect external torque.",
      "choices": [
        "Doubles it",
        "Halves it",
        "Leaves it unchanged",
        "Quadruples it"
      ],
      "answer": 0,
      "explanation": "I_iω_i=I_fω_f requires inverse scaling.",
      "lessonTitle": "6.2 Angular momentum and rotational collisions"
    },
    {
      "id": "physics1-mcq-6-2-3",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Why can pulling masses inward increase rotational kinetic energy?",
      "passage": "Original hypothetical instructional setup. A rotating platform and held masses have initial total rotational inertia 2 kg·m² and angular speed 3 rad/s. Pulling the masses inward reduces total inertia to 1 kg·m². Neglect external torque.",
      "choices": [
        "The person does internal work while external torque remains negligible",
        "Angular momentum creates energy",
        "Moment of inertia must stay constant",
        "No energy conservation law applies"
      ],
      "answer": 0,
      "explanation": "Internal energy can supply work even when system angular momentum is conserved.",
      "lessonTitle": "6.2 Angular momentum and rotational collisions"
    },
    {
      "id": "physics1-mcq-6-2-4",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A stationary I=1 ring sticks coaxially to an I=2 disk initially at 3 rad/s. Final angular speed is what?",
      "passage": "Original hypothetical instructional setup. A rotating platform and held masses have initial total rotational inertia 2 kg·m² and angular speed 3 rad/s. Pulling the masses inward reduces total inertia to 1 kg·m². Neglect external torque.",
      "choices": [
        "2 rad/s",
        "1 rad/s",
        "3 rad/s",
        "6 rad/s"
      ],
      "answer": 0,
      "explanation": "Initial angular momentum6 is shared by final inertia3.",
      "lessonTitle": "6.2 Angular momentum and rotational collisions"
    },
    {
      "id": "physics1-mcq-6-3-1",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is the total angular impulse of the described triangular-plus-rectangular pulse?",
      "passage": "Original hypothetical instructional setup. An initially stationary wheel has rotational inertia 0.80 kg·m². Positive torque rises linearly from 0 to 4 N·m over 2 s, then stays at 4 N·m for 1 s.",
      "choices": [
        "8 N·m·s",
        "4 N·m·s",
        "12 N·m·s",
        "40 N·m·s"
      ],
      "answer": 0,
      "explanation": "The2 s triangle contributes4 and the1 s rectangle contributes4.",
      "lessonTitle": "6.3 Angular impulse and translating representations",
      "stimulus": {
        "type": "chart",
        "title": "Applied torque pulse",
        "xLabel": "Time (s)",
        "yLabel": "Net torque (N·m)",
        "xMin": 0,
        "xMax": 3,
        "yMin": 0,
        "yMax": 4,
        "points": [
          {
            "x": 0,
            "y": 0
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "lines": [
          {
            "label": "Net torque",
            "points": [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 2,
                "y": 4
              },
              {
                "x": 3,
                "y": 4
              }
            ]
          }
        ],
        "note": "Original hypothetical piecewise-linear torque model."
      }
    },
    {
      "id": "physics1-mcq-6-3-2",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is final angular speed if that impulse acts on an initially stationary I=0.80 kg·m² wheel?",
      "passage": "Original hypothetical instructional setup. An initially stationary wheel has rotational inertia 0.80 kg·m². Positive torque rises linearly from 0 to 4 N·m over 2 s, then stays at 4 N·m for 1 s.",
      "choices": [
        "10 rad/s",
        "6.4 rad/s",
        "8 rad/s",
        "40 rad/s"
      ],
      "answer": 0,
      "explanation": "Final angular momentum is 8, soω=8/0.80=10.",
      "lessonTitle": "6.3 Angular impulse and translating representations",
      "stimulus": {
        "type": "chart",
        "title": "Applied torque pulse",
        "xLabel": "Time (s)",
        "yLabel": "Net torque (N·m)",
        "xMin": 0,
        "xMax": 3,
        "yMin": 0,
        "yMax": 4,
        "points": [
          {
            "x": 0,
            "y": 0
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "lines": [
          {
            "label": "Net torque",
            "points": [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 2,
                "y": 4
              },
              {
                "x": 3,
                "y": 4
              }
            ]
          }
        ],
        "note": "Original hypothetical piecewise-linear torque model."
      }
    },
    {
      "id": "physics1-mcq-6-3-3",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which graph area gives rotational work rather than angular impulse?",
      "passage": "Original hypothetical instructional setup. An initially stationary wheel has rotational inertia 0.80 kg·m². Positive torque rises linearly from 0 to 4 N·m over 2 s, then stays at 4 N·m for 1 s.",
      "choices": [
        "Torque versus angular displacement",
        "Torque versus time",
        "Angular momentum versus time",
        "Angular velocity versus time"
      ],
      "answer": 0,
      "explanation": "Work integrates torque over angular displacement, while impulse integrates torque over time.",
      "lessonTitle": "6.3 Angular impulse and translating representations",
      "stimulus": {
        "type": "chart",
        "title": "Applied torque pulse",
        "xLabel": "Time (s)",
        "yLabel": "Net torque (N·m)",
        "xMin": 0,
        "xMax": 3,
        "yMin": 0,
        "yMax": 4,
        "points": [
          {
            "x": 0,
            "y": 0
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "lines": [
          {
            "label": "Net torque",
            "points": [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 2,
                "y": 4
              },
              {
                "x": 3,
                "y": 4
              }
            ]
          }
        ],
        "note": "Original hypothetical piecewise-linear torque model."
      }
    },
    {
      "id": "physics1-mcq-6-3-4",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "A wheel’s angular velocity is constant and nonzero. Its net torque is what for constant I?",
      "passage": "Original hypothetical instructional setup. An initially stationary wheel has rotational inertia 0.80 kg·m². Positive torque rises linearly from 0 to 4 N·m over 2 s, then stays at 4 N·m for 1 s.",
      "choices": [
        "Zero",
        "Positive necessarily",
        "Negative necessarily",
        "Equal to its angular momentum"
      ],
      "answer": 0,
      "explanation": "Zero angular acceleration implies zero net torque; rotation itself can continue.",
      "lessonTitle": "6.3 Angular impulse and translating representations",
      "stimulus": {
        "type": "chart",
        "title": "Applied torque pulse",
        "xLabel": "Time (s)",
        "yLabel": "Net torque (N·m)",
        "xMin": 0,
        "xMax": 3,
        "yMin": 0,
        "yMax": 4,
        "points": [
          {
            "x": 0,
            "y": 0
          },
          {
            "x": 2,
            "y": 4
          },
          {
            "x": 3,
            "y": 4
          }
        ],
        "lines": [
          {
            "label": "Net torque",
            "points": [
              {
                "x": 0,
                "y": 0
              },
              {
                "x": 2,
                "y": 4
              },
              {
                "x": 3,
                "y": 4
              }
            ]
          }
        ],
        "note": "Original hypothetical piecewise-linear torque model."
      }
    },
    {
      "id": "physics1-mcq-7-1-1",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is the angular frequency for m = 0.50 kg and k = 200 N/m?",
      "passage": "Original hypothetical instructional setup. A hypothetical horizontal oscillator has m = 0.50 kg, k = 200 N/m and amplitude 0.10 m. Displacement is measured from equilibrium. Neglect friction.",
      "choices": [
        "20 rad/s",
        "10 rad/s",
        "400 rad/s",
        "0.050 rad/s"
      ],
      "answer": 0,
      "explanation": "Use the square root of k/m, not k/m itself: sqrt(400) = 20 rad/s.",
      "lessonTitle": "7.1 Recognizing simple harmonic motion from the restoring force"
    },
    {
      "id": "physics1-mcq-7-1-2",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Where is the acceleration magnitude greatest in ideal spring motion?",
      "passage": "Original hypothetical instructional setup. A hypothetical horizontal oscillator has m = 0.50 kg, k = 200 N/m and amplitude 0.10 m. Displacement is measured from equilibrium. Neglect friction.",
      "choices": [
        "At the turning points",
        "At equilibrium",
        "At every point equally",
        "Only where velocity is positive"
      ],
      "answer": 0,
      "explanation": "The restoring acceleration magnitude is proportional to the magnitude of displacement.",
      "lessonTitle": "7.1 Recognizing simple harmonic motion from the restoring force"
    },
    {
      "id": "physics1-mcq-7-1-3",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "At x = +0.050 m in the described oscillator, what is the acceleration?",
      "passage": "Original hypothetical instructional setup. A hypothetical horizontal oscillator has m = 0.50 kg, k = 200 N/m and amplitude 0.10 m. Displacement is measured from equilibrium. Neglect friction.",
      "choices": [
        "−20 m/s²",
        "+20 m/s²",
        "−10 m/s²",
        "0 m/s²"
      ],
      "answer": 0,
      "explanation": "The spring force is −200(0.050) = −10 N; dividing by 0.50 kg gives −20 m/s².",
      "lessonTitle": "7.1 Recognizing simple harmonic motion from the restoring force"
    },
    {
      "id": "physics1-mcq-7-1-4",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What happens to the ideal period if the amplitude doubles while m and k stay fixed?",
      "passage": "Original hypothetical instructional setup. A hypothetical horizontal oscillator has m = 0.50 kg, k = 200 N/m and amplitude 0.10 m. Displacement is measured from equilibrium. Neglect friction.",
      "choices": [
        "It stays the same",
        "It doubles",
        "It halves",
        "It becomes four times as large"
      ],
      "answer": 0,
      "explanation": "The ideal period depends on m and k. The larger amplitude changes energy and maximum speed, not the period.",
      "lessonTitle": "7.1 Recognizing simple harmonic motion from the restoring force"
    },
    {
      "id": "physics1-mcq-7-2-1",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is total energy for k = 80 N/m and amplitude 0.15 m?",
      "passage": "Original hypothetical instructional setup. A hypothetical ideal spring oscillator has k = 80 N/m, mass 0.20 kg and amplitude 0.15 m.",
      "choices": [
        "0.90 J",
        "6.0 J",
        "0.225 J",
        "1.8 J"
      ],
      "answer": 0,
      "explanation": "Total energy at a turning point is one half kA² = 0.90 J.",
      "lessonTitle": "7.2 Energy, phase, and graphs in oscillating systems"
    },
    {
      "id": "physics1-mcq-7-2-2",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "At half the amplitude, what fraction of total energy is kinetic?",
      "passage": "Original hypothetical instructional setup. A hypothetical ideal spring oscillator has k = 80 N/m, mass 0.20 kg and amplitude 0.15 m.",
      "choices": [
        "3/4",
        "1/4",
        "1/2",
        "1"
      ],
      "answer": 0,
      "explanation": "Elastic energy is proportional to x². At x = A/2 it is one quarter of the total; the rest is kinetic.",
      "lessonTitle": "7.2 Energy, phase, and graphs in oscillating systems"
    },
    {
      "id": "physics1-mcq-7-2-3",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "If the amplitude halves, what happens to total mechanical energy in otherwise identical ideal motion?",
      "passage": "Original hypothetical instructional setup. A hypothetical ideal spring oscillator has k = 80 N/m, mass 0.20 kg and amplitude 0.15 m.",
      "choices": [
        "It becomes one quarter as large",
        "It halves",
        "It stays the same",
        "It doubles"
      ],
      "answer": 0,
      "explanation": "Energy depends on amplitude squared, so the factor is (1/2)².",
      "lessonTitle": "7.2 Energy, phase, and graphs in oscillating systems"
    },
    {
      "id": "physics1-mcq-7-2-4",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What information does energy conservation alone fail to determine at a given nonzero displacement?",
      "passage": "Original hypothetical instructional setup. A hypothetical ideal spring oscillator has k = 80 N/m, mass 0.20 kg and amplitude 0.15 m.",
      "choices": [
        "The direction of velocity",
        "The speed magnitude",
        "The elastic potential energy",
        "The kinetic energy when total energy is known"
      ],
      "answer": 0,
      "explanation": "Two passages through a position can have equal speed and opposite directions; scalar energy does not select the direction.",
      "lessonTitle": "7.2 Energy, phase, and graphs in oscillating systems"
    },
    {
      "id": "physics1-mcq-7-3-1",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What happens to the ideal pendulum period when length is multiplied by four?",
      "passage": "Original hypothetical instructional setup. A hypothetical small-angle simple pendulum has length 0.80 m and g = 9.8 m/s². A comparison length is 3.20 m. In a separate hypothetical experiment, the slope of T² versus L is 4.00 s²/m.",
      "choices": [
        "It doubles",
        "It quadruples",
        "It halves",
        "It is unchanged"
      ],
      "answer": 0,
      "explanation": "The period scales with sqrt(L), so the multiplier is sqrt(4) = 2.",
      "lessonTitle": "7.3 Pendulums, experimental linearization, and model limits"
    },
    {
      "id": "physics1-mcq-7-3-2",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What should be plotted against L to obtain a predicted straight line?",
      "passage": "Original hypothetical instructional setup. A hypothetical small-angle simple pendulum has length 0.80 m and g = 9.8 m/s². A comparison length is 3.20 m. In a separate hypothetical experiment, the slope of T² versus L is 4.00 s²/m.",
      "choices": [
        "T²",
        "T",
        "1/T",
        "The bob mass"
      ],
      "answer": 0,
      "explanation": "Squaring the period equation gives T² = (4π²/g)L.",
      "lessonTitle": "7.3 Pendulums, experimental linearization, and model limits"
    },
    {
      "id": "physics1-mcq-7-3-3",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What length should be used for the simple-pendulum model?",
      "passage": "Original hypothetical instructional setup. A hypothetical small-angle simple pendulum has length 0.80 m and g = 9.8 m/s². A comparison length is 3.20 m. In a separate hypothetical experiment, the slope of T² versus L is 4.00 s²/m.",
      "choices": [
        "Pivot to the bob’s center of mass",
        "Only the exposed string",
        "The bob diameter",
        "The horizontal swing width"
      ],
      "answer": 0,
      "explanation": "The model length locates the effective point mass relative to the pivot.",
      "lessonTitle": "7.3 Pendulums, experimental linearization, and model limits"
    },
    {
      "id": "physics1-mcq-7-3-4",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which change leaves the ideal small-angle period unchanged at the same location?",
      "passage": "Original hypothetical instructional setup. A hypothetical small-angle simple pendulum has length 0.80 m and g = 9.8 m/s². A comparison length is 3.20 m. In a separate hypothetical experiment, the slope of T² versus L is 4.00 s²/m.",
      "choices": [
        "Doubling bob mass",
        "Doubling length",
        "Reducing length to one quarter",
        "Changing g"
      ],
      "answer": 0,
      "explanation": "Mass cancels from the ideal period formula; L and g remain.",
      "lessonTitle": "7.3 Pendulums, experimental linearization, and model limits"
    },
    {
      "id": "physics1-mcq-8-1-1",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is gauge pressure 2.0 m below an open freshwater surface when g = 9.8 m/s²?",
      "passage": "Original hypothetical instructional setup. A hypothetical open freshwater tank has density 1000 kg/m³, atmospheric pressure 101,000 Pa and g = 9.8 m/s². A separate ideal hydraulic system at equal piston heights applies 100 N to area 0.020 m²; output area is 0.100 m².",
      "choices": [
        "19,600 Pa",
        "120,600 Pa",
        "1960 Pa",
        "101,000 Pa"
      ],
      "answer": 0,
      "explanation": "Gauge pressure here is ρgh. Absolute pressure would additionally include surface atmospheric pressure.",
      "lessonTitle": "8.1 Hydrostatic pressure and force transmission"
    },
    {
      "id": "physics1-mcq-8-1-2",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "How does container width affect hydrostatic pressure at a fixed depth in the same stationary fluid?",
      "passage": "Original hypothetical instructional setup. A hypothetical open freshwater tank has density 1000 kg/m³, atmospheric pressure 101,000 Pa and g = 9.8 m/s². A separate ideal hydraulic system at equal piston heights applies 100 N to area 0.020 m²; output area is 0.100 m².",
      "choices": [
        "It does not change that pressure",
        "Wider always means higher pressure",
        "Narrower always means zero pressure",
        "Pressure equals total water mass"
      ],
      "answer": 0,
      "explanation": "The pressure-depth relation depends on surface pressure, density and vertical depth, not container width.",
      "lessonTitle": "8.1 Hydrostatic pressure and force transmission"
    },
    {
      "id": "physics1-mcq-8-1-3",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What output force results from added pressure 5000 Pa on area 0.100 m²?",
      "passage": "Original hypothetical instructional setup. A hypothetical open freshwater tank has density 1000 kg/m³, atmospheric pressure 101,000 Pa and g = 9.8 m/s². A separate ideal hydraulic system at equal piston heights applies 100 N to area 0.020 m²; output area is 0.100 m².",
      "choices": [
        "500 N",
        "50 N",
        "5000 N",
        "0.000020 N"
      ],
      "answer": 0,
      "explanation": "Force is pressure times area: 5000 × 0.100 = 500 N.",
      "lessonTitle": "8.1 Hydrostatic pressure and force transmission"
    },
    {
      "id": "physics1-mcq-8-1-4",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "In an ideal equal-height hydraulic system, why does the larger piston move a smaller distance?",
      "passage": "Original hypothetical instructional setup. A hypothetical open freshwater tank has density 1000 kg/m³, atmospheric pressure 101,000 Pa and g = 9.8 m/s². A separate ideal hydraulic system at equal piston heights applies 100 N to area 0.020 m²; output area is 0.100 m².",
      "choices": [
        "The displaced fluid volumes must be equal",
        "Energy is created at the smaller piston",
        "The larger piston has no pressure",
        "The fluid vanishes during transfer"
      ],
      "answer": 0,
      "explanation": "For incompressible fluid without leaks, A_in d_in = A_out d_out, preserving volume and ideal work.",
      "lessonTitle": "8.1 Hydrostatic pressure and force transmission"
    },
    {
      "id": "physics1-mcq-8-2-1",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What fraction of a freely floating 600 kg/m³ block is submerged in 1000 kg/m³ water?",
      "passage": "Original hypothetical instructional setup. A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. It is placed in freshwater of density 1000 kg/m³. Use g = 9.8 m/s².",
      "choices": [
        "60%",
        "40%",
        "100%",
        "167%"
      ],
      "answer": 0,
      "explanation": "Floating equilibrium gives V_sub/V_total = ρ_object/ρ_fluid = 0.60.",
      "lessonTitle": "8.2 Buoyancy, floating equilibrium, and apparent weight"
    },
    {
      "id": "physics1-mcq-8-2-2",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What fluid volume does the described floating 1.8 kg block displace?",
      "passage": "Original hypothetical instructional setup. A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. It is placed in freshwater of density 1000 kg/m³. Use g = 9.8 m/s².",
      "choices": [
        "0.0018 m³",
        "0.0030 m³",
        "1.8 m³",
        "0.00060 m³"
      ],
      "answer": 0,
      "explanation": "The displaced water mass equals the block mass in floating equilibrium: V = m/ρ.",
      "lessonTitle": "8.2 Buoyancy, floating equilibrium, and apparent weight"
    },
    {
      "id": "physics1-mcq-8-2-3",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What downward force holds the described block fully submerged at rest?",
      "passage": "Original hypothetical instructional setup. A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. It is placed in freshwater of density 1000 kg/m³. Use g = 9.8 m/s².",
      "choices": [
        "11.76 N",
        "17.64 N",
        "29.4 N",
        "0 N"
      ],
      "answer": 0,
      "explanation": "Full-submersion buoyancy is 29.4 N. Subtract the 17.64 N weight to obtain the required additional downward force.",
      "lessonTitle": "8.2 Buoyancy, floating equilibrium, and apparent weight"
    },
    {
      "id": "physics1-mcq-8-2-4",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which density belongs in the buoyant-force formula?",
      "passage": "Original hypothetical instructional setup. A hypothetical block has volume 0.0030 m³ and average density 600 kg/m³. It is placed in freshwater of density 1000 kg/m³. Use g = 9.8 m/s².",
      "choices": [
        "The displaced fluid’s density",
        "The object’s density in every case",
        "The average of object and fluid densities",
        "No density is needed"
      ],
      "answer": 0,
      "explanation": "Buoyancy equals the displaced fluid’s weight; its density determines that weight.",
      "lessonTitle": "8.2 Buoyancy, floating equilibrium, and apparent weight"
    },
    {
      "id": "physics1-mcq-8-3-1",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is section 2 speed for the described area change?",
      "passage": "Original hypothetical instructional setup. A hypothetical horizontal pipe carries water steadily. Section 1 has area 0.0040 m² and speed 1.0 m/s; section 2 has area 0.0010 m². Use density 1000 kg/m³ and neglect viscosity and pump work.",
      "choices": [
        "4.0 m/s",
        "0.25 m/s",
        "1.0 m/s",
        "16 m/s"
      ],
      "answer": 0,
      "explanation": "Equal volume flow requires 0.0040(1.0) = 0.0010 v₂, giving v₂ = 4.0 m/s.",
      "lessonTitle": "8.3 Continuity and Bernoulli reasoning with explicit assumptions"
    },
    {
      "id": "physics1-mcq-8-3-2",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What is p₂ − p₁ in the described ideal horizontal water flow?",
      "passage": "Original hypothetical instructional setup. A hypothetical horizontal pipe carries water steadily. Section 1 has area 0.0040 m² and speed 1.0 m/s; section 2 has area 0.0010 m². Use density 1000 kg/m³ and neglect viscosity and pump work.",
      "choices": [
        "−7500 Pa",
        "+7500 Pa",
        "−15000 Pa",
        "0 Pa"
      ],
      "answer": 0,
      "explanation": "Use one half ρ(v₁² − v₂²): 500(1 − 16) = −7500 Pa.",
      "lessonTitle": "8.3 Continuity and Bernoulli reasoning with explicit assumptions"
    },
    {
      "id": "physics1-mcq-8-3-3",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "Which assumption is required for the stated continuity relation Av = constant?",
      "passage": "Original hypothetical instructional setup. A hypothetical horizontal pipe carries water steadily. Section 1 has area 0.0040 m² and speed 1.0 m/s; section 2 has area 0.0010 m². Use density 1000 kg/m³ and neglect viscosity and pump work.",
      "choices": [
        "Steady incompressible flow without leaks",
        "Zero speed everywhere",
        "Equal pipe radii everywhere",
        "An absent pressure difference everywhere"
      ],
      "answer": 0,
      "explanation": "Volume conservation gives the same Q through each section under these conditions.",
      "lessonTitle": "8.3 Continuity and Bernoulli reasoning with explicit assumptions"
    },
    {
      "id": "physics1-mcq-8-3-4",
      "domain": "Physics 1: Fluids",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Physical modeling and reasoning",
      "question": "What must be included if a pump adds energy between the two sections?",
      "passage": "Original hypothetical instructional setup. A hypothetical horizontal pipe carries water steadily. Section 1 has area 0.0040 m² and speed 1.0 m/s; section 2 has area 0.0010 m². Use density 1000 kg/m³ and neglect viscosity and pump work.",
      "choices": [
        "The pump’s energy contribution",
        "A claim that Bernoulli forbids pumps",
        "The object’s buoyant volume only",
        "An automatic assumption that both pressures are equal"
      ],
      "answer": 0,
      "explanation": "The simple constant-total form cannot ignore external energy input from a pump.",
      "lessonTitle": "8.3 Continuity and Bernoulli reasoning with explicit assumptions"
    }
  ],
  "frq": [
    {
      "id": "physics1-frq-1-1",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical cart starts from rest and accelerates uniformly at +2.0 m/s² for 4.0 s on a straight track.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Determine its final velocity and displacement.",
          "points": 3,
          "guidance": "v = 0 + 2(4) = +8 m/s; Δx = 0 + 0.5(2)(4²) = +16 m. Include signs and units."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Describe the velocity-time graph and use its area to check displacement.",
          "points": 3,
          "guidance": "The graph is a straight line from (0,0) to (4,8); triangular area is 0.5(4)(8) = 16 m."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Describe a measurement that could test the constant-acceleration assumption.",
          "points": 3,
          "guidance": "Use time-stamped velocity measurements or motion sensor data; a roughly constant velocity-time slope supports constant acceleration over the interval. Repeat and quantify uncertainty."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-1-2",
      "domain": "Physics 1: Kinematics",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical object travels at +4.0 m/s for 2.0 s, then −2.0 m/s for 3.0 s along the same line.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Calculate total displacement and total distance.",
          "points": 3,
          "guidance": "Signed displacement is 8 − 6 = +2 m. Distance is 8 + 6 = 14 m."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Calculate average velocity and average speed.",
          "points": 3,
          "guidance": "Total time is 5 s. Average velocity is +0.40 m/s; average speed is 2.8 m/s."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain why the two averages differ and represent the motion on a velocity-time graph.",
          "points": 3,
          "guidance": "Direction reversal makes signed areas partly cancel; distance adds magnitudes. Plot horizontal segments at +4 and −2 for the stated intervals."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-2-1",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical 2.0 kg cart is pulled horizontally with 10 N while 2.0 N of friction opposes the motion. It has no vertical acceleration. Use g = 9.8 m/s².",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Draw or describe all forces with directions.",
          "points": 3,
          "guidance": "Weight 19.6 N downward; normal force 19.6 N upward; applied pull 10 N forward; friction 2 N backward."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Find net horizontal force and acceleration.",
          "points": 3,
          "guidance": "Net force is 8 N forward; acceleration is 8/2 = 4 m/s² forward."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Predict the effect of doubling the measured net force with mass unchanged, and justify the model.",
          "points": 3,
          "guidance": "Acceleration doubles to 8 m/s² by a = F_net/m; distinguish net force from the applied pull if friction changes."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-2-2",
      "domain": "Physics 1: Force and Translational Dynamics",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical 2.0 kg block slides on a frictionless 30° incline. Use g = 9.8 m/s² and define downhill as positive.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Resolve weight parallel and perpendicular to the incline.",
          "points": 3,
          "guidance": "Parallel component is 19.6 sin30° = 9.8 N downhill. Perpendicular component is 19.6 cos30° ≈ 17.0 N into the surface."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Determine normal force and downhill acceleration.",
          "points": 3,
          "guidance": "Normal force is about 17.0 N because perpendicular acceleration is zero. Acceleration is 9.8/2 = 4.9 m/s² downhill."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain why normal force is not equal to the full weight here.",
          "points": 3,
          "guidance": "The normal balances only the perpendicular weight component, not the parallel component that accelerates the block; the force diagram and component equations must use the selected axes."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-3-1",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical 2.0 kg cart starts from rest. A 12 N horizontal pull acts over 3.0 m while 4.0 N of friction opposes motion.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Compute applied work, frictional work and net work.",
          "points": 3,
          "guidance": "Applied work +36 J; frictional work −12 J; net work +24 J. Gravity and normal do no work on the horizontal displacement."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Determine final speed from the work-energy theorem.",
          "points": 3,
          "guidance": "Final kinetic energy is 24 J; v = sqrt(2K/m) = sqrt24 ≈ 4.90 m/s."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain the energy accounting with an appropriate system.",
          "points": 3,
          "guidance": "For cart alone, external net work changes K. For a larger cart-surface system, the 12 J frictional transfer appears as increased internal/thermal energy. Do not subtract that same loss twice."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-3-2",
      "domain": "Physics 1: Work, Energy, and Power",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical 1.0 kg cart descends from rest through a vertical height 2.0 m. Mechanical dissipation transfers 3.0 J to thermal energy. Use g = 9.8 m/s².",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Calculate the gravitational potential-energy decrease and remaining kinetic energy.",
          "points": 3,
          "guidance": "Potential decrease is mgh = 19.6 J; final K = 19.6 − 3.0 = 16.6 J."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Find the final speed and compare it with a lossless descent.",
          "points": 3,
          "guidance": "v = sqrt33.2 ≈ 5.76 m/s. A lossless descent would give sqrt39.2 ≈ 6.26 m/s, so the dissipative result is smaller."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain why conservation of energy is still valid.",
          "points": 3,
          "guidance": "Mechanical energy is not conserved for the cart-Earth mechanical subsystem, but total energy including thermal energy is conserved. State the system and the location of the 3 J transfer."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-4-1",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical 1.0 kg cart moving at +4.0 m/s collides with a stationary 3.0 kg cart. They stick; external horizontal impulse is negligible.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Determine their common final velocity.",
          "points": 3,
          "guidance": "Initial momentum is +4 kg·m/s. Divide by combined mass 4 kg to obtain +1.0 m/s."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Calculate initial and final kinetic energies.",
          "points": 3,
          "guidance": "Initial K = 8 J; final K = 0.5(4)(1²) = 2 J; 6 J leaves translational kinetic energy."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain which conservation claim is justified.",
          "points": 3,
          "guidance": "System momentum is conserved because external impulse is negligible. Translational kinetic energy is not conserved in this perfectly inelastic collision; energy transfers to internal modes, sound and deformation."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-4-2",
      "domain": "Physics 1: Linear Momentum",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical 0.50 kg ball changes velocity from +6.0 m/s to −2.0 m/s in 0.020 s during a collision.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Calculate the ball’s impulse.",
          "points": 3,
          "guidance": "Δp = 0.50(−2 − 6) = −4.0 N·s."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Calculate average net force and interpret its sign.",
          "points": 3,
          "guidance": "F_avg = −4/0.020 = −200 N; it acts in the negative direction relative to the defined positive axis."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Describe a force-time graph with the same impulse and explain what its area does not determine.",
          "points": 3,
          "guidance": "Any physically appropriate force pulse with signed area −4 N·s gives this impulse. Area alone does not determine the peak force or exact time dependence; those require additional data."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-5-1",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical lever has an applied 20 N force at radius 0.30 m with a 30° angle between radius and force. This torque is counterclockwise. A separate clockwise torque is 1.0 N·m. Rotational inertia is 0.50 kg·m².",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Find the applied torque with a justified lever arm.",
          "points": 3,
          "guidance": "τ = rF sin30° = 0.30(20)(0.5) = +3.0 N·m; the perpendicular lever arm is 0.15 m."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Determine net torque and angular acceleration.",
          "points": 3,
          "guidance": "Net torque is +3 − 1 = +2 N·m; α = τ_net/I = +4 rad/s²."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain how the result changes if the same force becomes perpendicular at the same radius.",
          "points": 3,
          "guidance": "Applied torque becomes +6 N·m, net +5 N·m and α = +10 rad/s². The force magnitude stays fixed while its perpendicular moment arm changes."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-5-2",
      "domain": "Physics 1: Torque and Rotational Dynamics",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical uniform 2.0 m beam weighs 100 N and is hinged at its left end. A vertical supporting cable acts at its right end. An additional 40 N load hangs 1.5 m from the hinge. The beam is horizontal and at rest.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Write torque balance about the hinge.",
          "points": 3,
          "guidance": "2T − 100(1.0) − 40(1.5) = 0, taking counterclockwise positive."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Find cable tension and vertical hinge force.",
          "points": 3,
          "guidance": "T = 160/2 = 80 N upward. Vertical hinge force is 140 − 80 = 60 N upward."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain why choosing the hinge as the torque origin is useful.",
          "points": 3,
          "guidance": "The hinge force has zero lever arm about that point, removing its unknown torque. Force balance is still required to determine that hinge force; torque balance alone does not replace translational equilibrium."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-6-1",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical rotating disk has I = 2.0 kg·m² and angular speed 3.0 rad/s. A stationary ring with I = 1.0 kg·m² sticks coaxially to it. External torque about the axis is negligible.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Find final angular speed.",
          "points": 3,
          "guidance": "Initial L = 2(3) = 6 kg·m²/s. Final I = 3, so ω = 2 rad/s."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Find the change in rotational kinetic energy.",
          "points": 3,
          "guidance": "Initial K = 9 J; final K = 6 J, so rotational K decreases by 3 J."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain why angular momentum and kinetic energy behave differently.",
          "points": 3,
          "guidance": "Negligible external torque conserves total angular momentum. The sticking interaction dissipates mechanical energy into internal modes; it does not imply that total energy disappears."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-6-2",
      "domain": "Physics 1: Energy and Momentum of Rotating Systems",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical wheel has I = 2.0 kg·m² and initial angular speed +1.0 rad/s. A constant net torque +4.0 N·m acts for 3.0 s.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Determine angular impulse and final angular speed.",
          "points": 3,
          "guidance": "Angular impulse is +12 N·m·s. Initial L = 2, final L = 14, so final ω = +7 rad/s."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Determine angular displacement and net rotational work.",
          "points": 3,
          "guidance": "α = 2 rad/s²; Δθ = (1)(3) + 0.5(2)(9) = 12 rad. Work is τΔθ = 48 J."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Check the work with rotational kinetic energy.",
          "points": 3,
          "guidance": "ΔK = 0.5(2)(7² − 1²) = 48 J, agreeing with torque-angle work. Distinguish torque-time area from torque-angle area."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-7-1",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical ideal horizontal spring oscillator has mass 0.50 kg, spring constant 50 N/m and amplitude 0.20 m.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Determine angular frequency, period and maximum speed.",
          "points": 3,
          "guidance": "ω = sqrt(50/0.50) = 10 rad/s; T = 2π/10 ≈ 0.628 s; v_max = ωA = 2.0 m/s."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Find kinetic energy and speed at x = +0.10 m.",
          "points": 3,
          "guidance": "Total E = 1.0 J; U = 0.25 J; K = 0.75 J; speed sqrt(2K/m) = sqrt3 ≈ 1.73 m/s."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Find acceleration at that position and explain why its sign does not fix velocity direction.",
          "points": 3,
          "guidance": "a = −(k/m)x = −10 m/s². The same position can be crossed moving either direction, while restoring acceleration points toward equilibrium."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-7-2",
      "domain": "Physics 1: Oscillations",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical small-angle pendulum experiment plots T² vertically and length L horizontally. Its best-fit slope is 4.10 s²/m.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Use the slope to estimate g.",
          "points": 3,
          "guidance": "T² = (4π²/g)L, so g = 4π²/4.10 ≈ 9.63 m/s². Include slope units and the rearrangement."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Predict the ideal period ratio when length is multiplied by four.",
          "points": 3,
          "guidance": "T scales as sqrt(L), so the period doubles; mass does not enter the simple-pendulum formula."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain one meaningful experimental control and one limitation.",
          "points": 3,
          "guidance": "Keep release angle small and approximately consistent, measure pivot-to-center length, and time repeated cycles. Damping, finite angle and systematic length/timing errors can limit agreement; give a mechanism for the chosen limitation."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-8-1",
      "domain": "Physics 1: Fluids",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical open water tank has surface absolute pressure 100,000 Pa. Water density is 1000 kg/m³. A small hatch of area 0.020 m² is 3.0 m below the surface, with outside air at the same atmospheric pressure. Use g = 10 m/s².",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Find gauge and absolute pressure at the hatch.",
          "points": 3,
          "guidance": "Gauge pressure is ρgh = 30,000 Pa; absolute pressure is 130,000 Pa."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Find net force due to the pressure difference across the hatch.",
          "points": 3,
          "guidance": "The atmospheric contributions cancel. Net pressure is 30,000 Pa; net force is ΔpA = 600 N, outward from the water."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain how tank width affects this result and identify the relevant geometric quantity.",
          "points": 3,
          "guidance": "At the same depth and density, widening the tank does not change local hydrostatic pressure. Vertical depth and hatch area determine the stated pressure and net force; total water mass does not directly enter."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    },
    {
      "id": "physics1-frq-8-2",
      "domain": "Physics 1: Fluids",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical ideal horizontal water pipe has inlet area 0.0030 m² and speed 2.0 m/s. Outlet area is 0.0010 m². Water density is 1000 kg/m³; inlet absolute pressure is 120,000 Pa. Neglect viscosity and pump work.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Determine flow rate and outlet speed.",
          "points": 3,
          "guidance": "Q = A₁v₁ = 0.0060 m³/s; v₂ = Q/A₂ = 6.0 m/s."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Determine outlet pressure with Bernoulli reasoning.",
          "points": 3,
          "guidance": "p₂ − p₁ = 0.5(1000)(2² − 6²) = −16,000 Pa, so p₂ = 104,000 Pa."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "State model assumptions and explain why continuity alone cannot find pressure.",
          "points": 3,
          "guidance": "Steady incompressible flow, no leaks, equal heights, negligible viscous losses and no unaccounted external work are used. Continuity conserves flow rate; pressure requires energy/dynamics information."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part.",
      "responseMode": "math"
    }
  ],
  "flashcards": [
    {
      "id": "physics1-card-1-1",
      "unit": "Physics 1: Kinematics",
      "term": "Displacement",
      "answer": "Signed change in position, final minus initial; it can differ from distance."
    },
    {
      "id": "physics1-card-1-2",
      "unit": "Physics 1: Kinematics",
      "term": "Average velocity",
      "answer": "Displacement divided by elapsed time; includes a direction or sign."
    },
    {
      "id": "physics1-card-1-3",
      "unit": "Physics 1: Kinematics",
      "term": "Acceleration",
      "answer": "Change in velocity per unit time; the slope of a velocity-time graph."
    },
    {
      "id": "physics1-card-1-4",
      "unit": "Physics 1: Kinematics",
      "term": "Velocity-time area",
      "answer": "Signed area gives displacement; sum of area magnitudes gives distance traveled."
    },
    {
      "id": "physics1-card-1-5",
      "unit": "Physics 1: Kinematics",
      "term": "Projectile components",
      "answer": "Without drag, horizontal and vertical motions share time but have independent component equations."
    },
    {
      "id": "physics1-card-1-6",
      "unit": "Physics 1: Kinematics",
      "term": "Constant-acceleration displacement",
      "answer": "Δx = v₀t + (1/2)at², when acceleration is constant."
    },
    {
      "id": "physics1-card-2-1",
      "unit": "Physics 1: Force and Translational Dynamics",
      "term": "Net force",
      "answer": "Vector sum of all external forces on the chosen object; F_net = ma."
    },
    {
      "id": "physics1-card-2-2",
      "unit": "Physics 1: Force and Translational Dynamics",
      "term": "Normal force",
      "answer": "Contact force perpendicular to a surface; it need not equal weight."
    },
    {
      "id": "physics1-card-2-3",
      "unit": "Physics 1: Force and Translational Dynamics",
      "term": "Static friction",
      "answer": "Adjusts as needed up to μ_s N, opposing impending relative sliding."
    },
    {
      "id": "physics1-card-2-4",
      "unit": "Physics 1: Force and Translational Dynamics",
      "term": "Kinetic friction",
      "answer": "In the simple sliding model its magnitude is μ_k N and direction opposes sliding."
    },
    {
      "id": "physics1-card-2-5",
      "unit": "Physics 1: Force and Translational Dynamics",
      "term": "Centripetal acceleration",
      "answer": "Inward acceleration of magnitude v²/r during circular motion."
    },
    {
      "id": "physics1-card-2-6",
      "unit": "Physics 1: Force and Translational Dynamics",
      "term": "Third-law pair",
      "answer": "Equal and opposite interaction forces that act on different objects."
    },
    {
      "id": "physics1-card-3-1",
      "unit": "Physics 1: Work, Energy, and Power",
      "term": "Net work",
      "answer": "Total work of external forces equals the change in an object’s kinetic energy."
    },
    {
      "id": "physics1-card-3-2",
      "unit": "Physics 1: Work, Energy, and Power",
      "term": "Kinetic energy",
      "answer": "K = (1/2)mv² for translational motion."
    },
    {
      "id": "physics1-card-3-3",
      "unit": "Physics 1: Work, Energy, and Power",
      "term": "Elastic potential energy",
      "answer": "U = (1/2)kx² for an ideal Hookean spring measured from its natural length."
    },
    {
      "id": "physics1-card-3-4",
      "unit": "Physics 1: Work, Energy, and Power",
      "term": "Gravitational potential change",
      "answer": "Near Earth, ΔU_g = mgΔy for the object-Earth system."
    },
    {
      "id": "physics1-card-3-5",
      "unit": "Physics 1: Work, Energy, and Power",
      "term": "Average power",
      "answer": "Energy transfer or work divided by the transfer time."
    },
    {
      "id": "physics1-card-3-6",
      "unit": "Physics 1: Work, Energy, and Power",
      "term": "Efficiency",
      "answer": "Useful energy output divided by total energy input for a specified process."
    },
    {
      "id": "physics1-card-4-1",
      "unit": "Physics 1: Linear Momentum",
      "term": "Momentum",
      "answer": "Vector quantity p = mv for a particle in the nonrelativistic model."
    },
    {
      "id": "physics1-card-4-2",
      "unit": "Physics 1: Linear Momentum",
      "term": "Impulse",
      "answer": "Change in momentum; force-time area or F_avg Δt."
    },
    {
      "id": "physics1-card-4-3",
      "unit": "Physics 1: Linear Momentum",
      "term": "Momentum conservation",
      "answer": "Total system momentum stays constant when external impulse is negligible."
    },
    {
      "id": "physics1-card-4-4",
      "unit": "Physics 1: Linear Momentum",
      "term": "Perfectly inelastic collision",
      "answer": "Objects stick; momentum can be conserved while translational kinetic energy decreases."
    },
    {
      "id": "physics1-card-4-5",
      "unit": "Physics 1: Linear Momentum",
      "term": "Elastic collision",
      "answer": "Both total momentum and total kinetic energy are conserved for an isolated collision."
    },
    {
      "id": "physics1-card-4-6",
      "unit": "Physics 1: Linear Momentum",
      "term": "Center of mass",
      "answer": "Mass-weighted position; its acceleration is governed by the system’s external net force."
    },
    {
      "id": "physics1-card-5-1",
      "unit": "Physics 1: Torque and Rotational Dynamics",
      "term": "Torque",
      "answer": "Turning effect τ = rF sinθ about a specified axis."
    },
    {
      "id": "physics1-card-5-2",
      "unit": "Physics 1: Torque and Rotational Dynamics",
      "term": "Rotational inertia",
      "answer": "Resistance to angular acceleration; depends on mass distribution about the chosen axis."
    },
    {
      "id": "physics1-card-5-3",
      "unit": "Physics 1: Torque and Rotational Dynamics",
      "term": "Rotational Newton law",
      "answer": "τ_net = Iα for a rigid body about a fixed axis with constant I."
    },
    {
      "id": "physics1-card-5-4",
      "unit": "Physics 1: Torque and Rotational Dynamics",
      "term": "Rotational equilibrium",
      "answer": "Net torque is zero; translational equilibrium additionally requires zero net force."
    },
    {
      "id": "physics1-card-5-5",
      "unit": "Physics 1: Torque and Rotational Dynamics",
      "term": "Rolling without slipping",
      "answer": "v_cm = ωR and a_cm = αR for the appropriate tangential rolling constraint."
    },
    {
      "id": "physics1-card-5-6",
      "unit": "Physics 1: Torque and Rotational Dynamics",
      "term": "Lever arm",
      "answer": "Perpendicular distance from the rotation axis to the force’s line of action."
    },
    {
      "id": "physics1-card-6-1",
      "unit": "Physics 1: Energy and Momentum of Rotating Systems",
      "term": "Rotational kinetic energy",
      "answer": "K_rot = (1/2)Iω² for rigid rotation about the chosen axis."
    },
    {
      "id": "physics1-card-6-2",
      "unit": "Physics 1: Energy and Momentum of Rotating Systems",
      "term": "Angular momentum",
      "answer": "For rigid fixed-axis rotation about a principal axis, L = Iω."
    },
    {
      "id": "physics1-card-6-3",
      "unit": "Physics 1: Energy and Momentum of Rotating Systems",
      "term": "Angular impulse",
      "answer": "Net torque-time area equals the change in angular momentum."
    },
    {
      "id": "physics1-card-6-4",
      "unit": "Physics 1: Energy and Momentum of Rotating Systems",
      "term": "Rotational work",
      "answer": "Torque-angle area; constant torque gives W = τΔθ."
    },
    {
      "id": "physics1-card-6-5",
      "unit": "Physics 1: Energy and Momentum of Rotating Systems",
      "term": "Angular momentum conservation",
      "answer": "Total angular momentum about an axis stays constant when external torque impulse is negligible."
    },
    {
      "id": "physics1-card-6-6",
      "unit": "Physics 1: Energy and Momentum of Rotating Systems",
      "term": "Combined rolling energy",
      "answer": "Add translational center-of-mass kinetic energy and rotational kinetic energy about the center."
    },
    {
      "id": "physics1-card-7-1",
      "unit": "Physics 1: Oscillations",
      "term": "Simple harmonic motion",
      "answer": "Motion with restoring acceleration proportional to and opposite displacement from stable equilibrium."
    },
    {
      "id": "physics1-card-7-2",
      "unit": "Physics 1: Oscillations",
      "term": "Spring angular frequency",
      "answer": "ω = sqrt(k/m) for an ideal linear mass-spring oscillator."
    },
    {
      "id": "physics1-card-7-3",
      "unit": "Physics 1: Oscillations",
      "term": "Spring period",
      "answer": "T = 2πsqrt(m/k), independent of amplitude within the ideal linear model."
    },
    {
      "id": "physics1-card-7-4",
      "unit": "Physics 1: Oscillations",
      "term": "Oscillator energy",
      "answer": "E = (1/2)kA² for an ideal horizontal spring oscillator."
    },
    {
      "id": "physics1-card-7-5",
      "unit": "Physics 1: Oscillations",
      "term": "Small-angle pendulum period",
      "answer": "T = 2πsqrt(L/g) for the simple point-mass, small-angle model."
    },
    {
      "id": "physics1-card-7-6",
      "unit": "Physics 1: Oscillations",
      "term": "Turning point",
      "answer": "Instant of zero velocity at an oscillation endpoint; restoring acceleration can be largest there."
    },
    {
      "id": "physics1-card-8-1",
      "unit": "Physics 1: Fluids",
      "term": "Density",
      "answer": "Mass divided by volume, ρ = m/V."
    },
    {
      "id": "physics1-card-8-2",
      "unit": "Physics 1: Fluids",
      "term": "Gauge pressure",
      "answer": "Pressure relative to the reference atmospheric pressure."
    },
    {
      "id": "physics1-card-8-3",
      "unit": "Physics 1: Fluids",
      "term": "Hydrostatic pressure difference",
      "answer": "Δp = ρgΔh for a uniform stationary fluid over a downward depth increase."
    },
    {
      "id": "physics1-card-8-4",
      "unit": "Physics 1: Fluids",
      "term": "Archimedes principle",
      "answer": "Buoyant force equals the weight of displaced fluid."
    },
    {
      "id": "physics1-card-8-5",
      "unit": "Physics 1: Fluids",
      "term": "Volume continuity",
      "answer": "Q = Av is constant for steady incompressible flow without leaks."
    },
    {
      "id": "physics1-card-8-6",
      "unit": "Physics 1: Fluids",
      "term": "Bernoulli model",
      "answer": "p + (1/2)ρv² + ρgh is constant along a streamline under the stated ideal-flow assumptions."
    }
  ],
  "references": [
    {
      "title": "College Board course framework and eight units",
      "url": "https://apcentral.collegeboard.org/courses/ap-physics-1",
      "description": "Algebra-based instruction including fluids. Original instructional examples, not released questions."
    },
    {
      "title": "Official exam format and calculator guidance",
      "url": "https://apcentral.collegeboard.org/courses/ap-physics-1/exam",
      "description": "Use current official guidance for your actual exam. These targeted tasks are not a full exam."
    }
  ]
};
