
export type StressLevel = 'Low' | 'Medium' | 'High';
export type Language = 'th' | 'en' | 'es' | 'ja' | 'fr' | 'de' | 'pt' | 'ru' | 'zh' | 'ko' | 'hi';
export type Page = 'Login' | 'Onboarding' | 'Dashboard' | 'Training' | 'Insights' | 'Play' | 'Journal' | 'Team' | 'Coach' | 'Spark' | 'Data' | 'Reframe' | 'Mixer' | 'Sanctuary';
export type InsightType = 'tip' | 'breathing' | 'stretch' | 'mindfulness';
export type SparkMode = 'brainstorm' | 'questions' | 'metaphors' | 'roleplay';
export type UserGoal = 'stress' | 'focus' | 'sleep' | 'general';
export type SoundPreference = 'nature' | 'urban' | 'music' | 'silent';
export type SanctuaryEnvironment = 'forest' | 'beach' | 'zen' | 'meadow';

export interface User {
  name: string;
  email: string;
}

export interface UserPreferences {
  goal: UserGoal;
  soundPreference: SoundPreference;
}

export interface BioData {
  heartRate: number;
  stressLevel: StressLevel;
  activity: string;
}

export interface MusicData {
  description: string;
  keywords: string;
  soundscapeKey: 'rain' | 'forest' | 'cafe' | 'waves';
}

export interface InsightData {
  title: string;
  description: string;
  type: InsightType;
}

export interface GeminiResponse {
  music: MusicData;
  insight: InsightData;
}

export interface SessionRecord {
  id: string;
  timestamp: string;
  activity: string;
  bioData: BioData;
  geminiResponse: GeminiResponse;
}

export interface GuidedMeditation {
    title: string;
    script: string[];
}

export interface VoiceAnalysis {
    detectedTone: string;
    keyObservation: string;
}

export interface JournalAnalysis {
    keyEmotions: string[];
    summary: string;
    gentleReflection: string;
    affirmation: string;
}

export interface JournalEntry {
    id: string;
    timestamp: string;
    content: string; // Can be empty for voice notes
    analysis?: JournalAnalysis;
    tags?: string[];
    voiceNote?: {
        dataUrl: string;
        analysis?: VoiceAnalysis;
        duration: number;
        transcript: string;
    }
}

export interface TeamChallenge {
    title: string;
    description: string;
    goal: number;
    unit: string;
}

export interface TeamWellnessReport {
    teamPulse: string;
    keyObservation: string;
    challenge: TeamChallenge;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  lastActivity: string;
  lastActivityDate: string;
  currentStress: StressLevel;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface AdvancedReport {
    burnoutRisk: {
        level: 'Low' | 'Medium' | 'High';
        reason: string;
    };
    comparativeAnalysis: string;
};

export interface CognitiveDistortion {
    name: string;
    description: string;
}

export interface ThoughtAnalysis {
    distortion: CognitiveDistortion;
    challengingQuestions: string[];
}

export interface ReframeEntry {
    id: string;
    timestamp: string;
    originalThought: string;
    analysis: ThoughtAnalysis;
    reframedThought: string;
}

export interface BreakSuggestion {
    message: string;
    breakMinutes: number;
    suggestion: 'none' | 'breathing' | 'stretch';
}

export interface SoundLayer {
  id: string;
  name: string;
  volume: number;
}

export interface CustomMix {
    id: string;
    name: string;
    volumes: Record<string, number>;
}