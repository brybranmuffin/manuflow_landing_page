import { type User, type InsertUser, type BetaSignup, type InsertBetaSignup } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBetaSignup(signup: InsertBetaSignup): Promise<BetaSignup>;
  getBetaSignups(): Promise<BetaSignup[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private betaSignups: Map<string, BetaSignup>;

  constructor() {
    this.users = new Map();
    this.betaSignups = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBetaSignup(insertBetaSignup: InsertBetaSignup): Promise<BetaSignup> {
    const id = randomUUID();
    const betaSignup: BetaSignup = {
      ...insertBetaSignup,
      id,
      message: insertBetaSignup.message || null,
      createdAt: new Date(),
    };
    this.betaSignups.set(id, betaSignup);
    return betaSignup;
  }

  async getBetaSignups(): Promise<BetaSignup[]> {
    return Array.from(this.betaSignups.values());
  }
}

export const storage = new MemStorage();
