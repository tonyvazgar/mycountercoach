export interface SessionTemplate {
  id: string;
  rules: string;
  exercises: ExerciseTemplate[];
}

export interface ExerciseTemplate {
  name: string;
  columns: ColumnTemplate[];
}

export interface ColumnTemplate {
  label: string;
  type: 'number' | 'time';
}
