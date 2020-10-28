# Simple markdown parser

Simple markdown parser written in client side TS

## Currently supported features

- `# text` expands to:

```html
<h1>text</h1>
```

- `## text`expands to:

```html
<h2>text</h2>
```

- `![alternative text](src "title")` expands to:

```html
<img alt="alternative text" src="src " title="title" />
```

- `** text **` expands to:

```html
<b> text </b>
```
