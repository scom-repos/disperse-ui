import { getAddresses, getWallet, INFINITE } from "@disperse/store";
import { DisperseData, ITokenObject } from "@disperse/global"
import { Wallet, BigNumber } from "@ijstech/eth-wallet";
import { Contracts as OpenSwapContracts } from "@openswap/sdk";
import { Contracts, DisperseActions } from "@scom/disperse-sdk";

const getDisperseAddress = () => {
  return getAddresses(Wallet.getInstance().chainId)["Disperse"];
}

const onCheckAllowance = async (token: ITokenObject, spender: string) => {
  if (!token.address) return null;
  let wallet = Wallet.getInstance();
  let erc20 = new OpenSwapContracts.ERC20(wallet, token.address);
  let allowance = await erc20.allowance({
    owner: wallet.account.address,
    spender,
  });
  return allowance;
}

const onApproveToken = async (token: ITokenObject, spender: string) => {
  if (!token.address) return;
  let erc20 = new OpenSwapContracts.ERC20(Wallet.getInstance(), token.address);
  let receipt = await erc20.approve({
    spender,
    amount: new BigNumber(INFINITE)
  });
  return receipt;
}

// TODO add disperse sdk
const onDisperse = async (token: ITokenObject, disperseData: DisperseData[]) => {
  let disperseAddress = getDisperseAddress();
  return await DisperseActions.doDisperse(
    getWallet(),
    disperseAddress,
    token.address || null,
    token.decimals,
    disperseData
  );
}

export {
  getDisperseAddress,
  onCheckAllowance,
  onApproveToken,
  onDisperse,
}
