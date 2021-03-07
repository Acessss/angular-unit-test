import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockUserService } from './mock-user.service';
import { UserService } from './user.service';

import { WelcomeComponent } from './welcome.component';
/**
 * 当组件有依赖时，要使用 TestBed 来同时创建该组件及其依赖
 * 可以先创建一个能满足本组件最低需求的mock的UserService，然后在 TestBed 配置中提供并注入所有这些组件和服务
 * 测验组件类，需要像 Angular 运行应用时一样调用生命周期钩子方法
 */
describe('WelcomeComponent组件类 依赖service', () => {
  let comp: WelcomeComponent;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provide the component-under-test and dependent service
      providers: [
        WelcomeComponent,
        // 不要注入真正的service，应该关注component，提供一个最小模拟service的mock
        { provide: UserService, useClass: MockUserService }
      ]
    });
    // inject both the component and the dependent service.
    comp = TestBed.inject(WelcomeComponent);
    userService = TestBed.inject(UserService); // 从根注入器获得服务
    /**
     * 获得注入服务的最安全的方式（始终有效），就是从被测组件的注入器中获取它
     * 组件注入器是测试夹具所提供的 DebugElement 中的一个属性
     */
    // userService = fixture.debugElement.injector.get(UserService);
  });

  it('should not have welcome message after construction', () => {
    expect(comp.welcome).toBeUndefined();
  });

  it('should welcome logged in user after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.welcome).toContain(userService.user.name);
  });

  it('should ask user to log in if not logged in after ngOnInit', () => {
    userService.isLoggedIn = false;
    comp.ngOnInit();
    expect(comp.welcome).not.toContain(userService.user.name);
    expect(comp.welcome).toContain('log in');
  });
});
