import { Erc20, Wallet } from '@ijstech/eth-wallet';
import {
  EventId,
  ITokenObject,
  SITE_ENV,
  TokenMapType,
  getERC20Amount,
} from '@disperse/global';

import Assets from '@disperse/assets';
import { Contracts as OpenSwapContracts } from '@openswap/sdk';
import { isWalletConnected } from './wallet';
import {
  DefaultTokens,
  CoreContractAddressesByChainId,
  ChainNativeTokenByChainId,
  WETHByChainId,
  getTokenIconPath,
  getDefaultChainId
} from './data';

import { application } from '@ijstech/components';

export {isWalletConnected, hasWallet, hasMetaMask, truncateAddress, switchNetwork, connectWallet, logoutWallet} from './wallet';
export {walletList} from './walletList';
export {
  //token
  DefaultERC20Tokens,
  ChainNativeTokenByChainId,
  WETHByChainId,
  DefaultTokens,
  ToUSDPriceFeedAddressesMap,
  tokenPriceAMMReference,
  getTokenIconPath,
  getOpenSwapToken,
  
  //network
  //InfuraId,
  Networks,
  Mainnets,
  Testnets,
  getNetworkType,
  ChainNetwork,
  listNetworks,
  listsNetworkShow,
  getNetworkImg,
  getDefaultChainId,
  //core
  CoreContractAddressesByChainId,
  //dummy
  dummyAddressList,
  //warning
  ImportFileWarning,
} from './data'

export const nullAddress = "0x0000000000000000000000000000000000000000";
export const INFINITE = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"

const TOKENS = "oswap_user_tokens_";

const Disperse = "Disperse";

export const getUserTokens = (chainId: number) => {
  let tokens = localStorage[TOKENS + chainId];
  if (tokens) {
    tokens = JSON.parse(tokens);
  } else {
    tokens = [];
  }
  const userTokens = state.userTokens[chainId];
  if (userTokens && userTokens.length) {
    tokens = tokens.concat(userTokens);
  }
  return tokens.length ? tokens : null;
}

export const addUserTokens = (token: ITokenObject) => {
  const chainId = getChainId();
  let tokens = localStorage[TOKENS + chainId];
  let i = -1;
  if (tokens) {
    tokens = JSON.parse(tokens);
    i = tokens.findIndex((item: ITokenObject) => item.address == token.address);
  } else {
    tokens = [];
  }
  if (i == -1) {
    tokens.push(token);
  }
  localStorage[TOKENS + chainId] = JSON.stringify(tokens);
}

export const setSiteEnv = (value: string) => {
  if (Object.values(SITE_ENV).includes(value as SITE_ENV)) {
    state.siteEnv = value as SITE_ENV;
  } else {
    state.siteEnv = SITE_ENV.TESTNET;
  }
  
}

export const getSiteEnv = (): SITE_ENV => {
  return state.siteEnv;
}


export const setCurrentChainId = (value: number) => {
  state.currentChainId = value;
}

export const getCurrentChainId = (): number => {
  return state.currentChainId;
}

export function getAddresses(chainId: number) {
  return CoreContractAddressesByChainId[chainId];
};

export function getDisperseAddress(chainId: number) {
  return CoreContractAddressesByChainId[chainId][Disperse] || null;
}

export function canDisperse(chainId: number) {
  return !!getDisperseAddress(chainId);
}

export const getChainNativeToken = (chainId: number): ITokenObject => {
  return ChainNativeTokenByChainId[chainId];
};

export const getWETH = (chainId: number): ITokenObject => {
  let wrappedToken = WETHByChainId[chainId];
  return wrappedToken;
};

export function setGovToken(wallet: Wallet): ITokenObject {
  let GOV_TOKEN: ITokenObject;
  const Address = getAddresses(getChainId());
  if (wallet.chainId === 43113 || wallet.chainId === 43114) {
    GOV_TOKEN = { address: Address["GOV_TOKEN"], decimals: 18, symbol: "veOSWAP", name: 'Vote-escrowed OSWAP' };
  } else {
    GOV_TOKEN = { address: Address["GOV_TOKEN"], decimals: 18, symbol: "OSWAP", name: 'OpenSwap' };
  }
  return GOV_TOKEN;
}

export function getChainId() {
  return isWalletConnected() ? Wallet.getInstance().chainId : state.currentChainId || getDefaultChainId();
}

export function getWallet() {
  return Wallet.getInstance();
}

export function getWalletProvider() {
  return localStorage.getItem('walletProvider') || '';
}

export function getErc20(address: string) {
  const wallet = getWallet();
  return new Erc20(wallet, address);
}

export const isExpertMode = (): boolean => {
  return state.isExpertMode;
}

export function toggleExpertMode() {
  state.isExpertMode = !state.isExpertMode
}

export const getSlippageTolerance = (): any => {
  return state.slippageTolerance
}

export const setSlippageTolerance = (value: any) => {
  state.slippageTolerance = value
}

export const getTransactionDeadline = (): any => {
  return state.transactionDeadline;
}

export const setTransactionDeadline = (value: any) => {
  state.transactionDeadline = value
}

