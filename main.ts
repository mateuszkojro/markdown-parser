const compiled_code = "compiled_code";
const compiled_html = "compiled_html";

//console.group("timing");
function compile() {
    console.time("compiling markdown in:");
    const machine = new state_machine();
    show(machine.process(get_text()));
    console.timeEnd("compiling markdown in:");
}

function change_editor(text: string) {
    return (document.getElementById("text") as HTMLDivElement).innerHTML = text;
}

function show(text: string) {
    show_code(text);
    //show_compiled(text);
    // TODO i need to store compiled markdown and render it every time
    change_editor(text);
}

function load_icon(): void {
    if (Math.floor(Math.random() * 10) == 0)
        (document.getElementById("icon") as HTMLLinkElement).setAttribute(
            "href",
            "resourses/icon.png"
        );
    else
        (document.getElementById("icon") as HTMLLinkElement).setAttribute(
            "href",
            "resourses/icon_legal.png"
        );
}

// pobiera text z textboxa
function get_text() {
    return (document.getElementById("text") as HTMLDivElement).innerText;
}

// Wyswietl kod wygenerowany przez nasz parser
function show_code(code: string) {
    const out_el = document.getElementById(compiled_code) as HTMLElement;
    if (out_el != null) {
        out_el.innerText = code;
    } else {
        throw new Error("@compiled_code element not found on the page");
    }
}

function show_compiled(text: string) {
    const out_el = document.getElementById(compiled_html) as HTMLElement;
    if (out_el != null) {
        out_el.innerHTML = text;
    } else {
        throw new Error("@compiled_code element not found on the page");
    }
}
