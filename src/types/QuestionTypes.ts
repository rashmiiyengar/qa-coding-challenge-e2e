// Define question types for better type safety
export enum QuestionType {
    DROPDOWN = 'dropdown',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    BUTTON = 'button',
    TEXT = 'text'
  }
  
  // Define the structure for question data
  export interface Question {
    text: string;
    type: QuestionType;
    options?: string[];
  }
  
  // Define structure for answer data
  export interface QuestionnaireAnswers {
    [questionText: string]: string | string[];
  }
  
  export type TherapyType = 'Individual' | 'Couples' | 'Teen';