export const getTokenList = (chainId: number) => {
  const tokenList = [...DefaultTokens[chainId]];
  const userCustomTokens: any[] = getUserTokens(chainId);
  if (userCustomTokens) {
    userCustomTokens.forEach(v => tokenList.push({...v, isNew: false, isCustom: true}));
  }
  return tokenList;
}

export interface TokenBalancesType { [token: string]: string }
export async function updateAllTokenBalances(): Promise<TokenBalancesType> {
  const wallet = getWallet();
  let allTokenBalancesMap: TokenBalancesType = {};
  if (!wallet.chainId || !DefaultTokens[wallet.chainId]) return allTokenBalancesMap;
  const tokenList = getTokenList(wallet.chainId);
  let promises: Promise<void>[] = []
  promises.push(...tokenList.map(async (token, index) => {
      try {
        if (token.address) {
          let balance = (await getERC20Amount(wallet, token.address, token.decimals)).toFixed()
          allTokenBalancesMap[token.address.toLowerCase()] = balance;
        }
        else {
          let balance = await wallet.balance;
          if (balance.isZero() || balance.isNaN()) {
            balance = await getWallet().balance;
          }
          allTokenBalancesMap[token.symbol] = balance.toFixed();
        }
      } catch (error) {}
  }));
  
  await Promise.all(promises);
  state.tokenBalances = allTokenBalancesMap;
  return allTokenBalancesMap;
}


export const getTokenBalances = (): TokenBalancesType => {
  return state.tokenBalances;
}
export const getTokenBalance = (token: ITokenObject): string => {
  let balance = '0';
  if (!token) return balance;
  if (token.address) {
    balance = state.tokenBalances[token.address.toLowerCase()];
  }
  else {
    balance = state.tokenBalances[token.symbol];
  }
  return balance;
}
export const setTokenBalances = async (value?: TokenBalancesType) => {
  state.tokenBalances = value ? value : await updateAllTokenBalances();
}

export const state = {
  siteEnv: SITE_ENV.TESTNET,
  currentChainId: 0,
  isExpertMode: false,
  slippageTolerance: 0.5,
  transactionDeadline: 30,
  tokenBalances: {} as TokenBalancesType,
  tokenMap: {} as TokenMapType,
  trollActionsMapStatus: {} as {[key: string]: boolean},
  minPrice: null as any,
  maxPrice: null as any,
  priorityQueueActionsStatus: {} as {[key: string]: boolean},
  rangeQueueActionsStatus: {} as {[key: string]: boolean},
  groupQueueActionsStatus: {} as {[key: string]: boolean},
  groupQueueOfferStatus: {} as {[key: string]: {value: boolean, text: string}},
  buybackStatus: {} as {[key: string]: {value: boolean, text: string}},
  userTokens: {} as {[key: string]: ITokenObject[]},
}

export const projectNativeToken = (): ITokenObject & { address: string } | null => {
  let chainId = getChainId();
  if (chainId == null || chainId == undefined) return null;
  let stakeToken = DefaultTokens[chainId].find(v => v.symbol == 'OSWAP')
  return stakeToken ? { ...stakeToken, address: stakeToken.address!.toLowerCase() } : null;
}

export const projectNativeTokenSymbol = () => {
  const token = projectNativeToken();
  return token ? token.symbol : ''
};

export const getTokenObject = async (address: string, showBalance?: boolean) => {
  const ERC20Contract = new OpenSwapContracts.ERC20(Wallet.getInstance(), address);
  const symbol = await ERC20Contract.symbol();
  const name = await ERC20Contract.name();
  const decimals = (await ERC20Contract.decimals()).toFixed();
  let balance;
  if (showBalance && getWallet().isConnected) {
    balance =  (await (ERC20Contract.balanceOf(getWallet().account.address))).shiftedBy(-decimals).toFixed();
  }
  return {
    address: address.toLowerCase(),
    decimals: +decimals,
    name,
    symbol,
    balance
  }
}

const getTokenMapData = (): TokenMapType => {
  let allTokensMap: TokenMapType = {};
  let chainId = getChainId();
  if (DefaultTokens[chainId]) {
    let defaultTokenList = DefaultTokens[chainId].sort((a, b) => {
      if (a.symbol.toLowerCase() < b.symbol.toLowerCase()) { return -1; }
      if (a.symbol.toLowerCase() > b.symbol.toLowerCase()) { return 1; }
      return 0;
    })
    for (let i = 0; i < defaultTokenList.length; i++) {
      let defaultTokenItem = defaultTokenList[i];
      if (defaultTokenItem.address)
        allTokensMap[defaultTokenItem.address.toLowerCase()] = defaultTokenItem;
      else
        allTokensMap[defaultTokenItem.symbol] = defaultTokenItem;
    }
    const userCustomTokens: any[] = getUserTokens(chainId);
    if (userCustomTokens) {
      userCustomTokens.forEach(v => allTokensMap[v.address] = {...v, isCustom: true});
    }
  }
  return allTokensMap;
}
let tokenMapChainId = 0;
export const setTokenMap = () => {
  state.tokenMap = getTokenMapData()
}
export const getTokenMap = () => {
  let chainId = getChainId();
  if (tokenMapChainId != chainId) {
    state.tokenMap = getTokenMapData()
    tokenMapChainId = chainId;
  }
  return state.tokenMap
}

