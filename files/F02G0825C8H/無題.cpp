type FooEvent = {
  name: "onFoo" | "onBar";
  callback: (arg: unknown) => void;
};

class Foo {
  private events: Array<FooEvent>;

  constructor() {
    this.events = [];
  }

  addEvent(event: FooEvent) {
    this.events.push(event);
  }

  run(
    events:
      | ReadonlyArray<{ eventName: FooEvent["name"]; args: unknown }>
      | undefined,
  ) {
    console.log("run");

    if (events != null) {
      for (const { eventName, args } of events) {
        this.events.find((event) => event.name === eventName)?.callback(args);
      }
    }
  }
}

const foo = new Foo();
foo.addEvent({ name: "onFoo", callback: (s) => console.log(s) });
foo.addEvent({ name: "onBar", callback: (i) => console.log(i) });

foo.run([{
  eventName: "onFoo",
  args: "callbackFoo",
}, {
  eventName: "onBar",
  args: 1,
}]);
