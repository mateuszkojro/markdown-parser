function hack_out(text: string): string {
  return `<script> const add = (a,b) => {return a+b} ; document.getElementById("out").innerHTML = ${text} ; </script>  <div id="out"> </div>`;
}

class exec extends state {
  interpret(znak: char): state_char {
    switch (znak) {
      case "+":
        return {
          s: new exec_add(),
          c: `<script> const add = (a,b) => {return a+b}</script> <img src="" onerror='alert((`,
        };
      default:
        return { s: new state(), c: "bad_syntax" };
    }
  }
}

class exec_add extends exec {
  interpret(znak: char): state_char {
    switch (znak) {
      case " ":
        return { s: new exec_get_var(), c: "" };
      default:
        return { s: new state(), c: "bad_syntax" };
    }
  }
}

class exec_get_var extends exec {
  interpret(znak: char): state_char {
    switch (znak) {
      case " ":
        return { s: new exec_get_var(), c: "+" };
      case ")":
        return { s: new state(), c: `))'/>` };
      default:
        return { s: this, c: znak };
    }
  }
}
