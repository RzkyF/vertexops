import { config } from 'dotenv';

import { defineConfig, env } from 'prisma/config';

// Prisma CLI doesn't automatically load Next.js `.env.local`
config({ path: '.env.local' });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});

