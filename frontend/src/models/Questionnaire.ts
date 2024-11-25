export interface Questionnaire {
  questions: Question[];
}
export interface Answer {
  number: number;
  text: string;
}
export interface Question {
  number: number;
  text: string;
  answers: Answer[];
}
export interface Suggestion {
  pet: string;
  picture: string;
}
export interface Suggestions {
  suggestions: Suggestion[];
}
export interface UsersQuestionResponse {
  userId: number;
  questionId: number;
  choice: number;
}
