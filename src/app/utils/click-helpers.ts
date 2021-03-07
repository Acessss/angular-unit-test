import { DebugElement } from '@angular/core';

export const ButtonClickEvents = {
  left:  { button: 0 },
  right: { button: 2 }
};

/** 把点击事件的处理过程包装到如下的 click() 辅助函数中，可以让这项任务更一致、更简单 */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
 if (el instanceof HTMLElement) {
   el.click();
 } else {
   el.triggerEventHandler('click', eventObj);
 }
}
