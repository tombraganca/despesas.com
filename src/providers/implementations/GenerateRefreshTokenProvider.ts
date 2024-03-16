import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

import { IGenerateRefreshTokenProvider } from "../IGenerateRefreshTokenProvider";
import { RefreshToken } from "../../entities/RefreshToken";
import { config } from "../../config/config";

export class GenerateRefreshTokenProvider
  implements IGenerateRefreshTokenProvider
{
  public connection = new PrismaClient();
  constructor() {}

  async execute(refreshToken: RefreshToken): Promise<void> {
    if (!refreshToken.expiresIn) {
      refreshToken.expiresIn = dayjs()
        .add(Number(config.REFRESH_TOKEN_DAYS), "day")
        .unix();
    }

    await this.connection.refreshToken.create({
      data: {
        userId: refreshToken.userId,
        expiresIn: refreshToken.expiresIn,
        id: refreshToken.id,
      },
    });
  }
}
