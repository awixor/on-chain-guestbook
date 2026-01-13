import { defineConfig, loadEnv } from "@wagmi/cli"; // 1. Import loadEnv
import { etherscan, react } from "@wagmi/cli/plugins";
import { sepolia } from "wagmi/chains";

export default defineConfig(() => {
  const env = loadEnv({
    envDir: process.cwd(),
  });

  return {
    out: "lib/generated.ts",
    plugins: [
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY!,
        chainId: sepolia.id,
        contracts: [
          {
            name: "Guestbook",
            address:
              env.NEXT_PUBLIC_GUESTBOOK_CONTRACT_ADDRESS as `0x${string}`,
          },
        ],
      }),
      react(),
    ],
  };
});
