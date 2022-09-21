import { WalletPlugin, IClientProviderOptions } from '@ijstech/eth-wallet';
import { InfuraId, Networks } from "./data/networks";
export const walletList = [
    {
        name: WalletPlugin.MetaMask,
        displayName: 'MetaMask',
        iconFile: 'metamask.png'
    },
    {
        name: WalletPlugin.BitKeepWallet,
        displayName: 'BitKeep Wallet',
        iconFile: 'BitKeep.png'
    },
    {
        name: WalletPlugin.ONTOWallet,
        displayName: 'ONTO Wallet',
        iconFile: 'ONTOWallet.jpg'
    },
    {
        name: WalletPlugin.Coin98,
        displayName: 'Coin98 Wallet',
        iconFile: 'Coin98.svg'
    },
    {
        name: WalletPlugin.TrustWallet,
        displayName: 'Trust Wallet',
        iconFile: 'trustwallet.svg'
    },
    {
        name: WalletPlugin.BinanceChainWallet,
        displayName: 'Binance Chain Wallet',
        iconFile: 'binance-chain-wallet.svg'
    },
    {
        name: WalletPlugin.WalletConnect,
        displayName: 'WalletConnect',
        iconFile: 'walletconnect.svg'
    }
]

const rpcs = (()=>{
    let rpcs:{[chainId: number]:string} = {}
    for (const key of Object.keys(Networks)) {
        let chainId = Number(key);
        let rpc = Networks[chainId].rpc
        if ( rpc ) rpcs[chainId] = rpc;
    }
    return rpcs;
})()

export const walletOptions: {[key in WalletPlugin]?: IClientProviderOptions} = {
    [WalletPlugin.WalletConnect]: {
        infuraId: InfuraId,
        bridge: "https://bridge.walletconnect.org",
        rpc: rpcs
    }
}