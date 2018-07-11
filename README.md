# React Fundamentals
From https://app.pluralsight.com/library/courses/react-fundamentals-update

## Introducing React

A React component is a function that converts a model-object into a piece of user interface. A React Application is made up of React components.

Setup an up using: https://github.com/facebook/create-react-app

```
$ npx create-react-app react-fundamentals
$ cd react-fundamentals
$ ls -la
total 824
drwxr-xr-x   10 wenbert  staff     320 10 Jul 22:41 .
drwxrwxrwx@  28 wenbert  staff     896 10 Jul 22:40 ..
drwxr-xr-x   13 wenbert  staff     416 10 Jul 22:49 .git
-rw-r--r--    1 wenbert  staff     285 10 Jul 21:52 .gitignore
-rw-r--r--    1 wenbert  staff     263 10 Jul 22:52 README.md
drwxr-xr-x  950 wenbert  staff   30400 10 Jul 21:53 node_modules
-rw-r--r--    1 wenbert  staff  408739 10 Jul 21:52 package-lock.json
-rw-r--r--    1 wenbert  staff     354 10 Jul 22:47 package.json
drwxr-xr-x    5 wenbert  staff     160 10 Jul 21:52 public
drwxr-xr-x    9 wenbert  staff     288 10 Jul 21:52 src
```

Again, a React application is made up of components. 

The inputs to a component are properties - `Props` and `State`. The difference between the two is that `State` can change.

As much as possible a component should not include State. It is meant to be as simple as possible.

Props and State both represent the Model. 

`Model + Component = DOM`

For any state change, React updates the Virtual DOM. React is responsible for updating the real DOM in the most efficient way possible. It updates the Virtual DOM so that it doesn't have to render every change - that would perform very poorly.

## Components
Each component corresponds to an element in the DOM. They can be nested by other components.

### Defining a component

```javascript
function Hello(props) {
    return <h1>Hello at {props.now}</h1>;
}
```
That is JSX. That is why React needs some kind of compilation. Because we need to compile JSX into Javascript.


### Rendering a Component
```javascript
import ReactDOM from 'react-dom';
import React from 'react';

function Hello(props) {
    return <h1>Hello at {props.now}</h1>;
}

// The render part.
// First param is Hello component
ReactDOM.render(
    <Hello now={new Date().toISOString()} />, 
    document.getElementById('root')
);
```
