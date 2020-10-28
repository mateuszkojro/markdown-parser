class image extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "[":
        return { s: new image_open(), c: '<img alt="' };
      default:
        return { s: this, c: znak };
    }
  }
}

class image_open extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "]":
        return { s: new image_sorce(), c: '"' };
      default:
        return { s: this, c: znak };
    }
  }
}
class image_sorce extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "(":
        return { s: new image_sorce_close(), c: ' src="' };
      default:
        return { s: this, c: znak };
    }
  }
}
class image_sorce_close extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case ")": // i put on that in file adress u can't use """ so... yes carry on, u doing great mate, keep it on
        return { s: new state(), c: '"/>' };
      case '"':
        return { s: new image_title_close(), c: '" title="' };

      default:
        return { s: this, c: znak };
    }
  }
}

class image_title_close extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case '"':
        return { s: new image_close(), c: '"' };
      default:
        return { s: this, c: znak };
    }
  }
}

class image_close extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case ")":
        return { s: new state(), c: "/>" };

      default:
        return { s: this, c: znak };
    }
  }
}
