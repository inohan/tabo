/* eslint-disable @typescript-eslint/no-unused-vars */
import { buildProvider } from './provider';

class Dependency1 {
  private __dependency1!: void;
}

class Dependency2 {
  private __dependency2!: void;
}

class Dependency3 {
  private __dependency3!: void;
}

abstract class AbstractClass {
  abstract abstractMethod(): string;
}

class ConcreteClass extends AbstractClass {
  constructor(
    private dependency1: Dependency1,
    private dependency2: Dependency2,
  ) {
    super();
  }
  abstractMethod(): string {
    return 'hoge';
  }
}

class Class1 {
  constructor(
    private dependency1: Dependency1,
    private dependency2: Dependency2,
    private dependency3: Dependency3,
  ) {}
}

class Class2 {
  constructor(private abstractDependency: AbstractClass) {}
}

describe('Type tests', () => {
  test('Invalid dependency should throw error', () => {
    const provider = buildProvider()
      .provide({
        provide: Dependency1,
        useValue: new Dependency1(),
      })
      .provide({
        provide: Dependency2,
        useValue: new Dependency2(),
      });

    // @ts-expect-error ConcreteClass requires two arguments
    const failedProvider1 = provider.provideClass(ConcreteClass, []);
    // @ts-expect-error ConcreteClass requires correct arguments
    const failedProvider2 = provider.provideClass(ConcreteClass, [
      Dependency1,
      Dependency1,
    ]);
    const successfulProvider = provider.provideClass(ConcreteClass, [
      Dependency1,
      Dependency2,
    ]);
    const compiled = provider.compile();
    expect(compiled.length).toBe(2);
    expect(compiled[0].provide).toBe(Dependency1);
    // @ts-expect-error Reference
    expect(compiled[0].useValue).toBeInstanceOf(Dependency1);
    expect(compiled[1].provide).toBe(Dependency2);
    // @ts-expect-error Reference
    expect(compiled[1].useValue).toBeInstanceOf(Dependency2);
    const compiled2 = successfulProvider.compile();
    expect(compiled2.length).toBe(3);
    expect(compiled2[2].provide).toBe(ConcreteClass);
    expect(compiled2[2]).toHaveProperty('useFactory');
    // @ts-expect-error Reference
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-function-type
    const factory: Function = compiled2[2].useFactory;
    // @ts-expect-error Reference
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const injections: unknown[] = compiled2[2].inject;
    expect(injections[0]!).toBe(Dependency1);
    expect(injections[1]!).toBe(Dependency2);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(factory(new Dependency1(), new Dependency2())).toBeInstanceOf(
      ConcreteClass,
    );
  });

  test('Abstract class should resolve by its abstract name', () => {
    const provider = buildProvider()
      .provide({
        provide: Dependency1,
        useValue: new Dependency1(),
      })
      .provide({
        provide: Dependency2,
        useValue: new Dependency2(),
      })
      .provideAbstractClass(AbstractClass, ConcreteClass, [
        Dependency1,
        Dependency2,
      ]);
    const compiled = provider.compile();
    expect(compiled.length).toBe(3);
    expect(compiled[2].provide).toBe(AbstractClass);
    // @ts-expect-error Should fail when concrete class is injected
    const test1 = provider.provideClass(Class2, [ConcreteClass]);
    const test2 = provider.provideClass(Class2, [AbstractClass]);
    expect(test2.compile().length).toBe(4);
  });

  test('Exporting partial', () => {
    const provider = buildProvider()
      .provide({
        provide: Dependency1,
        useValue: new Dependency1(),
      })
      .provide({
        provide: Dependency2,
        useValue: new Dependency2(),
      })
      .provideClass(ConcreteClass, [Dependency1, Dependency2]);
    // @ts-expect-error Unused dependencies cannot be exported
    const test1 = provider.pick([Dependency3]);
    const test2 = provider.pick([ConcreteClass]);
    const compiled2 = test2.compile();
    expect(compiled2.length).toBe(1);
    expect(compiled2[0].provide).toBe(ConcreteClass);
  });

  test('Dependency injection from another module', () => {
    const module1 = buildProvider()
      .provide({
        provide: Dependency1,
        useValue: new Dependency1(),
      })
      .provide({
        provide: Dependency2,
        useValue: new Dependency2(),
      })
      .provideAbstractClass(AbstractClass, ConcreteClass, [
        Dependency1,
        Dependency2,
      ]);
    const module1Export = module1.pick([AbstractClass]);
    const module2 = buildProvider()
      .dependsOn(module1Export)
      .provideClass(Class2, [AbstractClass]);
    const compiledModule2 = module2.compile();
    expect(compiledModule2.length).toBe(1);
    expect(compiledModule2[0].provide).toBe(Class2);
  });
});
