
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  category: string;
}

export interface UserProgress {
  completedLessons: string[];
  currentLessonId: string | null;
  streak: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
