import { memo, ReactElement } from "react";
import { formatEther } from "viem";

import useFlowingBalance, {
  ANIMATION_MINIMUM_STEP_TIME,
} from "../../lib/hooks/useFlowingBalance.js";
import { useSignificantFlowingDecimal } from "../../lib/hooks/useSignificantFlowingDecimal.js";
import { toFixedUsingString } from "../../lib/utils.js";

// TODO: re-use with useFlowingBalance?
type FlowingBalanceProps = {
  startingBalance: bigint;
  startingBalanceDate: Date;
  flowRate: bigint;
};

export default memo(function FlowingBalance({
  startingBalance,
  startingBalanceDate,
  flowRate,
}: FlowingBalanceProps): ReactElement {
  const flowingBalance = useFlowingBalance(
    startingBalance,
    startingBalanceDate,
    flowRate,
  );

  const decimalPlaces = useSignificantFlowingDecimal(
    flowRate,
    ANIMATION_MINIMUM_STEP_TIME,
  );

  return (
    <>
      {decimalPlaces
        ? toFixedUsingString(formatEther(flowingBalance), decimalPlaces)
        : formatEther(flowingBalance)}
    </>
  );
});
