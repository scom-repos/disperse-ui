import {
  customElements,
  Module,
  Control,
  ControlElement,
  Menu,
  Styles,
  Button,
  Modal,
  observable,
  Label,
  Panel,
  application,
  IEventBus,
  Image,
  HStack,
  IModuleMenuItem,
  Container,
  VStack,
  GridLayout,
  IMenuItem
} from '@ijstech/components';
import { Wallet, WalletPlugin, WalletPluginConfig } from "@ijstech/eth-wallet";
import { INetwork, EventId, formatNumber, SITE_ENV, explorerAddressUrlsByChainId } from '@disperse/global';
import { 
  walletList, 
  connectWallet, 
  logoutWallet, 
  switchNetwork, 
  hasWallet, 
  listsNetworkShow,
  getDefaultChainId,
  getWalletProvider,
  getNetworkType
} from '@disperse/store';
import styleClass from './nav.css';
import Assets from '@disperse/assets';
import { Networks, ChainNativeTokenByChainId, setTokenMap, getSiteEnv } from '@disperse/store';

const Theme = Styles.Theme.ThemeVars;

@customElements('disperse-main-nav')
export class Nav extends Module {
  private _menuItems: IModuleMenuItem[];
  private mobileMenuStack: HStack;
  private desktopMenuStack: HStack;
  private mobileMenu: Menu;
  private desktopMenu: Menu;
  private hamburger: Button;
  private switchModal: Modal;
  private connectModal: Modal;
  private accountModal: Modal;
  private wallet: Wallet;
  private lbTokenSymbol: Label;
  private walletContainer: Control;
  private networkButtonContainer: Panel;
  private networkBalanceContainer: Panel;
  private walletDetailPanel: Panel;
  private walletBalanceElm: Panel;
  private walletDetailButton: Button;
  private walletConnectButton: Button;
  private networkButton: Button;
  private networkGroup: GridLayout;
  private walletListElm: GridLayout;
  private $eventBus: IEventBus;
  private selectedNetwork: INetwork;
  private noteNetworkLabel: Label;
  private explorerName: Label;
  private copyIcon: HStack;

  @observable()
  private walletShortlyAddress: string;
  @observable()
  private walletInfo = {
    address: '',
    balance: '',
    networkId: 0
  }

  constructor(parent?: Container, options?: any) {
    super(parent, options);
    this.$eventBus = application.EventBus;
    this.registerEvent();
  };
  get shortlyAddress(): string {
    const address = this.walletInfo.address;
    if (!address) return 'No address selected';
    return address.substr(0, 6) + '...' + address.substr(-4);
  }

  registerEvent() {
    let wallet = Wallet.getInstance();
    this.$eventBus.register(this, EventId.ConnectWallet, this.openConnectModal)
    this.$eventBus.register(this, EventId.ChangeNetwork, () => this.showModal('switchModal'))
    this.$eventBus.register(this, EventId.IsWalletConnected, async (connected: boolean) => {
      if (connected) {
        this.walletInfo.address = wallet.address;
        this.walletInfo.balance = formatNumber((await wallet.balance).toFixed(), 2);
        this.walletInfo.networkId = wallet.chainId;
      }
      this.selectedNetwork = Networks[wallet.chainId];
      this.renderMobileMenu();
      this.renderDesktopMenu();
      this.updateConnectedStatus(connected);
      this.updateList(connected);
    })
    this.$eventBus.register(this, EventId.IsWalletDisconnected, async (connected: boolean) => {
      this.selectedNetwork = Networks[wallet.chainId];
      this.updateConnectedStatus(connected);
      this.updateList(connected);
    })
    this.$eventBus.register(this, EventId.chainChanged, async (chainId: number) => {
      this.onChainChanged(chainId);
    })
  }

