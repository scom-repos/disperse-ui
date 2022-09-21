import { Container } from '@ijstech/components';
import {
  customElements,
  customModule,
  Module,
  ControlElement,
  Modal,
} from '@ijstech/components';
import styleClass from './transactionSettings.css';
declare global {
	namespace JSX {
		interface IntrinsicElements {
			['transaction-settings']: ControlElement;
		}
	}
};

@customModule
@customElements('transaction-settings')
export class TransactionSettings extends Module {
  private transactionModal: Modal;

	constructor(parent?: Container, options?: any) {
		super(parent, options);
	};

	async init(){
		this.classList.add(styleClass);
		super.init();
  }

  closeModal() {
    this.transactionModal.visible = false;
  }

  showModal() {
    this.transactionModal.visible = true;
  }

	render() {
		return (
      <i-modal id="transactionModal" class='dark-modal' title="Transaction Settings" closeIcon={{ name: 'times' }}>
        <transaction-settings-layout />
      </i-modal>
		)
	}
};