class link extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "[":
        return { s: new link_close(), c: '<a href="http://' };

      default:
        return { s: this, c: znak };
    }
  }
}
class link_close extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "]":
        return { s: new state(), c: '.com/">idk yet</a>' }; //TODO test  links greatings from

      default:
        return { s: this, c: znak };
    }
  }
}
