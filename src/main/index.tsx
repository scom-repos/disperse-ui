import {
  application,
  customElements,
  Module,
  Styles,
  Panel,
  customModule,
  IEventBus,
  IModuleOptions,
  IModuleMenuItem,
  IHasDependencies,
  Label,
  Container
} from '@ijstech/components';
import styleClass from './index.css';
import { Result } from './result';
import { SITE_ENV, EventId } from '@disperse/global';
import { getChainId, getDefaultChainId, isWalletConnected, listsNetworkShow, Networks, setCurrentChainId, setSiteEnv } from '@disperse/store';
export { Nav } from './nav';
export { Footer } from './footer';
Styles.Theme.applyTheme(Styles.Theme.darkTheme);
@customModule
@customElements('disperse-main-launcher')
export class MainLauncher extends Module {
  private pageWrap: Panel;
  private modules: { [modulePath: string]: Module } = {};
  private modulesMapper: Map<string, string>;
  private moduleDependenciesMapper: Map<string, IHasDependencies> = new Map();
  private currentPath: string;
  private resultMain: Result;
  private $eventBus: IEventBus;
  private params: any;
  private menuItems: IModuleMenuItem[];
  private siteEnv: string;
  private networkMsg: Label;

  constructor(parent?: Container, options?: IModuleOptions) {
    super(parent, options);
    this.classList.add(styleClass);
    this.modulesMapper = new Map();
    let defaultRoute;
    if (options) {
      this.siteEnv = options.env || '';
      setSiteEnv(this.siteEnv);
      setCurrentChainId(getDefaultChainId());
      this.params = options.params;
      this.menuItems = options.menuItems || [];
      if (Array.isArray(options.routes)) {
        for (let i = 0; i < options.routes.length; i++) {
          let route = options.routes[i];
          if (route.default)
            defaultRoute = route;
          this.modulesMapper.set(route.url, route.module);
          this.moduleDependenciesMapper.set(route.module, route);
        }
      }
    }
    window.onhashchange = this.locationHashChanged.bind(this);
    if (defaultRoute && !location.hash)
      location.hash = defaultRoute.url
    else
      setTimeout(() => {
        this.locationHashChanged();
      }, 1);
    this.$eventBus = application.EventBus;
  }

  get isTestnet() {
    return this.siteEnv === SITE_ENV.TESTNET;
  }

  async locationHashChanged() {
    const path: string = location.hash.split("?")[0];
    if (this.currentPath === path) return;

    await this.hideModule(this.currentPath);
    this.currentPath = path;

    if (!this.pageWrap) {
      this.pageWrap = document.getElementById('pageWrap') as Panel;
    }

    if (!this.modulesMapper.has(path)) {
      this.networkMsg.visible = true;
      this.networkMsg.caption = 'Page Not Available';
    } else {
      const modulePath: string = this.modulesMapper.get(path) ?? '';
      await this.handleLoadModule(modulePath);
    }
  }

  async handleLoadModule(modulePath: string) {
    if (!this.checkTestingEnabled()) {
      if (!this.currentPath) {
        this.currentPath = location.hash.split("?")[0];
      }
      this.networkMsg.visible = true;
      this.networkMsg.caption = isWalletConnected() ? `This network <b>${Networks[getChainId()]?.label || ''}</b> is not supported!` : 'Please connect with your wallet!';
      this.hideModule(this.currentPath);
      return;
    }
    this.networkMsg.visible = false;
    let module = await this.loadModule(modulePath);
    if (module) {
      if (this.pageWrap.contains(module))
        module.style.display = 'initial';
      else
        this.pageWrap.append(module)
      module.onLoad();
    }
  }

  async loadModule(modulePath: string): Promise<Module | null> {
    if (this.modules[modulePath])
      return this.modules[modulePath];
    let module = await application.newModule(modulePath, this.moduleDependenciesMapper.get(modulePath));
    if (module)
      this.modules[modulePath] = module
    return module
  }

  async hideModule(path: string) {
    if (!path || !this.modulesMapper.has(path)) return;
    const modulePath: string = this.modulesMapper.get(path) ?? '';
    let module = this.modules[modulePath];
    if (module)
      module.style.display = 'none';
  }

  reloadModule() {
    if (this.isTestnet) {
      const modulePath: string = this.modulesMapper.get(this.currentPath) ?? '';
      this.handleLoadModule(modulePath);
    }
  }

  checkTestingEnabled() {
    if (this.isTestnet) {
      const chainId = getChainId();
      return listsNetworkShow().some((network) => network.chainId === chainId);
    }
    return true;
  }

  registerEvent() {
    this.$eventBus.register(this, EventId.IsWalletConnected, this.reloadModule);
    this.$eventBus.register(this, EventId.chainChanged, this.reloadModule);
  }

  init() {
    super.init();

    this.handleResultModal();
    this.registerEvent();
  }

  handleResultModal() {
    this.resultMain = new Result();
    this.appendChild(this.resultMain);

    this.$eventBus.register(this, EventId.ShowResult, () => {
      this.resultMain.showModal();
    })

    this.$eventBus.register(this, EventId.SetResultMessage, (message: any) => {
      this.resultMain.message = message;
    })
  }

  render() {
    return (
      <i-vstack height="100vh">
        <disperse-main-nav menuItems={this.menuItems} height="auto" width="100%" />
        <i-panel id="pageWrap" stack={{ grow: "1", shrink: "0" }}>
          <i-label id="networkMsg" class="network-msg"/>
        </i-panel>
        <disperse-main-footer params={this.params} stack={{ shrink: '0' }} width="100%" />
      </i-vstack>
    )
  }
}

export { Result } from './result';
