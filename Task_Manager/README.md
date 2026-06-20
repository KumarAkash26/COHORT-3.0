# Task Manager Project

This is my simple Task Manager project made using HTML, CSS and JavaScript.

In this project I practiced DOM manipulation, event handling, localStorage, theme toggle, filtering, update task, delete task and completed/pending task sections.

## Features

- Add new task
- Select task category
- Show pending and completed tasks separately
- Mark task as completed using checkbox
- Move completed task back to pending
- Update existing task
- Delete task
- Clear all tasks
- Filter tasks by category
- Save tasks in localStorage
- Light and dark theme toggle
- Save selected theme in localStorage
- Event propagation demo
- Browser rendering pipeline demo

## Technologies Used

- HTML
- CSS
- JavaScript
- Remix Icon
- Local Storage

## Browser Rendering Pipeline

Browser Rendering Pipeline means how browser converts our HTML, CSS and JavaScript code into actual pixels on screen.

Simple flow:

```text
HTML -> Parsing -> Tokenization -> DOM Tree
CSS -> CSSOM Tree
DOM Tree + CSSOM Tree -> Render Tree -> Layout -> Paint -> Composite
```

## Parsing

Parsing means browser reads our HTML and CSS code line by line and tries to understand it.

Example:

```html
<h1>Hello</h1>
```

Browser reads this code and understands that we want to create a heading.

## Tokenization

Tokenization means browser breaks HTML code into small parts called tokens.

Example:

```html
<p>Hello</p>
```

Browser breaks it like:

```text
Start tag: p
Text: Hello
End tag: p
```

These small parts help browser to create the DOM tree.

## DOM Tree

DOM Tree means Document Object Model tree.

It is a tree-like structure made from HTML elements.

Example:

```html
<body>
  <h1>Title</h1>
  <button>Click</button>
</body>
```

DOM tree looks like:

```text
body
 ├── h1
 └── button
```

In JavaScript we use DOM to select and change HTML elements.

Example:

```js
const btn = document.querySelector("button");
btn.textContent = "Updated";
```

## CSSOM Tree

CSSOM means CSS Object Model.

When browser reads CSS, it creates CSSOM tree.

Example:

```css
button {
  color: white;
  background-color: black;
}
```

Browser stores this style information in CSSOM.

DOM tells browser what elements are there.
CSSOM tells browser how those elements should look.

## Render Tree

Render Tree is made by combining DOM Tree and CSSOM Tree.

DOM gives elements.
CSSOM gives styles.

Together they create Render Tree.

Render Tree only contains visible elements.

Example:

```css
.box {
  display: none;
}
```

If an element has display:none, then it will not be added in Render Tree because it is not visible on screen.

## Event Propagation

Event Propagation means how an event travels in the DOM.

When we click on a child element, the event does not stay only on that child. It can move through parent elements also.

There are mainly two phases:

```text
Capturing Phase
Bubbling Phase
```

## Event Capturing

Event Capturing means event moves from parent to child.

Flow:

```text
Grandparent -> Parent -> Child
```

Example:

```js
grandparent.addEventListener("click", () => {
  console.log("Grandparent clicked");
}, true);
```

Here true means capturing phase is active.

## Event Bubbling

Event Bubbling means event moves from child to parent.

By default, JavaScript uses bubbling phase.

Flow:

```text
Child -> Parent -> Grandparent
```

```js
child.addEventListener("click", () => {
  console.log("child clicked");
});
```
