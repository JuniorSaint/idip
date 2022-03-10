export interface IRegisterTraing {
  id: number;
  userName: string;
  dateTraining: Date;
  listTraining: IListTraining[];
  isPaid?: boolean;
}

export interface IListTraining {
  id: number;
  exerciseType: string;
  weight: number;
  amountRepetition: number;
}

export type IListExercise = Pick<IListTraining, "id" | "exerciseType">;

export type IRegisterTrainingProps = Omit<IRegisterTraing, "id">;
