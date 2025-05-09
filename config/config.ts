import { PrismaClient } from "@prisma/client";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import dotenv from "dotenv";
dotenv.config();

try {
  dotenv.config();
} catch (error) {
  console.error("Error loading environment variables:", error);
  process.exit(1);
}

export const PORT = process.env.PORT || 9000
export const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
const RPC = process.env.RPC || process.exit(1);

// Datease connection
export const prisma = new PrismaClient();

export const connection = new Connection(RPC)
export const metaplex = Metaplex.make(connection);

