import { FragmentPolyfillModule } from './fragment-polyfill.module';

describe('FragmentPolyfillModuleModule', () => {
  let fragmentPolyfillModuleModule: FragmentPolyfillModule;

  beforeEach(() => {
    fragmentPolyfillModuleModule = new FragmentPolyfillModule();
  });

  it('should create an instance', () => {
    expect(fragmentPolyfillModuleModule).toBeTruthy();
  });
});
