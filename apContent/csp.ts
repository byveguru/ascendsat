// Original instructional content. Lesson checks also appear in the practice bank.
export const CSP_CONTENT = {
  "lessons": [
    {
      "id": "csp-lesson-1-1",
      "title": "1.1 Purpose, input, output, and an iterative design process",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Purpose, input, output, and an iterative design process"
        },
        {
          "type": "subheading",
          "text": "Start with a user problem"
        },
        {
          "type": "text",
          "text": "A program is a sequence of instructions that a computing device can execute. Its purpose describes the problem it helps a person solve; functionality describes what the program actually does. Begin by stating who the user is, what information they supply, and what useful result they need. A feature list without a user need can produce a program that runs correctly but solves the wrong problem. Input may come from a person, sensor, file, or another program. Output may be text, sound, a displayed image, a stored result, or a signal to another device."
        },
        {
          "type": "subheading",
          "text": "Build a model before writing code"
        },
        {
          "type": "text",
          "text": "An algorithm is a finite, ordered description of steps used to accomplish a task. A program implements algorithms in a language. A flowchart or clear pseudocode can expose missing decisions before syntax makes the task more complicated. A prototype is a deliberately simplified version used to test an idea. Design is iterative: investigate a need, build something small, test it, collect feedback, and revise. Iteration in design means revisiting a solution; iteration inside a program means repeating instructions. The two uses of the word should not be confused."
        },
        {
          "type": "subheading",
          "text": "Worked example: a study-session planner"
        },
        {
          "type": "text",
          "text": "Suppose a planner receives available minutes and returns a suggested activity. Its purpose is to help a student choose work that fits their time. Its input is an integer number of minutes. A rule might choose a short recall activity below ten minutes and a longer question set otherwise. For input 8, the output is the short activity. A user test reveals that a student with only three minutes cannot finish even that activity. The program may have followed its algorithm exactly, but the design requirement was incomplete; add a smaller option rather than calling the user wrong."
        },
        {
          "type": "subheading",
          "text": "Test the requirement as well as the code"
        },
        {
          "type": "text",
          "text": "Make success observable: a student should receive an activity that fits the entered time. Check typical input, threshold input, and invalid input separately. For a ten-minute boundary, test 9, 10, and 11 to detect an incorrect inequality. Decide how to handle a negative value or a missing entry instead of assuming the device will infer your intention. User feedback can uncover confusing labels or inaccessible controls that a calculation test misses. Document what you changed and the evidence that motivated the change, so the next revision does not repeat the same mistake."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-1-1-1",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which statement describes the planner’s purpose rather than an implementation detail?",
          "choices": [
            "Help students choose study work that fits their available time",
            "Store minutes in a variable named m",
            "Use an IF statement",
            "Display text in green"
          ],
          "answer": 0,
          "explanation": "Purpose connects the program to a user need. Variable names, control structures, and colors describe implementation or interface choices.",
          "lessonTitle": "1.1 Purpose, input, output, and an iterative design process",
          "passage": "Original instructional setup. A study planner receives an integer number of available minutes. It chooses a short recall activity below ten minutes and a longer question set otherwise. Its purpose is to suggest work that fits the user’s time."
        },
        {
          "id": "csp-mcq-1-1-2",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "The planner reads the current time from a device clock. How is that information classified?",
          "choices": [
            "Input to the program",
            "A syntax error",
            "Only output",
            "The entire algorithm"
          ],
          "answer": 0,
          "explanation": "Input is information received by a program; it need not be typed by a human. A device clock can supply input.",
          "lessonTitle": "1.1 Purpose, input, output, and an iterative design process",
          "passage": "Original instructional setup. A study planner receives an integer number of available minutes. It chooses a short recall activity below ten minutes and a longer question set otherwise. Its purpose is to suggest work that fits the user’s time."
        },
        {
          "id": "csp-mcq-1-1-3",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A test at 9 minutes succeeds and a test at 11 succeeds. Which additional test best checks a ten-minute cutoff?",
          "choices": [
            "10 minutes",
            "1000 minutes only",
            "Another 9-minute test only",
            "No additional test is useful"
          ],
          "answer": 0,
          "explanation": "The exact threshold reveals whether a comparison includes equality in the intended branch. Nearby tests alone can miss an off-by-one boundary error.",
          "lessonTitle": "1.1 Purpose, input, output, and an iterative design process",
          "passage": "Original instructional setup. A study planner receives an integer number of available minutes. It chooses a short recall activity below ten minutes and a longer question set otherwise. Its purpose is to suggest work that fits the user’s time."
        },
        {
          "id": "csp-mcq-1-1-4",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A working prototype is difficult for users to understand. What is the best next design step?",
          "choices": [
            "Collect specific user feedback and revise the interface",
            "Assume correct execution proves the design is complete",
            "Delete all tests",
            "Add unrelated features before investigating"
          ],
          "answer": 0,
          "explanation": "Correct execution and useful design are distinct. Observing users and testing a revised interface addresses the actual problem.",
          "lessonTitle": "1.1 Purpose, input, output, and an iterative design process",
          "passage": "Original instructional setup. A study planner receives an integer number of available minutes. It chooses a short recall activity below ten minutes and a longer question set otherwise. Its purpose is to suggest work that fits the user’s time."
        }
      ]
    },
    {
      "id": "csp-lesson-1-2",
      "title": "1.2 Collaboration, documentation, and debugging with evidence",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Collaboration, documentation, and debugging with evidence"
        },
        {
          "type": "subheading",
          "text": "Separate three kinds of error"
        },
        {
          "type": "text",
          "text": "A syntax error violates a language rule, such as a missing delimiter, and can prevent a program from running. A runtime error occurs during execution, such as accessing an invalid list position in a language that reports that error. A logic error permits execution but gives an unintended result. Before changing code, describe expected and observed behavior for a reproducible input. “It is broken” is not a useful test specification because it does not identify what correct behavior would look like."
        },
        {
          "type": "subheading",
          "text": "Trace rather than guess"
        },
        {
          "type": "text",
          "text": "Use a trace table to record variables after each relevant instruction. The assignment total ← total + value means evaluate the right-hand expression using the old total, then replace the stored value. It is not a mathematical statement that total equals itself plus value forever. Displaying intermediate states or using a debugger can identify where behavior first diverges from the plan. Change one suspected cause, rerun the failing case, and check earlier successful cases for regressions. Passing several examples supplies evidence but does not prove correctness for every possible input."
        },
        {
          "type": "subheading",
          "text": "Worked debugging example"
        },
        {
          "type": "text",
          "text": "A program should sum [3, 5, 2]. It starts total at 0 but mistakenly places total ← 0 inside the loop before adding each item. The trace is 3 after the first item, 5 after the second, and 2 after the third. The expected answer is 10, not 2. The list and addition operator are not the cause. Moving initialization before the loop allows the running total to retain earlier additions: 0, then 3, then 8, then 10. Test an empty list and a one-item list too, because these expose assumptions about initialization and loop entry."
        },
        {
          "type": "subheading",
          "text": "Use collaboration to improve reasoning"
        },
        {
          "type": "text",
          "text": "Pair programming can combine a person writing code with a person reviewing decisions and test cases; partners should switch roles and explain their reasoning. Collaboration also includes comparing alternatives, giving specific feedback, and dividing a large task into compatible components. Documentation records purpose, inputs, outputs, assumptions, and notable decisions; it is not merely a paraphrase of every instruction. Attribute externally created code or media appropriately. A teammate’s understanding is valuable evidence: if they cannot predict a procedure’s result from its contract, the procedure name or documentation may need revision."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-1-2-1",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A program runs but outputs 2 instead of the sum 10. What kind of problem is most clearly demonstrated?",
          "choices": [
            "A logic error",
            "Necessarily a syntax error",
            "Proof the hardware has failed",
            "Necessarily an internet routing error"
          ],
          "answer": 0,
          "explanation": "The program executes but fails its intended specification. That is a logic error; the output alone does not establish hardware or network failure.",
          "lessonTitle": "1.2 Collaboration, documentation, and debugging with evidence",
          "passage": "Original instructional setup. A program should sum the list [3,5,2]. It mistakenly resets total to zero inside every loop iteration before adding the current entry."
        },
        {
          "id": "csp-mcq-1-2-2",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why does resetting total inside the loop cause the example’s error?",
          "choices": [
            "Each iteration discards the accumulated sum",
            "It makes addition undefined",
            "It changes every list element to zero",
            "It forces the list to sort"
          ],
          "answer": 0,
          "explanation": "Initialization inside the body overwrites earlier accumulated values. The last item is added to zero, leaving only that item.",
          "lessonTitle": "1.2 Collaboration, documentation, and debugging with evidence",
          "passage": "Original instructional setup. A program should sum the list [3,5,2]. It mistakenly resets total to zero inside every loop iteration before adding the current entry."
        },
        {
          "id": "csp-mcq-1-2-3",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which documentation most helps another programmer use a procedure?",
          "choices": [
            "Its purpose, accepted inputs, returned result, and important assumptions",
            "The author’s favorite color",
            "Only the number of lines",
            "A statement that it always works with no conditions"
          ],
          "answer": 0,
          "explanation": "A useful contract explains what the procedure does and the conditions under which its behavior is expected, independent of incidental implementation details.",
          "lessonTitle": "1.2 Collaboration, documentation, and debugging with evidence",
          "passage": "Original instructional setup. A program should sum the list [3,5,2]. It mistakenly resets total to zero inside every loop iteration before adding the current entry."
        },
        {
          "id": "csp-mcq-1-2-4",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "After fixing a failing test, why rerun previously passing cases?",
          "choices": [
            "The change may introduce a regression elsewhere",
            "Old tests become mathematically invalid after any edit",
            "Only failed tests can run",
            "Regression tests prove correctness for every input"
          ],
          "answer": 0,
          "explanation": "A local fix can affect another behavior. Rechecking earlier examples can reveal regressions, although finite tests are not a universal correctness proof.",
          "lessonTitle": "1.2 Collaboration, documentation, and debugging with evidence",
          "passage": "Original instructional setup. A program should sum the list [3,5,2]. It mistakenly resets total to zero inside every loop iteration before adding the current entry."
        }
      ]
    },
    {
      "id": "csp-lesson-1-3",
      "title": "1.3 Planning an original program and explaining an abstraction",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Planning an original program and explaining an abstraction"
        },
        {
          "type": "subheading",
          "text": "Connect a design to evidence"
        },
        {
          "type": "text",
          "text": "A small useful program is easier to explain than a large collection of unrelated features. Identify its purpose, a meaningful input, an observable output, and the steps connecting them. Then choose a data abstraction such as a list that represents a collection central to the program. Explain what the elements mean, not merely the list’s name. For example, a list of daily practice durations represents a variable number of study sessions. It lets the same algorithm process two sessions or twenty without writing a different variable and instruction for every session."
        },
        {
          "type": "subheading",
          "text": "Design a procedure with a clear role"
        },
        {
          "type": "text",
          "text": "A procedure groups a named set of instructions. A parameter allows the procedure’s behavior to vary with an argument provided at a call. Consider a procedure countAtLeast(durations, minimum) that counts list entries meeting a chosen threshold. A meaningful explanation connects the parameter to a decision inside the algorithm: changing minimum changes which entries are counted. Sequencing establishes execution order, selection makes a decision, and iteration repeats a block. Simply naming these structures does not explain how they work together in this particular procedure."
        },
        {
          "type": "subheading",
          "text": "Worked planning and testing"
        },
        {
          "type": "text",
          "text": "For durations [10, 25, 15, 30] and minimum 20, initialize count to 0, visit each duration, and add one when the duration is at least 20. The entries 25 and 30 qualify, so return 2. Calling the same procedure with minimum 15 returns 3 because 15, 25, and 30 qualify. The two calls demonstrate different effects of the parameter, rather than repeating the same branch. An empty list should return 0, and a duration exactly equal to minimum should be counted. These cases reveal both repetition and boundary behavior."
        },
        {
          "type": "subheading",
          "text": "Keep learning practice separate from an assessed submission"
        },
        {
          "type": "text",
          "text": "Ascend exercises provide original prompts for practicing program explanation and testing. They are not submissions to the AP Digital Portfolio and do not certify that a student has met official Create requirements. A student’s actual assessed work must follow the current College Board directions, including its originality, attribution, collaboration, and reference rules. Use the linked official instructions for authoritative details rather than treating an instructional example as something to submit. Explaining your own decisions in concrete terms also makes mistakes easier to find: point to the condition, identify the values it receives, and describe the resulting state change."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-1-3-1",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why is a list of session durations a useful data abstraction?",
          "choices": [
            "One algorithm can process a changing number of sessions",
            "It guarantees every duration is valid",
            "It eliminates the need for any algorithm",
            "It always makes a program run in constant time"
          ],
          "answer": 0,
          "explanation": "A list groups a variable-size collection under one abstraction. It does not automatically validate elements or guarantee a particular running time.",
          "lessonTitle": "1.3 Planning an original program and explaining an abstraction",
          "passage": "Original instructional setup. Define countAtLeast(values, minimum) to return the number of entries in values that are greater than or equal to minimum."
        },
        {
          "id": "csp-mcq-1-3-2",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What does countAtLeast([10,25,15,30],20) return?",
          "choices": [
            "2",
            "1",
            "3",
            "4"
          ],
          "answer": 0,
          "explanation": "Only25 and30 are at least20. The15-minute session does not satisfy this threshold, so the count is 2.",
          "lessonTitle": "1.3 Planning an original program and explaining an abstraction",
          "passage": "Original instructional setup. Define countAtLeast(values, minimum) to return the number of entries in values that are greater than or equal to minimum."
        },
        {
          "id": "csp-mcq-1-3-3",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which second call best demonstrates a different threshold outcome on the same list?",
          "choices": [
            "countAtLeast([10,25,15,30],15)",
            "The exact same call with 20 again",
            "A call that never uses minimum",
            "Changing only a comment"
          ],
          "answer": 0,
          "explanation": "A threshold of 15 includes the15-minute session and changes the result to 3. This illustrates a meaningful parameter effect.",
          "lessonTitle": "1.3 Planning an original program and explaining an abstraction",
          "passage": "Original instructional setup. Define countAtLeast(values, minimum) to return the number of entries in values that are greater than or equal to minimum."
        },
        {
          "id": "csp-mcq-1-3-4",
          "domain": "CSP: Creative Development",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which replacement preserves the test value ≥ minimum for every numeric value?",
          "choices": [
            "NOT(value < minimum)",
            "value > minimum",
            "value = minimum only",
            "value < minimum"
          ],
          "answer": 0,
          "explanation": "Not being less than the threshold is equivalent to being greater than or equal to it. A strict greater-than test incorrectly excludes equality; an equality-only test excludes larger entries.",
          "lessonTitle": "1.3 Planning an original program and explaining an abstraction",
          "passage": "Original instructional setup. Define countAtLeast(values, minimum) to return the number of entries in values that are greater than or equal to minimum."
        }
      ]
    },
    {
      "id": "csp-lesson-2-1",
      "title": "2.1 Bits, number representation, and digital media",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Bits, number representation, and digital media"
        },
        {
          "type": "subheading",
          "text": "Use place value deliberately"
        },
        {
          "type": "text",
          "text": "A bit has two possible values, usually written0 and1. A sequence of n bits can represent2^n distinct patterns. In unsigned binary, place values double from right to left:1,2,4,8,16 and so on. The pattern10110 therefore represents16+4+2=22. A byte contains8bits, giving256 patterns. The same bit pattern can represent a number, a character, a color value, or an instruction depending on an agreed encoding. Bits themselves do not carry a universal meaning independent of that interpretation."
        },
        {
          "type": "subheading",
          "text": "Distinguish range from precision"
        },
        {
          "type": "text",
          "text": "A fixed-width unsigned8-bit integer can represent values0 through255. Adding1 to 255 requires a ninth bit; a fixed-width system must handle that overflow according to its rules. Do not assume a particular wraparound behavior unless the problem specifies it. Using more bits increases representable possibilities. For fractional values, a finite representation can introduce rounding error because not every real number has an exact finite encoding. An arithmetic result that is slightly different from its ideal mathematical value may reflect representational limits, not a random failure to perform addition."
        },
        {
          "type": "subheading",
          "text": "Worked storage calculation"
        },
        {
          "type": "text",
          "text": "An uncompressed image has 100pixels across and80pixels down, with 24bits per pixel and no metadata. It contains100×80=8000pixels, so its pixel data requires8000×24=192000bits. Divide by 8 to obtain24000bytes. If both dimensions double while color depth remains24bits, the pixel count becomes200×160=32000, four times the original, and storage becomes96000bytes. Doubling both dimensions is not merely doubling the number of pixels. File headers or compression would change an actual file size, so this calculation states its assumptions."
        },
        {
          "type": "subheading",
          "text": "Represent sound, images, and text"
        },
        {
          "type": "text",
          "text": "Digitizing an analog signal involves sampling at discrete intervals and representing measurements with a finite number of bits. Increasing a sound sample rate records more samples per second; increasing bit depth permits more levels per sample. These changes usually increase uncompressed storage, holding other conditions fixed. Text encodings map characters to numeric patterns, but one character need not always occupy one byte. An image’s dimensions, time stamp, or camera model can be metadata: data describing the content or its creation. Metadata can be useful and can also reveal information a user did not intend to share."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-2-1-1",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What decimal value is unsigned binary10110?",
          "choices": [
            "22",
            "20",
            "26",
            "10110"
          ],
          "answer": 0,
          "explanation": "The1bits occupy the16,4,and2 places. Adding16+4+2 gives22; the decimal-looking digits should not be read as base ten.",
          "lessonTitle": "2.1 Bits, number representation, and digital media"
        },
        {
          "id": "csp-mcq-2-1-2",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "How many distinct patterns can6bits represent?",
          "choices": [
            "64",
            "6",
            "12",
            "63"
          ],
          "answer": 0,
          "explanation": "Each bit has 2choices, so6bits have2^6=64 patterns. An unsigned range may run0–63, but it still contains64 values.",
          "lessonTitle": "2.1 Bits, number representation, and digital media"
        },
        {
          "id": "csp-mcq-2-1-3",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "How many bytes are needed for 100×80pixels at 24bits per pixel, ignoring all overhead?",
          "choices": [
            "24000",
            "192000",
            "8000",
            "3000"
          ],
          "answer": 0,
          "explanation": "There are 8000pixels and192000bits. Eight bits make one byte, so192000/8=24000bytes.",
          "lessonTitle": "2.1 Bits, number representation, and digital media"
        },
        {
          "id": "csp-mcq-2-1-4",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Both dimensions of an image double while bits per pixel stay fixed. What happens to uncompressed pixel storage?",
          "choices": [
            "It becomes four times as large",
            "It doubles",
            "It stays constant",
            "It becomes half as large"
          ],
          "answer": 0,
          "explanation": "Area is the product of width and height. Multiplying each dimension by 2 multiplies their product and pixel storage by 4.",
          "lessonTitle": "2.1 Bits, number representation, and digital media"
        }
      ]
    },
    {
      "id": "csp-lesson-2-2",
      "title": "2.2 Compression and the tradeoff between size and fidelity",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Compression and the tradeoff between size and fidelity"
        },
        {
          "type": "subheading",
          "text": "Define the reconstruction requirement"
        },
        {
          "type": "text",
          "text": "Compression represents information using fewer bits than a chosen original representation. A lossless method permits exact reconstruction of the original data. A lossy method discards some information so that reconstruction is an approximation. Decide which changes are acceptable for the task before comparing file sizes. A slightly changed music recording may still meet a listener’s needs, whereas a changed digit in a program or financial table can make the data unusable. Lossy and lossless describe recoverability, not whether a file is encrypted or attractive."
        },
        {
          "type": "subheading",
          "text": "Exploit patterns, but count the overhead"
        },
        {
          "type": "text",
          "text": "A simple run-length encoding might representAAAAABB as5A2B when the scheme’s rules are specified. Repeated symbols create an opportunity to save space. However, separators, count fields, and dictionaries also require storage. A method that compresses one file need not compress every file; short or pattern-poor input can become larger. A dictionary-based scheme replaces repeated sequences with references. To reconstruct the exact original, the receiver must know the encoding rules and any required dictionary. Compression is not a universal guarantee of a shorter output for every possible bit string."
        },
        {
          "type": "subheading",
          "text": "Worked comparison"
        },
        {
          "type": "text",
          "text": "An original file requires120000bytes. MethodL produces60000bytes and reconstructs every original bit. MethodM produces30000bytes but approximates some image colors. L is lossless and reduces size by 50%. M is lossy and reduces size by 75%. The fact that M is smaller does not make it preferable for an application that requires exact recovery. To compute percentage reduction, divide the saved bytes by the original bytes: for M,(120000−30000)/120000=0.75. Dividing by the compressed size instead answers a different question."
        },
        {
          "type": "subheading",
          "text": "Choose a representation for a purpose"
        },
        {
          "type": "text",
          "text": "Changing a photograph’s dimensions before encoding can remove spatial detail; reducing bit depth can remove distinctions among colors. Repeated lossy recompression can introduce further changes, whereas copying a compressed file bit for bit does not itself create a new round of approximation. A good evaluation names the benefit, such as reduced transmission time or storage, and the cost, such as loss of information relevant to a user’s task. Compression, encryption, and error checking are different operations: a file may be compressed to save space, encrypted to protect confidentiality, and checked to detect corruption."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-2-2-1",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which property defines lossless compression?",
          "choices": [
            "The original data can be reconstructed exactly",
            "The compressed file is always the smallest possible",
            "The file is unreadable without a password",
            "Some original information must be discarded"
          ],
          "answer": 0,
          "explanation": "Lossless concerns exact reconstruction. It does not guarantee optimal size or confidentiality, and it does not require discarding information.",
          "lessonTitle": "2.2 Compression and the tradeoff between size and fidelity"
        },
        {
          "id": "csp-mcq-2-2-2",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A file shrinks from 120000 to 30000bytes. What is the percentage reduction?",
          "choices": [
            "75%",
            "25%",
            "300%",
            "400%"
          ],
          "answer": 0,
          "explanation": "The saved amount is 90000bytes. Divide90000 by the original120000 to obtain0.75, or75% reduction.",
          "lessonTitle": "2.2 Compression and the tradeoff between size and fidelity"
        },
        {
          "id": "csp-mcq-2-2-3",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why can a run-length scheme enlarge a pattern-poor file?",
          "choices": [
            "Counts and other encoding overhead can exceed the savings",
            "Every compression scheme always discards information",
            "A byte stops containing8bits",
            "Exact recovery requires an internet connection"
          ],
          "answer": 0,
          "explanation": "When runs are short, recording a count for each run may add more bits than the scheme saves. The result depends on the input and encoding rules.",
          "lessonTitle": "2.2 Compression and the tradeoff between size and fidelity"
        },
        {
          "id": "csp-mcq-2-2-4",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which task most clearly requires exact recovery rather than approximate recovery?",
          "choices": [
            "Restoring executable program code",
            "Making a small thumbnail for casual browsing",
            "Streaming background music where some quality loss is accepted",
            "Creating a quick low-detail image preview"
          ],
          "answer": 0,
          "explanation": "A changed code bit can alter instructions or invalidate a program. Approximation may be acceptable for specified media tasks, but not for exact code restoration.",
          "lessonTitle": "2.2 Compression and the tradeoff between size and fidelity"
        }
      ]
    },
    {
      "id": "csp-lesson-2-3",
      "title": "2.3 From raw data to a defensible conclusion",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "From raw data to a defensible conclusion"
        },
        {
          "type": "subheading",
          "text": "Plan a data investigation"
        },
        {
          "type": "text",
          "text": "Data are recorded observations; information is meaning derived by interpreting or organizing them. Begin with a question and identify the records, variables, and units that would address it. A large dataset is not automatically representative or accurate. A weather app’s reports may come mainly from neighborhoods with more connected devices, leaving other areas underrepresented. A visualization can make a pattern easier to see, but a convincing display cannot repair biased data collection or establish causation by itself."
        },
        {
          "type": "subheading",
          "text": "Transform data without hiding decisions"
        },
        {
          "type": "text",
          "text": "Cleaning can include standardizing units, correcting known recording errors, handling missing values, and identifying duplicates. A missing measurement is not necessarily zero. Removing an unusual value requires a reason connected to data quality or the research question; deleting every inconvenient result can create bias. Combining datasets requires compatible field definitions and careful matching. A postal code stored as a number may lose leading zeros even though it is an identifier rather than a quantity. Keep enough documentation to explain how a raw record became a value in the final analysis."
        },
        {
          "type": "subheading",
          "text": "Worked example: means and missing records"
        },
        {
          "type": "text",
          "text": "A hypothetical class survey records daily minutes of reading as20,30,40, and one blank. The mean of the three observed values is (20+30+40)/3=30minutes. Replacing the blank with zero would produce22.5minutes, which silently assumes that the missing respondent read nothing. If less-active students were more likely to leave the field blank, simply ignoring missing responses might also bias an estimate of the whole class. Report the observed mean and the response limitation instead of pretending either choice resolves uncertainty automatically."
        },
        {
          "type": "subheading",
          "text": "Describe association at the right level"
        },
        {
          "type": "text",
          "text": "Suppose neighborhoods with more app users also report more cycling trips. This can reflect more cycling, more reporting, or both. A correlation between those quantities does not isolate a causal effect of the app. Aggregating can protect privacy and reveal broad patterns but can hide important subgroup differences; removing names alone may not prevent re-identification when records can be combined with other sources. A useful conclusion includes what the data show, what assumptions support it, and what additional evidence would test competing explanations. Computing makes analysis scalable, not automatically valid."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-2-3-1",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "For observed values20,30,40 and one missing value, what is the mean of the observed values?",
          "choices": [
            "30",
            "22.5",
            "90",
            "40"
          ],
          "answer": 0,
          "explanation": "The observed sum is 90 across3measurements, so the observed mean is 30. Dividing by 4 treats the blank as though it were a measured value.",
          "lessonTitle": "2.3 From raw data to a defensible conclusion"
        },
        {
          "id": "csp-mcq-2-3-2",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why is replacing every missing response with zero potentially misleading?",
          "choices": [
            "A missing response does not establish a measured value of zero",
            "Zero cannot be stored digitally",
            "Missing responses always equal the mean",
            "A spreadsheet cannot calculate a mean"
          ],
          "answer": 0,
          "explanation": "Zero is a substantive numerical value. Substituting it for missingness adds an assumption that may change a conclusion.",
          "lessonTitle": "2.3 From raw data to a defensible conclusion"
        },
        {
          "id": "csp-mcq-2-3-3",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A very large dataset comes only from app users in wealthy neighborhoods. Which concern remains?",
          "choices": [
            "The sample may underrepresent other neighborhoods",
            "Large size guarantees population representativeness",
            "Bias disappears when a graph is drawn",
            "Every observed association must be causal"
          ],
          "answer": 0,
          "explanation": "Sample size can reduce some random uncertainty without eliminating selection bias. Who is included still matters.",
          "lessonTitle": "2.3 From raw data to a defensible conclusion"
        },
        {
          "id": "csp-mcq-2-3-4",
          "domain": "CSP: Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Removing names from location records guarantees complete anonymity. How should this claim be evaluated?",
          "choices": [
            "It is too strong because other fields or linked datasets may permit re-identification",
            "It is always true for any dataset",
            "It is true only if the file is compressed",
            "It follows from the number of records alone"
          ],
          "answer": 0,
          "explanation": "Combinations of quasi-identifiers and outside information can identify people even after direct names are removed. Anonymity requires more than deleting one field.",
          "lessonTitle": "2.3 From raw data to a defensible conclusion"
        }
      ]
    },
    {
      "id": "csp-lesson-3-1",
      "title": "3.1 Variables, expressions, Boolean logic, and selection",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Variables, expressions, Boolean logic, and selection"
        },
        {
          "type": "subheading",
          "text": "An assignment changes stored state"
        },
        {
          "type": "text",
          "text": "A variable names a location or abstraction holding a value. In the pseudocode used here, ← means assignment and = means comparison. For x ← 4 followed by x ← x + 3, the second instruction reads the old value4, computes7, then replaces x with 7. Instructions execute in sequence unless a control structure changes that order. Parentheses make the intended grouping explicit. Arithmetic operators such as addition and multiplication differ from Boolean operators, which combine conditions into true or false results."
        },
        {
          "type": "subheading",
          "text": "Translate the condition exactly"
        },
        {
          "type": "text",
          "text": "A Boolean expression evaluates to true or false. AND is true only when both combined conditions are true; OR is true when at least one is true; NOT reverses a Boolean value. To allow ages from 13 through17 inclusive, use(age ≥ 13) AND(age ≤ 17). Using OR would admit nearly every age because a very young value is still at most17, while a very old value is at least13. An IF–ELSE structure chooses one of two paths. Two separate IF statements are not equivalent when both conditions can be true."
        },
        {
          "type": "subheading",
          "text": "Worked trace with two assignments"
        },
        {
          "type": "text",
          "text": "Start a ← 5 and b ← 2. After a ← a + b, a is 7 and b remains2. After b ← a − b, b becomes5 because the expression uses the current a, now7. The final pair is (7,5), not(7,3) and not(5,2). A trace table with one row after each instruction makes the dependency visible. If an IF condition now tests(a > b), it is true, so only the matching branch of an IF–ELSE executes."
        },
        {
          "type": "subheading",
          "text": "Test logic at the boundaries"
        },
        {
          "type": "text",
          "text": "For a discount offered when age < 12 OR age ≥ 65, check ages11,12,64,and65. These four cases distinguish strict from inclusive comparisons and separate the two eligible groups. A test suite containing only age30 would not expose either endpoint. When explaining an algorithm, state the relevant current values and why the condition is true or false, then identify the resulting branch. Avoid saying merely “the IF runs”: the condition is evaluated, but its body runs only when that condition is true. Clear names help, but names alone do not enforce a variable’s meaning."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-3-1-1",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "After a←5; b←2; a←a+b; b←a−b, what are (a,b)?",
          "choices": [
            "(7,5)",
            "(7,3)",
            "(5,2)",
            "(2,5)"
          ],
          "answer": 0,
          "explanation": "Assignments occur sequentially. The final b uses the updated a=7, so b=7−2=5.",
          "lessonTitle": "3.1 Variables, expressions, Boolean logic, and selection"
        },
        {
          "id": "csp-mcq-3-1-2",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which condition admits exactly ages13 through17 inclusive?",
          "choices": [
            "(age≥13) AND(age≤17)",
            "(age≥13) OR(age≤17)",
            "age>13 AND age<17",
            "NOT(age≥13)"
          ],
          "answer": 0,
          "explanation": "Both lower and upper bounds must hold, and equality must be permitted at 13 and17. AND combines the required restrictions.",
          "lessonTitle": "3.1 Variables, expressions, Boolean logic, and selection"
        },
        {
          "id": "csp-mcq-3-1-3",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "For P=true and Q=false, what is P AND(NOT Q)?",
          "choices": [
            "true",
            "false",
            "Undefined for Boolean values",
            "The number2"
          ],
          "answer": 0,
          "explanation": "NOT Q is true because Q is false. Both operands of AND are then true, so the combined result is true.",
          "lessonTitle": "3.1 Variables, expressions, Boolean logic, and selection"
        },
        {
          "id": "csp-mcq-3-1-4",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why can two separate IF statements differ from IF–ELSE?",
          "choices": [
            "Both IF bodies can execute when both conditions hold",
            "IF–ELSE always executes both bodies",
            "Separate IF statements ignore their conditions",
            "An ELSE statement repeats forever"
          ],
          "answer": 0,
          "explanation": "Independent IF statements evaluate independently. IF–ELSE selects one of two alternatives based on a single condition.",
          "lessonTitle": "3.1 Variables, expressions, Boolean logic, and selection"
        }
      ]
    },
    {
      "id": "csp-lesson-3-2",
      "title": "3.2 Lists, indices, traversals, and data abstraction",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Lists, indices, traversals, and data abstraction"
        },
        {
          "type": "subheading",
          "text": "State the indexing rules"
        },
        {
          "type": "text",
          "text": "A list stores an ordered collection of values. In this course’s AP-style pseudocode, the first list position is 1. LENGTH(items) gives the number of elements. APPEND(items,value) adds a value at the end. INSERT(items,i,value) places a value at position i and shifts later elements right; REMOVE(items,i) deletes that position and shifts later elements left. Other languages may start indices at 0, so use the conventions specified in the question rather than importing a familiar language’s rules."
        },
        {
          "type": "subheading",
          "text": "Distinguish an index from an element"
        },
        {
          "type": "text",
          "text": "For names=[\"Ada\",\"Grace\",\"Katherine\"], the index2 selects the element\"Grace\". A loop FOR EACH name IN names visits elements; it does not necessarily give you their indices. A traversal examines the list systematically, often accumulating a sum, count, maximum, or filtered result. Initialize an accumulator before the traversal. When finding a maximum, using the first element as the initial maximum requires a nonempty list; initializing to zero fails for a list containing only negative values unless zero has some special meaning in the specification."
        },
        {
          "type": "subheading",
          "text": "Worked list mutation"
        },
        {
          "type": "text",
          "text": "Begin nums=[4,7,9]. INSERT(nums,2,5) produces[4,5,7,9]. Then REMOVE(nums,3) removes7, not9, because insertion changed the positions. The list is now[4,5,9]. APPEND(nums,2) produces[4,5,9,2], whose length is 4. A diagram or trace showing the full list after each mutation is safer than tracking positions mentally. If a program removes elements while traversing by increasing index, shifted elements may be skipped; a revised iteration plan must account for those shifts."
        },
        {
          "type": "subheading",
          "text": "Explain what complexity is being managed"
        },
        {
          "type": "text",
          "text": "A list abstraction allows one loop to process a collection whose size may change. Without it, a programmer might need separate variables and repeated statements for a fixed number of entries. The list does not automatically make every operation efficient or every value valid; it simplifies how the program represents and processes the collection. To explain a filter, name its selection condition and show which elements are copied to the result. For data=[−2,4,0,7] and condition value>0, the result is[4,7]; zero does not pass. Test empty input, no matches, and all matches because each can reveal a different assumption."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-3-2-1",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Using1-based indexing, what is items[2] for items=[8,3,6]?",
          "choices": [
            "3",
            "8",
            "6",
            "2"
          ],
          "answer": 0,
          "explanation": "The first position holds8 and the second holds3. The index specifies a position, not the value to search for.",
          "lessonTitle": "3.2 Lists, indices, traversals, and data abstraction"
        },
        {
          "id": "csp-mcq-3-2-2",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "After INSERT(nums,2,5) and then REMOVE(nums,3) on[4,7,9], what remains?",
          "choices": [
            "[4,5,9]",
            "[4,7,9]",
            "[4,5,7]",
            "[5,7,9]"
          ],
          "answer": 0,
          "explanation": "Insertion first gives[4,5,7,9]. Position3 then holds7, which is removed, leaving[4,5,9].",
          "lessonTitle": "3.2 Lists, indices, traversals, and data abstraction"
        },
        {
          "id": "csp-mcq-3-2-3",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What is the result of filtering[−2,4,0,7] for values strictly greater than0?",
          "choices": [
            "[4,7]",
            "[4,0,7]",
            "[−2,4,0,7]",
            "[−2]"
          ],
          "answer": 0,
          "explanation": "The positive entries4 and7 satisfy value>0. Zero fails the strict comparison, and−2 is negative.",
          "lessonTitle": "3.2 Lists, indices, traversals, and data abstraction"
        },
        {
          "id": "csp-mcq-3-2-4",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A maximum-finding algorithm starts max←0. Which nonempty input exposes a problem?",
          "choices": [
            "[−8,−3,−6]",
            "[1,2,3]",
            "[0,4,9]",
            "[5]"
          ],
          "answer": 0,
          "explanation": "All entries are below0, so a comparison that only replaces max with a larger entry incorrectly returns0 instead of−3.",
          "lessonTitle": "3.2 Lists, indices, traversals, and data abstraction"
        }
      ]
    },
    {
      "id": "csp-lesson-3-3",
      "title": "3.3 Iteration, termination, and simulation",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Iteration, termination, and simulation"
        },
        {
          "type": "subheading",
          "text": "Know when the condition is checked"
        },
        {
          "type": "text",
          "text": "Iteration repeats a block of instructions. REPEAT n TIMES executes its body n times for a nonnegative integer n. In the AP-style convention used here, REPEAT UNTIL(condition) checks its stopping condition before each possible execution; if the condition is initially true, the body executes zero times. A FOR EACH traversal repeats once for each element visited. Decide which form matches the task, then trace the state that controls continuation. A loop may fail to terminate when its body never moves the controlling state toward the stopping condition."
        },
        {
          "type": "subheading",
          "text": "Count updates, not just visible values"
        },
        {
          "type": "text",
          "text": "Consider x←1; REPEAT UNTIL(x>8){x←2*x}. The condition is initially false. The successive updated values are 2,4,8,and16. Four executions occur, and the next condition check is true. If the condition were x≥8, only three executions would occur. An off-by-one error often results from counting the initial value as an execution or overlooking the final update that makes the condition true. Trace the condition separately from the body, especially when two variables change or an index is advanced before a list access."
        },
        {
          "type": "subheading",
          "text": "Worked random simulation"
        },
        {
          "type": "text",
          "text": "Assume RANDOM(1,6) returns each integer from 1 through6 with equal probability, independently across calls. To simulate a die, store one call’s result per roll. A condition roll≤2 represents a probability2/6=1/3 event. Repeat many trials and divide the number of successes by the total trials to estimate the event’s probability. Ten successes in thirty trials is consistent with that probability but does not guarantee exactly one success in every three consecutive rolls. Random variation remains possible, and a new run can produce a different estimate."
        },
        {
          "type": "subheading",
          "text": "Interpret a simulation as a model"
        },
        {
          "type": "text",
          "text": "A simulation models selected aspects of a process; its assumptions determine what its results mean. A model of customer arrivals might ignore weather, holidays, or capacity limits, so an apparently precise output is not automatically a precise forecast. Increasing the number of trials often reduces random fluctuation in an estimated average but does not repair an incorrect model or biased input. Compare the simulated mechanism with the real event: independent die calls do not model a process in which outcomes affect later probabilities. Document the meaning of each random outcome and distinguish a model result from an observed fact about the world."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-3-3-1",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "For x←1; REPEAT UNTIL(x>8){x←2*x}, how many body executions occur?",
          "choices": [
            "4",
            "3",
            "5",
            "8"
          ],
          "answer": 0,
          "explanation": "The updated values are 2,4,8,16. The condition x>8 becomes true after the fourth execution.",
          "lessonTitle": "3.3 Iteration, termination, and simulation",
          "passage": "Original instructional setup. For these AP-style pseudocode questions, REPEAT UNTIL checks its stopping condition before a possible body execution; RANDOM(a,b) returns each integer from a through b equally likely."
        },
        {
          "id": "csp-mcq-3-3-2",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A REPEAT UNTIL loop has an initially true condition under the stated AP-style convention. How many times does its body run?",
          "choices": [
            "0",
            "1",
            "Exactly2",
            "It must run forever"
          ],
          "answer": 0,
          "explanation": "The stopping condition is tested before a possible execution. An initially satisfied stopping condition prevents entry.",
          "lessonTitle": "3.3 Iteration, termination, and simulation",
          "passage": "Original instructional setup. For these AP-style pseudocode questions, REPEAT UNTIL checks its stopping condition before a possible body execution; RANDOM(a,b) returns each integer from a through b equally likely."
        },
        {
          "id": "csp-mcq-3-3-3",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "For a fair RANDOM(1,6), what probability is modeled by result≤2?",
          "choices": [
            "1/3",
            "1/2",
            "1/6",
            "2/3"
          ],
          "answer": 0,
          "explanation": "Two equally likely outcomes,1 and2, out of six satisfy the condition, giving2/6=1/3.",
          "lessonTitle": "3.3 Iteration, termination, and simulation",
          "passage": "Original instructional setup. For these AP-style pseudocode questions, REPEAT UNTIL checks its stopping condition before a possible body execution; RANDOM(a,b) returns each integer from a through b equally likely."
        },
        {
          "id": "csp-mcq-3-3-4",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "More simulation trials produce a stable result from an unrealistic model. What remains a valid concern?",
          "choices": [
            "The model’s assumptions may still make the result misleading",
            "More trials guarantee the assumptions are true",
            "Random variation is the only possible source of error",
            "A stable simulation proves every real-world outcome"
          ],
          "answer": 0,
          "explanation": "Trial count can reduce random variability while leaving systematic model error unchanged. Reliability of repetition is not the same as model validity.",
          "lessonTitle": "3.3 Iteration, termination, and simulation",
          "passage": "Original instructional setup. For these AP-style pseudocode questions, REPEAT UNTIL checks its stopping condition before a possible body execution; RANDOM(a,b) returns each integer from a through b equally likely."
        }
      ]
    },
    {
      "id": "csp-lesson-3-4",
      "title": "3.4 Procedures, parameters, and reusable algorithm design",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Procedures, parameters, and reusable algorithm design"
        },
        {
          "type": "subheading",
          "text": "Separate a definition from a call"
        },
        {
          "type": "text",
          "text": "A procedure definition describes a named group of instructions; a call asks the program to execute it. Parameters are placeholders in the definition, while arguments are values supplied at a call. A procedure may return a result, produce another effect, or both depending on its language and design. RETURN ends the current procedure call and supplies a value when one is specified. Returning a value is not identical to displaying it: a caller can use a returned number in further computation without showing anything on the screen."
        },
        {
          "type": "subheading",
          "text": "Use the parameter in the behavior"
        },
        {
          "type": "text",
          "text": "A procedure countLong(items,threshold) can traverse a list and count values meeting a threshold. The list and threshold are inputs to one reusable algorithm. The abstraction hides the loop’s mechanics from a caller, while the procedure name and contract communicate the useful operation. A parameter that is never used does not meaningfully vary the procedure’s behavior. Explain the condition it changes, the path selected, or the result produced. A reusable procedure need not be shorter on its first use; its benefit includes clarity, consistent behavior, and the ability to revise one definition instead of many duplicated copies."
        },
        {
          "type": "subheading",
          "text": "Worked procedure trace"
        },
        {
          "type": "text",
          "text": "Define PROCEDURE bonus(score){IF(score≥80){RETURN10} ELSE{RETURN3}}. For result←2+bonus(75), the argument75 is supplied to score. The condition is false, so the procedure returns3. The caller then computes2+3 and stores5 in result. For bonus(80), equality satisfies the condition and the return value is 10. If an instruction followed both RETURN statements inside the procedure, neither call would reach that instruction. Trace a call from argument binding through selection to the returned value before resuming the caller."
        },
        {
          "type": "subheading",
          "text": "Reason about a contract and test cases"
        },
        {
          "type": "text",
          "text": "An input contract may require a nonempty list or a numeric threshold. State those assumptions explicitly instead of claiming every possible input is meaningful. To test the bonus procedure, use values below, at, and above80. To test a counting procedure, use no qualifying elements, all qualifying elements, and an empty list if allowed. Different arguments can lead to the same output, so two different calls do not automatically demonstrate different branches. Compare the actual condition values. When debugging, first test the procedure in isolation and then test how its caller uses the returned value; a correct helper can still be misused by another part of the program."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-3-4-1",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A procedure returns3 when called with 75. What is stored by result←2+bonus(75)?",
          "choices": [
            "5",
            "3",
            "10",
            "75"
          ],
          "answer": 0,
          "explanation": "The caller substitutes the returned3 into its expression and computes2+3=5. A return is a value available to the caller.",
          "lessonTitle": "3.4 Procedures, parameters, and reusable algorithm design",
          "passage": "Original instructional setup. PROCEDURE bonus(score) returns 10 if score ≥ 80 and otherwise returns 3."
        },
        {
          "id": "csp-mcq-3-4-2",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What distinguishes an argument from a parameter?",
          "choices": [
            "An argument is supplied at a call; a parameter is named in the definition",
            "They are both always global variables",
            "A parameter is displayed output only",
            "Arguments can never be lists"
          ],
          "answer": 0,
          "explanation": "The definition provides a parameter placeholder. A call supplies an argument value for that placeholder.",
          "lessonTitle": "3.4 Procedures, parameters, and reusable algorithm design",
          "passage": "Original instructional setup. PROCEDURE bonus(score) returns 10 if score ≥ 80 and otherwise returns 3."
        },
        {
          "id": "csp-mcq-3-4-3",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "For the example procedure, which input tests the exact branch boundary?",
          "choices": [
            "80",
            "75 only",
            "0 only",
            "A comment containing80"
          ],
          "answer": 0,
          "explanation": "The comparison is score≥80. Input80 determines whether equality enters the intended branch.",
          "lessonTitle": "3.4 Procedures, parameters, and reusable algorithm design",
          "passage": "Original instructional setup. PROCEDURE bonus(score) returns 10 if score ≥ 80 and otherwise returns 3."
        },
        {
          "id": "csp-mcq-3-4-4",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Two calls use different arguments but return the same value. Which conclusion is warranted?",
          "choices": [
            "They may have executed the same branch",
            "They must execute different branches",
            "The procedure cannot contain selection",
            "A runtime error must have occurred"
          ],
          "answer": 0,
          "explanation": "Different input values can satisfy the same condition and produce the same output. Trace the condition before inferring a path difference.",
          "lessonTitle": "3.4 Procedures, parameters, and reusable algorithm design",
          "passage": "Original instructional setup. PROCEDURE bonus(score) returns 10 if score ≥ 80 and otherwise returns 3."
        }
      ]
    },
    {
      "id": "csp-lesson-3-5",
      "title": "3.5 Searching, efficiency, and limits of algorithms",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Searching, efficiency, and limits of algorithms"
        },
        {
          "type": "subheading",
          "text": "Match the search to the data"
        },
        {
          "type": "text",
          "text": "A linear search examines elements one at a time and can operate on an unsorted list. In the worst case, it may need to inspect all n elements. A binary search repeatedly compares with a middle element and discards about half of a sorted search interval. It requires an appropriate ordering; applying the same elimination rule to an unsorted list can discard a region containing the target. Sorting first also requires work, so a search comparison should explain whether the list is already sorted and whether many searches will reuse that order."
        },
        {
          "type": "subheading",
          "text": "Count growth rather than machine speed alone"
        },
        {
          "type": "text",
          "text": "Efficiency compares required resources as input size grows, often by counting relevant operations. If an algorithm makes n comparisons, doubling n roughly doubles that comparison count. If it examines all ordered pairs with two full nested n-step loops, the count is n² and doubling n multiplies it by 4. An algorithm with logarithmic growth reduces the remaining search space by a constant factor each step. Exact elapsed time also depends on hardware and implementation, but a faster processor does not change an algorithm’s underlying growth pattern."
        },
        {
          "type": "subheading",
          "text": "Worked binary search reasoning"
        },
        {
          "type": "text",
          "text": "A sorted list has 64elements. Each comparison can eliminate about half of the remaining positions. After six halvings, one candidate position remains because64/2^6=1. Checking that final candidate may require an additional comparison, depending on the search implementation. This is why a claim of “exactly six comparisons for every64-element search” is too strong. The central lesson is logarithmic growth, not a universal exact count independent of implementation and target location. A trace should show lower bound, upper bound, middle position, and the comparison result."
        },
        {
          "type": "subheading",
          "text": "Know what computation can and cannot promise"
        },
        {
          "type": "text",
          "text": "A heuristic is a strategy used to obtain a useful answer without a general guarantee of an exact optimal solution. It can make a difficult problem manageable but may miss the best answer. An undecidable problem has no algorithm that produces the required correct yes-or-no answer for every possible input; this is different from a solvable problem that is merely too slow for current resources. Parallel computation can speed some work but cannot turn an undecidable general problem into a decidable one. Evaluate a solution using both correctness assumptions and resource demands rather than treating “computer-generated” as a guarantee."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-3-5-1",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which condition is needed for the usual binary search elimination rule?",
          "choices": [
            "The data must be sorted according to the search order",
            "Every element must be the same",
            "The list must contain exactly64elements",
            "The list must use decimal numbers only"
          ],
          "answer": 0,
          "explanation": "Binary search discards intervals based on order. Without a sorted order, a discarded interval may contain the desired value.",
          "lessonTitle": "3.5 Searching, efficiency, and limits of algorithms"
        },
        {
          "id": "csp-mcq-3-5-2",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Two nested loops each execute n times independently. How many inner-body executions occur?",
          "choices": [
            "n²",
            "2n",
            "n+2",
            "logarithmic in n"
          ],
          "answer": 0,
          "explanation": "For each of n outer iterations, all n inner iterations run, giving n×n=n² executions.",
          "lessonTitle": "3.5 Searching, efficiency, and limits of algorithms"
        },
        {
          "id": "csp-mcq-3-5-3",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What happens to n² when input size doubles from n to 2n?",
          "choices": [
            "It becomes4n²",
            "It becomes2n²",
            "It remains n²",
            "It becomes n²/2"
          ],
          "answer": 0,
          "explanation": "Substitute2n into the expression: (2n)²=4n². Squaring multiplies both factors by 2.",
          "lessonTitle": "3.5 Searching, efficiency, and limits of algorithms"
        },
        {
          "id": "csp-mcq-3-5-4",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which description correctly identifies an undecidable problem?",
          "choices": [
            "No algorithm solves the required decision task correctly for every possible input",
            "An existing correct algorithm runs slowly on a laptop",
            "A program contains a syntax error",
            "The answer is inconvenient to display"
          ],
          "answer": 0,
          "explanation": "Undecidability concerns the absence of an algorithm for the general decision task, not merely practical resource limits for a solvable one.",
          "lessonTitle": "3.5 Searching, efficiency, and limits of algorithms"
        }
      ]
    },
    {
      "id": "csp-lesson-3-6",
      "title": "3.6 Combining algorithms and evaluating a model",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Combining algorithms and evaluating a model"
        },
        {
          "type": "subheading",
          "text": "Build a pipeline of understandable steps"
        },
        {
          "type": "text",
          "text": "A larger program often combines smaller algorithms: read data, validate it, transform it, select relevant entries, and summarize the result. State what each step consumes and produces. An abstraction boundary is useful when a caller can rely on a procedure’s contract without duplicating its internal logic. However, a pipeline is only as reliable as its assumptions. Converting an invalid measurement into a number without checking its meaning can make every later calculation syntactically valid but substantively misleading."
        },
        {
          "type": "subheading",
          "text": "Compare equivalent methods on valid inputs"
        },
        {
          "type": "text",
          "text": "Two algorithms are equivalent for a specified task when they produce the required same behavior for every allowed input, not just for one example. To compare a loop that counts positives with a procedure that filters positives and then takes the filtered length, examine their conditions. Both should use value>0 if zero is excluded. A single counterexample can show they are not equivalent: if the filter uses value≥0, the list[0] produces1 for that method and0 for the strict counter. Agreement on lists containing no zero does not repair the difference."
        },
        {
          "type": "subheading",
          "text": "Worked model evaluation"
        },
        {
          "type": "text",
          "text": "A hypothetical library model simulates a queue using fixed two-minute service times. It predicts that every ten visitors require exactly twenty minutes of service. Real visits vary: returning a book may take less time than finding a new membership record. A model that uses random service times from realistic observations can explore variability, but it still makes assumptions about independence, staff availability, and interruptions. Compare predictions with observed queue lengths, inspect systematic errors, and revise the mechanism. Matching one quiet afternoon does not establish validity during a crowded event."
        },
        {
          "type": "subheading",
          "text": "Write an explanation someone else can check"
        },
        {
          "type": "text",
          "text": "Use a small concrete input to explain a pipeline, then discuss the general mechanism. For an original list[2,−1,5,0], a positive filter returns[2,5] and a sum procedure returns7. Explain why the loop includes2 and5 and excludes−1 and0. A trace supports the example, while the condition and traversal explain why the method generalizes. Discuss reasonable failure cases such as missing records or a nonnumeric entry rather than promising the algorithm handles unspecified input. The goal is a defensible chain of reasoning connecting representation, algorithm, and output."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-3-6-1",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A strict positive counter and a nonnegative filter agree on[2,5]. Which input exposes their difference?",
          "choices": [
            "[0]",
            "[1]",
            "[2,3]",
            "[−1]"
          ],
          "answer": 0,
          "explanation": "Zero fails value>0 but satisfies value≥0. It therefore distinguishes the two algorithms immediately.",
          "lessonTitle": "3.6 Combining algorithms and evaluating a model"
        },
        {
          "id": "csp-mcq-3-6-2",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Filtering[2,−1,5,0] for positive values and then summing gives what result?",
          "choices": [
            "7",
            "6",
            "8",
            "0"
          ],
          "answer": 0,
          "explanation": "The retained values are 2 and5. Their sum is 7; neither−1 nor0 is retained by the strict condition.",
          "lessonTitle": "3.6 Combining algorithms and evaluating a model"
        },
        {
          "id": "csp-mcq-3-6-3",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A fixed-service-time queue model matches one quiet afternoon. What follows?",
          "choices": [
            "It needs further validation under varied conditions",
            "It is proven valid for all demand levels",
            "All real service times are identical",
            "A random model can never improve it"
          ],
          "answer": 0,
          "explanation": "One agreement is limited evidence. Testing different demand conditions can reveal missing mechanisms or unrealistic assumptions.",
          "lessonTitle": "3.6 Combining algorithms and evaluating a model"
        },
        {
          "id": "csp-mcq-3-6-4",
          "domain": "CSP: Algorithms & Programming",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why are procedure contracts useful in a pipeline?",
          "choices": [
            "They state what each step expects and produces",
            "They guarantee all raw data are accurate",
            "They eliminate every possible implementation error",
            "They require the program to use the internet"
          ],
          "answer": 0,
          "explanation": "Contracts make the connection between steps explicit. They support reasoning but do not replace data validation or testing.",
          "lessonTitle": "3.6 Combining algorithms and evaluating a model"
        }
      ]
    },
    {
      "id": "csp-lesson-4-1",
      "title": "4.1 The internet, packets, and fault-tolerant routing",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "The internet, packets, and fault-tolerant routing"
        },
        {
          "type": "subheading",
          "text": "Distinguish the network from its applications"
        },
        {
          "type": "text",
          "text": "A computer network connects computing devices so they can communicate. The internet is a network of interconnected networks using shared protocols. The World Wide Web is one application system that uses internet connections to retrieve linked resources; email and other services can use the internet without being the Web. A protocol specifies agreed communication rules. Shared, open standards allow independently developed devices and networks to interoperate, which supports growth without requiring one organization to design every connected component."
        },
        {
          "type": "subheading",
          "text": "Follow a message through the system"
        },
        {
          "type": "text",
          "text": "Information is divided into packets for transmission. Routers forward packets toward a destination using addressing and routing information. Packets from one message need not all follow the same route or arrive in their original order. Redundant paths can allow communication to continue after a link fails, but redundancy does not guarantee that every possible failure is harmless. A network can lose connectivity if enough links or critical components fail. An IP address helps identify a destination or interface in this communication system; it is not the same abstraction as a human-readable domain name."
        },
        {
          "type": "subheading",
          "text": "Worked reliability example"
        },
        {
          "type": "text",
          "text": "A small network connects A to D through either A–B–D or A–C–D. If the B–D link fails while the other links remain available, A can still reach D through C. That alternative route illustrates fault tolerance. If both links entering D fail, no route remains even though the network contains other redundant connections. Count paths using the stated topology, not a blanket rule that two paths make a network invulnerable. A topology describes possible connections; routing protocols determine how the system uses available routes."
        },
        {
          "type": "subheading",
          "text": "Know what a reliability protocol adds"
        },
        {
          "type": "text",
          "text": "IP-style packet delivery alone does not promise arrival, order, or the absence of duplication. TCP adds mechanisms supporting reliable, ordered delivery, including acknowledgments and retransmission when appropriate. UDP does not provide those same reliability guarantees itself, although an application can implement additional behavior. Reliability is distinct from confidentiality: TCP is not, by itself, a promise that message contents are encrypted. When evaluating a statement about a protocol, identify the property being discussed—addressing, delivery, ordering, speed, or privacy—rather than assuming one named protocol supplies every desirable property."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-4-1-1",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which statement correctly relates the Web and the internet?",
          "choices": [
            "The Web is one system of applications using the internet",
            "They are identical terms for the same layer",
            "The internet requires every message to be a web page",
            "Email cannot use the internet"
          ],
          "answer": 0,
          "explanation": "The internet supplies interconnected-network communication. The Web is one application system using that infrastructure; other applications exist.",
          "lessonTitle": "4.1 The internet, packets, and fault-tolerant routing"
        },
        {
          "id": "csp-mcq-4-1-2",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Packets belonging to one message must always use the same route. Which evaluation is correct?",
          "choices": [
            "False; packets may take different routes",
            "True for every internet communication",
            "True because packets contain no addresses",
            "False only when no network exists"
          ],
          "answer": 0,
          "explanation": "Packet-switched networks may route packets independently. The receiving system may need to handle different arrival order or delivery behavior.",
          "lessonTitle": "4.1 The internet, packets, and fault-tolerant routing"
        },
        {
          "id": "csp-mcq-4-1-3",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A–B–D and A–C–D are available. B–D fails. Which route still connects A to D?",
          "choices": [
            "A–C–D",
            "A–B–D",
            "No route is possible",
            "B–C–A without reaching D"
          ],
          "answer": 0,
          "explanation": "The path through C does not depend on the failed B–D link, assuming the links on A–C–D remain available.",
          "lessonTitle": "4.1 The internet, packets, and fault-tolerant routing"
        },
        {
          "id": "csp-mcq-4-1-4",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which property does TCP not provide by itself?",
          "choices": [
            "Encryption of message contents",
            "Mechanisms for ordered delivery",
            "Acknowledgment-related reliability mechanisms",
            "Retransmission-related reliability mechanisms"
          ],
          "answer": 0,
          "explanation": "TCP supports transport reliability and order. Confidentiality normally requires a separate encryption mechanism, such as a secure application-layer protocol.",
          "lessonTitle": "4.1 The internet, packets, and fault-tolerant routing"
        }
      ]
    },
    {
      "id": "csp-lesson-4-2",
      "title": "4.2 Bandwidth, parallel work, and limits on speedup",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Bandwidth, parallel work, and limits on speedup"
        },
        {
          "type": "subheading",
          "text": "Measure rate separately from delay"
        },
        {
          "type": "text",
          "text": "Bandwidth describes a capacity or rate of data transfer, commonly in bits per second. Latency describes delay, such as the time before a response begins. A connection with high bandwidth can still have substantial latency, so downloading a large file and exchanging tiny interactive messages may respond differently to the same network change. Compare units carefully: an eight-megabyte file contains sixty-four megabits when decimal prefixes and eight bits per byte are assumed. Do not divide bytes directly by bits per second without converting one quantity."
        },
        {
          "type": "subheading",
          "text": "Separate sequential and parallel computing"
        },
        {
          "type": "text",
          "text": "Sequential computing performs steps in an ordered sequence. Parallel computing executes some operations simultaneously, often using multiple processors. Distributed computing uses multiple communicating computers that may share portions of a task. A dependency constrains the order: a step that requires another step’s result cannot simply execute first. Communication, coordination, and setup overhead can offset gains from parallel work. More processors do not guarantee proportional improvement, especially when only a small part of a task can run simultaneously."
        },
        {
          "type": "subheading",
          "text": "Worked runtime comparison"
        },
        {
          "type": "text",
          "text": "Suppose a task requires10seconds of unavoidable sequential work and30seconds that can be split perfectly across three processors with no additional overhead. The parallel portion takes30/3=10seconds, so total time is 20seconds, compared with 40seconds originally. Speedup is 40/20=2, not3. Even infinitely many processors cannot reduce the sequential10seconds below its required time under these assumptions. The ideal upper bound on speedup would approach40/10=4, before allowing for real communication overhead."
        },
        {
          "type": "subheading",
          "text": "Choose the correct performance claim"
        },
        {
          "type": "text",
          "text": "An embarrassingly parallel workload has largely independent pieces, such as processing separate image files under the same rule. A dependent chain, such as updating a value using the immediately previous update, may offer fewer opportunities. To evaluate an advertised improvement, identify the baseline, specify what can run in parallel, include fixed work, and state whether overhead is ignored. For transfer estimates, use file size divided by effective transfer rate as an idealized duration, not a promise about real network conditions. Congestion, protocol overhead, and other bottlenecks can reduce the rate a user actually observes."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-4-2-1",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A file has 8MB and a link transfers8Mb/s under decimal units. What is the ideal transfer duration?",
          "choices": [
            "8seconds",
            "1second",
            "64seconds",
            "0.125seconds"
          ],
          "answer": 0,
          "explanation": "Eight megabytes equal64megabits. At8megabits per second,64/8=8seconds, ignoring overhead and startup delays.",
          "lessonTitle": "4.2 Bandwidth, parallel work, and limits on speedup"
        },
        {
          "id": "csp-mcq-4-2-2",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What is total time for 10sequential seconds plus30perfectly parallel seconds split across3processors?",
          "choices": [
            "20seconds",
            "10seconds",
            "30seconds",
            "40/3seconds"
          ],
          "answer": 0,
          "explanation": "The fixed10seconds remain. The parallel portion becomes10seconds, yielding20seconds total.",
          "lessonTitle": "4.2 Bandwidth, parallel work, and limits on speedup"
        },
        {
          "id": "csp-mcq-4-2-3",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "The original task took40seconds and the improved task takes20seconds. What is the speedup?",
          "choices": [
            "2",
            "3",
            "20",
            "0.5"
          ],
          "answer": 0,
          "explanation": "Speedup is original time divided by improved time:40/20=2. The processor count is not automatically the speedup.",
          "lessonTitle": "4.2 Bandwidth, parallel work, and limits on speedup"
        },
        {
          "id": "csp-mcq-4-2-4",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why can additional processors fail to improve a task proportionally?",
          "choices": [
            "Sequential dependencies and coordination overhead remain",
            "All computation is automatically independent",
            "Bandwidth and latency are the same measurement",
            "Parallel programs never communicate"
          ],
          "answer": 0,
          "explanation": "Only independent work can be divided freely. Fixed work, data dependencies, and communication can limit the benefit of more processors.",
          "lessonTitle": "4.2 Bandwidth, parallel work, and limits on speedup"
        }
      ]
    },
    {
      "id": "csp-lesson-4-3",
      "title": "4.3 DNS, web requests, and layered communication",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "DNS, web requests, and layered communication"
        },
        {
          "type": "subheading",
          "text": "A name is not a route"
        },
        {
          "type": "text",
          "text": "A domain name is a human-readable identifier used to locate internet resources. The Domain Name System, or DNS, supports translating names into addresses using a distributed, hierarchical system. It is not a single universal file that every computer must contact for every request; caching can allow a previously obtained answer to be reused for an appropriate period. Resolving a name is different from retrieving a web page. A device may resolve a name successfully while the destination service is unavailable or a later network connection fails."
        },
        {
          "type": "subheading",
          "text": "Follow the layers in an ordinary request"
        },
        {
          "type": "text",
          "text": "A browser can use DNS to obtain addressing information, establish an appropriate connection, and exchange requests and responses using web protocols. HTTP specifies application-level request and response behavior. HTTPS uses a protected connection to provide confidentiality and integrity in transit and authentication of the addressed service under the relevant certificate system. The exact connection details depend on the protocol version, so avoid claiming that every web request uses one identical transport arrangement. The key distinction is between naming, packet transport, and application communication."
        },
        {
          "type": "subheading",
          "text": "Worked diagnostic reasoning"
        },
        {
          "type": "text",
          "text": "Suppose a browser can reach a service by its numeric address but cannot resolve that service’s domain name in a simplified troubleshooting scenario. A DNS-related problem is a plausible explanation. This observation does not prove that the server’s page content is correct, that every route is healthy, or that the service protects stored data. Conversely, a valid name lookup followed by a connection timeout directs attention beyond naming. Test one layer at a time and state what each observation does and does not establish. A single failed page load can have many different causes."
        },
        {
          "type": "subheading",
          "text": "Recognize what encryption does not establish"
        },
        {
          "type": "text",
          "text": "Encryption in transit protects a message on part of its journey; it does not guarantee that a site is honest, that a user’s endpoint is free from malicious software, or that a downloaded file is safe. A deceptive site can still have a valid encrypted connection for its own domain. Authentication concerns which party is communicating, while authorization concerns what that party may do. When explaining network protections, specify the threat and the boundary being protected. Do not replace that reasoning with the vague statement that a lock icon makes everything secure."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-4-3-1",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What is DNS primarily used for in the described model?",
          "choices": [
            "Translating a domain name into addressing information",
            "Compressing every web image",
            "Executing all browser code",
            "Guaranteeing a server stores no private data"
          ],
          "answer": 0,
          "explanation": "DNS concerns name resolution. Retrieving content, executing code, and controlling server storage are separate functions.",
          "lessonTitle": "4.3 DNS, web requests, and layered communication"
        },
        {
          "id": "csp-mcq-4-3-2",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A successful DNS lookup followed by a failed page connection shows what?",
          "choices": [
            "Name resolution succeeded, but a later step can still fail",
            "The page must have loaded correctly",
            "DNS guarantees all later communication",
            "The user’s file was necessarily corrupted"
          ],
          "answer": 0,
          "explanation": "A layered process can succeed at one step and fail at another. Resolving a name does not ensure the server or connection is available.",
          "lessonTitle": "4.3 DNS, web requests, and layered communication"
        },
        {
          "id": "csp-mcq-4-3-3",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which statement about an encrypted connection is accurate?",
          "choices": [
            "It does not by itself prove the website is honest",
            "It proves every downloaded file is safe",
            "It prevents all endpoint malware",
            "It eliminates the need for authorization"
          ],
          "answer": 0,
          "explanation": "A secure transport can connect a user to a deceptive service. Transport confidentiality does not establish benign content or complete endpoint security.",
          "lessonTitle": "4.3 DNS, web requests, and layered communication"
        },
        {
          "id": "csp-mcq-4-3-4",
          "domain": "CSP: Computer Systems & Networks",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which distinction correctly separates authentication and authorization?",
          "choices": [
            "Authentication concerns identity; authorization concerns permitted actions",
            "They are exactly the same process",
            "Authorization compresses messages; authentication routes packets",
            "Authentication determines file size only"
          ],
          "answer": 0,
          "explanation": "An authenticated user may still lack permission to access a particular resource. Identity and permitted actions are related but distinct.",
          "lessonTitle": "4.3 DNS, web requests, and layered communication"
        }
      ]
    },
    {
      "id": "csp-lesson-5-1",
      "title": "5.1 Computing innovations, access, and stakeholder tradeoffs",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Computing innovations, access, and stakeholder tradeoffs"
        },
        {
          "type": "subheading",
          "text": "Describe an innovation through its mechanism"
        },
        {
          "type": "text",
          "text": "A computing innovation includes a program or computing system as an important part of how it works. Explain how input is processed into an output and why that behavior changes an activity. For a navigation service, location data and map information can produce a route recommendation. The analysis should connect a benefit or harm to that mechanism, not merely say that the technology is good or bad. A benefit for one stakeholder can coexist with a harm for another, and an intended benefit can produce unintended effects."
        },
        {
          "type": "subheading",
          "text": "Access is more than owning a device"
        },
        {
          "type": "text",
          "text": "The digital divide involves differences in access to and effective use of computing resources. Relevant factors can include reliable connectivity, cost, accessible design, language, technical literacy, and time or support to learn a tool. Giving every student an account does not establish equal opportunity if some lack a usable device or dependable internet. A policy or design response should address the actual barrier identified. For example, an offline-capable lesson can reduce dependence on a continuous connection, whereas changing the color of a button will not solve a bandwidth problem."
        },
        {
          "type": "subheading",
          "text": "Worked stakeholder comparison"
        },
        {
          "type": "text",
          "text": "A hypothetical city deploys an app reporting real-time bus arrivals. Riders with connected phones can reduce uncertain waiting, and transit planners may identify delays. Riders without compatible devices may gain less benefit, especially if printed timetables are removed. Location collection could help estimate demand but expose travel patterns if handled carelessly. A reasoned recommendation could preserve non-app information channels, minimize retained location data, and evaluate whether predictions are equally accurate across neighborhoods. Each proposed action follows from a particular effect rather than treating convenience as the only outcome."
        },
        {
          "type": "subheading",
          "text": "Evaluate evidence and participation"
        },
        {
          "type": "text",
          "text": "A useful impact claim identifies a group, an outcome, and the process linking them. Surveying only satisfied current users may miss people excluded by the design. Crowdsourcing can gather contributions from many people, but contribution volume does not guarantee accuracy or representative participation. Citizen science can expand observation coverage while still needing consistent methods, quality checks, and transparent limitations. Distinguish evidence that an innovation is associated with a change from evidence that it caused that change. Review impacts as usage evolves; early test results may not capture later incentives, misuse, or changes in scale."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-5-1-1",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which example most directly illustrates a digital-divide barrier?",
          "choices": [
            "Students have accounts but some lack reliable internet at home",
            "All students receive the same password length requirement",
            "A program uses a list",
            "A bus route has a short name"
          ],
          "answer": 0,
          "explanation": "Effective access depends on infrastructure and usability, not just account ownership. Unreliable connectivity can prevent meaningful participation.",
          "lessonTitle": "5.1 Computing innovations, access, and stakeholder tradeoffs",
          "passage": "Original instructional setup. A hypothetical city bus-arrival app helps connected riders but may exclude riders without compatible devices if printed timetables are removed. Location records could expose travel patterns."
        },
        {
          "id": "csp-mcq-5-1-2",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which response best addresses a dependence on continuous connectivity?",
          "choices": [
            "Provide an offline-capable learning option",
            "Change the logo color only",
            "Increase decorative animation",
            "Remove all instructions"
          ],
          "answer": 0,
          "explanation": "Offline capability directly addresses the stated connectivity barrier. Cosmetic changes do not make an unavailable connection usable.",
          "lessonTitle": "5.1 Computing innovations, access, and stakeholder tradeoffs",
          "passage": "Original instructional setup. A hypothetical city bus-arrival app helps connected riders but may exclude riders without compatible devices if printed timetables are removed. Location records could expose travel patterns."
        },
        {
          "id": "csp-mcq-5-1-3",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which statement is the strongest stakeholder analysis of the bus app?",
          "choices": [
            "Connected riders may benefit while nonusers lose access if other information channels are removed",
            "The app must benefit every group equally",
            "Only the developer counts as a stakeholder",
            "Any convenience benefit eliminates privacy concerns"
          ],
          "answer": 0,
          "explanation": "The analysis identifies distinct groups and connects effects to specific design choices. Benefits do not automatically cancel access or privacy costs.",
          "lessonTitle": "5.1 Computing innovations, access, and stakeholder tradeoffs",
          "passage": "Original instructional setup. A hypothetical city bus-arrival app helps connected riders but may exclude riders without compatible devices if printed timetables are removed. Location records could expose travel patterns."
        },
        {
          "id": "csp-mcq-5-1-4",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why is a survey of satisfied current users insufficient to assess access fairly?",
          "choices": [
            "It can omit people excluded by the system",
            "It necessarily includes every nonuser",
            "It proves the app caused all observed improvements",
            "It eliminates selection bias by using a computer"
          ],
          "answer": 0,
          "explanation": "People unable or unwilling to use the service may be missing. Their exclusion is especially relevant when evaluating access barriers.",
          "lessonTitle": "5.1 Computing innovations, access, and stakeholder tradeoffs",
          "passage": "Original instructional setup. A hypothetical city bus-arrival app helps connected riders but may exclude riders without compatible devices if printed timetables are removed. Location records could expose travel patterns."
        }
      ]
    },
    {
      "id": "csp-lesson-5-2",
      "title": "5.2 Personal data, cybersecurity, and responsible disclosure",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Personal data, cybersecurity, and responsible disclosure"
        },
        {
          "type": "subheading",
          "text": "Identify the asset and the threat"
        },
        {
          "type": "text",
          "text": "Cybersecurity reasoning begins with what needs protection, who may attack or misuse it, and how the threat could occur. Personal information can include direct identifiers and combinations of details that reveal identity or behavior. A record of locations and times may disclose sensitive routines even without a name field. Tracking can occur through account activity, device information, cookies, or combined datasets. Describe the collection and inference mechanism before evaluating a protection. Keeping data private is different from ensuring that data are accurate or available when needed."
        },
        {
          "type": "subheading",
          "text": "Separate protections by their function"
        },
        {
          "type": "text",
          "text": "A strong unique password reduces the harm from a reused credential being exposed elsewhere. Multifactor authentication adds an additional kind of evidence, such as possession of a trusted device, rather than merely asking the same password twice. Encryption protects confidentiality by making data unreadable without appropriate key material. In symmetric encryption, communicating parties use shared secret key material; public-key systems use mathematically related public and private keys for supported operations. The details depend on the system, so a public key’s availability is not itself a disclosure of the corresponding private key."
        },
        {
          "type": "subheading",
          "text": "Worked phishing scenario"
        },
        {
          "type": "text",
          "text": "A message claims to be from a school and asks a student to sign in through a look-alike domain. The attacker may be trying to collect credentials rather than break an encryption algorithm. An encrypted connection to the deceptive domain does not make the message authentic. Checking the destination independently, using a known official entry point, and reporting suspicious messages address the social-engineering mechanism. Antivirus software can be useful, but it cannot guarantee that a person never enters valid credentials into a deceptive form. A defense should match the attack described."
        },
        {
          "type": "subheading",
          "text": "Reason about both collection and retention"
        },
        {
          "type": "text",
          "text": "Minimizing collection, limiting retention, controlling permissions, and auditing access can reduce opportunities for misuse. Backups support recovery and availability but do not by themselves stop unauthorized reading of the live dataset. A software vulnerability is a weakness that can be exploited; an attack is an attempt to exploit a weakness or influence behavior. Explaining a vulnerability responsibly does not require publishing someone’s private data. For course questions, identify which protection changes the relevant risk and acknowledge its boundary. Avoid absolute promises such as “encryption prevents every cyberattack” or “removing a name guarantees anonymity.”"
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-5-2-1",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A fake school message asks a student to enter a password on a look-alike website. What attack is most directly illustrated?",
          "choices": [
            "Phishing",
            "Lossless compression",
            "Binary search",
            "Parallel processing"
          ],
          "answer": 0,
          "explanation": "The attacker impersonates a trusted source to obtain credentials. The mechanism is social engineering rather than an ordinary data-processing operation.",
          "lessonTitle": "5.2 Personal data, cybersecurity, and responsible disclosure"
        },
        {
          "id": "csp-mcq-5-2-2",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which example best illustrates multifactor authentication?",
          "choices": [
            "A password plus approval from a registered security device",
            "Typing the same password twice",
            "Using two usernames with one password",
            "Compressing a password file"
          ],
          "answer": 0,
          "explanation": "Different kinds of evidence, such as knowledge of a password and possession of a registered device, can provide multiple factors.",
          "lessonTitle": "5.2 Personal data, cybersecurity, and responsible disclosure"
        },
        {
          "id": "csp-mcq-5-2-3",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What is a principal purpose of encryption?",
          "choices": [
            "Protecting confidentiality of data without the appropriate key",
            "Guaranteeing all users are honest",
            "Eliminating every possible software error",
            "Making all files smaller"
          ],
          "answer": 0,
          "explanation": "Encryption concerns confidentiality. It does not establish the honesty of endpoints, ensure bug-free programs, or necessarily reduce file size.",
          "lessonTitle": "5.2 Personal data, cybersecurity, and responsible disclosure"
        },
        {
          "id": "csp-mcq-5-2-4",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "What does a backup most directly support?",
          "choices": [
            "Recovery after loss or damage",
            "Automatic prevention of every unauthorized read",
            "Proof that collected data are unbiased",
            "Compression without any encoding"
          ],
          "answer": 0,
          "explanation": "A backup supplies a recoverable copy. It can support availability and recovery but is not a substitute for access controls or data-quality evaluation.",
          "lessonTitle": "5.2 Personal data, cybersecurity, and responsible disclosure"
        }
      ]
    },
    {
      "id": "csp-lesson-5-3",
      "title": "5.3 Bias, intellectual property, and evaluating a computing claim",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Bias, intellectual property, and evaluating a computing claim"
        },
        {
          "type": "subheading",
          "text": "Bias can enter at several stages"
        },
        {
          "type": "text",
          "text": "A computing system can reflect assumptions and unequal conditions in how a problem is defined, data are collected, a model is built, and outputs are used. A program that follows instructions consistently is not automatically fair. If a training dataset underrepresents a group, predictions for that group may be less reliable. Even representative data can encode past inequities, while a poorly chosen outcome measure may not capture the intended goal. Examine both the technical mechanism and the setting in which people make decisions from its output."
        },
        {
          "type": "subheading",
          "text": "Make a comparison relevant to the claim"
        },
        {
          "type": "text",
          "text": "Suppose a hypothetical image classifier performs well overall but much worse on images captured under low light. The overall average can hide that subgroup difference. Investigate the number and quality of low-light examples, the image-processing assumptions, and the intended deployment conditions. Adding relevant examples and evaluating results separately can reveal whether a revision helps. Do not infer that one successful test removes all possible bias. A defensible report states which conditions were tested, what outcome was measured, and which groups or environments remain uncertain."
        },
        {
          "type": "subheading",
          "text": "Respect creation and permission"
        },
        {
          "type": "text",
          "text": "Intellectual property involves rights in creative works and inventions. Being able to download a file does not by itself mean permission to redistribute or modify it. A license can specify permitted uses, attribution requirements, or other conditions. Open-source software makes source code available under licensing terms; open source is not a synonym for having no conditions. Credit should distinguish original contributions from external code, images, sounds, and ideas. For an actual assessed project, follow the current official rules as well as the terms governing reused material; an app’s practice example does not replace those requirements."
        },
        {
          "type": "subheading",
          "text": "Worked evidence check"
        },
        {
          "type": "text",
          "text": "A company says a recommendation algorithm is unbiased because it uses numbers rather than people’s names. That argument does not examine whether numerical fields act as proxies for sensitive characteristics or whether the objective rewards an unequal outcome. A stronger evaluation would define a relevant fairness concern, compare outcomes and errors across appropriate groups, inspect the data and assumptions, and document limitations. No single fairness measure resolves every value conflict. The important course skill is to connect a specific design choice to a plausible consequence and support the claim with evidence rather than treating automation as inherently neutral."
        }
      ],
      "practiceQuestions": [
        {
          "id": "csp-mcq-5-3-1",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Why can a numerical model still produce biased outcomes?",
          "choices": [
            "Its data, objective, or application can encode unequal assumptions or conditions",
            "Numbers guarantee neutrality",
            "Bias is possible only when names are explicitly stored",
            "Running code removes historical inequities"
          ],
          "answer": 0,
          "explanation": "Bias can arise before, within, and after computation. Numeric inputs can reflect unequal patterns or act as proxies for other characteristics.",
          "lessonTitle": "5.3 Bias, intellectual property, and evaluating a computing claim"
        },
        {
          "id": "csp-mcq-5-3-2",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A model has high overall accuracy but low accuracy in low light. What should an evaluator do?",
          "choices": [
            "Examine performance and data under low-light conditions separately",
            "Report only the overall average",
            "Assume every subgroup has the same accuracy",
            "Delete every low-light test result"
          ],
          "answer": 0,
          "explanation": "The overall metric hides a relevant condition-specific weakness. Examining data and results for that condition supports a more informative evaluation.",
          "lessonTitle": "5.3 Bias, intellectual property, and evaluating a computing claim"
        },
        {
          "id": "csp-mcq-5-3-3",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "A downloadable image is publicly visible. What can be concluded about reuse rights?",
          "choices": [
            "Visibility alone does not establish permission to reuse it",
            "Every public image has no copyright conditions",
            "All uses are automatically authorized",
            "Attribution is always prohibited"
          ],
          "answer": 0,
          "explanation": "Access and permission are different. The applicable license or other rights determine what uses are permitted.",
          "lessonTitle": "5.3 Bias, intellectual property, and evaluating a computing claim"
        },
        {
          "id": "csp-mcq-5-3-4",
          "domain": "CSP: Impact of Computing",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Computing reasoning",
          "question": "Which statement about open-source software is accurate?",
          "choices": [
            "Its license can still impose conditions on use or distribution",
            "It has no license terms by definition",
            "Its code is guaranteed to contain no bugs",
            "It can never be modified"
          ],
          "answer": 0,
          "explanation": "Source availability does not mean the absence of conditions or defects. Users should examine the actual license and relevant technical behavior.",
          "lessonTitle": "5.3 Bias, intellectual property, and evaluating a computing claim"
        }
      ]
    }
  ],
  "mcq": [
    {
      "id": "csp-mcq-1-1-1",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which statement describes the planner’s purpose rather than an implementation detail?",
      "choices": [
        "Help students choose study work that fits their available time",
        "Store minutes in a variable named m",
        "Use an IF statement",
        "Display text in green"
      ],
      "answer": 0,
      "explanation": "Purpose connects the program to a user need. Variable names, control structures, and colors describe implementation or interface choices.",
      "lessonTitle": "1.1 Purpose, input, output, and an iterative design process",
      "passage": "Original instructional setup. A study planner receives an integer number of available minutes. It chooses a short recall activity below ten minutes and a longer question set otherwise. Its purpose is to suggest work that fits the user’s time."
    },
    {
      "id": "csp-mcq-1-1-2",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "The planner reads the current time from a device clock. How is that information classified?",
      "choices": [
        "Input to the program",
        "A syntax error",
        "Only output",
        "The entire algorithm"
      ],
      "answer": 0,
      "explanation": "Input is information received by a program; it need not be typed by a human. A device clock can supply input.",
      "lessonTitle": "1.1 Purpose, input, output, and an iterative design process",
      "passage": "Original instructional setup. A study planner receives an integer number of available minutes. It chooses a short recall activity below ten minutes and a longer question set otherwise. Its purpose is to suggest work that fits the user’s time."
    },
    {
      "id": "csp-mcq-1-1-3",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A test at 9 minutes succeeds and a test at 11 succeeds. Which additional test best checks a ten-minute cutoff?",
      "choices": [
        "10 minutes",
        "1000 minutes only",
        "Another 9-minute test only",
        "No additional test is useful"
      ],
      "answer": 0,
      "explanation": "The exact threshold reveals whether a comparison includes equality in the intended branch. Nearby tests alone can miss an off-by-one boundary error.",
      "lessonTitle": "1.1 Purpose, input, output, and an iterative design process",
      "passage": "Original instructional setup. A study planner receives an integer number of available minutes. It chooses a short recall activity below ten minutes and a longer question set otherwise. Its purpose is to suggest work that fits the user’s time."
    },
    {
      "id": "csp-mcq-1-1-4",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A working prototype is difficult for users to understand. What is the best next design step?",
      "choices": [
        "Collect specific user feedback and revise the interface",
        "Assume correct execution proves the design is complete",
        "Delete all tests",
        "Add unrelated features before investigating"
      ],
      "answer": 0,
      "explanation": "Correct execution and useful design are distinct. Observing users and testing a revised interface addresses the actual problem.",
      "lessonTitle": "1.1 Purpose, input, output, and an iterative design process",
      "passage": "Original instructional setup. A study planner receives an integer number of available minutes. It chooses a short recall activity below ten minutes and a longer question set otherwise. Its purpose is to suggest work that fits the user’s time."
    },
    {
      "id": "csp-mcq-1-2-1",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A program runs but outputs 2 instead of the sum 10. What kind of problem is most clearly demonstrated?",
      "choices": [
        "A logic error",
        "Necessarily a syntax error",
        "Proof the hardware has failed",
        "Necessarily an internet routing error"
      ],
      "answer": 0,
      "explanation": "The program executes but fails its intended specification. That is a logic error; the output alone does not establish hardware or network failure.",
      "lessonTitle": "1.2 Collaboration, documentation, and debugging with evidence",
      "passage": "Original instructional setup. A program should sum the list [3,5,2]. It mistakenly resets total to zero inside every loop iteration before adding the current entry."
    },
    {
      "id": "csp-mcq-1-2-2",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why does resetting total inside the loop cause the example’s error?",
      "choices": [
        "Each iteration discards the accumulated sum",
        "It makes addition undefined",
        "It changes every list element to zero",
        "It forces the list to sort"
      ],
      "answer": 0,
      "explanation": "Initialization inside the body overwrites earlier accumulated values. The last item is added to zero, leaving only that item.",
      "lessonTitle": "1.2 Collaboration, documentation, and debugging with evidence",
      "passage": "Original instructional setup. A program should sum the list [3,5,2]. It mistakenly resets total to zero inside every loop iteration before adding the current entry."
    },
    {
      "id": "csp-mcq-1-2-3",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which documentation most helps another programmer use a procedure?",
      "choices": [
        "Its purpose, accepted inputs, returned result, and important assumptions",
        "The author’s favorite color",
        "Only the number of lines",
        "A statement that it always works with no conditions"
      ],
      "answer": 0,
      "explanation": "A useful contract explains what the procedure does and the conditions under which its behavior is expected, independent of incidental implementation details.",
      "lessonTitle": "1.2 Collaboration, documentation, and debugging with evidence",
      "passage": "Original instructional setup. A program should sum the list [3,5,2]. It mistakenly resets total to zero inside every loop iteration before adding the current entry."
    },
    {
      "id": "csp-mcq-1-2-4",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "After fixing a failing test, why rerun previously passing cases?",
      "choices": [
        "The change may introduce a regression elsewhere",
        "Old tests become mathematically invalid after any edit",
        "Only failed tests can run",
        "Regression tests prove correctness for every input"
      ],
      "answer": 0,
      "explanation": "A local fix can affect another behavior. Rechecking earlier examples can reveal regressions, although finite tests are not a universal correctness proof.",
      "lessonTitle": "1.2 Collaboration, documentation, and debugging with evidence",
      "passage": "Original instructional setup. A program should sum the list [3,5,2]. It mistakenly resets total to zero inside every loop iteration before adding the current entry."
    },
    {
      "id": "csp-mcq-1-3-1",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why is a list of session durations a useful data abstraction?",
      "choices": [
        "One algorithm can process a changing number of sessions",
        "It guarantees every duration is valid",
        "It eliminates the need for any algorithm",
        "It always makes a program run in constant time"
      ],
      "answer": 0,
      "explanation": "A list groups a variable-size collection under one abstraction. It does not automatically validate elements or guarantee a particular running time.",
      "lessonTitle": "1.3 Planning an original program and explaining an abstraction",
      "passage": "Original instructional setup. Define countAtLeast(values, minimum) to return the number of entries in values that are greater than or equal to minimum."
    },
    {
      "id": "csp-mcq-1-3-2",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What does countAtLeast([10,25,15,30],20) return?",
      "choices": [
        "2",
        "1",
        "3",
        "4"
      ],
      "answer": 0,
      "explanation": "Only25 and30 are at least20. The15-minute session does not satisfy this threshold, so the count is 2.",
      "lessonTitle": "1.3 Planning an original program and explaining an abstraction",
      "passage": "Original instructional setup. Define countAtLeast(values, minimum) to return the number of entries in values that are greater than or equal to minimum."
    },
    {
      "id": "csp-mcq-1-3-3",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which second call best demonstrates a different threshold outcome on the same list?",
      "choices": [
        "countAtLeast([10,25,15,30],15)",
        "The exact same call with 20 again",
        "A call that never uses minimum",
        "Changing only a comment"
      ],
      "answer": 0,
      "explanation": "A threshold of 15 includes the15-minute session and changes the result to 3. This illustrates a meaningful parameter effect.",
      "lessonTitle": "1.3 Planning an original program and explaining an abstraction",
      "passage": "Original instructional setup. Define countAtLeast(values, minimum) to return the number of entries in values that are greater than or equal to minimum."
    },
    {
      "id": "csp-mcq-1-3-4",
      "domain": "CSP: Creative Development",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which replacement preserves the test value ≥ minimum for every numeric value?",
      "choices": [
        "NOT(value < minimum)",
        "value > minimum",
        "value = minimum only",
        "value < minimum"
      ],
      "answer": 0,
      "explanation": "Not being less than the threshold is equivalent to being greater than or equal to it. A strict greater-than test incorrectly excludes equality; an equality-only test excludes larger entries.",
      "lessonTitle": "1.3 Planning an original program and explaining an abstraction",
      "passage": "Original instructional setup. Define countAtLeast(values, minimum) to return the number of entries in values that are greater than or equal to minimum."
    },
    {
      "id": "csp-mcq-2-1-1",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What decimal value is unsigned binary10110?",
      "choices": [
        "22",
        "20",
        "26",
        "10110"
      ],
      "answer": 0,
      "explanation": "The1bits occupy the16,4,and2 places. Adding16+4+2 gives22; the decimal-looking digits should not be read as base ten.",
      "lessonTitle": "2.1 Bits, number representation, and digital media"
    },
    {
      "id": "csp-mcq-2-1-2",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "How many distinct patterns can6bits represent?",
      "choices": [
        "64",
        "6",
        "12",
        "63"
      ],
      "answer": 0,
      "explanation": "Each bit has 2choices, so6bits have2^6=64 patterns. An unsigned range may run0–63, but it still contains64 values.",
      "lessonTitle": "2.1 Bits, number representation, and digital media"
    },
    {
      "id": "csp-mcq-2-1-3",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "How many bytes are needed for 100×80pixels at 24bits per pixel, ignoring all overhead?",
      "choices": [
        "24000",
        "192000",
        "8000",
        "3000"
      ],
      "answer": 0,
      "explanation": "There are 8000pixels and192000bits. Eight bits make one byte, so192000/8=24000bytes.",
      "lessonTitle": "2.1 Bits, number representation, and digital media"
    },
    {
      "id": "csp-mcq-2-1-4",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Both dimensions of an image double while bits per pixel stay fixed. What happens to uncompressed pixel storage?",
      "choices": [
        "It becomes four times as large",
        "It doubles",
        "It stays constant",
        "It becomes half as large"
      ],
      "answer": 0,
      "explanation": "Area is the product of width and height. Multiplying each dimension by 2 multiplies their product and pixel storage by 4.",
      "lessonTitle": "2.1 Bits, number representation, and digital media"
    },
    {
      "id": "csp-mcq-2-2-1",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which property defines lossless compression?",
      "choices": [
        "The original data can be reconstructed exactly",
        "The compressed file is always the smallest possible",
        "The file is unreadable without a password",
        "Some original information must be discarded"
      ],
      "answer": 0,
      "explanation": "Lossless concerns exact reconstruction. It does not guarantee optimal size or confidentiality, and it does not require discarding information.",
      "lessonTitle": "2.2 Compression and the tradeoff between size and fidelity"
    },
    {
      "id": "csp-mcq-2-2-2",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A file shrinks from 120000 to 30000bytes. What is the percentage reduction?",
      "choices": [
        "75%",
        "25%",
        "300%",
        "400%"
      ],
      "answer": 0,
      "explanation": "The saved amount is 90000bytes. Divide90000 by the original120000 to obtain0.75, or75% reduction.",
      "lessonTitle": "2.2 Compression and the tradeoff between size and fidelity"
    },
    {
      "id": "csp-mcq-2-2-3",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why can a run-length scheme enlarge a pattern-poor file?",
      "choices": [
        "Counts and other encoding overhead can exceed the savings",
        "Every compression scheme always discards information",
        "A byte stops containing8bits",
        "Exact recovery requires an internet connection"
      ],
      "answer": 0,
      "explanation": "When runs are short, recording a count for each run may add more bits than the scheme saves. The result depends on the input and encoding rules.",
      "lessonTitle": "2.2 Compression and the tradeoff between size and fidelity"
    },
    {
      "id": "csp-mcq-2-2-4",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which task most clearly requires exact recovery rather than approximate recovery?",
      "choices": [
        "Restoring executable program code",
        "Making a small thumbnail for casual browsing",
        "Streaming background music where some quality loss is accepted",
        "Creating a quick low-detail image preview"
      ],
      "answer": 0,
      "explanation": "A changed code bit can alter instructions or invalidate a program. Approximation may be acceptable for specified media tasks, but not for exact code restoration.",
      "lessonTitle": "2.2 Compression and the tradeoff between size and fidelity"
    },
    {
      "id": "csp-mcq-2-3-1",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "For observed values20,30,40 and one missing value, what is the mean of the observed values?",
      "choices": [
        "30",
        "22.5",
        "90",
        "40"
      ],
      "answer": 0,
      "explanation": "The observed sum is 90 across3measurements, so the observed mean is 30. Dividing by 4 treats the blank as though it were a measured value.",
      "lessonTitle": "2.3 From raw data to a defensible conclusion"
    },
    {
      "id": "csp-mcq-2-3-2",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why is replacing every missing response with zero potentially misleading?",
      "choices": [
        "A missing response does not establish a measured value of zero",
        "Zero cannot be stored digitally",
        "Missing responses always equal the mean",
        "A spreadsheet cannot calculate a mean"
      ],
      "answer": 0,
      "explanation": "Zero is a substantive numerical value. Substituting it for missingness adds an assumption that may change a conclusion.",
      "lessonTitle": "2.3 From raw data to a defensible conclusion"
    },
    {
      "id": "csp-mcq-2-3-3",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A very large dataset comes only from app users in wealthy neighborhoods. Which concern remains?",
      "choices": [
        "The sample may underrepresent other neighborhoods",
        "Large size guarantees population representativeness",
        "Bias disappears when a graph is drawn",
        "Every observed association must be causal"
      ],
      "answer": 0,
      "explanation": "Sample size can reduce some random uncertainty without eliminating selection bias. Who is included still matters.",
      "lessonTitle": "2.3 From raw data to a defensible conclusion"
    },
    {
      "id": "csp-mcq-2-3-4",
      "domain": "CSP: Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Removing names from location records guarantees complete anonymity. How should this claim be evaluated?",
      "choices": [
        "It is too strong because other fields or linked datasets may permit re-identification",
        "It is always true for any dataset",
        "It is true only if the file is compressed",
        "It follows from the number of records alone"
      ],
      "answer": 0,
      "explanation": "Combinations of quasi-identifiers and outside information can identify people even after direct names are removed. Anonymity requires more than deleting one field.",
      "lessonTitle": "2.3 From raw data to a defensible conclusion"
    },
    {
      "id": "csp-mcq-3-1-1",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "After a←5; b←2; a←a+b; b←a−b, what are (a,b)?",
      "choices": [
        "(7,5)",
        "(7,3)",
        "(5,2)",
        "(2,5)"
      ],
      "answer": 0,
      "explanation": "Assignments occur sequentially. The final b uses the updated a=7, so b=7−2=5.",
      "lessonTitle": "3.1 Variables, expressions, Boolean logic, and selection"
    },
    {
      "id": "csp-mcq-3-1-2",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which condition admits exactly ages13 through17 inclusive?",
      "choices": [
        "(age≥13) AND(age≤17)",
        "(age≥13) OR(age≤17)",
        "age>13 AND age<17",
        "NOT(age≥13)"
      ],
      "answer": 0,
      "explanation": "Both lower and upper bounds must hold, and equality must be permitted at 13 and17. AND combines the required restrictions.",
      "lessonTitle": "3.1 Variables, expressions, Boolean logic, and selection"
    },
    {
      "id": "csp-mcq-3-1-3",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "For P=true and Q=false, what is P AND(NOT Q)?",
      "choices": [
        "true",
        "false",
        "Undefined for Boolean values",
        "The number2"
      ],
      "answer": 0,
      "explanation": "NOT Q is true because Q is false. Both operands of AND are then true, so the combined result is true.",
      "lessonTitle": "3.1 Variables, expressions, Boolean logic, and selection"
    },
    {
      "id": "csp-mcq-3-1-4",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why can two separate IF statements differ from IF–ELSE?",
      "choices": [
        "Both IF bodies can execute when both conditions hold",
        "IF–ELSE always executes both bodies",
        "Separate IF statements ignore their conditions",
        "An ELSE statement repeats forever"
      ],
      "answer": 0,
      "explanation": "Independent IF statements evaluate independently. IF–ELSE selects one of two alternatives based on a single condition.",
      "lessonTitle": "3.1 Variables, expressions, Boolean logic, and selection"
    },
    {
      "id": "csp-mcq-3-2-1",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Using1-based indexing, what is items[2] for items=[8,3,6]?",
      "choices": [
        "3",
        "8",
        "6",
        "2"
      ],
      "answer": 0,
      "explanation": "The first position holds8 and the second holds3. The index specifies a position, not the value to search for.",
      "lessonTitle": "3.2 Lists, indices, traversals, and data abstraction"
    },
    {
      "id": "csp-mcq-3-2-2",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "After INSERT(nums,2,5) and then REMOVE(nums,3) on[4,7,9], what remains?",
      "choices": [
        "[4,5,9]",
        "[4,7,9]",
        "[4,5,7]",
        "[5,7,9]"
      ],
      "answer": 0,
      "explanation": "Insertion first gives[4,5,7,9]. Position3 then holds7, which is removed, leaving[4,5,9].",
      "lessonTitle": "3.2 Lists, indices, traversals, and data abstraction"
    },
    {
      "id": "csp-mcq-3-2-3",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What is the result of filtering[−2,4,0,7] for values strictly greater than0?",
      "choices": [
        "[4,7]",
        "[4,0,7]",
        "[−2,4,0,7]",
        "[−2]"
      ],
      "answer": 0,
      "explanation": "The positive entries4 and7 satisfy value>0. Zero fails the strict comparison, and−2 is negative.",
      "lessonTitle": "3.2 Lists, indices, traversals, and data abstraction"
    },
    {
      "id": "csp-mcq-3-2-4",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A maximum-finding algorithm starts max←0. Which nonempty input exposes a problem?",
      "choices": [
        "[−8,−3,−6]",
        "[1,2,3]",
        "[0,4,9]",
        "[5]"
      ],
      "answer": 0,
      "explanation": "All entries are below0, so a comparison that only replaces max with a larger entry incorrectly returns0 instead of−3.",
      "lessonTitle": "3.2 Lists, indices, traversals, and data abstraction"
    },
    {
      "id": "csp-mcq-3-3-1",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "For x←1; REPEAT UNTIL(x>8){x←2*x}, how many body executions occur?",
      "choices": [
        "4",
        "3",
        "5",
        "8"
      ],
      "answer": 0,
      "explanation": "The updated values are 2,4,8,16. The condition x>8 becomes true after the fourth execution.",
      "lessonTitle": "3.3 Iteration, termination, and simulation",
      "passage": "Original instructional setup. For these AP-style pseudocode questions, REPEAT UNTIL checks its stopping condition before a possible body execution; RANDOM(a,b) returns each integer from a through b equally likely."
    },
    {
      "id": "csp-mcq-3-3-2",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A REPEAT UNTIL loop has an initially true condition under the stated AP-style convention. How many times does its body run?",
      "choices": [
        "0",
        "1",
        "Exactly2",
        "It must run forever"
      ],
      "answer": 0,
      "explanation": "The stopping condition is tested before a possible execution. An initially satisfied stopping condition prevents entry.",
      "lessonTitle": "3.3 Iteration, termination, and simulation",
      "passage": "Original instructional setup. For these AP-style pseudocode questions, REPEAT UNTIL checks its stopping condition before a possible body execution; RANDOM(a,b) returns each integer from a through b equally likely."
    },
    {
      "id": "csp-mcq-3-3-3",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "For a fair RANDOM(1,6), what probability is modeled by result≤2?",
      "choices": [
        "1/3",
        "1/2",
        "1/6",
        "2/3"
      ],
      "answer": 0,
      "explanation": "Two equally likely outcomes,1 and2, out of six satisfy the condition, giving2/6=1/3.",
      "lessonTitle": "3.3 Iteration, termination, and simulation",
      "passage": "Original instructional setup. For these AP-style pseudocode questions, REPEAT UNTIL checks its stopping condition before a possible body execution; RANDOM(a,b) returns each integer from a through b equally likely."
    },
    {
      "id": "csp-mcq-3-3-4",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "More simulation trials produce a stable result from an unrealistic model. What remains a valid concern?",
      "choices": [
        "The model’s assumptions may still make the result misleading",
        "More trials guarantee the assumptions are true",
        "Random variation is the only possible source of error",
        "A stable simulation proves every real-world outcome"
      ],
      "answer": 0,
      "explanation": "Trial count can reduce random variability while leaving systematic model error unchanged. Reliability of repetition is not the same as model validity.",
      "lessonTitle": "3.3 Iteration, termination, and simulation",
      "passage": "Original instructional setup. For these AP-style pseudocode questions, REPEAT UNTIL checks its stopping condition before a possible body execution; RANDOM(a,b) returns each integer from a through b equally likely."
    },
    {
      "id": "csp-mcq-3-4-1",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A procedure returns3 when called with 75. What is stored by result←2+bonus(75)?",
      "choices": [
        "5",
        "3",
        "10",
        "75"
      ],
      "answer": 0,
      "explanation": "The caller substitutes the returned3 into its expression and computes2+3=5. A return is a value available to the caller.",
      "lessonTitle": "3.4 Procedures, parameters, and reusable algorithm design",
      "passage": "Original instructional setup. PROCEDURE bonus(score) returns 10 if score ≥ 80 and otherwise returns 3."
    },
    {
      "id": "csp-mcq-3-4-2",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What distinguishes an argument from a parameter?",
      "choices": [
        "An argument is supplied at a call; a parameter is named in the definition",
        "They are both always global variables",
        "A parameter is displayed output only",
        "Arguments can never be lists"
      ],
      "answer": 0,
      "explanation": "The definition provides a parameter placeholder. A call supplies an argument value for that placeholder.",
      "lessonTitle": "3.4 Procedures, parameters, and reusable algorithm design",
      "passage": "Original instructional setup. PROCEDURE bonus(score) returns 10 if score ≥ 80 and otherwise returns 3."
    },
    {
      "id": "csp-mcq-3-4-3",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "For the example procedure, which input tests the exact branch boundary?",
      "choices": [
        "80",
        "75 only",
        "0 only",
        "A comment containing80"
      ],
      "answer": 0,
      "explanation": "The comparison is score≥80. Input80 determines whether equality enters the intended branch.",
      "lessonTitle": "3.4 Procedures, parameters, and reusable algorithm design",
      "passage": "Original instructional setup. PROCEDURE bonus(score) returns 10 if score ≥ 80 and otherwise returns 3."
    },
    {
      "id": "csp-mcq-3-4-4",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Two calls use different arguments but return the same value. Which conclusion is warranted?",
      "choices": [
        "They may have executed the same branch",
        "They must execute different branches",
        "The procedure cannot contain selection",
        "A runtime error must have occurred"
      ],
      "answer": 0,
      "explanation": "Different input values can satisfy the same condition and produce the same output. Trace the condition before inferring a path difference.",
      "lessonTitle": "3.4 Procedures, parameters, and reusable algorithm design",
      "passage": "Original instructional setup. PROCEDURE bonus(score) returns 10 if score ≥ 80 and otherwise returns 3."
    },
    {
      "id": "csp-mcq-3-5-1",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which condition is needed for the usual binary search elimination rule?",
      "choices": [
        "The data must be sorted according to the search order",
        "Every element must be the same",
        "The list must contain exactly64elements",
        "The list must use decimal numbers only"
      ],
      "answer": 0,
      "explanation": "Binary search discards intervals based on order. Without a sorted order, a discarded interval may contain the desired value.",
      "lessonTitle": "3.5 Searching, efficiency, and limits of algorithms"
    },
    {
      "id": "csp-mcq-3-5-2",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Two nested loops each execute n times independently. How many inner-body executions occur?",
      "choices": [
        "n²",
        "2n",
        "n+2",
        "logarithmic in n"
      ],
      "answer": 0,
      "explanation": "For each of n outer iterations, all n inner iterations run, giving n×n=n² executions.",
      "lessonTitle": "3.5 Searching, efficiency, and limits of algorithms"
    },
    {
      "id": "csp-mcq-3-5-3",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What happens to n² when input size doubles from n to 2n?",
      "choices": [
        "It becomes4n²",
        "It becomes2n²",
        "It remains n²",
        "It becomes n²/2"
      ],
      "answer": 0,
      "explanation": "Substitute2n into the expression: (2n)²=4n². Squaring multiplies both factors by 2.",
      "lessonTitle": "3.5 Searching, efficiency, and limits of algorithms"
    },
    {
      "id": "csp-mcq-3-5-4",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which description correctly identifies an undecidable problem?",
      "choices": [
        "No algorithm solves the required decision task correctly for every possible input",
        "An existing correct algorithm runs slowly on a laptop",
        "A program contains a syntax error",
        "The answer is inconvenient to display"
      ],
      "answer": 0,
      "explanation": "Undecidability concerns the absence of an algorithm for the general decision task, not merely practical resource limits for a solvable one.",
      "lessonTitle": "3.5 Searching, efficiency, and limits of algorithms"
    },
    {
      "id": "csp-mcq-3-6-1",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A strict positive counter and a nonnegative filter agree on[2,5]. Which input exposes their difference?",
      "choices": [
        "[0]",
        "[1]",
        "[2,3]",
        "[−1]"
      ],
      "answer": 0,
      "explanation": "Zero fails value>0 but satisfies value≥0. It therefore distinguishes the two algorithms immediately.",
      "lessonTitle": "3.6 Combining algorithms and evaluating a model"
    },
    {
      "id": "csp-mcq-3-6-2",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Filtering[2,−1,5,0] for positive values and then summing gives what result?",
      "choices": [
        "7",
        "6",
        "8",
        "0"
      ],
      "answer": 0,
      "explanation": "The retained values are 2 and5. Their sum is 7; neither−1 nor0 is retained by the strict condition.",
      "lessonTitle": "3.6 Combining algorithms and evaluating a model"
    },
    {
      "id": "csp-mcq-3-6-3",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A fixed-service-time queue model matches one quiet afternoon. What follows?",
      "choices": [
        "It needs further validation under varied conditions",
        "It is proven valid for all demand levels",
        "All real service times are identical",
        "A random model can never improve it"
      ],
      "answer": 0,
      "explanation": "One agreement is limited evidence. Testing different demand conditions can reveal missing mechanisms or unrealistic assumptions.",
      "lessonTitle": "3.6 Combining algorithms and evaluating a model"
    },
    {
      "id": "csp-mcq-3-6-4",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why are procedure contracts useful in a pipeline?",
      "choices": [
        "They state what each step expects and produces",
        "They guarantee all raw data are accurate",
        "They eliminate every possible implementation error",
        "They require the program to use the internet"
      ],
      "answer": 0,
      "explanation": "Contracts make the connection between steps explicit. They support reasoning but do not replace data validation or testing.",
      "lessonTitle": "3.6 Combining algorithms and evaluating a model"
    },
    {
      "id": "csp-mcq-4-1-1",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which statement correctly relates the Web and the internet?",
      "choices": [
        "The Web is one system of applications using the internet",
        "They are identical terms for the same layer",
        "The internet requires every message to be a web page",
        "Email cannot use the internet"
      ],
      "answer": 0,
      "explanation": "The internet supplies interconnected-network communication. The Web is one application system using that infrastructure; other applications exist.",
      "lessonTitle": "4.1 The internet, packets, and fault-tolerant routing"
    },
    {
      "id": "csp-mcq-4-1-2",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Packets belonging to one message must always use the same route. Which evaluation is correct?",
      "choices": [
        "False; packets may take different routes",
        "True for every internet communication",
        "True because packets contain no addresses",
        "False only when no network exists"
      ],
      "answer": 0,
      "explanation": "Packet-switched networks may route packets independently. The receiving system may need to handle different arrival order or delivery behavior.",
      "lessonTitle": "4.1 The internet, packets, and fault-tolerant routing"
    },
    {
      "id": "csp-mcq-4-1-3",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A–B–D and A–C–D are available. B–D fails. Which route still connects A to D?",
      "choices": [
        "A–C–D",
        "A–B–D",
        "No route is possible",
        "B–C–A without reaching D"
      ],
      "answer": 0,
      "explanation": "The path through C does not depend on the failed B–D link, assuming the links on A–C–D remain available.",
      "lessonTitle": "4.1 The internet, packets, and fault-tolerant routing"
    },
    {
      "id": "csp-mcq-4-1-4",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which property does TCP not provide by itself?",
      "choices": [
        "Encryption of message contents",
        "Mechanisms for ordered delivery",
        "Acknowledgment-related reliability mechanisms",
        "Retransmission-related reliability mechanisms"
      ],
      "answer": 0,
      "explanation": "TCP supports transport reliability and order. Confidentiality normally requires a separate encryption mechanism, such as a secure application-layer protocol.",
      "lessonTitle": "4.1 The internet, packets, and fault-tolerant routing"
    },
    {
      "id": "csp-mcq-4-2-1",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A file has 8MB and a link transfers8Mb/s under decimal units. What is the ideal transfer duration?",
      "choices": [
        "8seconds",
        "1second",
        "64seconds",
        "0.125seconds"
      ],
      "answer": 0,
      "explanation": "Eight megabytes equal64megabits. At8megabits per second,64/8=8seconds, ignoring overhead and startup delays.",
      "lessonTitle": "4.2 Bandwidth, parallel work, and limits on speedup"
    },
    {
      "id": "csp-mcq-4-2-2",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What is total time for 10sequential seconds plus30perfectly parallel seconds split across3processors?",
      "choices": [
        "20seconds",
        "10seconds",
        "30seconds",
        "40/3seconds"
      ],
      "answer": 0,
      "explanation": "The fixed10seconds remain. The parallel portion becomes10seconds, yielding20seconds total.",
      "lessonTitle": "4.2 Bandwidth, parallel work, and limits on speedup"
    },
    {
      "id": "csp-mcq-4-2-3",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "The original task took40seconds and the improved task takes20seconds. What is the speedup?",
      "choices": [
        "2",
        "3",
        "20",
        "0.5"
      ],
      "answer": 0,
      "explanation": "Speedup is original time divided by improved time:40/20=2. The processor count is not automatically the speedup.",
      "lessonTitle": "4.2 Bandwidth, parallel work, and limits on speedup"
    },
    {
      "id": "csp-mcq-4-2-4",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why can additional processors fail to improve a task proportionally?",
      "choices": [
        "Sequential dependencies and coordination overhead remain",
        "All computation is automatically independent",
        "Bandwidth and latency are the same measurement",
        "Parallel programs never communicate"
      ],
      "answer": 0,
      "explanation": "Only independent work can be divided freely. Fixed work, data dependencies, and communication can limit the benefit of more processors.",
      "lessonTitle": "4.2 Bandwidth, parallel work, and limits on speedup"
    },
    {
      "id": "csp-mcq-4-3-1",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What is DNS primarily used for in the described model?",
      "choices": [
        "Translating a domain name into addressing information",
        "Compressing every web image",
        "Executing all browser code",
        "Guaranteeing a server stores no private data"
      ],
      "answer": 0,
      "explanation": "DNS concerns name resolution. Retrieving content, executing code, and controlling server storage are separate functions.",
      "lessonTitle": "4.3 DNS, web requests, and layered communication"
    },
    {
      "id": "csp-mcq-4-3-2",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A successful DNS lookup followed by a failed page connection shows what?",
      "choices": [
        "Name resolution succeeded, but a later step can still fail",
        "The page must have loaded correctly",
        "DNS guarantees all later communication",
        "The user’s file was necessarily corrupted"
      ],
      "answer": 0,
      "explanation": "A layered process can succeed at one step and fail at another. Resolving a name does not ensure the server or connection is available.",
      "lessonTitle": "4.3 DNS, web requests, and layered communication"
    },
    {
      "id": "csp-mcq-4-3-3",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which statement about an encrypted connection is accurate?",
      "choices": [
        "It does not by itself prove the website is honest",
        "It proves every downloaded file is safe",
        "It prevents all endpoint malware",
        "It eliminates the need for authorization"
      ],
      "answer": 0,
      "explanation": "A secure transport can connect a user to a deceptive service. Transport confidentiality does not establish benign content or complete endpoint security.",
      "lessonTitle": "4.3 DNS, web requests, and layered communication"
    },
    {
      "id": "csp-mcq-4-3-4",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which distinction correctly separates authentication and authorization?",
      "choices": [
        "Authentication concerns identity; authorization concerns permitted actions",
        "They are exactly the same process",
        "Authorization compresses messages; authentication routes packets",
        "Authentication determines file size only"
      ],
      "answer": 0,
      "explanation": "An authenticated user may still lack permission to access a particular resource. Identity and permitted actions are related but distinct.",
      "lessonTitle": "4.3 DNS, web requests, and layered communication"
    },
    {
      "id": "csp-mcq-5-1-1",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which example most directly illustrates a digital-divide barrier?",
      "choices": [
        "Students have accounts but some lack reliable internet at home",
        "All students receive the same password length requirement",
        "A program uses a list",
        "A bus route has a short name"
      ],
      "answer": 0,
      "explanation": "Effective access depends on infrastructure and usability, not just account ownership. Unreliable connectivity can prevent meaningful participation.",
      "lessonTitle": "5.1 Computing innovations, access, and stakeholder tradeoffs",
      "passage": "Original instructional setup. A hypothetical city bus-arrival app helps connected riders but may exclude riders without compatible devices if printed timetables are removed. Location records could expose travel patterns."
    },
    {
      "id": "csp-mcq-5-1-2",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which response best addresses a dependence on continuous connectivity?",
      "choices": [
        "Provide an offline-capable learning option",
        "Change the logo color only",
        "Increase decorative animation",
        "Remove all instructions"
      ],
      "answer": 0,
      "explanation": "Offline capability directly addresses the stated connectivity barrier. Cosmetic changes do not make an unavailable connection usable.",
      "lessonTitle": "5.1 Computing innovations, access, and stakeholder tradeoffs",
      "passage": "Original instructional setup. A hypothetical city bus-arrival app helps connected riders but may exclude riders without compatible devices if printed timetables are removed. Location records could expose travel patterns."
    },
    {
      "id": "csp-mcq-5-1-3",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which statement is the strongest stakeholder analysis of the bus app?",
      "choices": [
        "Connected riders may benefit while nonusers lose access if other information channels are removed",
        "The app must benefit every group equally",
        "Only the developer counts as a stakeholder",
        "Any convenience benefit eliminates privacy concerns"
      ],
      "answer": 0,
      "explanation": "The analysis identifies distinct groups and connects effects to specific design choices. Benefits do not automatically cancel access or privacy costs.",
      "lessonTitle": "5.1 Computing innovations, access, and stakeholder tradeoffs",
      "passage": "Original instructional setup. A hypothetical city bus-arrival app helps connected riders but may exclude riders without compatible devices if printed timetables are removed. Location records could expose travel patterns."
    },
    {
      "id": "csp-mcq-5-1-4",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why is a survey of satisfied current users insufficient to assess access fairly?",
      "choices": [
        "It can omit people excluded by the system",
        "It necessarily includes every nonuser",
        "It proves the app caused all observed improvements",
        "It eliminates selection bias by using a computer"
      ],
      "answer": 0,
      "explanation": "People unable or unwilling to use the service may be missing. Their exclusion is especially relevant when evaluating access barriers.",
      "lessonTitle": "5.1 Computing innovations, access, and stakeholder tradeoffs",
      "passage": "Original instructional setup. A hypothetical city bus-arrival app helps connected riders but may exclude riders without compatible devices if printed timetables are removed. Location records could expose travel patterns."
    },
    {
      "id": "csp-mcq-5-2-1",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A fake school message asks a student to enter a password on a look-alike website. What attack is most directly illustrated?",
      "choices": [
        "Phishing",
        "Lossless compression",
        "Binary search",
        "Parallel processing"
      ],
      "answer": 0,
      "explanation": "The attacker impersonates a trusted source to obtain credentials. The mechanism is social engineering rather than an ordinary data-processing operation.",
      "lessonTitle": "5.2 Personal data, cybersecurity, and responsible disclosure"
    },
    {
      "id": "csp-mcq-5-2-2",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which example best illustrates multifactor authentication?",
      "choices": [
        "A password plus approval from a registered security device",
        "Typing the same password twice",
        "Using two usernames with one password",
        "Compressing a password file"
      ],
      "answer": 0,
      "explanation": "Different kinds of evidence, such as knowledge of a password and possession of a registered device, can provide multiple factors.",
      "lessonTitle": "5.2 Personal data, cybersecurity, and responsible disclosure"
    },
    {
      "id": "csp-mcq-5-2-3",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What is a principal purpose of encryption?",
      "choices": [
        "Protecting confidentiality of data without the appropriate key",
        "Guaranteeing all users are honest",
        "Eliminating every possible software error",
        "Making all files smaller"
      ],
      "answer": 0,
      "explanation": "Encryption concerns confidentiality. It does not establish the honesty of endpoints, ensure bug-free programs, or necessarily reduce file size.",
      "lessonTitle": "5.2 Personal data, cybersecurity, and responsible disclosure"
    },
    {
      "id": "csp-mcq-5-2-4",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "What does a backup most directly support?",
      "choices": [
        "Recovery after loss or damage",
        "Automatic prevention of every unauthorized read",
        "Proof that collected data are unbiased",
        "Compression without any encoding"
      ],
      "answer": 0,
      "explanation": "A backup supplies a recoverable copy. It can support availability and recovery but is not a substitute for access controls or data-quality evaluation.",
      "lessonTitle": "5.2 Personal data, cybersecurity, and responsible disclosure"
    },
    {
      "id": "csp-mcq-5-3-1",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Why can a numerical model still produce biased outcomes?",
      "choices": [
        "Its data, objective, or application can encode unequal assumptions or conditions",
        "Numbers guarantee neutrality",
        "Bias is possible only when names are explicitly stored",
        "Running code removes historical inequities"
      ],
      "answer": 0,
      "explanation": "Bias can arise before, within, and after computation. Numeric inputs can reflect unequal patterns or act as proxies for other characteristics.",
      "lessonTitle": "5.3 Bias, intellectual property, and evaluating a computing claim"
    },
    {
      "id": "csp-mcq-5-3-2",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A model has high overall accuracy but low accuracy in low light. What should an evaluator do?",
      "choices": [
        "Examine performance and data under low-light conditions separately",
        "Report only the overall average",
        "Assume every subgroup has the same accuracy",
        "Delete every low-light test result"
      ],
      "answer": 0,
      "explanation": "The overall metric hides a relevant condition-specific weakness. Examining data and results for that condition supports a more informative evaluation.",
      "lessonTitle": "5.3 Bias, intellectual property, and evaluating a computing claim"
    },
    {
      "id": "csp-mcq-5-3-3",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "A downloadable image is publicly visible. What can be concluded about reuse rights?",
      "choices": [
        "Visibility alone does not establish permission to reuse it",
        "Every public image has no copyright conditions",
        "All uses are automatically authorized",
        "Attribution is always prohibited"
      ],
      "answer": 0,
      "explanation": "Access and permission are different. The applicable license or other rights determine what uses are permitted.",
      "lessonTitle": "5.3 Bias, intellectual property, and evaluating a computing claim"
    },
    {
      "id": "csp-mcq-5-3-4",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Computing reasoning",
      "question": "Which statement about open-source software is accurate?",
      "choices": [
        "Its license can still impose conditions on use or distribution",
        "It has no license terms by definition",
        "Its code is guaranteed to contain no bugs",
        "It can never be modified"
      ],
      "answer": 0,
      "explanation": "Source availability does not mean the absence of conditions or defects. Users should examine the actual license and relevant technical behavior.",
      "lessonTitle": "5.3 Bias, intellectual property, and evaluating a computing claim"
    }
  ],
  "frq": [
    {
      "id": "csp-frq-1-1",
      "domain": "CSP: Creative Development",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A study planner receives an integer m. IF m < 10, it displays “Recall”; otherwise it displays “Question set”. No input validation is currently implemented.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Describe the output for m = 8 and m = 10 and relate it to the stated condition.",
          "points": 3,
          "guidance": "8 displays Recall; 10 displays Question set because 10 < 10 is false. Identify input, comparison and resulting output."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Propose a useful boundary test and explain the error it can reveal.",
          "points": 3,
          "guidance": "Test 9, 10 and 11; distinguish < from ≤ at the threshold. State an expected output for the test."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain why a negative value exposes a design issue and propose a concrete revision.",
          "points": 3,
          "guidance": "A negative integer follows the Recall branch even though negative available time is invalid; validate m ≥ 0 and display a clear correction message or reject the entry before choosing an activity."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-1-2",
      "domain": "CSP: Creative Development",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A program should add the entries in [2, 4, 6]. It sets total ← 0, then FOR EACH value IN the list executes total ← value. It displays total after the loop.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Trace the original program and compare the output with the intended sum.",
          "points": 3,
          "guidance": "Assignments replace total with 2, then 4, then 6; the output is 6 rather than 12."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Revise the assignment and explain why the revision works.",
          "points": 3,
          "guidance": "Use total ← total + value. It preserves the accumulated sum and adds the next entry, yielding 12."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Give a meaningful additional test with an expected result.",
          "points": 3,
          "guidance": "For example [0,0] should produce 0, [-2,5] should produce 3, or an empty list should leave total at 0. Explain what the chosen test checks."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-2-1",
      "domain": "CSP: Data",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical uncompressed grayscale image is 8 by 8 pixels with 8 bits per pixel. Ignore headers and metadata. A proposed four-level encoding uses 2 bits per pixel.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Calculate the original and proposed data sizes in bits.",
          "points": 3,
          "guidance": "64 pixels × 8 = 512 bits; 64 × 2 = 128 bits. Show both products and label bits."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Explain why the four-level representation can lose information.",
          "points": 3,
          "guidance": "Eight bits allow 256 levels; two bits allow four. Multiple original shades may map to the same stored level, preventing exact reconstruction."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Describe a situation where lossless encoding would be preferable and justify it.",
          "points": 3,
          "guidance": "For example exact scientific measurements or a source image needed for further precise processing; preserve original values rather than assert that all images require identical compression."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-2-2",
      "domain": "CSP: Data",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A hypothetical sensor stores each measurement as an unsigned 12-bit integer. A proposed replacement uses 16 bits. A data analyst also receives time stamps and sensor-location labels.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Determine the number of distinct values each integer encoding can represent.",
          "points": 3,
          "guidance": "2^12 = 4096 and 2^16 = 65536; these are counts of encodings, not guaranteed physical accuracy."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Explain why more bits alone do not guarantee a more accurate physical measurement.",
          "points": 3,
          "guidance": "Accuracy also depends on sensor calibration, noise, range and sampling; extra resolution can encode noise or biased values more precisely."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain how metadata affects interpretation and identify a privacy consideration.",
          "points": 3,
          "guidance": "Time and location distinguish when/where measurements were taken, but precise location tied to a person can be identifying. Use only necessary metadata and appropriate access controls."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-3-1",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. Consider a procedure that creates an empty result list and total ← 0. For each value in [3, −1, 0, 4], if value > 0 it appends value to result and adds value to total. It returns result and total. Lists use one-based indexing.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Trace the returned list and total.",
          "points": 3,
          "guidance": "result is [3,4] and total is 7; −1 and 0 fail the strict greater-than-zero condition."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Explain how a list parameter makes the procedure useful beyond this example.",
          "points": 3,
          "guidance": "The same selection-and-accumulation algorithm can process different input lists without rewriting a separate variable or condition for every position."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Give an edge-case input and its expected outputs.",
          "points": 3,
          "guidance": "An empty or all-nonpositive list should return [] and 0; this checks initialization and the behavior when no entry passes the condition."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-3-2",
      "domain": "CSP: Algorithms & Programming",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A sorted list is [4, 9, 15, 20, 31, 45, 60]. A binary search probes the middle remaining position, starting with position 4, to find 31. Lists use one-based indexing.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Trace the probes and show why the search finds the target.",
          "points": 3,
          "guidance": "Probe 20 at position 4, then 45 at position 6, then 31 at position 5. Each comparison removes a half that cannot contain the target."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "State the required ordering assumption and explain why it matters.",
          "points": 3,
          "guidance": "The list must be sorted according to the comparison used. Otherwise discarding a half can discard the actual target."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Compare the number of probes with a left-to-right search for this target and explain the broader distinction.",
          "points": 3,
          "guidance": "This binary search uses 3 probes; linear search uses 5. For large sorted lists, repeated halving scales logarithmically, while sequential search can examine every entry."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-4-1",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. An undirected network has connections A–B, B–D, A–C, C–D and C–E. A message must travel from A to D. Each connection can carry packets independently.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Identify a route after node B fails and explain the remaining reachability.",
          "points": 3,
          "guidance": "A–C–D is still available, so failure of B does not disconnect A from D in this graph."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Explain what redundancy improves and what it does not guarantee.",
          "points": 3,
          "guidance": "Alternative paths improve tolerance of some failures, but do not guarantee uninterrupted service under every combination of failures, congestion or endpoint outage."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Distinguish packet routing from the functions of a reliable transport protocol.",
          "points": 3,
          "guidance": "Routing forwards packets toward destinations; a reliable transport protocol can detect missing data, retransmit and restore order. Individual packet delivery/order is not guaranteed merely by naming a route."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-4-2",
      "domain": "CSP: Computer Systems & Networks",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A browser uses a domain name to request a study page. DNS returns an IP address. The page is transferred using HTTPS. A student claims that encryption proves every statement on the page is true.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Explain the role of DNS in this scenario.",
          "points": 3,
          "guidance": "DNS helps resolve a domain name to an address used to contact a server; it does not decide whether the page’s educational claims are correct."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Explain an appropriate benefit of HTTPS.",
          "points": 3,
          "guidance": "It protects the confidentiality/integrity of data in transit and helps authenticate the contacted endpoint using certificates, within the trust model."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Evaluate the student’s truth claim and give a practical checking step.",
          "points": 3,
          "guidance": "A secure connection does not establish factual accuracy or good intent. Verify the domain and evaluate the content against credible sources rather than infer truth from the lock symbol alone."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-5-1",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "question": "Original targeted practice. A hypothetical classifier is correct on 18 of 20 well-lit images and 12 of 20 low-light images. The overall result is reported as 30 correct out of 40.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Calculate the overall and condition-specific accuracies.",
          "points": 3,
          "guidance": "Overall 75%; well-lit 90%; low-light 60%. Show the correct denominators."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Explain what the aggregate metric hides and what cannot yet be concluded.",
          "points": 3,
          "guidance": "The overall result hides a 30-percentage-point condition gap; the small evaluation alone does not establish its cause or performance on all future images."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Propose an evidence-based next step that also respects privacy.",
          "points": 3,
          "guidance": "Collect appropriately consented, representative low-light evaluation data and investigate errors, calibration or training coverage; limit identifying image data and access. Do not simply delete difficult cases from the report."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    },
    {
      "id": "csp-frq-5-2",
      "domain": "CSP: Impact of Computing",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "question": "Original targeted practice. A developer wants to release a study planner. It needs a subject and available minutes, but currently asks for full birth date and precise location. Its interface distinguishes statuses only by red and green. A downloaded image has no stated reuse license.",
      "criteria": [
        {
          "key": "A",
          "label": "A",
          "prompt": "Identify one data-minimization improvement and justify it.",
          "points": 3,
          "guidance": "Remove birth date or precise location unless a necessary purpose is established; the planner’s stated input needs do not require collecting those identifying details."
        },
        {
          "key": "B",
          "label": "B",
          "prompt": "Propose a specific accessibility improvement.",
          "points": 3,
          "guidance": "Add clear text labels or shapes/icons alongside color and ensure keyboard/screen-reader access; color alone can hide meaning from some users."
        },
        {
          "key": "C",
          "label": "C",
          "prompt": "Explain why public availability is not enough to establish image reuse rights.",
          "points": 3,
          "guidance": "Check an applicable license, obtain permission, or use an appropriately licensed/original alternative. Attribution alone does not automatically grant every reuse right."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional criteria; award only the stated points for supported work.",
      "explanation": "Explain the reasoning, assumptions and evidence requested in each part."
    }
  ],
  "flashcards": [
    {
      "id": "csp-card-1-1-1",
      "unit": "CSP: Creative Development",
      "term": "Program purpose",
      "answer": "The user problem or goal the program is intended to address."
    },
    {
      "id": "csp-card-1-1-2",
      "unit": "CSP: Creative Development",
      "term": "Prototype",
      "answer": "A simplified implementation used to test a design idea."
    },
    {
      "id": "csp-card-1-1-3",
      "unit": "CSP: Creative Development",
      "term": "Boundary test",
      "answer": "A test at or near a decision threshold, where comparison mistakes often appear."
    },
    {
      "id": "csp-card-1-2-1",
      "unit": "CSP: Creative Development",
      "term": "Logic error",
      "answer": "A program executes but behaves differently from its intended specification."
    },
    {
      "id": "csp-card-1-2-2",
      "unit": "CSP: Creative Development",
      "term": "Trace table",
      "answer": "A record of relevant variable values as instructions execute."
    },
    {
      "id": "csp-card-1-2-3",
      "unit": "CSP: Creative Development",
      "term": "Regression",
      "answer": "A previously working behavior that fails after a change."
    },
    {
      "id": "csp-card-1-3-1",
      "unit": "CSP: Creative Development",
      "term": "Parameter",
      "answer": "A named input in a procedure definition, supplied with an argument at a call."
    },
    {
      "id": "csp-card-1-3-2",
      "unit": "CSP: Creative Development",
      "term": "Data abstraction",
      "answer": "A representation that groups data so a program can work with it without managing every low-level detail separately."
    },
    {
      "id": "csp-card-1-3-3",
      "unit": "CSP: Creative Development",
      "term": "Procedure contract",
      "answer": "A description of a procedure’s inputs, output or effect, and relevant assumptions."
    },
    {
      "id": "csp-card-2-1-1",
      "unit": "CSP: Data",
      "term": "Bit",
      "answer": "A unit of data with two possible states."
    },
    {
      "id": "csp-card-2-1-2",
      "unit": "CSP: Data",
      "term": "Overflow",
      "answer": "A result outside the representable range of the chosen numeric format."
    },
    {
      "id": "csp-card-2-1-3",
      "unit": "CSP: Data",
      "term": "Metadata",
      "answer": "Data describing other data, its context, or its creation."
    },
    {
      "id": "csp-card-2-2-1",
      "unit": "CSP: Data",
      "term": "Lossless compression",
      "answer": "Compression that permits exact reconstruction of the original data."
    },
    {
      "id": "csp-card-2-2-2",
      "unit": "CSP: Data",
      "term": "Lossy compression",
      "answer": "Compression that permits only an approximation of the original because information is discarded."
    },
    {
      "id": "csp-card-2-2-3",
      "unit": "CSP: Data",
      "term": "Compression overhead",
      "answer": "Storage needed for counts, dictionaries, headers, or other information required by an encoding."
    },
    {
      "id": "csp-card-2-3-1",
      "unit": "CSP: Data",
      "term": "Data cleaning",
      "answer": "Documented preparation of records so the analysis uses consistent, interpretable values."
    },
    {
      "id": "csp-card-2-3-2",
      "unit": "CSP: Data",
      "term": "Selection bias",
      "answer": "Distortion resulting from who or what is included in collected data."
    },
    {
      "id": "csp-card-2-3-3",
      "unit": "CSP: Data",
      "term": "Re-identification",
      "answer": "Connecting supposedly de-identified records back to particular people using available information."
    },
    {
      "id": "csp-card-3-1-1",
      "unit": "CSP: Algorithms & Programming",
      "term": "Assignment",
      "answer": "An operation that replaces a variable’s stored value with the evaluated right-hand expression."
    },
    {
      "id": "csp-card-3-1-2",
      "unit": "CSP: Algorithms & Programming",
      "term": "Boolean expression",
      "answer": "An expression whose result is true or false."
    },
    {
      "id": "csp-card-3-1-3",
      "unit": "CSP: Algorithms & Programming",
      "term": "Selection",
      "answer": "Choosing which instructions execute based on a condition."
    },
    {
      "id": "csp-card-3-2-1",
      "unit": "CSP: Algorithms & Programming",
      "term": "Index",
      "answer": "A position identifying an element within an ordered list."
    },
    {
      "id": "csp-card-3-2-2",
      "unit": "CSP: Algorithms & Programming",
      "term": "Traversal",
      "answer": "Systematically visiting the elements of a collection."
    },
    {
      "id": "csp-card-3-2-3",
      "unit": "CSP: Algorithms & Programming",
      "term": "Accumulator",
      "answer": "A variable that retains a running result across iterations."
    },
    {
      "id": "csp-card-3-3-1",
      "unit": "CSP: Algorithms & Programming",
      "term": "Iteration",
      "answer": "Repeated execution of a block of instructions."
    },
    {
      "id": "csp-card-3-3-2",
      "unit": "CSP: Algorithms & Programming",
      "term": "Termination condition",
      "answer": "The Boolean condition that determines when a loop stops."
    },
    {
      "id": "csp-card-3-3-3",
      "unit": "CSP: Algorithms & Programming",
      "term": "Simulation",
      "answer": "A computational model used to explore selected behavior of a process under specified assumptions."
    },
    {
      "id": "csp-card-3-4-1",
      "unit": "CSP: Algorithms & Programming",
      "term": "Procedure call",
      "answer": "An invocation that executes a procedure using supplied arguments."
    },
    {
      "id": "csp-card-3-4-2",
      "unit": "CSP: Algorithms & Programming",
      "term": "Return value",
      "answer": "A result supplied by a procedure to its caller."
    },
    {
      "id": "csp-card-3-4-3",
      "unit": "CSP: Algorithms & Programming",
      "term": "Procedural abstraction",
      "answer": "Grouping an operation behind a name and contract so callers need not manage all implementation details."
    },
    {
      "id": "csp-card-3-5-1",
      "unit": "CSP: Algorithms & Programming",
      "term": "Linear search",
      "answer": "A search that checks candidates sequentially."
    },
    {
      "id": "csp-card-3-5-2",
      "unit": "CSP: Algorithms & Programming",
      "term": "Binary search",
      "answer": "A search that uses sorted order to repeatedly shrink the candidate interval."
    },
    {
      "id": "csp-card-3-5-3",
      "unit": "CSP: Algorithms & Programming",
      "term": "Heuristic",
      "answer": "A useful problem-solving strategy without a general guarantee of the exact optimal answer."
    },
    {
      "id": "csp-card-3-5-4",
      "unit": "CSP: Algorithms & Programming",
      "term": "Undecidable problem",
      "answer": "A decision problem for which no algorithm gives the required correct answer on every possible input."
    },
    {
      "id": "csp-card-3-6-1",
      "unit": "CSP: Algorithms & Programming",
      "term": "Counterexample",
      "answer": "A permitted input that disproves a universal claim about behavior."
    },
    {
      "id": "csp-card-3-6-2",
      "unit": "CSP: Algorithms & Programming",
      "term": "Pipeline",
      "answer": "A sequence of transformations in which outputs from one step become inputs to another."
    },
    {
      "id": "csp-card-3-6-3",
      "unit": "CSP: Algorithms & Programming",
      "term": "Model validation",
      "answer": "Comparing a model’s behavior with relevant observations and checking its assumptions."
    },
    {
      "id": "csp-card-4-1-1",
      "unit": "CSP: Computer Systems & Networks",
      "term": "Protocol",
      "answer": "Agreed rules governing communication between systems."
    },
    {
      "id": "csp-card-4-1-2",
      "unit": "CSP: Computer Systems & Networks",
      "term": "Packet",
      "answer": "A unit into which transmitted information is divided for network delivery."
    },
    {
      "id": "csp-card-4-1-3",
      "unit": "CSP: Computer Systems & Networks",
      "term": "Fault tolerance",
      "answer": "The ability of a system to continue functioning despite some component failures."
    },
    {
      "id": "csp-card-4-2-1",
      "unit": "CSP: Computer Systems & Networks",
      "term": "Bandwidth",
      "answer": "A data-transfer capacity or rate, commonly measured in bits per second."
    },
    {
      "id": "csp-card-4-2-2",
      "unit": "CSP: Computer Systems & Networks",
      "term": "Latency",
      "answer": "A delay in communication or response."
    },
    {
      "id": "csp-card-4-2-3",
      "unit": "CSP: Computer Systems & Networks",
      "term": "Speedup",
      "answer": "Original execution time divided by improved execution time."
    },
    {
      "id": "csp-card-4-3-1",
      "unit": "CSP: Computer Systems & Networks",
      "term": "DNS",
      "answer": "A distributed system supporting name-to-address resolution."
    },
    {
      "id": "csp-card-4-3-2",
      "unit": "CSP: Computer Systems & Networks",
      "term": "HTTP",
      "answer": "An application-level protocol family for web requests and responses."
    },
    {
      "id": "csp-card-4-3-3",
      "unit": "CSP: Computer Systems & Networks",
      "term": "Authentication",
      "answer": "Establishing or verifying the identity of a communicating party."
    },
    {
      "id": "csp-card-4-3-4",
      "unit": "CSP: Computer Systems & Networks",
      "term": "Authorization",
      "answer": "Determining the actions or resources an identified party is permitted to use."
    },
    {
      "id": "csp-card-5-1-1",
      "unit": "CSP: Impact of Computing",
      "term": "Computing innovation",
      "answer": "An innovation whose functioning importantly includes a computing program or system."
    },
    {
      "id": "csp-card-5-1-2",
      "unit": "CSP: Impact of Computing",
      "term": "Digital divide",
      "answer": "Differences in meaningful access to and use of computing resources."
    },
    {
      "id": "csp-card-5-1-3",
      "unit": "CSP: Impact of Computing",
      "term": "Stakeholder",
      "answer": "A person or group affected by the design, use, or consequences of a system."
    },
    {
      "id": "csp-card-5-2-1",
      "unit": "CSP: Impact of Computing",
      "term": "Phishing",
      "answer": "An attempt to obtain sensitive information by impersonating a trusted source."
    },
    {
      "id": "csp-card-5-2-2",
      "unit": "CSP: Impact of Computing",
      "term": "Multifactor authentication",
      "answer": "Authentication using evidence from more than one kind of factor."
    },
    {
      "id": "csp-card-5-2-3",
      "unit": "CSP: Impact of Computing",
      "term": "Encryption",
      "answer": "Transforming data to protect its confidentiality without appropriate key material."
    },
    {
      "id": "csp-card-5-2-4",
      "unit": "CSP: Impact of Computing",
      "term": "Data minimization",
      "answer": "Collecting and retaining only the data needed for a stated purpose."
    },
    {
      "id": "csp-card-5-3-1",
      "unit": "CSP: Impact of Computing",
      "term": "Algorithmic bias",
      "answer": "Systematic differences in outcomes or errors arising from a computing system’s data, design, or use."
    },
    {
      "id": "csp-card-5-3-2",
      "unit": "CSP: Impact of Computing",
      "term": "License",
      "answer": "Terms specifying permissions and conditions for using a work or software."
    },
    {
      "id": "csp-card-5-3-3",
      "unit": "CSP: Impact of Computing",
      "term": "Proxy variable",
      "answer": "A variable that can stand in for or correlate with another characteristic in a model or decision."
    }
  ],
  "references": [
    {
      "title": "Current course framework (2026–27)",
      "url": "https://apcentral.collegeboard.org/courses/ap-computer-science-principles",
      "description": "Current five-big-idea framework; the announced redesign begins in 2027–28, not this course year."
    },
    {
      "title": "Exam and Create performance task",
      "url": "https://apcentral.collegeboard.org/courses/ap-computer-science-principles/exam",
      "description": "Authoritative exam and portfolio requirements. Ascend tasks are original learning exercises, not a Create submission or official rubric."
    }
  ]
};
