import { v4 as uuid } from "uuid";
import { HttpException } from "../handler/HttpErro";

export class Expense {
  public readonly id!: string;
  public readonly createdAt!: Date;

  public title!: string;
  public description!: string;
  public date!: Date;
  public amount!: number;
  public userId!: string;

  constructor(props: Omit<Expense, "id" | "createdAt">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
      this.createdAt = new Date();
    }

    // se tiver mais de 191 caracteres retorna erro
    if (this.title.length > 191) {
      throw new HttpException(
        "Title should not be longer than 191 characters",
        400
      );
    }

    if (this.description.length > 191) {
      throw new HttpException(
        "Description should not be longer than 191 characters",
        400
      );
    }

    if (this.amount < 0) {
      throw new HttpException("Amount should not be less than 0", 400);
    }
  }
}