  onChainChanged = async (chainId: number) => {
    this.walletInfo.networkId = chainId;
    this.selectedNetwork = Networks[chainId];
    let wallet = Wallet.getInstance();
    this.renderMobileMenu();
    this.renderDesktopMenu();
    const isConnected = wallet.isConnected;
    this.walletInfo.balance = isConnected ? formatNumber((await wallet.balance).toFixed(), 2) : '0';
    this.updateConnectedStatus(isConnected);
    this.updateList(isConnected);
    if (!isConnected) {
      this.renderNetworkButton();
      const acivedElm = this.networkGroup.querySelector('.is-actived');
      acivedElm && acivedElm.classList.remove('is-actived');
      const connectingElm = this.networkGroup.querySelector(`[data-key="${chainId}"]`);
      connectingElm && connectingElm.classList.add('is-actived');
    }
  };

  updateConnectedStatus = (value: boolean) => {
    if (value) {
      this.renderNetworkButton();
      if (this.networkBalanceContainer.contains(this.walletBalanceElm)) {
        this.networkBalanceContainer.removeChild(this.walletBalanceElm);
      }
      const balanceLabel = this.walletBalanceElm.firstChild as Label;
      balanceLabel.caption = this.walletInfo.balance;
      this.lbTokenSymbol.caption = this.getSymbol();
      this.networkBalanceContainer.append(this.walletBalanceElm);
      if (this.walletContainer.contains(this.walletConnectButton)) {
        this.walletContainer.removeChild(this.walletConnectButton);
      }
      this.walletDetailButton.caption = this.shortlyAddress;
      this.walletShortlyAddress = this.shortlyAddress;
      this.walletDetailPanel.append(this.walletDetailButton);
    }
    else {
      if (this.networkBalanceContainer.contains(this.walletBalanceElm)) {
        this.networkBalanceContainer.removeChild(this.walletBalanceElm)
      }
      if (this.walletDetailPanel.contains(this.walletDetailButton)) {
        this.walletDetailPanel.removeChild(this.walletDetailButton);
      }
      this.walletContainer.append(this.walletConnectButton);
    }
  }

  async requestAccounts() {
    try {
      await this.wallet.web3.eth.requestAccounts();
    } catch (error) {
      console.error(error);
    }
  }

  async initData() {
    let accountsChangedEventHandler = async (account: string) => {
      setTokenMap();
    }
    let chainChangedEventHandler = async (hexChainId: number) => {
      this.updateConnectedStatus(true);
      setTokenMap();
    }
    const selectedProvider = localStorage.getItem('walletProvider') as WalletPlugin;
    const isValidProvider = Object.values(WalletPlugin).includes(selectedProvider);
    if (hasWallet() && isValidProvider) {
      this.wallet = await connectWallet(selectedProvider, {
        'accountsChanged': accountsChangedEventHandler,
        'chainChanged': chainChangedEventHandler
      });
    }
  }

  _getMenuData(list: IModuleMenuItem[], mode: string, validMenuItemsFn: (item: IModuleMenuItem) => boolean): IMenuItem[] {
    const menuItems: IMenuItem[] = [];
    list.filter(validMenuItemsFn).forEach((item: IModuleMenuItem, key: number) => {
      const linkTarget = item.isToExternal ? '_blank': '_self';
      const _menuItem: IMenuItem = {
        title: item.text,
        link: { href: item.to, target: linkTarget },
      };
      if (mode === 'mobile' && item.img) {
        _menuItem.icon = { width: 24, height: 24, image: { width: 24, height: 24, url: Assets.fullPath(item.img) } }
      }
      if (item.subItems && item.subItems.length) {
        _menuItem.items = this._getMenuData(item.subItems, mode, validMenuItemsFn);
      }
      menuItems.push(_menuItem);
    })
    return menuItems;
  }

  getMenuData(list: IModuleMenuItem[], mode: string): any {
    let chainId = this.selectedNetwork?.chainId || Wallet.getInstance().chainId;
    let siteEnv = getSiteEnv();
    let validMenuItemsFn: (item: IModuleMenuItem) => boolean;
    if (chainId) {
      validMenuItemsFn = (item: IModuleMenuItem) => !item.isDisabled && (!item.supportedChainIds || item.supportedChainIds.includes(chainId)) && (!item.env || item.env.some((v) => v === siteEnv));
    }
    else {
      validMenuItemsFn = (item: IModuleMenuItem) => !item.isDisabled && (!item.env || item.env.some((v) => v === siteEnv));
    }
    return this._getMenuData(list, mode, validMenuItemsFn);
  }

