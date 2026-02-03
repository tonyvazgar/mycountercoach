export interface AthleteResult {
  [exerciseIndex: number]: {
    [columnIndex: number]: number | string;
  };
}
