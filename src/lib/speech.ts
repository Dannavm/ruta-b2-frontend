// Audio y micrófono con la Web Speech API del navegador: gratis y sin servidor.

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

/** Lee un texto en inglés. rate 1 = normal; 0.7 = despacio */
export function speak(text: string, rate = 0.95): void {
  if (!canSpeak()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  const voice = window.speechSynthesis.getVoices().find((v) => v.lang.startsWith('en'));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}

// TypeScript no trae los tipos de SpeechRecognition; declaramos lo mínimo que usamos.
interface RecognitionEvent {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
}
interface Recognition {
  lang: string;
  interimResults: boolean;
  onresult: ((e: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
}
type RecognitionConstructor = new () => Recognition;

function getRecognitionClass(): RecognitionConstructor | null {
  const w = window as unknown as { SpeechRecognition?: RecognitionConstructor; webkitSpeechRecognition?: RecognitionConstructor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const canListen = () => typeof window !== 'undefined' && getRecognitionClass() !== null;

/**
 * Escucha una frase en inglés por el micrófono.
 * Devuelve una función para detener, o null si el navegador no lo permite (oculta el botón).
 */
export function listen(onText: (text: string) => void, onEnd?: () => void): (() => void) | null {
  const Rec = getRecognitionClass();
  if (!Rec) return null;
  const rec = new Rec();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.onresult = (e) => onText(e.results[0][0].transcript);
  rec.onend = () => onEnd?.();
  rec.onerror = () => onEnd?.();
  rec.start();
  return () => rec.stop();
}