  renderMobileMenu() {
    const data = this.getMenuData(this._menuItems, 'mobile');
    this.mobileMenu.data = data;
  }

  renderDesktopMenu() {
    const data = this.getMenuData(this._menuItems, 'desktop');
    this.desktopMenu.data = data;
  }

  toggleMenu() {
    if (!this.enabled) {
      this.mobileMenu.classList.remove('show-menu');
      return;
    }
    const shownMenu = this.mobileMenu.classList.contains('show-menu');
    shownMenu ? this.mobileMenu.classList.remove('show-menu') : this.mobileMenu.classList.add('show-menu');
  }

  showModal(name: string, title: string = '') {
    const modalELm = this[name as 'switchModal' | 'connectModal' | 'accountModal'];
    title && (modalELm.title = title);
    if (name === 'switchModal') {
      this.updateListNetworkUI();
    } else if (name === 'accountModal') {
      this.explorerName.caption = `<i-icon name="external-link-alt" width=${16} height=${16} fill="${Theme.text.primary}"></i-icon> View on ${getNetworkType(this.walletInfo.networkId)}`
    }
    modalELm.visible = true;
  }

  isLive(walletPlugin: WalletPlugin) {
    const provider = walletPlugin?.toLowerCase();
    return Wallet.isInstalled(walletPlugin) && Wallet.getInstance().clientSideProvider?.walletPlugin === provider;
  }

  isNetworkLive(chainId: number) {
    return Wallet.getInstance().chainId === chainId;
  }

  async switchNetwork(chainId: number) {
    if (!chainId) return;
    await switchNetwork(chainId);
    this.switchModal.visible = false;
  }

  openLink(link: any) {
    return window.open(link, '_blank');
  };
  async connectToProviderFunc(walletPlugin: WalletPlugin) {
    if (Wallet.isInstalled(walletPlugin)) {
      await connectWallet(walletPlugin);
    }
    else {
      let config = WalletPluginConfig[walletPlugin];
      let homepage = config?.homepage ? config.homepage() : '';
      this.openLink(homepage);
    }
    this.connectModal.visible = false;
  };

  logout = async () => {
    await logoutWallet();
    this.updateConnectedStatus(false);
    this.updateList(false);
    this.accountModal.visible = false;
  }

  private getSymbol() {
    let symbol = '';
    if (this.selectedNetwork?.chainId && ChainNativeTokenByChainId[this.selectedNetwork.chainId]) {
      symbol = ChainNativeTokenByChainId[this.selectedNetwork.chainId].symbol;
    }
    return symbol;
  }

  openWalletAddressInExplorer(){
    let explorerURL = explorerAddressUrlsByChainId[this.walletInfo.networkId];
    if (!explorerURL) return console.log(`Failed to find a block explorer for network ${this.walletInfo.networkId}`);
    this.openLink(explorerURL+this.walletInfo.address);
  }

  async renderWalletBalance() {
    this.walletBalanceElm = new Panel();
    this.walletBalanceElm.classList.add('my-wallet');

    const balanceLabel = await Label.create({ font: { size: '15px' }});
    balanceLabel.caption = this.walletInfo.balance;
    this.walletBalanceElm.appendChild(balanceLabel);

    this.lbTokenSymbol = await Label.create({ font: { size: '15px' }});
    this.lbTokenSymbol.id = "lbTokenSymbol";
    this.lbTokenSymbol.caption = this.getSymbol();
    this.lbTokenSymbol.style.marginLeft = '4px';
    this.walletBalanceElm.appendChild(this.lbTokenSymbol);
  }

