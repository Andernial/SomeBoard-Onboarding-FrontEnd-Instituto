import 'dotenv/config';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
 overwrite: true,
 schema: process.env.VITE_API_URL,
 documents: './src/app/data/graphql/**/*.graphql',
 generates: {
  './src/app/data/graphql/generated/': {
   preset: 'client',
   plugins: [],
  },
  './src/app/data/graphql/graphql.schema.json': {
   plugins: ['introspection'],
  },
 },
};

export default config;
