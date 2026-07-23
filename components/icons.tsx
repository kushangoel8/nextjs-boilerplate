import {
  Path,
  ChatCircleText,
  Waveform,
  ListChecks,
  ArrowsClockwise,
  Checks,
  BookOpenText,
  Flask,
  MicrophoneStage,
  Exam,
} from "@phosphor-icons/react/dist/ssr";

export function PathIcon(props: { className?: string }) {
  return <Path weight="fill" {...props} />;
}

export const Icons = {
  message: ChatCircleText,
  waveform: Waveform,
  list: ListChecks,
  sync: ArrowsClockwise,
  check: Checks,
  novel: BookOpenText,
  research: Flask,
  mun: MicrophoneStage,
  exam: Exam,
};
