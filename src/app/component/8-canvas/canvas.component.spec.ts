import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';
// 要在依赖 Zone.js 的应用中使用 <canvas> 元素，你需要导入 zone-patch-canvas 补丁（或者在 polyfills.ts 中，或者在用到 <canvas> 的那个文件中）
import 'zone.js/dist/zone-patch-canvas';
/*
  fakeAsync() 默认支持以下宏任务：
    setTimeout
    setInterval
    requestAnimationFrame
    webkitRequestAnimationFrame
    mozRequestAnimationFrame
    运行其他宏任务，比如 HTMLCanvasElement.toBlob() ，就会抛出 "Unknown macroTask scheduled in fake async test" 错误
    如果想支持这种情况，就要在 beforeEach() 定义你要支持的宏任务
 */
describe('CanvasComponent', () => {

  // 想支持这种情况，就要在 beforeEach() 定义要支持的宏任务
  beforeEach(() => {
    (window as any).__zone_symbol__FakeAsyncTestMacroTask = [
      {
        source: 'HTMLCanvasElement.toBlob',
        callbackArgs: [{size: 200}],
      },
    ];
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent],
    });
  });
  // beforeEach(waitForAsync(() => {
  //   TestBed
  //       .configureTestingModule({
  //         declarations: [CanvasComponent],
  //       })
  //       .compileComponents();
  // }));

  it('should be able to generate blob data from canvas', fakeAsync(() => {
       const fixture = TestBed.createComponent(CanvasComponent);
       const canvasComp = fixture.componentInstance;

       fixture.detectChanges();
       expect(canvasComp.blobSize).toBe(0);

       tick();
       expect(canvasComp.blobSize).toBeGreaterThan(0);
     }));
});
