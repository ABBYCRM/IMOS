import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: number;
  length?: number;
};

export function BorderBeam({ children, className = "", color = "var(--color-ocean)", speed = 7, length = 14 }: Props) {
  const style = {
    "--border-beam-duration": `${speed}s`,
    background: `conic-gradient(from var(--border-beam-angle), transparent, ${color} ${length}%, transparent ${length + 8}%)`,
  } as CSSProperties;

  return (
    <div className={`relative ${className}`}>
      {children}
      <span aria-hidden className="border-beam-ring pointer-events-none absolute inset-0 rounded-[inherit]" style={style} />
    </div>
  );
}
