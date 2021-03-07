import { DashboardHeroComponent, Hero } from './dashboard-hero.component';

describe('DashboardHeroComponent组件类 有输入输出', () => {

  it('raises the selected event when clicked', () => {
    const comp = new DashboardHeroComponent();
    const hero: Hero = {id: 42, name: 'Test'};
    comp.hero = hero;

    comp.selected.subscribe((selectedHero: Hero) => expect(selectedHero).toBe(hero));
    comp.click();
  });
});
