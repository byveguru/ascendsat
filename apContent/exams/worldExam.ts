// Original AscendSAT full-structure practice. Not an official exam or calibrated score predictor.
export const WORLD_EXAM = {
  "id": "world-form-1",
  "courseId": "ap-world-history-modern",
  "title": "Practice exam 1",
  "mcq": [
    {
      "id": "world-exam-mcq-01",
      "domain": "World Hist: The Global Tapestry",
      "difficulty": "Hard",
      "question": "Which claim about Song China and Mali is best supported by the comparison?",
      "choices": [
        "Both relied chiefly on hereditary warrior lineages rather than salaried or appointed officials.",
        "Commercial connections made agricultural revenue secondary to all other sources of power in both states.",
        "Both connected material resources with institutions or ideas that sustained authority.",
        "Shared ethical traditions produced the same methods of recruiting and supervising officials."
      ],
      "answer": 2,
      "explanation": "The cases connect agriculture and resources to administration and legitimacy, while differing in the particular institutions used.",
      "passage": "Original secondary comparison, c. 1200–1450: In Song China, officials educated in Confucian learning administered a state supported by a large agricultural economy. Mali's rulers drew resources from farming and commercial connections across the Sahara, while public demonstrations of Islamic patronage linked the court to wider networks. In the Andes, Inca rulers later mobilized labor, roads, and storehouses across mountain environments. These examples are a comparison of institutions, not a ranking of societies. The Inca example belongs mainly to the fifteenth and early sixteenth centuries and is included to test chronology as well as comparison.",
      "stimulusId": "world-exam-stimulus-01"
    },
    {
      "id": "world-exam-mcq-02",
      "domain": "World Hist: The Global Tapestry",
      "difficulty": "Medium",
      "question": "Which additional evidence would most directly strengthen an argument about the relationship between Song economic growth and state capacity?",
      "choices": [
        "Records showing expanding taxable production and the maintenance of administrative offices.",
        "A list of Confucian authors studied by candidates, without information about revenue or staffing.",
        "An account of a ruler’s personal interest in poetry, with no record of administrative expenditure.",
        "A later description of examination prestige that does not discuss the agricultural economy."
      ],
      "answer": 0,
      "explanation": "Revenue and administrative evidence would directly connect economic production to institutional capacity; modern borders and broad stereotypes would not.",
      "passage": "Original secondary comparison, c. 1200–1450: In Song China, officials educated in Confucian learning administered a state supported by a large agricultural economy. Mali's rulers drew resources from farming and commercial connections across the Sahara, while public demonstrations of Islamic patronage linked the court to wider networks. In the Andes, Inca rulers later mobilized labor, roads, and storehouses across mountain environments. These examples are a comparison of institutions, not a ranking of societies. The Inca example belongs mainly to the fifteenth and early sixteenth centuries and is included to test chronology as well as comparison.",
      "stimulusId": "world-exam-stimulus-01"
    },
    {
      "id": "world-exam-mcq-03",
      "domain": "World Hist: The Global Tapestry",
      "difficulty": "Hard",
      "question": "Why does the chronological qualification about the Inca matter?",
      "choices": [
        "It shows that administrative institutions can be compared only when they emerged in the same decade.",
        "It permits historians to assume later Andean institutions operated unchanged in earlier centuries.",
        "It proves that differences in chronology are more important than every institutional similarity.",
        "It prevents a comparison from implying that every institution described existed throughout the entire earlier period."
      ],
      "answer": 3,
      "explanation": "Comparisons require accurate temporal boundaries; a later case may be useful without being projected across the whole earlier period.",
      "passage": "Original secondary comparison, c. 1200–1450: In Song China, officials educated in Confucian learning administered a state supported by a large agricultural economy. Mali's rulers drew resources from farming and commercial connections across the Sahara, while public demonstrations of Islamic patronage linked the court to wider networks. In the Andes, Inca rulers later mobilized labor, roads, and storehouses across mountain environments. These examples are a comparison of institutions, not a ranking of societies. The Inca example belongs mainly to the fifteenth and early sixteenth centuries and is included to test chronology as well as comparison.",
      "stimulusId": "world-exam-stimulus-01"
    },
    {
      "id": "world-exam-mcq-04",
      "domain": "World Hist: The Global Tapestry",
      "difficulty": "Hard",
      "question": "Which development would best qualify an argument that access to Confucian examinations created equal opportunity in Song China?",
      "choices": [
        "Written examinations required candidates to demonstrate familiarity with Confucian learning.",
        "Families with educational resources had advantages in preparing candidates for official service.",
        "Success in office could confer prestige on a candidate’s family.",
        "The state maintained administrative offices beyond the imperial capital."
      ],
      "answer": 1,
      "explanation": "Formal access to an examination does not eliminate unequal educational resources and social advantages.",
      "passage": "Original secondary comparison, c. 1200–1450: In Song China, officials educated in Confucian learning administered a state supported by a large agricultural economy. Mali's rulers drew resources from farming and commercial connections across the Sahara, while public demonstrations of Islamic patronage linked the court to wider networks. In the Andes, Inca rulers later mobilized labor, roads, and storehouses across mountain environments. These examples are a comparison of institutions, not a ranking of societies. The Inca example belongs mainly to the fifteenth and early sixteenth centuries and is included to test chronology as well as comparison.",
      "stimulusId": "world-exam-stimulus-01"
    },
    {
      "id": "world-exam-mcq-05",
      "domain": "World Hist: Networks of Exchange",
      "difficulty": "Medium",
      "question": "Which inference is most directly supported by the network represented?",
      "choices": [
        "Most goods must have remained with one merchant throughout their entire journey.",
        "Several coastal regions could be linked through intermediate ports rather than only by direct end-to-end voyages.",
        "The busiest-looking node necessarily exercised sovereignty over all connected ports.",
        "The longest drawn connection necessarily carried the most valuable commodities."
      ],
      "answer": 1,
      "explanation": "A network with multiple nodes allows exchange through intermediaries; the diagram does not establish who controlled the ports or the origins of all goods.",
      "passage": "Use the schematic Indian Ocean network. Original instructional map: broad connections are based on established historical geography, but the drawing is not a reconstructed route chart or a dataset of voyages. Seasonal winds helped structure sailing schedules; ports hosted merchants from multiple backgrounds. The map does not depict all routes or claim that any one state controlled the entire network.",
      "stimulusId": "world-exam-stimulus-02",
      "stimulus": {
        "type": "map",
        "title": "Indian Ocean connections, c. 1200–1450 — schematic, not to scale",
        "regions": [
          {
            "id": "eastafrica",
            "label": "East African ports",
            "x": 12,
            "y": 65
          },
          {
            "id": "arabia",
            "label": "Arabian ports",
            "x": 30,
            "y": 22
          },
          {
            "id": "india",
            "label": "Western India",
            "x": 52,
            "y": 40
          },
          {
            "id": "malacca",
            "label": "Straits region",
            "x": 80,
            "y": 70
          },
          {
            "id": "china",
            "label": "Southern China",
            "x": 93,
            "y": 18
          }
        ],
        "connections": [
          {
            "from": "eastafrica",
            "to": "arabia",
            "label": "Regional sea routes"
          },
          {
            "from": "arabia",
            "to": "india",
            "label": "Monsoon sailing"
          },
          {
            "from": "eastafrica",
            "to": "india",
            "label": "Monsoon sailing"
          },
          {
            "from": "india",
            "to": "malacca",
            "label": "Regional sea routes"
          },
          {
            "from": "malacca",
            "to": "china",
            "label": "Regional sea routes"
          }
        ],
        "note": "Original conceptual map of broad historical connections. Lines do not measure trade volume, political control, exact paths, or travel time; unshown routes also existed."
      }
    },
    {
      "id": "world-exam-mcq-06",
      "domain": "World Hist: Networks of Exchange",
      "difficulty": "Medium",
      "question": "What additional information would best explain the timing of voyages across this network?",
      "choices": [
        "The identity of every ruler who later controlled a depicted port.",
        "The modern volume of cargo arriving in a similarly located harbor.",
        "A record of tariffs that contains no information about weather or sailing seasons.",
        "Seasonal patterns of monsoon winds and the schedules they made practical."
      ],
      "answer": 3,
      "explanation": "Monsoon patterns shaped sailing opportunities in the period; the other information does not explain these voyages’ seasonal timing.",
      "passage": "Use the schematic Indian Ocean network. Original instructional map: broad connections are based on established historical geography, but the drawing is not a reconstructed route chart or a dataset of voyages. Seasonal winds helped structure sailing schedules; ports hosted merchants from multiple backgrounds. The map does not depict all routes or claim that any one state controlled the entire network.",
      "stimulusId": "world-exam-stimulus-02",
      "stimulus": {
        "type": "map",
        "title": "Indian Ocean connections, c. 1200–1450 — schematic, not to scale",
        "regions": [
          {
            "id": "eastafrica",
            "label": "East African ports",
            "x": 12,
            "y": 65
          },
          {
            "id": "arabia",
            "label": "Arabian ports",
            "x": 30,
            "y": 22
          },
          {
            "id": "india",
            "label": "Western India",
            "x": 52,
            "y": 40
          },
          {
            "id": "malacca",
            "label": "Straits region",
            "x": 80,
            "y": 70
          },
          {
            "id": "china",
            "label": "Southern China",
            "x": 93,
            "y": 18
          }
        ],
        "connections": [
          {
            "from": "eastafrica",
            "to": "arabia",
            "label": "Regional sea routes"
          },
          {
            "from": "arabia",
            "to": "india",
            "label": "Monsoon sailing"
          },
          {
            "from": "eastafrica",
            "to": "india",
            "label": "Monsoon sailing"
          },
          {
            "from": "india",
            "to": "malacca",
            "label": "Regional sea routes"
          },
          {
            "from": "malacca",
            "to": "china",
            "label": "Regional sea routes"
          }
        ],
        "note": "Original conceptual map of broad historical connections. Lines do not measure trade volume, political control, exact paths, or travel time; unshown routes also existed."
      }
    },
    {
      "id": "world-exam-mcq-07",
      "domain": "World Hist: Networks of Exchange",
      "difficulty": "Medium",
      "question": "A historian finds permanent foreign merchant neighborhoods in several ports. Which development would that evidence most directly help explain?",
      "choices": [
        "The transmission and local adaptation of religious and cultural practices.",
        "The uniform replacement of local customs by one merchant community’s practices.",
        "The end of economic competition among merchants with shared religious beliefs.",
        "A direct correspondence between the religion of traders and the official religion of every ruler."
      ],
      "answer": 0,
      "explanation": "Merchant settlement created recurring contact and institutions through which cultural practices could circulate and be adapted.",
      "passage": "Use the schematic Indian Ocean network. Original instructional map: broad connections are based on established historical geography, but the drawing is not a reconstructed route chart or a dataset of voyages. Seasonal winds helped structure sailing schedules; ports hosted merchants from multiple backgrounds. The map does not depict all routes or claim that any one state controlled the entire network.",
      "stimulusId": "world-exam-stimulus-02",
      "stimulus": {
        "type": "map",
        "title": "Indian Ocean connections, c. 1200–1450 — schematic, not to scale",
        "regions": [
          {
            "id": "eastafrica",
            "label": "East African ports",
            "x": 12,
            "y": 65
          },
          {
            "id": "arabia",
            "label": "Arabian ports",
            "x": 30,
            "y": 22
          },
          {
            "id": "india",
            "label": "Western India",
            "x": 52,
            "y": 40
          },
          {
            "id": "malacca",
            "label": "Straits region",
            "x": 80,
            "y": 70
          },
          {
            "id": "china",
            "label": "Southern China",
            "x": 93,
            "y": 18
          }
        ],
        "connections": [
          {
            "from": "eastafrica",
            "to": "arabia",
            "label": "Regional sea routes"
          },
          {
            "from": "arabia",
            "to": "india",
            "label": "Monsoon sailing"
          },
          {
            "from": "eastafrica",
            "to": "india",
            "label": "Monsoon sailing"
          },
          {
            "from": "india",
            "to": "malacca",
            "label": "Regional sea routes"
          },
          {
            "from": "malacca",
            "to": "china",
            "label": "Regional sea routes"
          }
        ],
        "note": "Original conceptual map of broad historical connections. Lines do not measure trade volume, political control, exact paths, or travel time; unshown routes also existed."
      }
    },
    {
      "id": "world-exam-mcq-08",
      "domain": "World Hist: Networks of Exchange",
      "difficulty": "Hard",
      "question": "Which question cannot be answered from this schematic alone?",
      "choices": [
        "Whether the model includes connections among more than one coastal region.",
        "Whether the model represents western India as connected to several regions.",
        "Whether a particular route carried a greater annual value of goods than another.",
        "Whether the model portrays exchange through linked ports rather than only inland caravan stations."
      ],
      "answer": 2,
      "explanation": "No quantities or voyage records are supplied, so relative trade value cannot be inferred from the lines.",
      "passage": "Use the schematic Indian Ocean network. Original instructional map: broad connections are based on established historical geography, but the drawing is not a reconstructed route chart or a dataset of voyages. Seasonal winds helped structure sailing schedules; ports hosted merchants from multiple backgrounds. The map does not depict all routes or claim that any one state controlled the entire network.",
      "stimulusId": "world-exam-stimulus-02",
      "stimulus": {
        "type": "map",
        "title": "Indian Ocean connections, c. 1200–1450 — schematic, not to scale",
        "regions": [
          {
            "id": "eastafrica",
            "label": "East African ports",
            "x": 12,
            "y": 65
          },
          {
            "id": "arabia",
            "label": "Arabian ports",
            "x": 30,
            "y": 22
          },
          {
            "id": "india",
            "label": "Western India",
            "x": 52,
            "y": 40
          },
          {
            "id": "malacca",
            "label": "Straits region",
            "x": 80,
            "y": 70
          },
          {
            "id": "china",
            "label": "Southern China",
            "x": 93,
            "y": 18
          }
        ],
        "connections": [
          {
            "from": "eastafrica",
            "to": "arabia",
            "label": "Regional sea routes"
          },
          {
            "from": "arabia",
            "to": "india",
            "label": "Monsoon sailing"
          },
          {
            "from": "eastafrica",
            "to": "india",
            "label": "Monsoon sailing"
          },
          {
            "from": "india",
            "to": "malacca",
            "label": "Regional sea routes"
          },
          {
            "from": "malacca",
            "to": "china",
            "label": "Regional sea routes"
          }
        ],
        "note": "Original conceptual map of broad historical connections. Lines do not measure trade volume, political control, exact paths, or travel time; unshown routes also existed."
      }
    },
    {
      "id": "world-exam-mcq-09",
      "domain": "World Hist: Land-Based Empires",
      "difficulty": "Medium",
      "question": "According to the model, which statement correctly compares the treasury’s receipts after the listed collection costs?",
      "choices": [
        "Direct collection leaves 120 units while contracting leaves 95 after costs.",
        "Contracting leaves 105 units because the collection cost is added to receipts.",
        "The table proves direct collection always yields more net revenue in real empires.",
        "Direct collection leaves 85 units, the same net amount as contracting."
      ],
      "answer": 3,
      "explanation": "Subtracting listed costs gives 120−35 and 95−10, both 85. These model calculations do not establish historical outcomes.",
      "passage": "Consider the invented model of imperial revenue arrangements. Early modern states used varied methods of collecting revenue, sometimes relying on intermediaries who retained resources or authority. The table is an analytical model, not a historical measurement. Use it to evaluate relationships and identify the historical evidence needed to test an explanation.",
      "stimulusId": "world-exam-stimulus-03",
      "stimulus": {
        "type": "table",
        "title": "Two hypothetical imperial revenue arrangements, c. 1450–1750",
        "columns": [
          "Arrangement",
          "Revenue reaching treasury",
          "Collection costs paid by treasury",
          "Local intermediary influence"
        ],
        "rows": [
          [
            "Direct collection",
            "120 model units",
            "35 model units",
            "Lower in this model"
          ],
          [
            "Revenue contracted to intermediary",
            "95 model units",
            "10 model units",
            "Higher in this model"
          ]
        ],
        "note": "Invented instructional figures and simplified categories, not measured data from a named empire. They illustrate trade-offs and cannot establish real revenue totals or prove which policy worked best historically."
      }
    },
    {
      "id": "world-exam-mcq-10",
      "domain": "World Hist: Land-Based Empires",
      "difficulty": "Medium",
      "question": "What potential political trade-off does the model illustrate?",
      "choices": [
        "Lower central collection costs necessarily reduced the total obligations paid by subjects.",
        "The arrangement with greater gross receipts necessarily produced greater net receipts.",
        "Delegating collection may lower central costs while strengthening intermediaries.",
        "Delegating revenue collection removed the center’s need to negotiate with local authorities."
      ],
      "answer": 2,
      "explanation": "The model distinguishes fiscal costs from local influence, showing why an administrative choice can have multiple consequences.",
      "passage": "Consider the invented model of imperial revenue arrangements. Early modern states used varied methods of collecting revenue, sometimes relying on intermediaries who retained resources or authority. The table is an analytical model, not a historical measurement. Use it to evaluate relationships and identify the historical evidence needed to test an explanation.",
      "stimulusId": "world-exam-stimulus-03",
      "stimulus": {
        "type": "table",
        "title": "Two hypothetical imperial revenue arrangements, c. 1450–1750",
        "columns": [
          "Arrangement",
          "Revenue reaching treasury",
          "Collection costs paid by treasury",
          "Local intermediary influence"
        ],
        "rows": [
          [
            "Direct collection",
            "120 model units",
            "35 model units",
            "Lower in this model"
          ],
          [
            "Revenue contracted to intermediary",
            "95 model units",
            "10 model units",
            "Higher in this model"
          ]
        ],
        "note": "Invented instructional figures and simplified categories, not measured data from a named empire. They illustrate trade-offs and cannot establish real revenue totals or prove which policy worked best historically."
      }
    },
    {
      "id": "world-exam-mcq-11",
      "domain": "World Hist: Land-Based Empires",
      "difficulty": "Medium",
      "question": "Which evidence would best test whether this model describes a particular Ottoman province?",
      "choices": [
        "A royal eulogy praising efficient administration without identifying provincial practices.",
        "Provincial tax contracts and treasury accounts compared with records of local officeholders.",
        "A theoretical fiscal model fitted to the same invented totals rather than to archival accounts.",
        "A comparison of religious architecture that provides no information about tax contracts."
      ],
      "answer": 1,
      "explanation": "Fiscal and administrative records could connect revenue practices with intermediary power in the specified historical setting.",
      "passage": "Consider the invented model of imperial revenue arrangements. Early modern states used varied methods of collecting revenue, sometimes relying on intermediaries who retained resources or authority. The table is an analytical model, not a historical measurement. Use it to evaluate relationships and identify the historical evidence needed to test an explanation.",
      "stimulusId": "world-exam-stimulus-03",
      "stimulus": {
        "type": "table",
        "title": "Two hypothetical imperial revenue arrangements, c. 1450–1750",
        "columns": [
          "Arrangement",
          "Revenue reaching treasury",
          "Collection costs paid by treasury",
          "Local intermediary influence"
        ],
        "rows": [
          [
            "Direct collection",
            "120 model units",
            "35 model units",
            "Lower in this model"
          ],
          [
            "Revenue contracted to intermediary",
            "95 model units",
            "10 model units",
            "Higher in this model"
          ]
        ],
        "note": "Invented instructional figures and simplified categories, not measured data from a named empire. They illustrate trade-offs and cannot establish real revenue totals or prove which policy worked best historically."
      }
    },
    {
      "id": "world-exam-mcq-12",
      "domain": "World Hist: Land-Based Empires",
      "difficulty": "Hard",
      "question": "Why should a historian avoid using the model to rank all early modern empires by administrative effectiveness?",
      "choices": [
        "Actual costs, institutions, enforcement and local conditions differed and require empirical evidence.",
        "Differences in gross receipts by themselves settle comparisons of administrative effectiveness.",
        "The fiscal arrangement yielding equal net revenue must also produce identical political outcomes.",
        "Delegation can be evaluated without considering enforcement or intermediary authority."
      ],
      "answer": 0,
      "explanation": "A simplified model isolates relationships but cannot replace evidence about diverse institutions and their operation.",
      "passage": "Consider the invented model of imperial revenue arrangements. Early modern states used varied methods of collecting revenue, sometimes relying on intermediaries who retained resources or authority. The table is an analytical model, not a historical measurement. Use it to evaluate relationships and identify the historical evidence needed to test an explanation.",
      "stimulusId": "world-exam-stimulus-03",
      "stimulus": {
        "type": "table",
        "title": "Two hypothetical imperial revenue arrangements, c. 1450–1750",
        "columns": [
          "Arrangement",
          "Revenue reaching treasury",
          "Collection costs paid by treasury",
          "Local intermediary influence"
        ],
        "rows": [
          [
            "Direct collection",
            "120 model units",
            "35 model units",
            "Lower in this model"
          ],
          [
            "Revenue contracted to intermediary",
            "95 model units",
            "10 model units",
            "Higher in this model"
          ]
        ],
        "note": "Invented instructional figures and simplified categories, not measured data from a named empire. They illustrate trade-offs and cannot establish real revenue totals or prove which policy worked best historically."
      }
    },
    {
      "id": "world-exam-mcq-13",
      "domain": "World Hist: Land-Based Empires",
      "difficulty": "Medium",
      "question": "Which interpretation best explains a political function of Safavid religious policy?",
      "choices": [
        "It could distinguish the dynasty’s identity from neighboring Sunni rivals while reinforcing authority.",
        "It guaranteed political unity by removing disagreements within every religious community.",
        "It made patronage of scholars less relevant than the complete separation of religion and government.",
        "It primarily aimed to reproduce the same religious settlement used by Mughal accommodation policies."
      ],
      "answer": 0,
      "explanation": "A promoted religious identity could support legitimacy and differentiation without eliminating material institutions or conflict.",
      "passage": "Original secondary comparison: Safavid rulers promoted Shi’a Islam as a component of state identity in Persia. Ottoman rulers patronized predominantly Sunni institutions while governing populations with varied religions and legal statuses. Mughal emperor Akbar used policies of accommodation to help govern a South Asia with many non-Muslim subjects. Religious patronage coexisted with armies, revenue systems and negotiation with elites; policies also changed over time.",
      "stimulusId": "world-exam-stimulus-04"
    },
    {
      "id": "world-exam-mcq-14",
      "domain": "World Hist: Land-Based Empires",
      "difficulty": "Hard",
      "question": "Which comparison of Akbar’s policies and Safavid religious policy is most defensible?",
      "choices": [
        "Accommodation and confessional distinction produced identical legal status for all subjects.",
        "Differences in religious policy demonstrate that only one dynasty needed revenue and armed forces.",
        "They illustrate different uses of religious policy to address imperial political circumstances.",
        "Religious patronage can be explained by personal conviction without examining political circumstances."
      ],
      "answer": 2,
      "explanation": "The cases show different strategies and contexts; neither identical policies nor exclusively cynical motives follow from the evidence.",
      "passage": "Original secondary comparison: Safavid rulers promoted Shi’a Islam as a component of state identity in Persia. Ottoman rulers patronized predominantly Sunni institutions while governing populations with varied religions and legal statuses. Mughal emperor Akbar used policies of accommodation to help govern a South Asia with many non-Muslim subjects. Religious patronage coexisted with armies, revenue systems and negotiation with elites; policies also changed over time.",
      "stimulusId": "world-exam-stimulus-04"
    },
    {
      "id": "world-exam-mcq-15",
      "domain": "World Hist: Land-Based Empires",
      "difficulty": "Hard",
      "question": "A royal chronicle praises a ruler’s religious patronage. How should the chronicle’s purpose affect its use?",
      "choices": [
        "Its detailed description of patronage establishes how all local communities responded.",
        "Its celebration of the dynasty helps reveal intended legitimacy, while popular reception requires other evidence.",
        "Its political purpose requires historians to reject its account of the dynasty’s intended message.",
        "Its emphasis on sacred authority demonstrates that fiscal institutions had no role in rule."
      ],
      "answer": 1,
      "explanation": "A celebratory source is useful for intended messages but cannot by itself establish how different audiences responded.",
      "passage": "Original secondary comparison: Safavid rulers promoted Shi’a Islam as a component of state identity in Persia. Ottoman rulers patronized predominantly Sunni institutions while governing populations with varied religions and legal statuses. Mughal emperor Akbar used policies of accommodation to help govern a South Asia with many non-Muslim subjects. Religious patronage coexisted with armies, revenue systems and negotiation with elites; policies also changed over time.",
      "stimulusId": "world-exam-stimulus-04"
    },
    {
      "id": "world-exam-mcq-16",
      "domain": "World Hist: Land-Based Empires",
      "difficulty": "Hard",
      "question": "Which evidence would most directly qualify a claim that religious policy alone explains imperial durability?",
      "choices": [
        "Records showing rulers supporting religious schools and scholars.",
        "Architectural plans emphasizing a ruler’s association with a sacred tradition.",
        "A dynastic chronicle attributing victory to the ruler’s religious virtue.",
        "Records connecting military expenses, revenue collection and cooperation with local elites to continued rule."
      ],
      "answer": 3,
      "explanation": "Administrative and material evidence would identify mechanisms beyond religious legitimation, whereas the other examples largely repeat the original factor.",
      "passage": "Original secondary comparison: Safavid rulers promoted Shi’a Islam as a component of state identity in Persia. Ottoman rulers patronized predominantly Sunni institutions while governing populations with varied religions and legal statuses. Mughal emperor Akbar used policies of accommodation to help govern a South Asia with many non-Muslim subjects. Religious patronage coexisted with armies, revenue systems and negotiation with elites; policies also changed over time.",
      "stimulusId": "world-exam-stimulus-04"
    },
    {
      "id": "world-exam-mcq-17",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Medium",
      "question": "Which conclusion is best supported by the represented connections?",
      "choices": [
        "Silver’s movement indicates that producers and consumers held similar political power.",
        "Pacific exchange replaced rather than supplemented Atlantic circulation.",
        "American extraction and Asian demand could be linked through interoceanic commercial networks.",
        "Asian demand was simply the result of European legal control over all Asian markets."
      ],
      "answer": 2,
      "explanation": "The depicted flows link distant production and demand without establishing equal gains or complete political control.",
      "passage": "Use the qualitative silver-flow table. American silver circulated through Atlantic and Pacific routes, and Asian commercial and fiscal demand helped draw it into exchange. This original table summarizes relationships; it is not an archival ledger and assigns no numerical trade volumes.",
      "stimulusId": "world-exam-stimulus-05",
      "stimulus": {
        "type": "table",
        "title": "Illustrative movement of silver, c. 1500–1750",
        "columns": [
          "Connection",
          "Goods or payments represented",
          "What the model does not measure"
        ],
        "rows": [
          [
            "American mines → Atlantic shipping",
            "Silver",
            "Annual volume or miners’ living conditions"
          ],
          [
            "Spanish America → Manila",
            "Silver",
            "Complete control by a single merchant group"
          ],
          [
            "Asian markets → Manila exchange",
            "Textiles, porcelain and other goods",
            "Equal bargaining power among participants"
          ]
        ],
        "note": "Original qualitative flow model, not a quantitative dataset or a complete account of every route. Historical connections are simplified; arrows do not represent equal quantities."
      }
    },
    {
      "id": "world-exam-mcq-18",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Medium",
      "question": "Which development helps explain increased Chinese demand for silver in this period?",
      "choices": [
        "A general preference for barter that made fiscal payments in money unnecessary.",
        "Fiscal and commercial practices that made silver important for payments.",
        "A transition that made American plantation workers the main consumers in Chinese markets.",
        "The replacement of fiscal obligations by voluntary gifts to merchants."
      ],
      "answer": 1,
      "explanation": "Silver’s role in payments and taxation contributed to demand; integration did not require the disappearance of Chinese markets or government.",
      "passage": "Use the qualitative silver-flow table. American silver circulated through Atlantic and Pacific routes, and Asian commercial and fiscal demand helped draw it into exchange. This original table summarizes relationships; it is not an archival ledger and assigns no numerical trade volumes.",
      "stimulusId": "world-exam-stimulus-05",
      "stimulus": {
        "type": "table",
        "title": "Illustrative movement of silver, c. 1500–1750",
        "columns": [
          "Connection",
          "Goods or payments represented",
          "What the model does not measure"
        ],
        "rows": [
          [
            "American mines → Atlantic shipping",
            "Silver",
            "Annual volume or miners’ living conditions"
          ],
          [
            "Spanish America → Manila",
            "Silver",
            "Complete control by a single merchant group"
          ],
          [
            "Asian markets → Manila exchange",
            "Textiles, porcelain and other goods",
            "Equal bargaining power among participants"
          ]
        ],
        "note": "Original qualitative flow model, not a quantitative dataset or a complete account of every route. Historical connections are simplified; arrows do not represent equal quantities."
      }
    },
    {
      "id": "world-exam-mcq-19",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Medium",
      "question": "Which additional source would best reveal a social cost hidden by the flow model?",
      "choices": [
        "A merchant itinerary showing the same ports already represented in the table.",
        "A list of silver prices that supplies no information about labor obligations.",
        "A diplomatic description of trade privileges that does not discuss mining communities.",
        "Records of coerced labor and conditions in an American mining district."
      ],
      "answer": 3,
      "explanation": "Labor records could reveal burdens on particular populations that a commodity-flow model does not show.",
      "passage": "Use the qualitative silver-flow table. American silver circulated through Atlantic and Pacific routes, and Asian commercial and fiscal demand helped draw it into exchange. This original table summarizes relationships; it is not an archival ledger and assigns no numerical trade volumes.",
      "stimulusId": "world-exam-stimulus-05",
      "stimulus": {
        "type": "table",
        "title": "Illustrative movement of silver, c. 1500–1750",
        "columns": [
          "Connection",
          "Goods or payments represented",
          "What the model does not measure"
        ],
        "rows": [
          [
            "American mines → Atlantic shipping",
            "Silver",
            "Annual volume or miners’ living conditions"
          ],
          [
            "Spanish America → Manila",
            "Silver",
            "Complete control by a single merchant group"
          ],
          [
            "Asian markets → Manila exchange",
            "Textiles, porcelain and other goods",
            "Equal bargaining power among participants"
          ]
        ],
        "note": "Original qualitative flow model, not a quantitative dataset or a complete account of every route. Historical connections are simplified; arrows do not represent equal quantities."
      }
    },
    {
      "id": "world-exam-mcq-20",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Hard",
      "question": "What would be a misuse of the table?",
      "choices": [
        "Treating the arrows as proof that equal amounts of silver moved along each connection.",
        "Using it to frame a question about links between extraction and consumption.",
        "Asking which regional routes or intermediaries the simplification leaves out.",
        "Comparing the diagram with manifests and commercial correspondence."
      ],
      "answer": 0,
      "explanation": "The note explicitly states that arrows are qualitative; they cannot support quantitative equality.",
      "passage": "Use the qualitative silver-flow table. American silver circulated through Atlantic and Pacific routes, and Asian commercial and fiscal demand helped draw it into exchange. This original table summarizes relationships; it is not an archival ledger and assigns no numerical trade volumes.",
      "stimulusId": "world-exam-stimulus-05",
      "stimulus": {
        "type": "table",
        "title": "Illustrative movement of silver, c. 1500–1750",
        "columns": [
          "Connection",
          "Goods or payments represented",
          "What the model does not measure"
        ],
        "rows": [
          [
            "American mines → Atlantic shipping",
            "Silver",
            "Annual volume or miners’ living conditions"
          ],
          [
            "Spanish America → Manila",
            "Silver",
            "Complete control by a single merchant group"
          ],
          [
            "Asian markets → Manila exchange",
            "Textiles, porcelain and other goods",
            "Equal bargaining power among participants"
          ]
        ],
        "note": "Original qualitative flow model, not a quantitative dataset or a complete account of every route. Historical connections are simplified; arrows do not represent equal quantities."
      }
    },
    {
      "id": "world-exam-mcq-21",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Medium",
      "question": "Which interpretation best connects plantation growth with the Atlantic slave trade?",
      "choices": [
        "The profitability of sugar reduced owners’ interest in controlling the labor supply.",
        "Commercial demand and colonial institutions expanded the demand for coerced labor.",
        "Consumer demand alone explains labor recruitment without attention to law or finance.",
        "Plantation growth primarily replaced coerced labor with workers able to bargain freely over exit."
      ],
      "answer": 1,
      "explanation": "Commercial demand interacted with institutions and coercion; labor flows were not simply voluntary responses to wages.",
      "passage": "Original comparative synthesis, c. 1500–1750: Atlantic sugar plantations relied heavily on enslaved African labor. Spanish authorities adapted the Andean mita to colonial mining, while encomienda claims imposed obligations on Indigenous communities under assertions of protection and Christian instruction. Enslaved and colonized people resisted through escape, revolt, negotiation and cultural persistence. These institutions had different legal histories and forms of coercion.",
      "stimulusId": "world-exam-stimulus-06"
    },
    {
      "id": "world-exam-mcq-22",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Hard",
      "question": "Which comparison of colonial mita and encomienda is most accurate?",
      "choices": [
        "Both imposed Indigenous obligations, but they were not identical institutions or simply unchanged preconquest systems.",
        "Their shared use of coerced labor made their legal origins and enforcement procedures identical.",
        "The survival of an earlier labor name shows that conquest did not change its obligations.",
        "Both arrangements were chiefly designed to create equal bargaining power for local communities."
      ],
      "answer": 0,
      "explanation": "The institutions differed in origins and operation even though both could support colonial extraction.",
      "passage": "Original comparative synthesis, c. 1500–1750: Atlantic sugar plantations relied heavily on enslaved African labor. Spanish authorities adapted the Andean mita to colonial mining, while encomienda claims imposed obligations on Indigenous communities under assertions of protection and Christian instruction. Enslaved and colonized people resisted through escape, revolt, negotiation and cultural persistence. These institutions had different legal histories and forms of coercion.",
      "stimulusId": "world-exam-stimulus-06"
    },
    {
      "id": "world-exam-mcq-23",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Medium",
      "question": "Evidence of maroon communities would most directly challenge which interpretation?",
      "choices": [
        "That coercion was important to plantation production.",
        "That colonial authorities sought to enforce territorial and labor claims.",
        "That enslaved people had no agency in shaping colonial societies.",
        "That cultural practices could persist and change within Atlantic societies."
      ],
      "answer": 2,
      "explanation": "Communities formed by escaped enslaved people demonstrate resistance and efforts to build autonomy within coercive conditions.",
      "passage": "Original comparative synthesis, c. 1500–1750: Atlantic sugar plantations relied heavily on enslaved African labor. Spanish authorities adapted the Andean mita to colonial mining, while encomienda claims imposed obligations on Indigenous communities under assertions of protection and Christian instruction. Enslaved and colonized people resisted through escape, revolt, negotiation and cultural persistence. These institutions had different legal histories and forms of coercion.",
      "stimulusId": "world-exam-stimulus-06"
    },
    {
      "id": "world-exam-mcq-24",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Hard",
      "question": "Which source would most clearly require distinction between a stated legal justification and actual practice?",
      "choices": [
        "A shipping manifest identifying a vessel’s recorded cargo and arrival date.",
        "A mine-location survey that makes no claim about obligations to local communities.",
        "A list of crops cultivated for export that does not discuss labor relations.",
        "A colonial official’s assertion that labor obligations fulfilled duties to protect Indigenous subjects."
      ],
      "answer": 3,
      "explanation": "A protective legal rationale is a claim about legitimacy; evidence of actual labor conditions is needed to evaluate implementation.",
      "passage": "Original comparative synthesis, c. 1500–1750: Atlantic sugar plantations relied heavily on enslaved African labor. Spanish authorities adapted the Andean mita to colonial mining, while encomienda claims imposed obligations on Indigenous communities under assertions of protection and Christian instruction. Enslaved and colonized people resisted through escape, revolt, negotiation and cultural persistence. These institutions had different legal histories and forms of coercion.",
      "stimulusId": "world-exam-stimulus-06"
    },
    {
      "id": "world-exam-mcq-25",
      "domain": "World Hist: Revolutions",
      "difficulty": "Hard",
      "question": "Which thesis best responds to the comparison?",
      "choices": [
        "The use of similar rights language produced equivalent outcomes for enslaved people in every revolution.",
        "Political separation was the main measure of change, making slavery and property relations secondary to comparison.",
        "Revolutions differed so much that common political ideas cannot be meaningfully investigated.",
        "Atlantic revolutions shared challenges to established authority while differing in the extent of social transformation."
      ],
      "answer": 3,
      "explanation": "A comparative thesis should acknowledge shared political challenges and divergent social outcomes.",
      "passage": "Original secondary comparison of Atlantic revolutions: Revolutionary leaders often used rights and popular sovereignty to challenge established rule, but the scope of social change varied. The Haitian Revolution destroyed slavery and defeated French colonial rule. Independence in many other American settings did not immediately end slavery or dismantle elite economic power. National belonging and formal independence therefore did not automatically produce equal political participation.",
      "stimulusId": "world-exam-stimulus-07"
    },
    {
      "id": "world-exam-mcq-26",
      "domain": "World Hist: Revolutions",
      "difficulty": "Medium",
      "question": "Which evidence most directly supports the distinctive social transformation attributed to Haiti?",
      "choices": [
        "The circulation of rights language among elites who retained control of plantation property.",
        "The defeat of the plantation slave system through a revolution involving enslaved people.",
        "The opening of new markets without a fundamental change in enslaved status.",
        "The adoption of a new national symbol while the same slaveholding institutions continued."
      ],
      "answer": 1,
      "explanation": "Haitian revolutionary struggles ended slavery and colonial rule; the other developments do not support that particular claim.",
      "passage": "Original secondary comparison of Atlantic revolutions: Revolutionary leaders often used rights and popular sovereignty to challenge established rule, but the scope of social change varied. The Haitian Revolution destroyed slavery and defeated French colonial rule. Independence in many other American settings did not immediately end slavery or dismantle elite economic power. National belonging and formal independence therefore did not automatically produce equal political participation.",
      "stimulusId": "world-exam-stimulus-07"
    },
    {
      "id": "world-exam-mcq-27",
      "domain": "World Hist: Revolutions",
      "difficulty": "Medium",
      "question": "How could activists use a declaration of universal rights to challenge exclusions?",
      "choices": [
        "They could apply its stated principles to people whom existing institutions denied equal treatment.",
        "Universal rights claims settled the meaning of citizenship without further political contest.",
        "Only the original social groups represented by a declaration could legitimately invoke its language.",
        "The adoption of a declaration made organizational pressure less important than before."
      ],
      "answer": 0,
      "explanation": "Universal claims could become resources for contesting restricted application even when immediate enforcement was limited.",
      "passage": "Original secondary comparison of Atlantic revolutions: Revolutionary leaders often used rights and popular sovereignty to challenge established rule, but the scope of social change varied. The Haitian Revolution destroyed slavery and defeated French colonial rule. Independence in many other American settings did not immediately end slavery or dismantle elite economic power. National belonging and formal independence therefore did not automatically produce equal political participation.",
      "stimulusId": "world-exam-stimulus-07"
    },
    {
      "id": "world-exam-mcq-28",
      "domain": "World Hist: Revolutions",
      "difficulty": "Hard",
      "question": "Which question would best evaluate the extent of change after a successful independence movement?",
      "choices": [
        "Whether leaders used similar ceremonial language when announcing independence.",
        "Whether a new state’s symbols resembled those of neighboring republics.",
        "How legal status, landholding and participation changed for different social groups.",
        "Whether the revolutionary elite shared a common educational background, without examining other groups."
      ],
      "answer": 2,
      "explanation": "Disaggregated institutional and social outcomes reveal more about the extent of change than a declaration or elite biography alone.",
      "passage": "Original secondary comparison of Atlantic revolutions: Revolutionary leaders often used rights and popular sovereignty to challenge established rule, but the scope of social change varied. The Haitian Revolution destroyed slavery and defeated French colonial rule. Independence in many other American settings did not immediately end slavery or dismantle elite economic power. National belonging and formal independence therefore did not automatically produce equal political participation.",
      "stimulusId": "world-exam-stimulus-07"
    },
    {
      "id": "world-exam-mcq-29",
      "domain": "World Hist: Revolutions",
      "difficulty": "Medium",
      "question": "Which change is correctly calculated from the model?",
      "choices": [
        "Factory employment rises by 45 percentage points.",
        "Factory employment rises by 45 percent relative to its initial value.",
        "Every worker becomes a factory employee by 1850.",
        "The increase proves that each worker’s wage rises by 45 percent."
      ],
      "answer": 0,
      "explanation": "The share rises from 10% to 55%, a 45-percentage-point change. Relative growth and wage changes are different measures.",
      "passage": "Use the invented manufacturing-district table. It models structural changes associated with industrialization without presenting measured historical statistics. The model can suggest questions about working life, but additional evidence is needed to evaluate actual living standards or causal mechanisms.",
      "stimulusId": "world-exam-stimulus-08",
      "stimulus": {
        "type": "table",
        "title": "Hypothetical manufacturing district, 1780 and 1850",
        "columns": [
          "Measure",
          "1780 model",
          "1850 model"
        ],
        "rows": [
          [
            "Workers employed in factories",
            "10%",
            "55%"
          ],
          [
            "Workers reporting at least 60 hours weekly",
            "30%",
            "65%"
          ],
          [
            "Households living in towns",
            "25%",
            "60%"
          ]
        ],
        "note": "Invented model values for reasoning practice, not statistics from a real place. Worker and household denominators differ; the figures do not directly measure wages, productivity, health, or every individual’s experience."
      }
    },
    {
      "id": "world-exam-mcq-30",
      "domain": "World Hist: Revolutions",
      "difficulty": "Hard",
      "question": "Which conclusion would go beyond the evidence supplied?",
      "choices": [
        "The town-household share rose between the two model years.",
        "The model depicts a growing share of workers reporting at least 60 hours.",
        "Factory employment occupied a larger share of the modeled workforce.",
        "Every household’s material well-being improved because the town population share rose."
      ],
      "answer": 3,
      "explanation": "The table supplies neither individual outcomes nor a complete measure of well-being; urban growth alone cannot establish universal improvement.",
      "passage": "Use the invented manufacturing-district table. It models structural changes associated with industrialization without presenting measured historical statistics. The model can suggest questions about working life, but additional evidence is needed to evaluate actual living standards or causal mechanisms.",
      "stimulusId": "world-exam-stimulus-08",
      "stimulus": {
        "type": "table",
        "title": "Hypothetical manufacturing district, 1780 and 1850",
        "columns": [
          "Measure",
          "1780 model",
          "1850 model"
        ],
        "rows": [
          [
            "Workers employed in factories",
            "10%",
            "55%"
          ],
          [
            "Workers reporting at least 60 hours weekly",
            "30%",
            "65%"
          ],
          [
            "Households living in towns",
            "25%",
            "60%"
          ]
        ],
        "note": "Invented model values for reasoning practice, not statistics from a real place. Worker and household denominators differ; the figures do not directly measure wages, productivity, health, or every individual’s experience."
      }
    },
    {
      "id": "world-exam-mcq-31",
      "domain": "World Hist: Revolutions",
      "difficulty": "Medium",
      "question": "Which historical response is most closely connected to the working-time issue modeled?",
      "choices": [
        "Arguments that industrial employers should control schedules without outside regulation.",
        "Efforts to standardize commercial tariffs without considering workplace conditions.",
        "Campaigns by workers and reformers for limits on labor hours.",
        "Campaigns concerned only with the diplomatic status of newly independent states."
      ],
      "answer": 2,
      "explanation": "Long working hours became an object of union organizing and reform campaigns, though responses and results varied.",
      "passage": "Use the invented manufacturing-district table. It models structural changes associated with industrialization without presenting measured historical statistics. The model can suggest questions about working life, but additional evidence is needed to evaluate actual living standards or causal mechanisms.",
      "stimulusId": "world-exam-stimulus-08",
      "stimulus": {
        "type": "table",
        "title": "Hypothetical manufacturing district, 1780 and 1850",
        "columns": [
          "Measure",
          "1780 model",
          "1850 model"
        ],
        "rows": [
          [
            "Workers employed in factories",
            "10%",
            "55%"
          ],
          [
            "Workers reporting at least 60 hours weekly",
            "30%",
            "65%"
          ],
          [
            "Households living in towns",
            "25%",
            "60%"
          ]
        ],
        "note": "Invented model values for reasoning practice, not statistics from a real place. Worker and household denominators differ; the figures do not directly measure wages, productivity, health, or every individual’s experience."
      }
    },
    {
      "id": "world-exam-mcq-32",
      "domain": "World Hist: Revolutions",
      "difficulty": "Hard",
      "question": "Which comparison would best explain different paths to industrialization?",
      "choices": [
        "Comparing export totals while assuming states and private firms played the same roles.",
        "British industrial growth and Meiji Japan’s use of state-backed institutional reforms.",
        "Treating industrial growth as the diffusion of machinery without examining institutions.",
        "Explaining industrial differences solely through the cultural preferences of individual workers."
      ],
      "answer": 1,
      "explanation": "Comparing state involvement and institutional strategies reveals different paths rather than assuming identical development.",
      "passage": "Use the invented manufacturing-district table. It models structural changes associated with industrialization without presenting measured historical statistics. The model can suggest questions about working life, but additional evidence is needed to evaluate actual living standards or causal mechanisms.",
      "stimulusId": "world-exam-stimulus-08",
      "stimulus": {
        "type": "table",
        "title": "Hypothetical manufacturing district, 1780 and 1850",
        "columns": [
          "Measure",
          "1780 model",
          "1850 model"
        ],
        "rows": [
          [
            "Workers employed in factories",
            "10%",
            "55%"
          ],
          [
            "Workers reporting at least 60 hours weekly",
            "30%",
            "65%"
          ],
          [
            "Households living in towns",
            "25%",
            "60%"
          ]
        ],
        "note": "Invented model values for reasoning practice, not statistics from a real place. Worker and household denominators differ; the figures do not directly measure wages, productivity, health, or every individual’s experience."
      }
    },
    {
      "id": "world-exam-mcq-33",
      "domain": "World Hist: Consequences of Industrialization",
      "difficulty": "Medium",
      "question": "Which argument about infrastructure is most directly supported by the scenario?",
      "choices": [
        "Increasing transport capacity meant that local residents necessarily acquired greater control over exports.",
        "Promotional claims about progress are a sufficient measure of how costs were distributed.",
        "Transport investment could increase connections while serving extractive priorities and imposing unequal costs.",
        "The export orientation of infrastructure rules out its possible use in local exchange."
      ],
      "answer": 2,
      "explanation": "The scenario combines connectivity, export priorities and local complaints, supporting an argument about unequal effects rather than a single uniform outcome.",
      "passage": "Original interpretive description, c. 1750–1900: In a colonial territory, officials and investors build rail connections from mineral-producing interiors to export ports. Promotional statements emphasize progress and improved transport. Local petitions complain about land loss, compulsory obligations and decisions made for distant markets. This is a composite instructional scenario, not a quotation from a named colony or a claim that every colonial railway had identical effects.",
      "stimulusId": "world-exam-stimulus-09"
    },
    {
      "id": "world-exam-mcq-34",
      "domain": "World Hist: Consequences of Industrialization",
      "difficulty": "Hard",
      "question": "How should the promotional statement and local petitions be compared?",
      "choices": [
        "As sources with different positions and purposes that illuminate both intended benefits and experienced costs.",
        "Give official promotional claims priority because they describe the planned investment.",
        "Use petitions as a complete statistical description of all residents’ experiences.",
        "Treat disagreement itself as proof that neither source contains usable historical evidence."
      ],
      "answer": 0,
      "explanation": "Source comparison can reveal priorities and experiences without assuming either source gives a complete account.",
      "passage": "Original interpretive description, c. 1750–1900: In a colonial territory, officials and investors build rail connections from mineral-producing interiors to export ports. Promotional statements emphasize progress and improved transport. Local petitions complain about land loss, compulsory obligations and decisions made for distant markets. This is a composite instructional scenario, not a quotation from a named colony or a claim that every colonial railway had identical effects.",
      "stimulusId": "world-exam-stimulus-09"
    },
    {
      "id": "world-exam-mcq-35",
      "domain": "World Hist: Consequences of Industrialization",
      "difficulty": "Medium",
      "question": "Which wider development helps explain the demand for mineral-export railways?",
      "choices": [
        "A decline in overseas resource demand caused investors to move all production to subsistence farming.",
        "Industrial production and investment connected imperial expansion with distant resource markets.",
        "Rail construction followed local transportation preferences independently of global commodity markets.",
        "Foreign industrial demand mattered only after every colony gained political independence."
      ],
      "answer": 1,
      "explanation": "Industrial demand and capital investment could shape colonial transport priorities and extraction.",
      "passage": "Original interpretive description, c. 1750–1900: In a colonial territory, officials and investors build rail connections from mineral-producing interiors to export ports. Promotional statements emphasize progress and improved transport. Local petitions complain about land loss, compulsory obligations and decisions made for distant markets. This is a composite instructional scenario, not a quotation from a named colony or a claim that every colonial railway had identical effects.",
      "stimulusId": "world-exam-stimulus-09"
    },
    {
      "id": "world-exam-mcq-36",
      "domain": "World Hist: Consequences of Industrialization",
      "difficulty": "Medium",
      "question": "What additional evidence would most directly test a claim that local residents gained new opportunities from the railway?",
      "choices": [
        "The number of times officials described the railway as a civilizing project.",
        "The appearance of the export port on maps without evidence about local use.",
        "The fact that some petitions criticized the project, treated as representing every resident.",
        "Employment, passenger-use and local-trade records examined alongside land and labor conditions."
      ],
      "answer": 3,
      "explanation": "Testing benefits requires evidence of actual local use and distribution, compared with costs and the diversity of residents’ experiences.",
      "passage": "Original interpretive description, c. 1750–1900: In a colonial territory, officials and investors build rail connections from mineral-producing interiors to export ports. Promotional statements emphasize progress and improved transport. Local petitions complain about land loss, compulsory obligations and decisions made for distant markets. This is a composite instructional scenario, not a quotation from a named colony or a claim that every colonial railway had identical effects.",
      "stimulusId": "world-exam-stimulus-09"
    },
    {
      "id": "world-exam-mcq-37",
      "domain": "World Hist: Consequences of Industrialization",
      "difficulty": "Hard",
      "question": "Which comparison between indenture and slavery is most historically defensible?",
      "choices": [
        "Because both involved coercion, the legal duration and inherited status of workers were the same.",
        "Their legal structures differed, although both could involve severe coercion and unequal power.",
        "Because indenture involved a contract, recruiters and employers could not restrict workers’ choices.",
        "Because slavery had ended legally, labor markets operated with equal bargaining power."
      ],
      "answer": 1,
      "explanation": "Legal differences matter without erasing the coercive conditions that could characterize indenture.",
      "passage": "Original comparative synthesis: After legal emancipation in several plantation economies, employers recruited indentured workers from India and China under contracts that often constrained mobility and bargaining power. Other migrants moved for wages, land, family ties or security. Migrants built associations and sent resources across borders, while states imposed racially discriminatory restrictions. Contractual labor, slavery and unrestricted voluntary migration were not identical legal categories.",
      "stimulusId": "world-exam-stimulus-10"
    },
    {
      "id": "world-exam-mcq-38",
      "domain": "World Hist: Consequences of Industrialization",
      "difficulty": "Medium",
      "question": "A migrant sends earnings to relatives and funds a community association abroad. This most directly illustrates what?",
      "choices": [
        "Migration severed family ties once a person began earning wages abroad.",
        "Community associations primarily demonstrate that migrants had no effect on their destinations.",
        "Transnational ties maintained through remittances and collective institutions.",
        "Remittances prove that economic conditions were identical in origin and destination regions."
      ],
      "answer": 2,
      "explanation": "Resources and organizations could sustain relationships across borders while migrants also participated in destination communities.",
      "passage": "Original comparative synthesis: After legal emancipation in several plantation economies, employers recruited indentured workers from India and China under contracts that often constrained mobility and bargaining power. Other migrants moved for wages, land, family ties or security. Migrants built associations and sent resources across borders, while states imposed racially discriminatory restrictions. Contractual labor, slavery and unrestricted voluntary migration were not identical legal categories.",
      "stimulusId": "world-exam-stimulus-10"
    },
    {
      "id": "world-exam-mcq-39",
      "domain": "World Hist: Consequences of Industrialization",
      "difficulty": "Medium",
      "question": "Which evidence best explains why employers expanded indentured recruitment after emancipation?",
      "choices": [
        "Legal emancipation ended employers’ interest in retaining a dependable workforce.",
        "The continuation of export markets made labor organization irrelevant to plantation profits.",
        "Workers’ signatures alone show why recruiters selected particular destinations and populations.",
        "Plantation owners’ efforts to secure controlled labor supplies for export production."
      ],
      "answer": 3,
      "explanation": "Employers sought labor for continued export production and used recruitment and contractual constraints to manage it.",
      "passage": "Original comparative synthesis: After legal emancipation in several plantation economies, employers recruited indentured workers from India and China under contracts that often constrained mobility and bargaining power. Other migrants moved for wages, land, family ties or security. Migrants built associations and sent resources across borders, while states imposed racially discriminatory restrictions. Contractual labor, slavery and unrestricted voluntary migration were not identical legal categories.",
      "stimulusId": "world-exam-stimulus-10"
    },
    {
      "id": "world-exam-mcq-40",
      "domain": "World Hist: Consequences of Industrialization",
      "difficulty": "Hard",
      "question": "Which method would best test a broad claim about nineteenth-century migrants’ freedom of choice?",
      "choices": [
        "Compare recruitment, debt, legal restrictions and exit possibilities across specific migration systems.",
        "Classify every contract as freely chosen without examining recruitment or enforcement.",
        "Infer conditions in all labor systems from one employer’s description of an ideal contract.",
        "Use a worker’s movement across a border as sufficient evidence of either complete freedom or permanent enslavement."
      ],
      "answer": 0,
      "explanation": "Freedom and constraint varied by system; examining actual recruitment and rights avoids a misleading binary.",
      "passage": "Original comparative synthesis: After legal emancipation in several plantation economies, employers recruited indentured workers from India and China under contracts that often constrained mobility and bargaining power. Other migrants moved for wages, land, family ties or security. Migrants built associations and sent resources across borders, while states imposed racially discriminatory restrictions. Contractual labor, slavery and unrestricted voluntary migration were not identical legal categories.",
      "stimulusId": "world-exam-stimulus-10"
    },
    {
      "id": "world-exam-mcq-41",
      "domain": "World Hist: Global Conflict",
      "difficulty": "Medium",
      "question": "Which development best illustrates the concept of total war?",
      "choices": [
        "A government’s effort to maintain civilian economic routines entirely apart from military supply.",
        "The use of diplomatic statements to avoid involving producers in a conflict.",
        "The decision to limit analysis of war to battlefield technology and tactics.",
        "Government coordination of civilian production and consumption to sustain military campaigns."
      ],
      "answer": 3,
      "explanation": "Total war draws extensively on civilian resources and organization; participation does not establish uniform support.",
      "passage": "Original secondary interpretation of the world wars: Industrial production and imperial connections increased states’ capacity to mobilize soldiers, materials and civilian labor. Propaganda appealed to national duty, while rationing and recruitment altered daily life. Civilians experienced bombing, occupation and displacement. The Holocaust was a deliberate genocide organized by Nazi Germany and its collaborators, not simply an accidental consequence of general wartime deprivation.",
      "stimulusId": "world-exam-stimulus-11"
    },
    {
      "id": "world-exam-mcq-42",
      "domain": "World Hist: Global Conflict",
      "difficulty": "Medium",
      "question": "How did imperial networks affect wartime mobilization?",
      "choices": [
        "They enabled states to draw soldiers and labor from territories beyond the metropolitan homeland.",
        "Colonial participation meant recruits shared metropolitan citizenship and motives.",
        "Imperial connections confined the resources available to European armies to Europe alone.",
        "Colonial recruitment removed preexisting political grievances from wartime participation."
      ],
      "answer": 0,
      "explanation": "Imperial networks extended resources and manpower while preserving unequal statuses and diverse motives.",
      "passage": "Original secondary interpretation of the world wars: Industrial production and imperial connections increased states’ capacity to mobilize soldiers, materials and civilian labor. Propaganda appealed to national duty, while rationing and recruitment altered daily life. Civilians experienced bombing, occupation and displacement. The Holocaust was a deliberate genocide organized by Nazi Germany and its collaborators, not simply an accidental consequence of general wartime deprivation.",
      "stimulusId": "world-exam-stimulus-11"
    },
    {
      "id": "world-exam-mcq-43",
      "domain": "World Hist: Global Conflict",
      "difficulty": "Hard",
      "question": "A poster urges colonial subjects to enlist as loyal members of an empire. What does it establish most directly?",
      "choices": [
        "The distribution of personal motives among everyone who joined.",
        "The proportion of recruits who entered service without pressure.",
        "The appeal that authorities hoped would mobilize a particular audience.",
        "The effectiveness of the appeal without any evidence of audience response."
      ],
      "answer": 2,
      "explanation": "Propaganda provides evidence about intended persuasion; reception and motives require other evidence.",
      "passage": "Original secondary interpretation of the world wars: Industrial production and imperial connections increased states’ capacity to mobilize soldiers, materials and civilian labor. Propaganda appealed to national duty, while rationing and recruitment altered daily life. Civilians experienced bombing, occupation and displacement. The Holocaust was a deliberate genocide organized by Nazi Germany and its collaborators, not simply an accidental consequence of general wartime deprivation.",
      "stimulusId": "world-exam-stimulus-11"
    },
    {
      "id": "world-exam-mcq-44",
      "domain": "World Hist: Global Conflict",
      "difficulty": "Hard",
      "question": "Which approach best preserves the distinction made about the Holocaust?",
      "choices": [
        "Compare the death totals alone and treat intention as irrelevant to explanation.",
        "Examine deliberate racial ideology, policies and institutions rather than subsuming genocide into undifferentiated wartime suffering.",
        "Explain organized persecution principally as an unintended shortage of wartime resources.",
        "Use wartime conditions as a substitute for identifying institutions and decisions."
      ],
      "answer": 1,
      "explanation": "The Holocaust requires explanation of intentional genocidal institutions and ideology; general suffering alone obscures its character.",
      "passage": "Original secondary interpretation of the world wars: Industrial production and imperial connections increased states’ capacity to mobilize soldiers, materials and civilian labor. Propaganda appealed to national duty, while rationing and recruitment altered daily life. Civilians experienced bombing, occupation and displacement. The Holocaust was a deliberate genocide organized by Nazi Germany and its collaborators, not simply an accidental consequence of general wartime deprivation.",
      "stimulusId": "world-exam-stimulus-11"
    },
    {
      "id": "world-exam-mcq-45",
      "domain": "World Hist: Cold War & Decolonization",
      "difficulty": "Medium",
      "question": "Which development provides the most direct context for the resolution?",
      "choices": [
        "Postwar anticolonial mobilization and the entry of newly independent states into international institutions.",
        "The removal of colonial questions from international diplomacy after 1945.",
        "The establishment of a common political program among every newly independent government.",
        "The completion of all independence struggles before the creation of the United Nations."
      ],
      "answer": 0,
      "explanation": "Postwar decolonization and new diplomatic actors made colonial independence a central international issue.",
      "passage": "Primary-source paraphrase, not a quotation: UN General Assembly Resolution 1514 (XV), 1960, called for an end to colonial domination and affirmed peoples’ self-determination. The document was adopted amid expanding anticolonial movements and the growing presence of newly independent states in international diplomacy. The declaration expressed standards and demands; it did not by itself produce independence or equal economic power everywhere. Primary record: https://digitallibrary.un.org/record/57680",
      "stimulusId": "world-exam-stimulus-12"
    },
    {
      "id": "world-exam-mcq-46",
      "domain": "World Hist: Cold War & Decolonization",
      "difficulty": "Medium",
      "question": "How could an anticolonial movement use the resolution?",
      "choices": [
        "Treat its adoption as evidence that colonial officials immediately surrendered all administrative powers.",
        "As an international standard to support claims for independence and seek diplomatic backing.",
        "Use it to demonstrate that local movements no longer needed political organization.",
        "Assume every country invoking self-determination adopted the same diplomatic alignment."
      ],
      "answer": 1,
      "explanation": "A norm can strengthen legitimacy and diplomacy without automatically implementing its demands.",
      "passage": "Primary-source paraphrase, not a quotation: UN General Assembly Resolution 1514 (XV), 1960, called for an end to colonial domination and affirmed peoples’ self-determination. The document was adopted amid expanding anticolonial movements and the growing presence of newly independent states in international diplomacy. The declaration expressed standards and demands; it did not by itself produce independence or equal economic power everywhere. Primary record: https://digitallibrary.un.org/record/57680",
      "stimulusId": "world-exam-stimulus-12"
    },
    {
      "id": "world-exam-mcq-47",
      "domain": "World Hist: Cold War & Decolonization",
      "difficulty": "Hard",
      "question": "Which evidence would most directly qualify a claim that political independence ended external constraints?",
      "choices": [
        "A state’s public adoption of symbols asserting its independent identity.",
        "A leader’s declaration that political independence had been achieved.",
        "An admission to an international institution that recognizes the new state’s sovereignty.",
        "Continued reliance on a narrow export base and pressure from foreign investors or states."
      ],
      "answer": 3,
      "explanation": "Economic dependence and external pressure show constraints that can persist despite formal sovereignty.",
      "passage": "Primary-source paraphrase, not a quotation: UN General Assembly Resolution 1514 (XV), 1960, called for an end to colonial domination and affirmed peoples’ self-determination. The document was adopted amid expanding anticolonial movements and the growing presence of newly independent states in international diplomacy. The declaration expressed standards and demands; it did not by itself produce independence or equal economic power everywhere. Primary record: https://digitallibrary.un.org/record/57680",
      "stimulusId": "world-exam-stimulus-12"
    },
    {
      "id": "world-exam-mcq-48",
      "domain": "World Hist: Cold War & Decolonization",
      "difficulty": "Hard",
      "question": "Why should this source be read alongside accounts of local independence struggles?",
      "choices": [
        "Use international policy to explain local action without investigating movement goals.",
        "Treat diplomatic language as unrelated to local struggles because it is produced at a different scale.",
        "An international declaration and local movements reveal different scales of action and cannot substitute for one another.",
        "Reject the source’s information because it advances a political objective."
      ],
      "answer": 2,
      "explanation": "Combining scales explains how international standards interacted with, rather than replaced, local goals and organization.",
      "passage": "Primary-source paraphrase, not a quotation: UN General Assembly Resolution 1514 (XV), 1960, called for an end to colonial domination and affirmed peoples’ self-determination. The document was adopted amid expanding anticolonial movements and the growing presence of newly independent states in international diplomacy. The declaration expressed standards and demands; it did not by itself produce independence or equal economic power everywhere. Primary record: https://digitallibrary.un.org/record/57680",
      "stimulusId": "world-exam-stimulus-12"
    },
    {
      "id": "world-exam-mcq-49",
      "domain": "World Hist: Globalization",
      "difficulty": "Medium",
      "question": "Which concept best describes the arrangement represented?",
      "choices": [
        "A national economy that coordinates every stage within its own borders.",
        "A political federation in which commercial relationships have replaced independent governments.",
        "A global supply chain coordinating distinct activities across multiple countries.",
        "An exchange network that distributes finished goods but contains no production specialization."
      ],
      "answer": 2,
      "explanation": "Cross-border coordination of design, parts, assembly and sales constitutes a supply chain without implying political unification.",
      "passage": "Consider the original product-network model for 1980–2001. Firms used lower transport and communication costs to coordinate production across borders. Governments continued to regulate labor, investment and trade; integration did not mean the disappearance of states. The model does not establish how gains and costs were distributed.",
      "stimulusId": "world-exam-stimulus-13",
      "stimulus": {
        "type": "table",
        "title": "Hypothetical product network, 1980–2001",
        "columns": [
          "Activity",
          "Location in model",
          "Change described"
        ],
        "rows": [
          [
            "Design and finance",
            "Country A",
            "Digital coordination expands"
          ],
          [
            "Component manufacture",
            "Countries B and C",
            "Parts cross borders"
          ],
          [
            "Final assembly",
            "Country D",
            "Employment grows near export facilities"
          ],
          [
            "Sales",
            "Several regions",
            "Lower transport costs widen access"
          ]
        ],
        "note": "Original qualitative model, not actual company data or a universal sequence. It provides no wage, profit, inequality or environmental measurements."
      }
    },
    {
      "id": "world-exam-mcq-50",
      "domain": "World Hist: Globalization",
      "difficulty": "Hard",
      "question": "Which evidence would be needed to evaluate a claim that assembly workers benefited economically?",
      "choices": [
        "The number of markets reached by the product without records of workers’ experiences.",
        "The firm’s total revenue treated as equivalent to the wages received by assembly workers.",
        "The existence of an export facility without comparison to wages, costs or alternatives.",
        "Wage, working-condition and household evidence compared with relevant alternatives."
      ],
      "answer": 3,
      "explanation": "Employment expansion alone does not establish the size or distribution of benefits, so worker-level and comparative evidence matters.",
      "passage": "Consider the original product-network model for 1980–2001. Firms used lower transport and communication costs to coordinate production across borders. Governments continued to regulate labor, investment and trade; integration did not mean the disappearance of states. The model does not establish how gains and costs were distributed.",
      "stimulusId": "world-exam-stimulus-13",
      "stimulus": {
        "type": "table",
        "title": "Hypothetical product network, 1980–2001",
        "columns": [
          "Activity",
          "Location in model",
          "Change described"
        ],
        "rows": [
          [
            "Design and finance",
            "Country A",
            "Digital coordination expands"
          ],
          [
            "Component manufacture",
            "Countries B and C",
            "Parts cross borders"
          ],
          [
            "Final assembly",
            "Country D",
            "Employment grows near export facilities"
          ],
          [
            "Sales",
            "Several regions",
            "Lower transport costs widen access"
          ]
        ],
        "note": "Original qualitative model, not actual company data or a universal sequence. It provides no wage, profit, inequality or environmental measurements."
      }
    },
    {
      "id": "world-exam-mcq-51",
      "domain": "World Hist: Globalization",
      "difficulty": "Medium",
      "question": "What role of technology is most directly represented?",
      "choices": [
        "Eliminating the influence of transport infrastructure on production decisions.",
        "Reducing the difficulty of coordinating production and exchange over distance.",
        "Guaranteeing similar returns for firms, workers and states in each participating location.",
        "Making regulatory choices independent of the location of production."
      ],
      "answer": 1,
      "explanation": "Digital and transport changes aid coordination but do not erase physical infrastructure or political conditions.",
      "passage": "Consider the original product-network model for 1980–2001. Firms used lower transport and communication costs to coordinate production across borders. Governments continued to regulate labor, investment and trade; integration did not mean the disappearance of states. The model does not establish how gains and costs were distributed.",
      "stimulusId": "world-exam-stimulus-13",
      "stimulus": {
        "type": "table",
        "title": "Hypothetical product network, 1980–2001",
        "columns": [
          "Activity",
          "Location in model",
          "Change described"
        ],
        "rows": [
          [
            "Design and finance",
            "Country A",
            "Digital coordination expands"
          ],
          [
            "Component manufacture",
            "Countries B and C",
            "Parts cross borders"
          ],
          [
            "Final assembly",
            "Country D",
            "Employment grows near export facilities"
          ],
          [
            "Sales",
            "Several regions",
            "Lower transport costs widen access"
          ]
        ],
        "note": "Original qualitative model, not actual company data or a universal sequence. It provides no wage, profit, inequality or environmental measurements."
      }
    },
    {
      "id": "world-exam-mcq-52",
      "domain": "World Hist: Globalization",
      "difficulty": "Hard",
      "question": "Which development would most directly challenge the claim that globalization eliminates local cultural agency?",
      "choices": [
        "Communities adapting widely circulated media to local languages, identities and political concerns.",
        "The diffusion of a widely recognized commercial brand to several societies.",
        "A growth in international communication connections without information on cultural use.",
        "A reduction in freight time that supplies no evidence about local interpretations."
      ],
      "answer": 0,
      "explanation": "Local adaptation shows that common networks can coexist with cultural differentiation rather than uniform replacement.",
      "passage": "Consider the original product-network model for 1980–2001. Firms used lower transport and communication costs to coordinate production across borders. Governments continued to regulate labor, investment and trade; integration did not mean the disappearance of states. The model does not establish how gains and costs were distributed.",
      "stimulusId": "world-exam-stimulus-13",
      "stimulus": {
        "type": "table",
        "title": "Hypothetical product network, 1980–2001",
        "columns": [
          "Activity",
          "Location in model",
          "Change described"
        ],
        "rows": [
          [
            "Design and finance",
            "Country A",
            "Digital coordination expands"
          ],
          [
            "Component manufacture",
            "Countries B and C",
            "Parts cross borders"
          ],
          [
            "Final assembly",
            "Country D",
            "Employment grows near export facilities"
          ],
          [
            "Sales",
            "Several regions",
            "Lower transport costs widen access"
          ]
        ],
        "note": "Original qualitative model, not actual company data or a universal sequence. It provides no wage, profit, inequality or environmental measurements."
      }
    },
    {
      "id": "world-exam-mcq-53",
      "domain": "World Hist: Global Conflict",
      "difficulty": "Hard",
      "question": "Which evidence best tests the gap between post-World War I principles and practice?",
      "choices": [
        "Public promises of national self-determination without records of their implementation.",
        "The continuation of imperial control under mandate arrangements.",
        "The assumption that the conclusion of peace negotiations fulfilled all competing territorial claims.",
        "The adoption of diplomatic language treated as sufficient evidence of political autonomy."
      ],
      "answer": 1,
      "explanation": "Mandates preserved forms of external rule, qualifying broad claims about self-determination after the war.",
      "passage": "Original secondary comparison: After the First World War, political leaders announced principles for a new order while disagreements over borders and empire persisted. During the Cold War, newly independent states sometimes pursued nonalignment to protect diplomatic autonomy. By the late twentieth century, rights and environmental movements used international networks to press claims that governments implemented unevenly. Public declarations created resources for argument without ensuring identical outcomes everywhere.",
      "stimulusId": "world-exam-stimulus-14"
    },
    {
      "id": "world-exam-mcq-54",
      "domain": "World Hist: Cold War & Decolonization",
      "difficulty": "Hard",
      "question": "Which policy best reflects nonalignment as practiced by some Cold War states?",
      "choices": [
        "Avoiding all assistance from states associated with either side of the Cold War.",
        "Entering a formal bloc while allowing the sponsoring power to decide every foreign-policy question.",
        "Seeking assistance from different powers while resisting formal subordination to either bloc.",
        "Maintaining exactly equal economic and military ties with both blocs in every circumstance."
      ],
      "answer": 2,
      "explanation": "Nonalignment sought autonomy and could involve relationships with competing powers rather than isolation.",
      "passage": "Original secondary comparison: After the First World War, political leaders announced principles for a new order while disagreements over borders and empire persisted. During the Cold War, newly independent states sometimes pursued nonalignment to protect diplomatic autonomy. By the late twentieth century, rights and environmental movements used international networks to press claims that governments implemented unevenly. Public declarations created resources for argument without ensuring identical outcomes everywhere.",
      "stimulusId": "world-exam-stimulus-14"
    },
    {
      "id": "world-exam-mcq-55",
      "domain": "World Hist: Globalization",
      "difficulty": "Hard",
      "question": "What would best support an argument that international norms matter despite uneven enforcement?",
      "choices": [
        "Evidence that activists invoked shared standards to organize pressure and challenge state policy.",
        "Treat a declaration’s adoption as sufficient proof that its principles were implemented.",
        "Treat a violation as evidence that shared standards could not influence political organizing.",
        "Assume that all organizations invoking a standard used the same strategy and pursued identical goals."
      ],
      "answer": 0,
      "explanation": "Standards can shape organizing and claims even when political enforcement remains limited.",
      "passage": "Original secondary comparison: After the First World War, political leaders announced principles for a new order while disagreements over borders and empire persisted. During the Cold War, newly independent states sometimes pursued nonalignment to protect diplomatic autonomy. By the late twentieth century, rights and environmental movements used international networks to press claims that governments implemented unevenly. Public declarations created resources for argument without ensuring identical outcomes everywhere.",
      "stimulusId": "world-exam-stimulus-14"
    }
  ],
  "saq": [
    {
      "id": "world-exam-saq-1",
      "domain": "World Hist: Networks of Exchange",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "saq_secondary",
      "title": "Short answer 1 — interpreting connected societies",
      "question": "Required short-answer question 1. Period: c. 1200–1450. Answer A, B and C. These two secondary interpretations are original instructional analyses written for this exam, not quotations attributed to published historians.\n\nInterpretation A: Long-distance commercial networks expanded because merchants, communities and rulers created institutions that made movement more practical. Lodging, credit, political protection and knowledge of environments helped people use routes that remained costly and risky.\n\nInterpretation B: The importance of commercial networks lies not only in the volume of goods. Repeated movement of merchants, travelers and teachers reshaped cultural and social relationships, while local communities adapted incoming practices rather than adopting them uniformly.\n\nA. Describe ONE difference in emphasis between the interpretations.\nB. Explain ONE specific historical development from c. 1200–1450 that supports Interpretation A.\nC. Explain ONE specific historical development from c. 1200–1450 that supports Interpretation B.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 1,
          "prompt": "Describe one difference in emphasis.",
          "guidance": "Award 1 point for explaining that A emphasizes conditions or institutions enabling exchange while B emphasizes cultural or social consequences and adaptation. Do not require the student to claim that the interpretations contradict one another. A bare statement that they are different earns no point."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 1,
          "prompt": "Explain a development supporting Interpretation A.",
          "guidance": "Award 1 point for a specific accurate development linked to enabling exchange: for example caravanserai supporting overland travel, credit coordinating payments, Mongol protection of some Eurasian routes after conquest, camel caravans addressing desert transport, or monsoon knowledge organizing Indian Ocean voyages. Naming a technology or place without explaining its relationship to exchange does not earn the point. Keep the example within the period."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 1,
          "prompt": "Explain a development supporting Interpretation B.",
          "guidance": "Award 1 point for a specific accurate development linked to cultural or social effects: for example Muslim merchant communities and cultural interaction on the Swahili coast or in Indian Ocean ports, Buddhist transmission through commercial and scholarly networks, or travelers and teachers adapting ideas locally. An explanation of the plague as a social consequence can earn credit if it is connected to movement and a specific effect. Do not require a single preferred example."
        }
      ],
      "maxPoints": 3,
      "rubric": "Part A (1 point): Award 1 point for explaining that A emphasizes conditions or institutions enabling exchange while B emphasizes cultural or social consequences and adaptation. Do not require the student to claim that the interpretations contradict one another. A bare statement that they are different earns no point.\n\nPart B (1 point): Award 1 point for a specific accurate development linked to enabling exchange: for example caravanserai supporting overland travel, credit coordinating payments, Mongol protection of some Eurasian routes after conquest, camel caravans addressing desert transport, or monsoon knowledge organizing Indian Ocean voyages. Naming a technology or place without explaining its relationship to exchange does not earn the point. Keep the example within the period.\n\nPart C (1 point): Award 1 point for a specific accurate development linked to cultural or social effects: for example Muslim merchant communities and cultural interaction on the Swahili coast or in Indian Ocean ports, Buddhist transmission through commercial and scholarly networks, or travelers and teachers adapting ideas locally. An explanation of the plague as a social consequence can earn credit if it is connected to movement and a specific effect. Do not require a single preferred example.",
      "explanation": "Original AscendSAT full-structure practice. Judge historically defensible arguments and accurate evidence rather than exact wording. The app-authored guidance is not official scoring or a validated score conversion."
    },
    {
      "id": "world-exam-saq-2",
      "domain": "World Hist: Revolutions",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "saq_primary",
      "title": "Short answer 2 — rights and political authority",
      "question": "Required short-answer question 2. Period: c. 1750–1900. Answer A, B and C.\n\nPrimary source: The French National Assembly, Declaration of the Rights of Man and of the Citizen, 1789. Instructional paraphrase of Articles 1–3 and 6, not a direct quotation: People possess equal rights; government should preserve basic rights; political sovereignty resides in the nation; and law expresses the general will through participation by citizens or their representatives. The document states principles, not evidence that every resident could actually participate equally.\n\nPrimary text: https://avalon.law.yale.edu/18th_century/rightsof.asp\n\nA. Describe ONE political principle expressed in the source.\nB. Explain ONE development in the Atlantic world between c. 1750 and 1800 that helps explain why such principles became politically influential.\nC. Explain ONE specific development between 1789 and 1900 that demonstrates either the expansion OR a limit of the application of such principles.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 1,
          "prompt": "Describe a political principle expressed in the source.",
          "guidance": "Award 1 point for accurately describing a principle such as equal rights, national or popular sovereignty, government protection of rights, or participation in law through citizens or representatives. Merely saying democracy without explaining its meaning is insufficient. Accept alternate phrasing supported by the paraphrase."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 1,
          "prompt": "Explain a relevant Atlantic development before 1800.",
          "guidance": "Award 1 point for a specific development linked to the political appeal of rights or sovereignty, such as Enlightenment debates, opposition to inherited privileges, fiscal and representative conflict in France, the American Revolution, or challenges to slavery in the Atlantic. The answer must explain a relationship rather than simply list an event. Do not require a claim that all advocates applied the principles consistently."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 1,
          "prompt": "Explain an expansion or limitation between 1789 and 1900.",
          "guidance": "Award 1 point for a specific accurate development explained in relation to the principles. Examples of expansion include the abolition of slavery through the Haitian Revolution, a concrete extension of voting rights, or an organized campaign applying equal-rights claims to women. Limits include continuing slavery where legally maintained, restricted female participation, property-based voting restrictions, or colonial domination despite rights claims. Keep the example within the requested period, distinguish a campaign from completed legal equality, and accept historically defensible alternatives."
        }
      ],
      "maxPoints": 3,
      "rubric": "Part A (1 point): Award 1 point for accurately describing a principle such as equal rights, national or popular sovereignty, government protection of rights, or participation in law through citizens or representatives. Merely saying democracy without explaining its meaning is insufficient. Accept alternate phrasing supported by the paraphrase.\n\nPart B (1 point): Award 1 point for a specific development linked to the political appeal of rights or sovereignty, such as Enlightenment debates, opposition to inherited privileges, fiscal and representative conflict in France, the American Revolution, or challenges to slavery in the Atlantic. The answer must explain a relationship rather than simply list an event. Do not require a claim that all advocates applied the principles consistently.\n\nPart C (1 point): Award 1 point for a specific accurate development explained in relation to the principles. Examples of expansion include the abolition of slavery through the Haitian Revolution, a concrete extension of voting rights, or an organized campaign applying equal-rights claims to women. Limits include continuing slavery where legally maintained, restricted female participation, property-based voting restrictions, or colonial domination despite rights claims. Keep the example within the requested period, distinguish a campaign from completed legal equality, and accept historically defensible alternatives.",
      "explanation": "Original AscendSAT full-structure practice. Judge historically defensible arguments and accurate evidence rather than exact wording. The app-authored guidance is not official scoring or a validated score conversion.",
      "sourceUrl": "https://avalon.law.yale.edu/18th_century/rightsof.asp"
    },
    {
      "id": "world-exam-saq-3",
      "domain": "World Hist: Cold War & Decolonization",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "saq_nontext",
      "title": "Short answer 3 — decolonization across contexts",
      "question": "Required short-answer question 3. Period: c. 1900–2001. Answer A, B and C. Use the original secondary timeline below. It is a visual summary of selected historical events, not a map of every empire or a claim that all independence processes were identical.\n\n1947 ── India and Pakistan become independent after partition of British India\n1957 ── Ghana becomes independent from British colonial rule\n1962 ── Algeria becomes independent after a war against French rule\n\nA. Describe ONE broader historical pattern illustrated by the timeline.\nB. Explain ONE similarity OR difference between the paths to independence in TWO of the cases shown.\nC. Explain ONE reason the dates alone are insufficient to evaluate how much independence changed people’s political or economic lives.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 1,
          "prompt": "Describe a broader pattern.",
          "guidance": "Award 1 point for describing post-World War II decolonization across multiple regions or challenges to European imperial control. A date repeated without a broader pattern earns no point. Do not accept a claim that all decolonization ended in 1962 or that the three cases are a complete global sample."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 1,
          "prompt": "Explain a similarity or difference between two cases.",
          "guidance": "Award 1 point for an accurate comparison that identifies two cases and explains the relationship. Examples include mass anticolonial organization in India and Ghana; different combinations of negotiation, mobilization and war in Ghana and Algeria; or partition and widespread displacement in British India contrasted with another case. Do not characterize Indian independence as entirely peaceful or imply all African transitions followed one path. A list of two dates does not establish a comparison."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 1,
          "prompt": "Explain a limitation of the dates as evidence.",
          "guidance": "Award 1 point for explaining a missing dimension such as voting access, violence and displacement, land distribution, economic dependence, state institutions, or relations among communities. The response must connect the missing evidence to evaluating change. Do not accept an unsupported assertion that independence had no significance."
        }
      ],
      "maxPoints": 3,
      "rubric": "Part A (1 point): Award 1 point for describing post-World War II decolonization across multiple regions or challenges to European imperial control. A date repeated without a broader pattern earns no point. Do not accept a claim that all decolonization ended in 1962 or that the three cases are a complete global sample.\n\nPart B (1 point): Award 1 point for an accurate comparison that identifies two cases and explains the relationship. Examples include mass anticolonial organization in India and Ghana; different combinations of negotiation, mobilization and war in Ghana and Algeria; or partition and widespread displacement in British India contrasted with another case. Do not characterize Indian independence as entirely peaceful or imply all African transitions followed one path. A list of two dates does not establish a comparison.\n\nPart C (1 point): Award 1 point for explaining a missing dimension such as voting access, violence and displacement, land distribution, economic dependence, state institutions, or relations among communities. The response must connect the missing evidence to evaluating change. Do not accept an unsupported assertion that independence had no significance.",
      "explanation": "Original AscendSAT full-structure practice. Judge historically defensible arguments and accurate evidence rather than exact wording. The app-authored guidance is not official scoring or a validated score conversion.",
      "stimulusId": "world-exam-saq-timeline",
      "stimulus": {
        "type": "table",
        "title": "Selected independence events — original secondary timeline",
        "columns": [
          "Year",
          "Event summarized"
        ],
        "rows": [
          [
            "1947",
            "India and Pakistan become independent after partition of British India"
          ],
          [
            "1957",
            "Ghana becomes independent from British colonial rule"
          ],
          [
            "1962",
            "Algeria becomes independent after a war against French rule"
          ]
        ],
        "note": "Original schematic summary of historical events, not a statistical sample of all decolonization. Dates refer to the stated independence events, not the origins of their movements or the end of every political and economic constraint."
      }
    }
  ],
  "writing": [
    {
      "id": "world-exam-dbq-1",
      "domain": "World Hist: Revolutions",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "dbq",
      "title": "Document-based question — industrial change and social order",
      "question": "Required document-based question. Recommended practice allocation: 60 minutes, including 15 minutes to read and plan. These are original app-authored instructions and a seven-document source set, not an official released examination.\n\nPrompt: Evaluate the extent to which industrialization reshaped ideas and policies about economic life and social order during c. 1800–1900. Develop an argument using the documents and specific relevant historical knowledge. Consider how responses differed among people or institutions rather than assuming all responses pursued the same goals.\n\nIn your response, develop a historically defensible thesis, describe relevant broader context, use document evidence to support an argument, explain at least one relevant piece of evidence beyond these summaries, and analyze how source characteristics matter to your argument. Explain how or why the perspective, purpose, audience or historical situation of at least TWO documents is relevant. Develop a complex or qualified understanding through argument and/or effective use of evidence.\n\nThe seven documents below are brief, independently written instructional paraphrases of identified primary works. They are not direct quotations. The links provide provenance, not permission to substitute an unrelated claim for what a summary actually says. Do not assume that all authors represent every member of their society.\n\nDocument 1 — British Parliament, Factory Act, 1833\nInstructional paraphrase: Parliament restricted employment and working hours for young workers in covered textile factories and established inspectors to enforce the law. The legislation regulated industrial employment rather than abolishing private ownership. Its adoption states a policy; compliance and enforcement require additional evidence.\nPrimary work: https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/\n\nDocument 2 — Andrew Ure, The Philosophy of Manufactures, 1835\nInstructional paraphrase: Ure praises the productive power of mechanized manufacture. He argues that machinery can expand output and reduce dependence on highly skilled workers, whose independence he presents as an obstacle to a smoothly operating factory. He expects cheaper production and expanding industry to bring wider material benefits.\nPrimary work: https://sourcebooks.web.fordham.edu/mod/1835ure.asp\n\nDocument 3 — Friedrich Engels, The Condition of the Working Class in England, 1845\nInstructional paraphrase: Engels describes crowded, unhealthy working-class districts and insecure livelihoods in industrial England. He connects these conditions to the organization of industrial society rather than treating them solely as personal failures. His work is a critical intervention addressing the social consequences of industrial capitalism, not a neutral census of every worker.\nPrimary work: https://www.gutenberg.org/ebooks/17306\n\nDocument 4 — Karl Marx and Friedrich Engels, Communist Manifesto, 1848, Chapter 1\nInstructional paraphrase: The authors portray modern industry as expanding productive power while concentrating ownership and creating conflict between owners of capital and wage workers. They argue that capitalist society generates antagonisms that demand political struggle. Their revolutionary analysis does not present workplace regulation alone as the resolution of those conflicts.\nPrimary work: https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch01.htm\n\nDocument 5 — Charter Oath, issued in the name of Emperor Meiji, 1868\nInstructional paraphrase: The new Japanese government promises public discussion, changes in inherited practices, and the pursuit of knowledge beyond Japan to strengthen the foundations of imperial rule. The oath is a broad statement of state-building goals, not a detailed factory law or a guarantee of universal suffrage. Later policies provide evidence of how those goals were implemented.\nPrimary work: https://afe.easia.columbia.edu/ps/japan/charter_oath_1868.pdf\n\nDocument 6 — Pope Leo XIII, Rerum Novarum, 1891\nInstructional paraphrase: The encyclical criticizes hardships and injustice affecting workers while defending private property and rejecting socialist abolition of ownership. It emphasizes obligations among employers, workers and public authorities, and supports workers’ associations. Its proposed response links social protection with a religious account of duties rather than endorsing class revolution.\nPrimary work: https://www.vatican.va/content/leo-xiii/en/encyclicals/documents/hf_l-xiii_enc_15051891_rerum-novarum.html\n\nDocument 7 — Samuel Gompers, demands associated with “What Does Labor Want?”, 1893\nInstructional paraphrase of the 1893 passage preserved by the Samuel Gompers Papers: Labor seeks more education, steadier employment, leisure, justice and opportunities for fuller lives. These demands present organized workers as entitled to a larger share of the benefits of economic activity. This brief passage is not a complete statement of every policy or exclusion within the labor movement.\nPrimary work: https://gompers.umd.edu/quotes.htm",
      "criteria": [
        {
          "key": "thesis",
          "label": "Thesis or claim",
          "points": 1,
          "prompt": "State a defensible thesis responding to the prompt and establishing a line of reasoning.",
          "guidance": "Award 1 point for a defensible extent claim that explains how industrialization reshaped ideas or policies. A response might argue that it provoked substantial new regulation and claims for social protection while preserving disagreement about ownership and hierarchy. Accept other defensible arguments; a restatement or list of documents without a position does not earn the point."
        },
        {
          "key": "context",
          "label": "Historical context",
          "points": 1,
          "prompt": "Describe broader historical context relevant to the argument.",
          "guidance": "Award 1 point for explaining a relevant broader development such as mechanization and fossil-fuel energy, urban wage labor, the expansion of capitalist markets, older social hierarchies, or international competition and state strengthening. A bare phrase such as Industrial Revolution is insufficient. Context must be explained in relation to the topic rather than used as an unrelated fact."
        },
        {
          "key": "document_evidence",
          "label": "Evidence from the documents",
          "points": 2,
          "prompt": "Describe document evidence and use it to support an argument.",
          "guidance": "Award 1 point for accurately describing relevant content from at least THREE documents to address the topic. Award 2 points for using relevant content from at least FOUR documents to support an argument; the documents may support different subarguments or a developed qualification. This is a cumulative 0–2 criterion, not two points for merely listing four titles. Credit independent paraphrase and explanation; do not require quotations. For Document 5, do not infer specific factory provisions not supplied: connect its state-strengthening aims to an argument with appropriate historical explanation."
        },
        {
          "key": "outside_evidence",
          "label": "Evidence beyond the documents",
          "points": 1,
          "prompt": "Use one specific piece of relevant historical evidence beyond the supplied summaries to support the argument.",
          "guidance": "Award 1 point for explaining an accurate, specific outside example and connecting it to the argument. Examples include Chartist demands for political participation, a particular strike or union campaign, a different labor law, a specific Meiji industrial investment, Russian state-sponsored railway development, or a relevant cooperative movement. The evidence must be more than a repeated document detail and must do argumentative work. Do not double-count the same fact used only for context; accept other valid examples within or clearly explaining the requested historical setting."
        },
        {
          "key": "sourcing",
          "label": "Source analysis",
          "points": 1,
          "prompt": "Explain how or why a source characteristic matters to an argument for at least two documents.",
          "guidance": "Award 1 point for explaining, for at least TWO documents, how the author’s point of view, purpose, audience or historical situation is relevant to an argument. For example, Ure’s advocacy of manufacturing can help explain his emphasis on productivity and labor discipline; a workers’ representative’s mobilizing purpose can help explain demands for a broader share of gains; the Meiji government’s position after regime change can help explain its interest in foreign knowledge for state strength. Merely saying biased, identifying an author or repeating a date is insufficient."
        },
        {
          "key": "complexity",
          "label": "Complex understanding",
          "points": 1,
          "prompt": "Demonstrate a complex understanding through advanced argument and/or effective use of evidence.",
          "guidance": "Award 1 point for a developed, historically grounded qualification or interaction of perspectives, causes, effects, continuities or changes. Examples include explaining how reform and defense of property could coexist, how state strengthening and social protection pursued different priorities, or how productivity gains and unequal bargaining power could produce competing responses. Effective use of all seven documents to support an argument, or substantive sourcing of at least four documents in support of an argument, can also demonstrate this understanding. A token however or unsupported claim that everything was complicated is insufficient. Do not require one prescribed thesis or exact wording."
        }
      ],
      "maxPoints": 7,
      "rubric": "Thesis or claim (1 point): Award 1 point for a defensible extent claim that explains how industrialization reshaped ideas or policies. A response might argue that it provoked substantial new regulation and claims for social protection while preserving disagreement about ownership and hierarchy. Accept other defensible arguments; a restatement or list of documents without a position does not earn the point.\n\nHistorical context (1 point): Award 1 point for explaining a relevant broader development such as mechanization and fossil-fuel energy, urban wage labor, the expansion of capitalist markets, older social hierarchies, or international competition and state strengthening. A bare phrase such as Industrial Revolution is insufficient. Context must be explained in relation to the topic rather than used as an unrelated fact.\n\nEvidence from the documents (2 points): Award 1 point for accurately describing relevant content from at least THREE documents to address the topic. Award 2 points for using relevant content from at least FOUR documents to support an argument; the documents may support different subarguments or a developed qualification. This is a cumulative 0–2 criterion, not two points for merely listing four titles. Credit independent paraphrase and explanation; do not require quotations. For Document 5, do not infer specific factory provisions not supplied: connect its state-strengthening aims to an argument with appropriate historical explanation.\n\nEvidence beyond the documents (1 point): Award 1 point for explaining an accurate, specific outside example and connecting it to the argument. Examples include Chartist demands for political participation, a particular strike or union campaign, a different labor law, a specific Meiji industrial investment, Russian state-sponsored railway development, or a relevant cooperative movement. The evidence must be more than a repeated document detail and must do argumentative work. Do not double-count the same fact used only for context; accept other valid examples within or clearly explaining the requested historical setting.\n\nSource analysis (1 point): Award 1 point for explaining, for at least TWO documents, how the author’s point of view, purpose, audience or historical situation is relevant to an argument. For example, Ure’s advocacy of manufacturing can help explain his emphasis on productivity and labor discipline; a workers’ representative’s mobilizing purpose can help explain demands for a broader share of gains; the Meiji government’s position after regime change can help explain its interest in foreign knowledge for state strength. Merely saying biased, identifying an author or repeating a date is insufficient.\n\nComplex understanding (1 point): Award 1 point for a developed, historically grounded qualification or interaction of perspectives, causes, effects, continuities or changes. Examples include explaining how reform and defense of property could coexist, how state strengthening and social protection pursued different priorities, or how productivity gains and unequal bargaining power could produce competing responses. Effective use of all seven documents to support an argument, or substantive sourcing of at least four documents in support of an argument, can also demonstrate this understanding. A token however or unsupported claim that everything was complicated is insufficient. Do not require one prescribed thesis or exact wording.",
      "explanation": "Original AscendSAT full-structure practice. Judge historically defensible arguments and accurate evidence rather than exact wording. The app-authored guidance is not official scoring or a validated score conversion.",
      "documents": [
        {
          "id": "D1",
          "title": "British Parliament, Factory Act, 1833",
          "author": "British Parliament",
          "date": "1833",
          "sourceUrl": "https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/",
          "text": "Instructional paraphrase: Parliament restricted employment and working hours for young workers in covered textile factories and established inspectors to enforce the law. The legislation regulated industrial employment rather than abolishing private ownership. Its adoption states a policy; compliance and enforcement require additional evidence."
        },
        {
          "id": "D2",
          "title": "Andrew Ure, The Philosophy of Manufactures, 1835",
          "author": "Andrew Ure",
          "date": "1835",
          "sourceUrl": "https://sourcebooks.web.fordham.edu/mod/1835ure.asp",
          "text": "Instructional paraphrase: Ure praises the productive power of mechanized manufacture. He argues that machinery can expand output and reduce dependence on highly skilled workers, whose independence he presents as an obstacle to a smoothly operating factory. He expects cheaper production and expanding industry to bring wider material benefits."
        },
        {
          "id": "D3",
          "title": "Friedrich Engels, The Condition of the Working Class in England, 1845",
          "author": "Friedrich Engels",
          "date": "1845 (work discussing conditions principally in the 1840s)",
          "sourceUrl": "https://www.gutenberg.org/ebooks/17306",
          "text": "Instructional paraphrase: Engels describes crowded, unhealthy working-class districts and insecure livelihoods in industrial England. He connects these conditions to the organization of industrial society rather than treating them solely as personal failures. His work is a critical intervention addressing the social consequences of industrial capitalism, not a neutral census of every worker."
        },
        {
          "id": "D4",
          "title": "Karl Marx and Friedrich Engels, Communist Manifesto, 1848, Chapter 1",
          "author": "Karl Marx and Friedrich Engels",
          "date": "1848",
          "sourceUrl": "https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch01.htm",
          "text": "Instructional paraphrase: The authors portray modern industry as expanding productive power while concentrating ownership and creating conflict between owners of capital and wage workers. They argue that capitalist society generates antagonisms that demand political struggle. Their revolutionary analysis does not present workplace regulation alone as the resolution of those conflicts."
        },
        {
          "id": "D5",
          "title": "Charter Oath, issued in the name of Emperor Meiji, 1868",
          "author": "Meiji government, issued in the emperor’s name",
          "date": "1868",
          "sourceUrl": "https://afe.easia.columbia.edu/ps/japan/charter_oath_1868.pdf",
          "text": "Instructional paraphrase: The new Japanese government promises public discussion, changes in inherited practices, and the pursuit of knowledge beyond Japan to strengthen the foundations of imperial rule. The oath is a broad statement of state-building goals, not a detailed factory law or a guarantee of universal suffrage. Later policies provide evidence of how those goals were implemented."
        },
        {
          "id": "D6",
          "title": "Pope Leo XIII, Rerum Novarum, 1891",
          "author": "Pope Leo XIII",
          "date": "1891",
          "sourceUrl": "https://www.vatican.va/content/leo-xiii/en/encyclicals/documents/hf_l-xiii_enc_15051891_rerum-novarum.html",
          "text": "Instructional paraphrase: The encyclical criticizes hardships and injustice affecting workers while defending private property and rejecting socialist abolition of ownership. It emphasizes obligations among employers, workers and public authorities, and supports workers’ associations. Its proposed response links social protection with a religious account of duties rather than endorsing class revolution."
        },
        {
          "id": "D7",
          "title": "Samuel Gompers, demands associated with “What Does Labor Want?”, 1893",
          "author": "Samuel Gompers, American Federation of Labor leader",
          "date": "1893",
          "sourceUrl": "https://gompers.umd.edu/quotes.htm",
          "text": "Instructional paraphrase of the 1893 passage preserved by the Samuel Gompers Papers: Labor seeks more education, steadier employment, leisure, justice and opportunities for fuller lives. These demands present organized workers as entitled to a larger share of the benefits of economic activity. This brief passage is not a complete statement of every policy or exclusion within the labor movement."
        }
      ]
    },
    {
      "id": "world-exam-leq-1",
      "domain": "World Hist: Transoceanic Interconnections",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "leq",
      "title": "Long essay — connections and social change",
      "question": "Required long-essay question. Recommended practice allocation: 40 minutes. This original broad prompt places choice within the task rather than offering a menu of three older-style prompts.\n\nFrom c. 1200 to 1750, people, institutions and states expanded or redirected connections across regions. Trade, migration, conquest and religious exchange could transform communities while preserving or adapting earlier practices.\n\nDevelop an argument evaluating the extent to which cross-regional connections changed social or cultural life in ONE or MORE regions during c. 1200–1750. You may choose the region or regions, the connections, and the developments you know best; you are not expected to cover every region or the entire period.\n\nSupport your position with at least TWO specific pieces of relevant evidence. Explain broader context and use historical reasoning such as causation, comparison, or continuity and change. Develop a qualified understanding by explaining limits, differences, interactions or competing interpretations where relevant. The evidence should be your own historical knowledge rather than merely restating the introductory description.",
      "criteria": [
        {
          "key": "thesis",
          "label": "Thesis or claim",
          "points": 1,
          "prompt": "Develop a historically defensible thesis establishing a line of reasoning.",
          "guidance": "Award 1 point for a defensible extent claim about how cross-regional connections changed social or cultural life. For example, an argument can distinguish expanded religious interaction from the persistence of local institutions, or explain transformative demographic and labor changes after Atlantic contact. Accept other valid lines of reasoning. A list of routes or a restatement that connections changed society is not enough."
        },
        {
          "key": "context",
          "label": "Historical context",
          "points": 1,
          "prompt": "Describe relevant broader historical context.",
          "guidance": "Award 1 point for explaining a broader development connected to the chosen argument, such as the growth of interregional trade, state formation, maritime expansion, migration, or the relationship among communities before a particular contact. An isolated name or date does not earn credit; the context should help situate the selected developments."
        },
        {
          "key": "specific_evidence",
          "label": "Specific historical evidence",
          "points": 1,
          "prompt": "Provide at least two specific relevant pieces of historical evidence.",
          "guidance": "Award 1 point for at least TWO accurate, specific and relevant examples. Possibilities include Muslim merchant communities on the Swahili coast, Sufi networks, Buddhist teaching and patronage, travelers and translation, effects of the plague, the spread of American crops, coerced Atlantic migration, or colonial religious adaptation. Do not require those examples if another historically valid case fits the period and task. Merely naming two continents is insufficient."
        },
        {
          "key": "evidence_support",
          "label": "Evidence supporting an argument",
          "points": 1,
          "prompt": "Use at least two specific pieces of evidence to support the line of reasoning.",
          "guidance": "Award 1 additional point when at least TWO specific examples are explained as support for the argument rather than simply listed. Explain how the connection produced or constrained the social or cultural outcome. This point requires the specific-evidence threshold and argumentative use, not a second point automatically awarded for the presence of two names."
        },
        {
          "key": "reasoning",
          "label": "Historical reasoning",
          "points": 1,
          "prompt": "Use a historical reasoning process to structure the argument.",
          "guidance": "Award 1 point for using causation, comparison, or continuity and change to organize an explanation. The response may compare regions, explain a causal chain, or distinguish transformations from continuities in one region. Chronological listing alone is not a sufficient reasoning structure."
        },
        {
          "key": "complexity",
          "label": "Complex understanding",
          "points": 1,
          "prompt": "Develop a complex understanding through argument or effective use of evidence.",
          "guidance": "Award 1 point for a developed, historically grounded qualification: for example different experiences among social groups, the interaction of commerce and political patronage, the adaptation rather than complete replacement of beliefs, or the coexistence of new connections with older hierarchies. A sustained comparison of multiple regions or well-explained counterevidence may earn credit. Do not demand an exhaustive survey; a token although without explanation is insufficient."
        }
      ],
      "maxPoints": 6,
      "rubric": "Thesis or claim (1 point): Award 1 point for a defensible extent claim about how cross-regional connections changed social or cultural life. For example, an argument can distinguish expanded religious interaction from the persistence of local institutions, or explain transformative demographic and labor changes after Atlantic contact. Accept other valid lines of reasoning. A list of routes or a restatement that connections changed society is not enough.\n\nHistorical context (1 point): Award 1 point for explaining a broader development connected to the chosen argument, such as the growth of interregional trade, state formation, maritime expansion, migration, or the relationship among communities before a particular contact. An isolated name or date does not earn credit; the context should help situate the selected developments.\n\nSpecific historical evidence (1 point): Award 1 point for at least TWO accurate, specific and relevant examples. Possibilities include Muslim merchant communities on the Swahili coast, Sufi networks, Buddhist teaching and patronage, travelers and translation, effects of the plague, the spread of American crops, coerced Atlantic migration, or colonial religious adaptation. Do not require those examples if another historically valid case fits the period and task. Merely naming two continents is insufficient.\n\nEvidence supporting an argument (1 point): Award 1 additional point when at least TWO specific examples are explained as support for the argument rather than simply listed. Explain how the connection produced or constrained the social or cultural outcome. This point requires the specific-evidence threshold and argumentative use, not a second point automatically awarded for the presence of two names.\n\nHistorical reasoning (1 point): Award 1 point for using causation, comparison, or continuity and change to organize an explanation. The response may compare regions, explain a causal chain, or distinguish transformations from continuities in one region. Chronological listing alone is not a sufficient reasoning structure.\n\nComplex understanding (1 point): Award 1 point for a developed, historically grounded qualification: for example different experiences among social groups, the interaction of commerce and political patronage, the adaptation rather than complete replacement of beliefs, or the coexistence of new connections with older hierarchies. A sustained comparison of multiple regions or well-explained counterevidence may earn credit. Do not demand an exhaustive survey; a token although without explanation is insufficient.",
      "explanation": "Original AscendSAT full-structure practice. Judge historically defensible arguments and accurate evidence rather than exact wording. The app-authored guidance is not official scoring or a validated score conversion."
    }
  ],
  "references": [
    {
      "title": "AP World History: Modern — exam overview",
      "url": "https://apcentral.collegeboard.org/courses/ap-world-history/exam"
    },
    {
      "title": "AP History exam updates for May 2027",
      "url": "https://apcentral.collegeboard.org/courses/ap-history-exam-updates"
    },
    {
      "title": "AP World History: Modern — Fall 2026 course and exam description",
      "url": "https://apcentral.collegeboard.org/media/pdf/ap-world-history-modern-course-and-exam-description-effective-fall-2026.pdf"
    },
    {
      "title": "UN General Assembly Resolution 1514 (XV), 1960",
      "url": "https://digitallibrary.un.org/record/57680"
    },
    {
      "title": "Declaration of the Rights of Man, 1789 — primary text",
      "url": "https://avalon.law.yale.edu/18th_century/rightsof.asp"
    },
    {
      "title": "British Parliament, Factory Act, 1833",
      "url": "https://www.parliament.uk/about/living-heritage/transformingsociety/livinglearning/19thcentury/overview/factoryact/"
    },
    {
      "title": "Andrew Ure, The Philosophy of Manufactures, 1835",
      "url": "https://sourcebooks.web.fordham.edu/mod/1835ure.asp"
    },
    {
      "title": "Friedrich Engels, The Condition of the Working Class in England, 1845",
      "url": "https://www.gutenberg.org/ebooks/17306"
    },
    {
      "title": "Karl Marx and Friedrich Engels, Communist Manifesto, 1848, Chapter 1",
      "url": "https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch01.htm"
    },
    {
      "title": "Charter Oath, issued in the name of Emperor Meiji, 1868",
      "url": "https://afe.easia.columbia.edu/ps/japan/charter_oath_1868.pdf"
    },
    {
      "title": "Pope Leo XIII, Rerum Novarum, 1891",
      "url": "https://www.vatican.va/content/leo-xiii/en/encyclicals/documents/hf_l-xiii_enc_15051891_rerum-novarum.html"
    },
    {
      "title": "Samuel Gompers, demands associated with “What Does Labor Want?”, 1893",
      "url": "https://gompers.umd.edu/quotes.htm"
    }
  ],
  "notes": "Original full-structure World History practice aligned to the May 2027 task sequence: 55 MCQs in stimulus groups, three required source-based SAQs, a seven-document DBQ, and one broad required LEQ. App-authored questions, paraphrases and rubric guidance are not official College Board material, empirically calibrated difficulty, or a validated AP score predictor. Modeled tables and the schematic map are explicitly labeled; their invented quantities are not historical statistics. Suggested timing belongs to the application: 55 minutes MCQ, 40 minutes SAQ, a 10-minute break, then 100 minutes writing including DBQ planning. All seven DBQ documents are identified primary works summarized in original language; full source links are included. Course periods and historical evidence are selected through 2001. No independently authored lesson checks or prior practice items are reused in this form."
};
