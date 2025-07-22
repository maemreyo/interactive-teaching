/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// src/services/geminiService.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Note, Vocabulary, TeacherInfo } from '../hooks/useNotes';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface LessonSummary {
  studentFeedback: string;
  vocabularyReview: string;
  nextLessonSuggestions: string;
  emailContent: string;
}

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateLessonSummary(
    unitId: string,
    notes: Note[],
    vocabulary: Vocabulary[],
    studentName?: string,
    lessonTopic?: string,
    language: 'vi' | 'en' = 'vi',
    teacherInfo?: TeacherInfo
  ): Promise<LessonSummary> {
    const prompt = this.createLessonSummaryPrompt(unitId, notes, vocabulary, studentName, lessonTopic, language);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseLessonSummary(text);
    } catch (error) {
      console.error('Error generating lesson summary:', error);
      throw new Error('Failed to generate lesson summary');
    }
  }

  async generateVocabularyEmail(
    vocabulary: Vocabulary[],
    studentName?: string,
    unitId?: string
  ): Promise<string> {
    const prompt = this.createVocabularyEmailPrompt(vocabulary, studentName, unitId);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating vocabulary email:', error);
      throw new Error('Failed to generate vocabulary email');
    }
  }

  async generateStudentFeedback(
    notes: Note[],
    vocabulary: Vocabulary[],
    studentName?: string,
    lessonTopic?: string
  ): Promise<string> {
    const prompt = this.createStudentFeedbackPrompt(notes, vocabulary, studentName, lessonTopic);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating student feedback:', error);
      throw new Error('Failed to generate student feedback');
    }
  }

  async generateNextLessonSuggestions(
    notes: Note[],
    vocabulary: Vocabulary[],
    unitId: string
  ): Promise<string> {
    const prompt = this.createNextLessonPrompt(notes, vocabulary, unitId);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating next lesson suggestions:', error);
      throw new Error('Failed to generate next lesson suggestions');
    }
  }

  private createLessonSummaryPrompt(
    unitId: string,
    notes: Note[],
    vocabulary: Vocabulary[],
    studentName?: string,
    lessonTopic?: string,
    language: 'vi' | 'en' = 'vi'
  ): string {
    const notesText = notes.map(note => `- ${note.content}`).join('\n');
    const vocabText = vocabulary.map(vocab => 
      `- ${vocab.word}: ${vocab.meaning}${vocab.example ? ` (Example: ${vocab.example})` : ''}`
    ).join('\n');

    const languageInstruction = language === 'vi' 
      ? 'Please respond in Vietnamese (Tiếng Việt). Use natural, friendly Vietnamese suitable for teachers and students.'
      : 'Please respond in English. Use clear, professional English suitable for educational contexts.';

    return `
You are an experienced English teacher. Based on the following lesson information, please generate a comprehensive lesson summary.

${languageInstruction}

**Lesson Information:**
- Unit: ${unitId}
- Topic: ${lessonTopic || 'English Lesson'}
- Student: ${studentName || 'Student'}

**Teacher's Notes:**
${notesText || 'No notes available'}

**Vocabulary Taught:**
${vocabText || 'No vocabulary recorded'}

Please provide a structured response with the following sections:

**STUDENT_FEEDBACK:**
Write encouraging and constructive feedback for the student about their performance in this lesson. Be specific about what they did well and areas for improvement. Keep it positive and motivating.

**VOCABULARY_REVIEW:**
Create a summary of the vocabulary learned, with tips for remembering and using these words effectively.

**NEXT_LESSON_SUGGESTIONS:**
Suggest what should be covered in the next lesson based on today's progress and any gaps identified.

**EMAIL_CONTENT:**
Write a professional email to send to the student or their parents summarizing the lesson, including vocabulary learned and homework suggestions. Make it friendly but informative.

Format your response exactly like this:
STUDENT_FEEDBACK: [your feedback here]
VOCABULARY_REVIEW: [your review here]
NEXT_LESSON_SUGGESTIONS: [your suggestions here]
EMAIL_CONTENT: [your email content here]
`;
  }

  private createVocabularyEmailPrompt(
    vocabulary: Vocabulary[],
    studentName?: string,
    unitId?: string
  ): string {
    const vocabText = vocabulary.map(vocab => 
      `- ${vocab.word}: ${vocab.meaning}${vocab.example ? ` (Example: ${vocab.example})` : ''}`
    ).join('\n');

    return `
Write a friendly and professional email to send to an English student (${studentName || 'the student'}) reviewing the vocabulary from today's lesson (${unitId || 'English lesson'}).

**Vocabulary to include:**
${vocabText || 'No vocabulary available'}

The email should:
1. Be warm and encouraging
2. Include all the vocabulary with meanings and examples
3. Provide tips for memorizing the words
4. Suggest practice activities
5. End with encouragement for continued learning

Write the email in a format ready to send, including subject line.
`;
  }

  private createStudentFeedbackPrompt(
    notes: Note[],
    vocabulary: Vocabulary[],
    studentName?: string,
    lessonTopic?: string
  ): string {
    const notesText = notes.map(note => `- ${note.content}`).join('\n');
    const vocabCount = vocabulary.length;

    return `
As an experienced English teacher, write encouraging and constructive feedback for ${studentName || 'the student'} based on today's ${lessonTopic || 'English'} lesson.

**Lesson Notes:**
${notesText || 'No specific notes available'}

**Vocabulary Learned:** ${vocabCount} new words/phrases

Please write feedback that:
1. Acknowledges their effort and participation
2. Highlights specific achievements from the lesson
3. Provides constructive suggestions for improvement
4. Encourages continued learning
5. Is warm, supportive, and motivating

Keep the tone positive and professional, suitable for sharing with the student or their parents.
`;
  }

  private createNextLessonPrompt(
    notes: Note[],
    vocabulary: Vocabulary[],
    unitId: string
  ): string {
    const notesText = notes.map(note => `- ${note.content}`).join('\n');
    const vocabText = vocabulary.map(vocab => `- ${vocab.word}`).join('\n');

    return `
Based on today's lesson progress, suggest what should be covered in the next lesson.

**Current Unit:** ${unitId}
**Today's Notes:**
${notesText || 'No notes available'}

**Vocabulary Covered:**
${vocabText || 'No vocabulary recorded'}

Please provide specific suggestions for:
1. Review activities for today's content
2. New topics to introduce
3. Skills to focus on
4. Practice exercises to assign
5. Assessment opportunities

Make the suggestions practical and actionable for the teacher.
`;
  }

  private parseLessonSummary(text: string): LessonSummary {
    const sections = {
      studentFeedback: '',
      vocabularyReview: '',
      nextLessonSuggestions: '',
      emailContent: ''
    };

    try {
      const feedbackMatch = text.match(/STUDENT_FEEDBACK:\s*(.*?)(?=VOCABULARY_REVIEW:|$)/s);
      const vocabMatch = text.match(/VOCABULARY_REVIEW:\s*(.*?)(?=NEXT_LESSON_SUGGESTIONS:|$)/s);
      const nextLessonMatch = text.match(/NEXT_LESSON_SUGGESTIONS:\s*(.*?)(?=EMAIL_CONTENT:|$)/s);
      const emailMatch = text.match(/EMAIL_CONTENT:\s*(.*?)$/s);

      sections.studentFeedback = feedbackMatch?.[1]?.trim() || 'Feedback generated successfully.';
      sections.vocabularyReview = vocabMatch?.[1]?.trim() || 'Vocabulary review generated.';
      sections.nextLessonSuggestions = nextLessonMatch?.[1]?.trim() || 'Next lesson suggestions generated.';
      sections.emailContent = emailMatch?.[1]?.trim() || 'Email content generated.';
    } catch (error) {
      console.error('Error parsing lesson summary:', error);
      // Fallback: use the entire text as student feedback
      sections.studentFeedback = text;
    }

    return sections;
  }
}

export const geminiService = new GeminiService();