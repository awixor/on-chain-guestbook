import { useEstimateFeesPerGas, useEstimateGas } from "wagmi";
import { formatEther, encodeFunctionData } from "viem";
import InfoBox from "./info-box";
import { useSimulateGuestbookPostMessage } from "@/lib/generated";
import { useDebounce } from "@/lib/hooks/useDebounce";

const EstimatedFees = ({ message }: { message: string }) => {
  const debouncedMessage = useDebounce(message, 500);
  const enabled = !!debouncedMessage;

  const { data: simulateData } = useSimulateGuestbookPostMessage({
    args: [debouncedMessage],
    query: { enabled },
  });

  const encodedData = simulateData?.request
    ? encodeFunctionData({
        abi: simulateData.request.abi,
        functionName: simulateData.request.functionName,
        args: simulateData.request.args,
      })
    : undefined;

  const { data: gasLimit } = useEstimateGas({
    to: simulateData?.request.address,
    data: encodedData,
    account: simulateData?.request.account?.address,
    chainId: simulateData?.request.chainId,
    query: { enabled: !!encodedData },
  });

  const { data: feeData } = useEstimateFeesPerGas({
    query: { enabled },
  });

  const feePrice = feeData?.maxFeePerGas ?? feeData?.gasPrice;
  const estimatedFee = gasLimit && feePrice ? gasLimit * feePrice : null;

  const isTyping = message !== debouncedMessage;

  const estimatedFeeText =
    isTyping || (!estimatedFee && message)
      ? "Calculating..."
      : estimatedFee
      ? `${formatEther(estimatedFee)} ETH (estimated)`
      : "Gas preview will appear here";

  return <InfoBox title="Estimated Gas Fee" description={estimatedFeeText} />;
};

export default EstimatedFees;
