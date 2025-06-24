import { ViewWillLeave } from '@ionic/angular';

export abstract class AriaFocusFixer implements ViewWillLeave {
  public ionViewWillLeave(): void {
    const activeElement = document.activeElement as HTMLElement;
    activeElement?.blur();
  }
}
