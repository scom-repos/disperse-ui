import { Wallet, Erc20, ISendTxEventsOptions } from "@ijstech/eth-wallet"; 

export const isTransactionConfirmed = async (txHash: string) => {
  const tx = await Wallet.getInstance().web3.eth.getTransaction(txHash);
  return tx && !!tx.blockNumber;
}

export const registerSendTxEvents = (sendTxEventHandlers: ISendTxEventsOptions) => {
  const wallet = Wallet.getInstance();
  wallet.registerSendTxEvents({
      transactionHash: (error: Error, receipt?: string) => {
        if (sendTxEventHandlers.transactionHash) {
          sendTxEventHandlers.transactionHash(error, receipt);
        }
      },
      confirmation: (receipt: any) => {
        if (sendTxEventHandlers.confirmation) {
          sendTxEventHandlers.confirmation(receipt);
        }
      },
  })
}

export async function getERC20Amount(wallet: Wallet, token: string, decimals: number) {
  let erc20 = new Erc20(wallet, token, decimals);
  return await erc20.balance;
}

export const isAddressValid = async(address: string) => {
  let wallet = Wallet.getInstance();
  const isValid = wallet.web3.utils.isAddress(address);
  return isValid;
}