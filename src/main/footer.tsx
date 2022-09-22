import { customElements, Module, ControlElement, HStack, VStack, Container } from '@ijstech/components';
import Assets from '@disperse/assets';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["disperse-main-footer"]: FooterElement;
    }
  }
};

export interface FooterElement extends ControlElement {
  menuItems?: any;
  params?: any;
}

@customElements('disperse-main-footer')
export class Footer extends Module {
  private secureComputeStack: HStack;
  private socialMediaStack: HStack;
  private pagesStack: VStack;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  };
  

  getElementProperty(name: string) {
    let value;
    if (this.attrs[name] && this.attrs[name].__target) {
      value = this.getValue(this.attrs[name].__target, this.attrs[name].__path);
    }   
    return value; 
  }

  controlPageStackDisplay() {
    this.pagesStack.visible = window.innerWidth >= 768;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize', (e) => {
      this.controlPageStackDisplay();
    });
  }

  async init() {
    super.init();
    const params = this.getElementProperty('params');
    const projectInfo = params.projectInfo;
    this.secureComputeStack.appendChild(<i-image url={Assets.fullPath(projectInfo.img)} />);
    this.secureComputeStack.appendChild(
      <i-vstack gap={4} margin={{top: 10}}>
        <i-label font={{ size: '1rem', bold: true }} caption="SECURE COMPUTE" />
        <i-label font={{ size: '0.85rem' }} caption={projectInfo.versionText} />
      </i-vstack>
    );
    if (params.socialMediaInfo) {
      const socialMediaInfoList: any[] = params.socialMediaInfo;
      for (const info of socialMediaInfoList) {
        this.socialMediaStack.appendChild(<i-label link={{ href: info.link }}>
          <i-image url={Assets.fullPath(info.img)} width="24px" />
        </i-label>)
      }
    }
    if (params.footerPagesInfo) {
      const footerPagesInfoList: any[] = params.footerPagesInfo;
      for (const info of footerPagesInfoList) {
        this.pagesStack.appendChild(<i-label font={{color:"#fff"}} link={{ href: info.link }}>
          <i-label font={{ size: '0.85rem' }} caption={info.caption} />
        </i-label>)
      }
    }
    this.controlPageStackDisplay();
  }
  render() {
    return (
      <i-hstack
        background={{color: "#F29224"}}
        wrap="nowrap"
        padding={{ top: '1rem', bottom: '1rem', right: '2rem', left: '2rem' }}
        width="100%"
        horizontalAlignment="space-between"
        verticalAlignment="center"
      >
        <i-hstack id="secureComputeStack" gap={8} />
        <i-hstack id="pagesStack" gap={24} verticalAlignment="center" />
        <i-hstack id="socialMediaStack" gap={16} horizontalAlignment="end" verticalAlignment="center" />
      </i-hstack>
    )
  }
};