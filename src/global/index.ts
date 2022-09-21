export interface INetwork {
    chainId: number;
    name: string;
    label: string;
    icon: string;
    rpc?: string;
    isDisabled?: boolean;
};

export const explorerTxUrlsByChainId: { [key: number]: string } = {
    1: 'https://etherscan.io/tx/',
    4: 'https://rinkeby.etherscan.io/tx/',
    42: 'https://kovan.etherscan.io/tx/',
    56: 'https://bscscan.com/tx/',
    97: 'https://testnet.bscscan.com/tx/',
    43113: 'https://testnet.snowtrace.io/tx/',
    43114: 'https://snowtrace.io/tx/',
    137: 'https://polygonscan.com/tx/',
    80001: 'https://mumbai.polygonscan.com/tx/',
    250: 'https://ftmscan.com/tx/',
    4002: 'https://testnet.ftmscan.com/tx/',
    13370: 'https://aminoxtestnet.blockscout.alphacarbon.network/tx/',
}

export const explorerAddressUrlsByChainId: {[key: number]: string} = {
    1: 'https://etherscan.io/address/',
    4: 'https://rinkeby.etherscan.io/address/',
    42: 'https://kovan.etherscan.io/address/',
    97: 'https://testnet.bscscan.com/address/',
    56: 'https://bscscan.com/address/',
    43113: 'https://testnet.snowtrace.io/address/',
    43114: 'https://snowtrace.io/address/',
    137: 'https://polygonscan.com/address/',
    80001: 'https://mumbai.polygonscan.com/address/',
    250: 'https://ftmscan.com/address/',
    4002: 'https://testnet.ftmscan.com/address/',
    13370: 'https://aminoxtestnet.blockscout.alphacarbon.network/address/',
}

export const enum EventId {
    ConnectWallet = 'connectWallet',
    ChangeNetwork = 'changeNetwork',
    IsWalletConnected = 'isWalletConnected',
    IsWalletDisconnected = 'IsWalletDisconnected',
    Paid = 'Paid',
    chainChanged = 'chainChanged',
    ShowExpertModal = 'showExpertModal',
    ShowTransactionModal = 'showTransactionModal',
    SlippageToleranceChanged = 'slippageToleranceChanged',
    ExpertModeChanged = 'expertModeChanged',
    ShowResult = 'showResult',
    SetResultMessage = 'setResultMessage',
    EmitButtonStatus = 'emitButtonStatus',
    EmitNewToken = 'emitNewToken',
}

export interface ITokenObject {
    address?: string;
    name: string;
    decimals: number;
    symbol: string;
    status?: boolean | null;
    logoURI?: string;
    isCommon?: boolean | null;
    balance?: string | number;
    isNative?: boolean | null;
    isWETH?: boolean | null;
    isNew?: boolean | null;
};

export type TokenMapType = { [token: string]: ITokenObject };


export * from './utils';

export {
    isTransactionConfirmed,
    registerSendTxEvents,
    isAddressValid,
    getERC20Amount,
} from './utils/common';
