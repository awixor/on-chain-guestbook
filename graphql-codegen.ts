import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
  overwrite: true,
  generates: {
    "./generated/": {
      schema: ["http://localhost:3000/graphql"],
      documents: ["./app/**/*.{ts,tsx}", "./lib/graphql/**/*.ts"],
      preset: "client",
      config: {
        arrayInputCoercion: false,
        enumsAsTypes: true,
        dedupeFragments: true,
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
} satisfies CodegenConfig;