  async renderWalletButton() {
    this.walletDetailButton = await Button.create({
      caption: this.shortlyAddress,
      padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
      margin: {left: 12},
      font: { size: '15px' }
    })
    
    const modalElm = await Modal.create({
      maxWidth: '200px',
      showBackdrop: false,
      height: 'auto',
      popupPlacement: 'bottomRight'
    })
    modalElm.classList.add("account-dropdown");

    const vstack = await VStack.create({
      gap: '15px'
    });
    const itemCaptions = ["Account", "Switch wallet", "Logout"];
    const itemFunctions = [
      () => this.showModal('accountModal'),
      () => this.showModal('connectModal', 'Switch wallet'),
      this.logout
    ];

    itemCaptions.forEach(async (caption, i) => {
      const buttonItem = await Button.create({
        caption,
        width: '100%',
        height: 'auto',
        padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' }
      });
      buttonItem.onClick = (source: Control, event: Event): boolean => {
        event.stopPropagation();
        modalElm.visible = false;
        itemFunctions[i]();
        return true;
      }
      vstack.appendChild(buttonItem);
      modalElm.item = vstack;
    })
    this.walletDetailPanel.appendChild(modalElm);
    this.walletDetailButton.classList.add("btn-os");
    this.walletDetailButton.onClick = () => modalElm.visible = !modalElm.visible;

    this.walletConnectButton = await Button.create({
      caption: 'Connect Wallet',
      margin: {left: 8}
    });
    this.walletConnectButton.classList.add('btn', 'btn-os', 'btn-connect');
    this.walletConnectButton.onClick = this.openConnectModal;
    this.walletContainer.append(this.walletConnectButton);
  }

  async renderNetworkButton() {
    const hStack = await HStack.create();
    hStack.verticalAlignment = "center";
    if (this.selectedNetwork?.icon) {
      const image = await Image.create();
      image.url = Assets.fullPath(`img/network/${this.selectedNetwork.icon}`);
      image.width = '24px';
      image.classList.add('inline-block');
      hStack.appendChild(image);
    }
    const label = await Label.create({
      caption: this.selectedNetwork?.label || 'Unsupported Network',
      font: { size: '15px' },
      margin: {left: 4}
    });
    hStack.appendChild(label);
    this.networkButton = await Button.create({margin: {right: 16}});
    this.networkButton.classList.add('btn', 'btn-network');
    this.networkButton.onClick = () => this.showModal('switchModal');
    this.networkButton.appendChild(hStack);
    this.networkButtonContainer.clearInnerHTML();
    this.networkButtonContainer.appendChild(this.networkButton);
  }
  renderNetworks() {
    this.networkGroup.clearInnerHTML();
    const networksList = listsNetworkShow();
    this.networkGroup.append(...networksList.map((network) => {
      return (
        <i-hstack
          onClick={() => this.switchNetwork(network.chainId)}
          class={this.isNetworkLive(network.chainId) ? 'is-actived list-item' : 'list-item'}
          data-key={network.chainId}
          verticalAlignment="center"
          gap={10}
        >
          <i-image url={Assets.fullPath(`img/network/${network.img}`)} width={32} height={32} display="inline-block" margin={{left: 12}} />
          <i-label caption={network.label} />
        </i-hstack>
      )
    }));
  }

  openConnectModal = () => {
    this.showModal('connectModal', 'Connect Wallet');
  }

  renderWalletList() {
    this.walletListElm.clearInnerHTML();
    let wallets: any[] = [];
    let walletsDisabled: any[] = [];
    walletList.forEach(wallet => {
      let walletEnabled = this.isWalletEnabled(wallet.name);
      let walletJSX = (
        <i-hstack
          onClick={() => this.connectToProviderFunc(wallet.name)}
          class={this.isLive(wallet.name) ? 'is-actived list-item' : 'list-item'}
          data-key={wallet.name}
          enabled={walletEnabled}
          verticalAlignment="center"
          gap={10}
        >
          <i-image url={Assets.fullPath(`img/wallet/${wallet.iconFile}`)} width={32} height={32} class="inline-block custom-img" />
          <i-label caption={wallet.displayName} />
        </i-hstack>
      )
      walletEnabled ? wallets.push(walletJSX): walletsDisabled.push(walletJSX);
    })
    this.walletListElm.append(...wallets);
    this.walletListElm.append(...walletsDisabled);
  }

