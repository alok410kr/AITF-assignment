import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionHookResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

interface UseSpeechRecognitionProps {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (result: SpeechRecognitionHookResult) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  confidence: number;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export const useSpeechRecognition = ({
  language = 'ja-JP',
  continuous = false,
  interimResults = true,
  onResult,
  onError,
  onStart,
  onEnd
}: UseSpeechRecognitionProps = {}): UseSpeechRecognitionReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Check if speech recognition is supported
  const isSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  useEffect(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    // Create speech recognition instance
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    // Configure recognition with robust settings
    recognitionInstance.lang = language;
    recognitionInstance.continuous = continuous;
    recognitionInstance.interimResults = interimResults;
    recognitionInstance.maxAlternatives = 1;

    // Event handlers
    recognitionInstance.onstart = () => {
      setIsListening(true);
      setError(null);
      onStart?.();
    };

    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';
      let maxConfidence = 0;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;

        if (result.isFinal) {
          finalTranscript += transcript;
          maxConfidence = Math.max(maxConfidence, confidence);
        } else {
          interimTranscript += transcript;
        }
      }

      const currentTranscript = finalTranscript || interimTranscript;
      const currentConfidence = finalTranscript ? maxConfidence : 0;

      setTranscript(currentTranscript);
      setConfidence(currentConfidence);

      // Call callback if provided
      if (onResult && currentTranscript) {
        onResult({
          transcript: currentTranscript,
          confidence: currentConfidence,
          isFinal: !!finalTranscript
        });
      }
    };

    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      let errorMessage = 'Speech recognition error';
      let shouldShowError = true;

      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try speaking again.';
          shouldShowError = false; // Don't show this as a persistent error
          break;
        case 'audio-capture':
          errorMessage = 'Microphone not accessible. Please check permissions and ensure your microphone is working.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please click the microphone icon in your browser\'s address bar to allow access.';
          break;
        case 'network':
          errorMessage = 'Network error. Please check your internet connection and try again.';
          break;
        case 'language-not-supported':
          errorMessage = `Language "${language}" not supported. Try switching to English or use a different browser.`;
          break;
        case 'service-not-allowed':
          errorMessage = 'Speech recognition service not allowed. Please ensure you\'re using HTTPS.';
          break;
        case 'aborted':
          // Don't show error for user-initiated stops
          shouldShowError = false;
          break;
        default:
          errorMessage = `Speech recognition error: ${event.error}. Please try again.`;
      }

      console.error('Speech recognition error:', event.error, errorMessage);

      if (shouldShowError) {
        setError(errorMessage);
        onError?.(errorMessage);
      }

      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      onEnd?.();
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
    // Note: we intentionally exclude callback props from deps to avoid recreating
    // the recognition instance on every render (which can cause render loops).
  }, [language, continuous, interimResults, isSupported]);

  const startListening = useCallback(async () => {
    if (!recognition || isListening) return;

    try {
      setError(null);
      setTranscript('');
      setConfidence(0);

      // Check for microphone permissions first
      if (navigator.permissions) {
        try {
          const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
          if (permission.state === 'denied') {
            setError('Microphone permission denied. Please allow microphone access in your browser settings.');
            return;
          }
        } catch (permError) {
          console.log('Permission check not supported, proceeding with recognition');
        }
      }

      // Check if recognition is already running
      if ((recognition as any).state === 'listening') {
        console.log('Recognition already listening, stopping first');
        recognition.stop();
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      recognition.start();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start speech recognition';
      setError(errorMessage);
      console.error('Speech recognition start error:', err);
      onError?.(errorMessage);
    }
  }, [recognition, isListening, onError]);

  const stopListening = useCallback(() => {
    if (!recognition || !isListening) return;

    try {
      recognition.stop();
    } catch (err) {
      console.error('Speech recognition stop error:', err);
    }
  }, [recognition, isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
};

// Type definitions for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  grammars: SpeechGrammarList;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;

  // Event handlers
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;

  // Methods
  abort(): void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionStatic {
  new(): SpeechRecognition;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly confidence: number;
  readonly transcript: string;
}

interface SpeechGrammarList {
  readonly length: number;
  addFromString(string: string, weight?: number): void;
  addFromURI(src: string, weight?: number): void;
  item(index: number): SpeechGrammar;
  [index: number]: SpeechGrammar;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

// Extend the Window interface to include speech recognition
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }
}