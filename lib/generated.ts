import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Guestbook
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const guestbookAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'message',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'NewMessage',
  },
  {
    type: 'function',
    inputs: [
      { name: '_offset', internalType: 'uint256', type: 'uint256' },
      { name: '_limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getMessages',
    outputs: [
      {
        name: '',
        internalType: 'struct Guestbook.Message[]',
        type: 'tuple[]',
        components: [
          { name: 'sender', internalType: 'address', type: 'address' },
          { name: 'message', internalType: 'string', type: 'string' },
          { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalMessages',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'messages',
    outputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'message', internalType: 'string', type: 'string' },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_message', internalType: 'string', type: 'string' }],
    name: 'postMessage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const guestbookAddress = {
  11155111: '0xb8Ee3634253dF7BCb4ed7CD656C728327499480a',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const guestbookConfig = {
  address: guestbookAddress,
  abi: guestbookAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link guestbookAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useReadGuestbook = /*#__PURE__*/ createUseReadContract({
  abi: guestbookAbi,
  address: guestbookAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link guestbookAbi}__ and `functionName` set to `"getMessages"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useReadGuestbookGetMessages = /*#__PURE__*/ createUseReadContract({
  abi: guestbookAbi,
  address: guestbookAddress,
  functionName: 'getMessages',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link guestbookAbi}__ and `functionName` set to `"getTotalMessages"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useReadGuestbookGetTotalMessages =
  /*#__PURE__*/ createUseReadContract({
    abi: guestbookAbi,
    address: guestbookAddress,
    functionName: 'getTotalMessages',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link guestbookAbi}__ and `functionName` set to `"messages"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useReadGuestbookMessages = /*#__PURE__*/ createUseReadContract({
  abi: guestbookAbi,
  address: guestbookAddress,
  functionName: 'messages',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link guestbookAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useWriteGuestbook = /*#__PURE__*/ createUseWriteContract({
  abi: guestbookAbi,
  address: guestbookAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link guestbookAbi}__ and `functionName` set to `"postMessage"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useWriteGuestbookPostMessage =
  /*#__PURE__*/ createUseWriteContract({
    abi: guestbookAbi,
    address: guestbookAddress,
    functionName: 'postMessage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link guestbookAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useSimulateGuestbook = /*#__PURE__*/ createUseSimulateContract({
  abi: guestbookAbi,
  address: guestbookAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link guestbookAbi}__ and `functionName` set to `"postMessage"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useSimulateGuestbookPostMessage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: guestbookAbi,
    address: guestbookAddress,
    functionName: 'postMessage',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link guestbookAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useWatchGuestbookEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: guestbookAbi, address: guestbookAddress },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link guestbookAbi}__ and `eventName` set to `"NewMessage"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xb8Ee3634253dF7BCb4ed7CD656C728327499480a)
 */
export const useWatchGuestbookNewMessageEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: guestbookAbi,
    address: guestbookAddress,
    eventName: 'NewMessage',
  })
