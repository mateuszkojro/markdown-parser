class bold extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "*":
        return { s: new bold_open(), c: "<b>" };
      default:
        return { s: new state(), c: "*" + znak };
    }
  }
}

class bold_open extends state {
  interpret(znak: char) {
    switch (znak) {
      case "*":
        return { s: new bold_closing(), c: "" };
      default:
        return { s: this, c: znak };
    }
  }
}

class bold_closing extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "*":
        return { s: new state(), c: "</b>" };
      default:
        return { s: new bold_open(), c: "*" };
    }
  }
}