export const getTokensDataList = async (tokenMapData: TokenMapType, tokenBalances: any): Promise<any[]> => {
  let dataList: any[] = [];
  for (let i = 0; i < Object.keys(tokenMapData).length; i++) {
    let tokenAddress = Object.keys(tokenMapData)[i];
    let tokenObject = tokenMapData[tokenAddress];
    if (tokenBalances) {
      dataList.push({
        ...tokenObject,
        status: false,
        value: tokenBalances[tokenAddress] ? tokenBalances[tokenAddress] : 0,
      });
    } else {
      dataList.push({
        ...tokenObject,
        status: null,
      })
    }
  }
  return dataList;
}

export const getTokenDecimals = (address: string) => {
  let chainId = getChainId();
  const Address = getAddresses(chainId);
  const ChainNativeToken = getChainNativeToken(chainId);
  const tokenObject = (!address || address.toLowerCase() === Address['WETH9'].toLowerCase()) ?
  ChainNativeToken :
    getTokenMap()[address];
  return tokenObject ? tokenObject.decimals : 18;
}

export const getTokenIcon = (address: string) => {
  if (!address) return '';
  const tokenMap = getTokenMap();
  let ChainNativeToken;
  let tokenObject;
  if (isWalletConnected()){
    ChainNativeToken = getChainNativeToken(getChainId());
    tokenObject = address == ChainNativeToken.symbol ? ChainNativeToken : tokenMap[address.toLowerCase()];
  } else {
    tokenObject = tokenMap[address.toLowerCase()];
  }
  return Assets.fullPath(getTokenIconPath(tokenObject, getChainId()));
}

export const tokenSymbol = (address: string) => {
  if (!address) return '';
  const tokenMap = getTokenMap();
  let tokenObject = tokenMap[address.toLowerCase()];
  if (!tokenObject) {
    tokenObject = tokenMap[address];
  }
  return tokenObject ? tokenObject.symbol : '';
}

export const setTrollActionsMapStatus = (actionKey: string, status: boolean) => {
  state.trollActionsMapStatus[actionKey] = status;
}

export const getTrollActionsMapStatus = (actionKey: string) => {
  return state.trollActionsMapStatus[actionKey] || false;
}

export const setMinPrice = (value: number) => {
  state.minPrice = value;
}

export const getMinPrice = (): number => {
  return state.minPrice;
}

export const setMaxPrice = (value: number) => {
  state.maxPrice = value;
}

export const getMaxPrice = (): number => {
  return state.maxPrice;
}

export const setPriorityQueueActionsStatus = (key: string, value: boolean, keyTab: string) => {
  state.priorityQueueActionsStatus[key] = value;
  application.EventBus.dispatch(EventId.EmitButtonStatus, {name: 'Priority Queue', keyTab, key, value});
}

export const getPriorityQueueActionsStatus = (key: string) => {
  return state.priorityQueueActionsStatus[key] || false;
}

export const setRangeQueueActionsStatus = (key: string, value: boolean, keyTab: string) => {
  state.rangeQueueActionsStatus[key] = value;
  application.EventBus.dispatch(EventId.EmitButtonStatus, {name: 'Range Queue', keyTab, key, value});
}

export const getRangeQueueActionsStatus = (key: string) => {
  return state.rangeQueueActionsStatus[key] || false;
}

export const setGroupQueueActionsStatus = (key: string, value: boolean, keyTab: string) => {
  state.groupQueueActionsStatus[key] = value;
  application.EventBus.dispatch(EventId.EmitButtonStatus, {name: 'Group Queue', keyTab, key, value});
}

export const getGroupQueueActionsStatus = (key: string) => {
  return state.groupQueueActionsStatus[key] || false;
}

export const setGroupQueueOfferStatus = (key: string, value: boolean, text: string) => {
  state.groupQueueOfferStatus[key] = { value, text };
  application.EventBus.dispatch(EventId.EmitButtonStatus, {name: 'Group Queue Offer', key, value, text});
}

export const getGroupQueueOfferStatus = (key: string) => {
  return state.groupQueueOfferStatus[key] || { value : false, text: 'Swap' };
}

export const setBuyBackStatus = (key: string, value: boolean, text: string) => {
  state.buybackStatus[key] = { value, text };
  application.EventBus.dispatch(EventId.EmitButtonStatus, {name: 'BuyBack', key, value, text});
}

export const getBuyBackStatus = (key: string) => {
  return state.buybackStatus[key];
}

export const setUserTokens = (token: ITokenObject, chainId: number) => {
  if (!state.userTokens[chainId]) {
    state.userTokens[chainId] = [token];
  } else {
    state.userTokens[chainId].push(token);
  }
}

export const hasUserToken = (address: string, chainId: number) => {
  return state.userTokens[chainId]?.some((token: ITokenObject) => token.address?.toLocaleLowerCase() === address?.toLocaleLowerCase());
}
