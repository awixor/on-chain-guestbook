import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

// const connectors = [injected()];

// Only add WalletConnect if project ID is provided
// if (process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
//   connectors.push(
//     walletConnect({
//       projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
//     })
//   );
// }

export const config = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
