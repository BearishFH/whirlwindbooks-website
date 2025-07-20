type IconType = "linear" | "bold" | "outline" | "twoTone" | "bulk" | "broken";
export type IconDirection = "left" | "right" | "up" | "down";

export interface ISvg {
  iconType?: IconType;
  w?: number;
  color?: string;
  direction?: IconDirection;
  className?: string;
}
