export interface IBmiClassification {
  range: string;
  description: string;
  inRange: (bmi: number) => boolean;
}