  updateDot(parent: HTMLElement, connected: boolean, type: 'network' | 'wallet') {
    const acivedElm = parent.querySelector('.is-actived');
    acivedElm && acivedElm.classList.remove('is-actived');

    if (connected) {
      const wallet = Wallet.getInstance();
      const connectingVal = type === 'network' ? wallet.chainId : wallet.clientSideProvider?.walletPlugin;
      const connectingElm = parent.querySelector(`[data-key="${connectingVal}"]`);
      connectingElm && connectingElm.classList.add('is-actived');
    }
  }

  isWalletEnabled(walletName: WalletPlugin){
    switch (getSiteEnv()) {
      case SITE_ENV.TESTNET: {
        switch (walletName) {
          case WalletPlugin.ONTOWallet:
          case WalletPlugin.Coin98:
          case WalletPlugin.TrustWallet:    
            return false;
        }
        break;
      }
      case SITE_ENV.MAINNET: {

        break;
      }
      case SITE_ENV.DEV: {

        break;
      }  
    }
    return true;
  }

  updateListNetworkUI() {
    const listElm = this.networkGroup?.querySelectorAll('.list-item') || [];
    const isConnected = Wallet.getInstance()?.isConnected;
    const isMetaMask = getWalletProvider() === WalletPlugin.MetaMask;
    for (const elm of listElm) {
      if (isMetaMask || !isConnected) {
        elm.classList.remove('disabled-network-selection');
      } else {
        elm.classList.add('disabled-network-selection');
      }
    }
  }

  updateList(connected: boolean) {
    if (connected) {
      this.noteNetworkLabel.caption = getWalletProvider() === WalletPlugin.MetaMask ?
        'We supports the following networks, please click to connect.' :
        'We supports the following networks, please switch network in the connected wallet.'
    } else {
      this.noteNetworkLabel.caption = 'We supports the following networks, please click to connect.';
    }
    this.updateDot(this.walletListElm, connected, 'wallet');
    this.updateDot(this.networkGroup, connected, 'network');
  }

