import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData } from 'src/app/utils/async-observable-helpers';
import { click } from 'src/app/utils/click-helpers';
import { PluginComponent } from './plugin.component';
import { PluginModule } from './plugin.module';
import { PluginService } from './plugin.service';

/**
 * 测试组件应该只关心组件有没有根据给定的条件导航到正确的地址
 * 为这个组件的测试套件提供路由器的间谍
 */
describe('PluginComponent 测试组件中的路由', () => {
  let component: PluginComponent;
  let fixture: ComponentFixture<PluginComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [PluginModule] });
  });

  beforeEach(
    waitForAsync(() => {
      const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
      const pluginServiceSpy = jasmine.createSpyObj('PluginComponent', [
        'getAllPlugins',
      ]);
      TestBed.configureTestingModule({
        providers: [
          { provide: Router, useValue: routerSpy },
          { provide: PluginService, useValue: pluginServiceSpy },
        ],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(PluginComponent);
          component = fixture.componentInstance;
          // getAllPlugins spy returns observable of test plugins
          pluginServiceSpy.getAllPlugins.and.returnValue(
            asyncData(getTestPlugins())
          );
        });
    })
  );

  it('should NOT have plugins before ngOnInit', () => {
    expect(component.plugins.length).toBe(
      0,
      'should not have plugins before ngOnInit'
    );
  });

  it('should NOT have plugins immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(component.plugins.length).toBe(
      0,
      'should not have plugins until service promise resolves'
    );
  });

  /** 这里的describe似乎是个作用域 */
  describe('after get dashboard plugins', () => {
    beforeEach(
      waitForAsync(() => {
        router = fixture.debugElement.injector.get(Router);
        fixture.detectChanges(); // runs ngOnInit -> getAllPlugins
        fixture
          .whenStable() // No need for the `lastPromise` hack!
          .then(() => {
            fixture.detectChanges();
          }); // bind to plugins
      })
    );

    it('should tell ROUTER to navigate when plugin clicked', () => {
      clickForDeep(); // trigger click on first inner <div class="plugin">

      // args passed to router.navigateByUrl() spy
      const spy = router.navigateByUrl as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];

      // expecting to navigate to id of the component's first plugin
      const id = component.plugins[0].pluginId;
      expect(navArgs).toBe(
        '/dashboard-item/' + id,
        'should nav to DashboardItem for first plugin'
      );
    });
  });

  function clickForDeep(): void {
    // get first <div class="plugin">
    const pluginEl: HTMLElement = fixture.nativeElement.querySelector(
      '.plugin'
    );
    click(pluginEl);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function getTestPlugins(): any {
  return {
    mostPopular: [
      { id: 1, title: '测试模板1', imgUrl: 'xxx.png1', intro: 'intro1' },
      { id: 2, title: '测试模板2', imgUrl: 'xxx.png2', intro: 'intro2' },
      { id: 3, title: '测试模板3', imgUrl: 'xxx.png3', intro: 'intro3' },
    ],
  };
}
