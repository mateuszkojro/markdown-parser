"use strict";
const compiled_code = "compiled_code";
const compiled_html = "compiled_html";
function compile() {
    console.time("compiling markdown in:");
    const machine = new state_machine();
    show(machine.process(get_text()));
    console.timeEnd("compiling markdown in:");
}
function show(text) {
    show_code(text);
    show_compiled(text);
}
function load_icon() {
    if (Math.floor(Math.random() * 10) == 0)
        document.getElementById("icon").setAttribute("href", "resourses/icon.png");
    else
        document.getElementById("icon").setAttribute("href", "resourses/icon_legal.png");
}
function get_text() {
    return document.getElementById("text").value;
}
function show_code(code) {
    const out_el = document.getElementById(compiled_code);
    if (out_el != null) {
        out_el.innerText = code;
    }
    else {
        throw new Error("@compiled_code element not found on the page");
    }
}
function show_compiled(text) {
    const out_el = document.getElementById(compiled_html);
    if (out_el != null) {
        out_el.innerHTML = text;
    }
    else {
        throw new Error("@compiled_code element not found on the page");
    }
}
class state_machine {
    constructor() {
        this.current_state = new state();
    }
    process(text) {
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
    interpret(znak) {
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
                return { s: new exec(), c: "" };
            default:
                return { s: this, c: znak };
        }
    }
}
class bold extends state {
    interpret(znak) {
        switch (znak) {
            case "*":
                return { s: new bold_open(), c: "<b>" };
            default:
                return { s: new state(), c: "*" + znak };
        }
    }
}
class bold_open extends state {
    interpret(znak) {
        switch (znak) {
            case "*":
                return { s: new bold_closing(), c: "" };
            default:
                return { s: this, c: znak };
        }
    }
}
class bold_closing extends state {
    interpret(znak) {
        switch (znak) {
            case "*":
                return { s: new state(), c: "</b>" };
            default:
                return { s: new bold_open(), c: "*" };
        }
    }
}
function hack_out(text) {
    return `<script> const add = (a,b) => {return a+b} ; document.getElementById("out").innerHTML = ${text} ; </script>  <div id="out"> </div>`;
}
class exec extends state {
    interpret(znak) {
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
    interpret(znak) {
        switch (znak) {
            case " ":
                return { s: new exec_get_var(), c: "" };
            default:
                return { s: new state(), c: "bad_syntax" };
        }
    }
}
class exec_get_var extends exec {
    interpret(znak) {
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
class h1 extends state {
    interpret(znak) {
        switch (znak) {
            case "#":
                return { s: new h2(), c: "" };
            default:
                return { s: new h1_open(), c: "<h1>" + znak };
        }
    }
}
class h1_open extends h1 {
    interpret(znak) {
        switch (znak) {
            case "\n":
                return { s: new state(), c: "</h1>\n" };
            default:
                return { s: this, c: znak };
        }
    }
}
class h2 extends state {
    interpret(znak) {
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
    interpret(znak) {
        switch (znak) {
            case "\n":
                return { s: new state(), c: "</h2>\n" };
            default:
                return { s: this, c: znak };
        }
    }
}
class image extends state {
    interpret(znak) {
        switch (znak) {
            case "[":
                return { s: new image_open(), c: '<img alt="' };
            default:
                return { s: this, c: znak };
        }
    }
}
class image_open extends state {
    interpret(znak) {
        switch (znak) {
            case "]":
                return { s: new image_sorce(), c: '"' };
            default:
                return { s: this, c: znak };
        }
    }
}
class image_sorce extends state {
    interpret(znak) {
        switch (znak) {
            case "(":
                return { s: new image_sorce_close(), c: ' src="' };
            default:
                return { s: this, c: znak };
        }
    }
}
class image_sorce_close extends state {
    interpret(znak) {
        switch (znak) {
            case ")":
                return { s: new state(), c: '"/>' };
            case '"':
                return { s: new image_title_close(), c: '" title="' };
            default:
                return { s: this, c: znak };
        }
    }
}
class image_title_close extends state {
    interpret(znak) {
        switch (znak) {
            case '"':
                return { s: new image_close(), c: '"' };
            default:
                return { s: this, c: znak };
        }
    }
}
class image_close extends state {
    interpret(znak) {
        switch (znak) {
            case ")":
                return { s: new state(), c: "/>" };
            default:
                return { s: this, c: znak };
        }
    }
}
class link extends state {
    interpret(znak) {
        switch (znak) {
            case "[":
                return { s: new link_close(), c: '<a href="http://' };
            default:
                return { s: this, c: znak };
        }
    }
}
class link_close extends state {
    interpret(znak) {
        switch (znak) {
            case "]":
                return { s: new state(), c: '.com/">idk yet</a>' };
            default:
                return { s: this, c: znak };
        }
    }
}
