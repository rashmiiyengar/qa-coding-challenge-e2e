import {
  Question,
  QuestionType,
  QuestionnaireAnswers,
} from "../types/QuestionTypes";

// Define all questions in the questionnaire
export const questions: Question[] = [
  {
    text: "Which country are you in?",
    type: QuestionType.DROPDOWN,
    options: ["United States", "France", "Russia", "India"],
  },
  {
    text: "What is your gender identity?",
    type: QuestionType.BUTTON,
    options: [
      "Woman",
      "Man",
      "Non Binary",
      "Transfeminine",
      "Transmasculine",
      "Agender",
      "I don't know",
      "Prefer not to say",
      "Other",
    ],
  },
  {
    text: "How old are you?",
    type: QuestionType.DROPDOWN,
    options: ["18", "19", "20", "30", "40", "49", "50", "60"],
  },
 
  {
    text: "How do you identify?",
    type: QuestionType.BUTTON,
    options: ["Straight", "Gay", "Lesbian", "Bi or Pan", "Prefer not to say"],
  },
  {
    text: "What is your relationship status?",
    type: QuestionType.BUTTON,
    options: [
      "Single",
      "Divorced",
      "In a relationship",
      "Married",
      "Widowed",
      "Other",
    ],
  },
  {
    text: "How important is religion in your life?",
    type: QuestionType.BUTTON,
    options: [
      "Very important",
      "Important",
      "Somewhat important",
      "Not important at all",
    ],
  },
  {
    text: "Which religion do you identify with?",
    type: QuestionType.BUTTON,
    options: [
      "Cristianity",
      "Islam",
      "Judaism",
      "Hinduism",
      "Buddism",
      "Other",
      "Prefer not to say"
    ],
  },
  {
    text: "Do you consider yourself to be spiritual?",
    type: QuestionType.BUTTON,
    options: [
      "No",
      "Yes"
    ],
  },
  {
    text: "Have you ever been in therapy before?",
    type: QuestionType.BUTTON,
    options: [
      "No",
      "Yes"
    ],
  },
  {
    text: "What led you to consider therapy today?",
    type: QuestionType.CHECKBOX,
    options: [
      "I've been feeling depressed",
      "I feel anxious or overwhelmed",
      "My mood is interfering with my job/school performance",
      "I struggle with building or maintaining relationships",
      "I can't find purpose and meaning in my life",
      "I am grieving",
      "I have experienced trauma",
      "I need to talk through a specific challenge",
      "I want to gain self confidence",
      "I want to improve myself but I don't know where to start",
      "Recommended to me (friend, family, doctor)",
      "Just exploring",
    ],
  }, 

  // Add more questions as needed for all 15 questions
];
