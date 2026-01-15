# On-Chain Guestbook

## Related Components

- **Subgraph (The Graph):** [https://github.com/awixor/guestbook-subgraph](https://github.com/awixor/guestbook-subgraph)
- **Smart Contract (Foundry):** [https://github.com/awixor/guestbook-foundry](https://github.com/awixor/guestbook-foundry)

## Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Blockchain Interaction:** [Wagmi](https://wagmi.sh/), [Viem](https://viem.sh/) (configured in `config/config.ts`)
- **Data Fetching:** [React Query](https://tanstack.com/query/latest), [GraphQL Request](https://github.com/jasonkuhrt/graphql-request)

## Features

- **Connect Wallet:** Securely connect your Ethereum wallet to interact with the app.
- **View Guestbook:** Browse messages left by previous visitors, fetched from The Graph.
- **Sign Guestbook:** Leave your own permanent mark on the blockchain by signing the guestbook (transaction required).
- **User Profile:** View your specific messages and interaction history.

## Project Structure

A simplified overview of the key directories:

```
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable React components (UI, Forms, Wallet logic)
├── config/             # Configuration files (Wagmi, etc.)
├── env/                # Environment variable validation (T3 Env)
├── graphql/            # GraphQL queries and code generation setup
├── lib/                # Utility functions and generated helpers
└── public/             # Static assets
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn
- A browser wallet like [MetaMask](https://metamask.io/) or [Rabby](https://rabby.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd on-chain-guestbook
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and populate it with the following variables:

   ```bash
   # Public - Client Side
   NEXT_PUBLIC_GUESTBOOK_CONTRACT_ADDRESS="0x..." # Your Deployed Contract Address on user chain (e.g., Sepolia)

   # Server Side
   API_KEY="your_secure_random_32_char_string"    # For internal API protection if needed
   ETHERSCAN_API_KEY="your_etherscan_api_key"     # For verifying contracts / fetching ABI
   ROOT_URI="http://localhost:3000/graphql"       # GraphQL endpoint
   ```

### Running the App

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Code Generation

If you modify GraphQL queries or the smart contract ABI, update the generated types:

```bash
pnpm run codegen
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
