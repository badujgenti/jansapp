import { env } from "./config/env";
import { prisma } from "./config/db";
import app from "./app";

async function main() {
  await prisma.$connect();
  console.log("Database connected");

  app.listen(env.PORT, () => {
    console.log(`ჯანსApp API running on port ${env.PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
