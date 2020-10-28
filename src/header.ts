class h1 extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "#":
        return { s: new h2(), c: "" };
      default:
        return { s: new h1_open(), c: "<h1>" + znak };
    }
  }
}

class h1_open extends h1 {
  interpret(znak: char): state_char {
    switch (znak) {
      case "\n":
        return { s: new state(), c: "</h1>\n" };
      default:
        return { s: this, c: znak };
    }
  }
}

class h2 extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "#":
        throw Error("not implemented more than h2");
        return { s: new h1(), c: "" };
        break;
      default:
        return { s: new h2_open(), c: "<h2>" + znak };
    }
  }
}

class h2_open extends h2 {
  interpret(znak: char): state_char {
    switch (znak) {
      case "\n":
        return { s: new state(), c: "</h2>\n" };
      default:
        return { s: this, c: znak };
    }
  }
}
