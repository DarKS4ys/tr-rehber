import z from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().trim().min(1),
  DATABASE_URL: z.string().trim().min(1),
  GOOGLE_CLIENT_ID: z.string().trim().min(1),
  GOOGLE_CLIENT_SECRET: z.string().trim().min(1),
  DISCORD_CLIENT_ID: z.string().trim().min(1),
  DISCORD_CLIENT_SECRET: z.string().trim().min(1),
  NEXTAUTH_URL: z.string().trim().min(1),
  NEXTAUTH_SECRET: z.string().trim().min(1),
  ADMIN_EMAILS: z.string().trim().min(1),
  EDGE_STORE_ACCESS_KEY: z.string().trim().min(1),
  EDGE_STORE_SECRET_KEY: z.string().trim().min(1),
  OPENAI_API_KEY: z.string().trim().min(1),
  INDEX_INIT_TIMEOUT: z.coerce.number().min(1),
  PINECONE_API_KEY: z.string().trim().min(1),
  PINECONE_ENVIRONMENT: z.string().trim().min(1),
  PINECONE_INDEX_NAME: z.string().trim().min(1),
  PINECONE_NAME_SPACE: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);