  controlMenuDisplay() {
    if (window.innerWidth < 768) {
      this.mobileMenuStack.visible = true;
      this.desktopMenuStack.visible = false;
    } else {
      this.mobileMenuStack.visible = false;
      this.desktopMenuStack.visible = true;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', (e) => {
      this.controlMenuDisplay();
    });
  }

  getElementProperty(name: string) {
    let value;
    if (this.attrs[name] && this.attrs[name].__target) {
      value = this.getValue(this.attrs[name].__target, this.attrs[name].__path);
    }   
    return value; 
  }

  async init() {
    document.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    this.classList.add(styleClass);
    this.selectedNetwork = Networks[getDefaultChainId()];
    super.init();
    this._menuItems = this.getElementProperty('menuItems');
    this.renderMobileMenu();
    this.renderDesktopMenu();
    this.controlMenuDisplay();
    this.renderWalletBalance();
    await this.renderWalletButton();
    this.renderNetworkButton();
    this.renderNetworks();
    this.renderWalletList();
    this.walletShortlyAddress = this.shortlyAddress;
    await this.initData();
    this.getSymbol();
    this.copyIcon.onClick= () => application.copyToClipboard(this.walletInfo.address || '')
  }

  async render() {
    return (
      <i-hstack width="100%" height="5rem" border={{ bottom: { width: "2px", style: "solid", color: "#FF8800" } }} padding={{ top: "0.9375rem", bottom: "0.625rem", left: "1rem", right: "1rem" }}>
        <i-hstack stack={{ grow: "1" }} horizontalAlignment="space-between" verticalAlignment="center">
          <i-hstack id="mobileMenuStack" class="mobile" verticalAlignment="center" visible={false}>
            <i-button id="hamburger" onClick={this.toggleMenu} class="btn-hamburger mr-1">
              <i-image url={Assets.fullPath("img/burger-menu-24.png")} width="20px" height="20px" class="inline-block" />
            </i-button>
            <i-menu id="mobileMenu" mode="vertical" class="os-mobile" />
            <i-image
              url={Assets.fullPath("img/sc-header.png")}
              width={40}
              height={40}
              onClick={() => window.location.assign('#/disperse')}
              class="mobile-logo pointer"
            />
          </i-hstack>
          <i-hstack
            id="desktopMenuStack"
            wrap="nowrap"
            verticalAlignment="center"
            maxWidth="calc(100% - 640px)"
          >
            <i-image
              stack={{ shrink: '0' }}
              width={200}
              url={Assets.fullPath('img/sc-logo.svg')}
              onClick={() => window.location.assign('#/disperse')}
              margin={{left: 8, right: 20}}
              class="desktop-logo pointer"
            />
            <i-menu id="desktopMenu" class="os-menu" />
          </i-hstack>
          <i-hstack
            id="walletContainer"
            horizontalAlignment="end"
            verticalAlignment="center"
          >
            <i-hstack id="networkBalanceContainer" verticalAlignment="center" padding={{ left: '1rem' }}>
              <i-hstack id="networkButtonContainer" />
            </i-hstack>
            <i-panel id="walletDetailPanel" />
          </i-hstack>
        </i-hstack>
        <i-modal
          id="switchModal" title="Supported Network"
          closeIcon={{ name: 'times' }}
          class="os-modal"
        >
          <i-vstack height="100%" class="i-modal_content">
            <i-label id="noteNetworkLabel" class="mt-1 small-label" caption="We supports the following networks, please click to connect." />
            <i-panel class="flex networkSection" height="100%">
              <i-grid-layout id="networkGroup" class="list-view networks" />
            </i-panel>
          </i-vstack>
        </i-modal>
        <i-modal
          id="connectModal" title="Connect Wallet"
          class="os-modal connect-modal"
          closeIcon={{ name: 'times', fill: Theme.colors.secondary.main }}
        >
          <i-panel class="i-modal_content">
            <i-label class="mt-1 small-label" caption="Recommended wallet for Chrome"></i-label>
            <i-panel padding={{bottom: 16}}>
              <i-grid-layout id="walletListElm" class="list-view wallets" columnsPerRow={1} templateRows={['max-content']} />
            </i-panel>
          </i-panel>
        </i-modal>
        <i-modal
          id="accountModal" title="Account"
          class="os-modal account-modal"
          closeIcon={{ name: 'times', fill: Theme.colors.secondary.main }}
        >
          <i-panel class="i-modal_content">
            <i-hstack horizontalAlignment="space-between" verticalAlignment="center">
              <i-label class="small-label" caption="Connected with" />
              <i-button caption="Logout" class="btn btn-os btn-connect" onClick={this.logout} />
            </i-hstack>
            <i-label caption={this.walletShortlyAddress} class="large-label bold" />
            <i-hstack verticalAlignment="center" margin={{top: 8}} gap="4px">
              <i-label
                id="copyIcon"
                caption={`<i-icon name="copy" width=${16} height=${16} fill="${Theme.text.primary}"></i-icon><span>Copy Address</span>`}
                class="pointer bold small-label mr-2-5"
                tooltip={{ content: `The address has been copied`, trigger: 'click' }}
              />
              <i-label
                id="explorerName"
                caption={`<i-icon name="external-link-alt" width=${16} height=${16} fill="${Theme.text.primary}"></i-icon><span>View on Etherscan</span`}
                class="custom-link pointer"
                font={{ size: '.875rem', bold: true }}
                onClick={this.openWalletAddressInExplorer}
              ></i-label>
            </i-hstack>
          </i-panel>
        </i-modal>
      </i-hstack>
    )
  }
};
export interface NavElement extends ControlElement {
  menuItems?: IModuleMenuItem[];
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["disperse-main-nav"]: NavElement;
    }
  }
};