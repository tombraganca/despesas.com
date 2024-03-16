import { RefreshToken } from "../entities/RefreshToken";

export interface RefreshTokenRepository {
    findByRefreshToken(refreshToken: string): Promise<RefreshToken | null>;
    save(refreshToken: RefreshToken): Promise<void>;
    deleteManyByUserId(userId: string): Promise<void>;
}