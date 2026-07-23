import {
  UsersThree,
  ChartBar,
  Sparkle,
  Quotes,
  ShareNetwork,
  Lightning,
  Target,
  ChatsCircle,
  Brain,
  TrendUp,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";

export function HundredMark(props: { className?: string }) {
  return <UsersThree weight="fill" {...props} />;
}

export const Icons = {
  panel: UsersThree,
  chart: ChartBar,
  spark: Sparkle,
  quotes: Quotes,
  share: ShareNetwork,
  bolt: Lightning,
  target: Target,
  chat: ChatsCircle,
  brain: Brain,
  trend: TrendUp,
  seal: SealCheck,
};
