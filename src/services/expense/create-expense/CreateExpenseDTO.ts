export interface CreateExpenseRequestDTO {
  title: string;
  description: string;
  amount: number;
  date: string;
  userId: string;
}
