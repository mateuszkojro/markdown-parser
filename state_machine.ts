type code = string;
type char = string;
type state_char = { s: state; c: char };

class state_machine {
  current_state: state;
  constructor() {
    this.current_state = new state();
  }
  process(text: string): string {
    if (text.length != 0) {
      const head = text[0];
      const tail = text.slice(1);
      const res = this.current_state.interpret(head);
      this.current_state = res.s;
      return res.c + this.process(tail);
    }
    return "";
  }
}

class state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "#":
        return { s: new h1(), c: "" };
      case "*":
        return { s: new bold(), c: "" };
      case "!":
        return { s: new image(), c: "" };
      case "[":
        return { s: new link(), c: "" };
      case "(":
        // ! not rly working
        return { s: new exec(), c: "" };
      default:
        return { s: this, c: znak };
    }
  }
}
