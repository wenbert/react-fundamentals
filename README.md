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


### Props
```javascript
ReactDOM.render(<div id="mydiv"></div>, // Lower case
    document.getElementById('root')
);
```

```javascript
function Sum(props) {
    return (
        <h1>
            {props.a} + {props.b} 
            = {props.a + props.b}
        </h1>
    );
}

ReactDOM.render(<Sum a={4} b={2} />, // Capitalised first letter
    document.getElementById('root')
);
```

> All React components must act like pure function with respect to their props

From: **React documentation**

### Class Component in ES6

```javascript
class Sum extends React.Component {
    render() {
        return <h1>
            {props.a} + {props.b} 
            = {props.a + props.b}
        </h1>;
    }
}

ReactDOM.render(<Sum a={4} b={2} />, // Capitalised first letter
    document.getElementById('root')
);
```

As much as possible, use function components instead of class components. This is because they are simpler and encourange better design.

### Component Lifecyle

Mounting
`constructor` > `componentWillMount` > `render` > `componentDidMount`

Updating
`componentWillReceiveProps` > `shouldComponentUpdate` > `compentWillUpdate` > `render` > `compentDidUpdate`

Check React documentation for the complete list.

### State
* Alternative component data container.
* State is local, mutable data
* More complex (avoid using state as much as possible - always avoid it!)

### Prop Validation

```javascript
import PropTypes from 'prop-types';

function Sum(props) {
    return (
        <h1>
            {props.a} + {props.b} 
            = {props.a + props.b}
        </h1>
    );
}
Sum.propTypes = {
    a: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
};

ReactDOM.render(<Sum a={'a'} b={2} />,
    document.getElementById('root')
);
```

Note you need to install `$ npm install prop-types`.

This will show a `Warning`. This is useful but at the same time it also provides some kind of documentation within the code.

You can use TypeScript and Flow - both are superior than prop-types.

## Testing Components
* React components should not contain any application logic
* Function components are easily testable

Example:
```javascript
describe('When setting up testing', () => {
  it('should fail', () => {
    expect(1 + 1).toBe(3);
  });
});
```
Run with `$ npm run test`

```
FAIL  src/Hello.test.js
...
```

A better example:
```javascript
import React from 'react';


function Hello(props) {
  return <h1>Hello at {props.now}</h1>;
}

const moment = new Date(1588946400000);

describe('WHen setting up testing', () => {
  let result;
  beforeAll(() => {
    result = Hello({now: moment.toISOString()});
  });

  it('returns a value', () => {
    expect(result).not.toBeNull();
  });

  it('it is h1', () => {
    expect(result.type).toBe('h1');
  });

  it('has children', () => {
    expect(result.props.children).toBeTruthy();
  });
});
```
Then `$ npm run test` the out should be:
```
 PASS  src/Hello.test.js
  WHen setting up testing    ✓ returns a value (2ms)    ✓ it is h1
    ✓ has children

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 totalSnapshots:   0 total
Time:        0.213s
Ran all test suites related to changed files.
```

#### Testing ReactDOM
Next is testing a component with `ReactDOM`.

You add this to the `Hello.test.js`

```javascript
import ReactDOM from 'react-dom';
// ...
describe('When testing with ReactDOM', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Hello now={moment.toISOString()} />, div);
  });
});
```

To test more advanced DOM elements, we can use `enzyme`. Install it with:
```
$ npm install --save-dev enzyme enzyme-adapter-react-16
```

So add these in `Hello.test.js`.

```javascript
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// ...

Enzyme.configure({ adapter: new Adapter() });

describe('WHen testing with Enzyme', () => {
  it('renders a h1', () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.find('h1').length).toBe(1);
  });
  
  it('contains Hello at 2020-05-08T14:00:00:000Z', () => {
    const wrapper = shallow(<Hello now={moment.toISOString()} />);
    expect(wrapper.contains(<h1>Hello at 2020-05-08T14:00:00.000Z</h1>)).toBe(true);
  });
});
```

Now that we know how to test React Components, let's add actual tests to out `AuthorQuiz.test.js` file.

That file would start to look like this:
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';


describe('Author Quiz', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz />, div);
  });
});
```

### Summary:
* React applicaions are built from components
* Function or class syntax. Prefer always the function syntax. They are simpler.
* Components can render data from 2 sources:
  * `Props` - these contain immutable data (cannot be modified after created) passed from components.
  * and `State` - these contain local mutable data. Avoid using state as much as possible.
* `Props` can be validated by: `PropTypes` and `TypeScript` / `Flow`

## JSX

* Allows us to include XML-like syntax in Javascript.
* Each element is transformed into a Javascript function call.
* Converted by Babel into regular Javascript

React element in JSX:
```jsx
<Sum a={4} b={3} />
```

Equivalent React element in Javascript:
```javascript
React.createElement(
    Sum,
    {a:4, b:3}, // props
    null
)
```

React element in JSX with children:
```jsx
<h1>
    <Sum a={4} b={3} />
</h1>
```

Equivalent React element in Javascript with children:
```javascript
React.createElement(
    'h1',
    null, // no props
    React.createElement( // 3rd param is a child
        Sum,
        {a:4, b:3}, // props
        null
    )
)
```

### Props in JSX

```jsx
<Hello now={new Date().toISOString()} />
```
This is a JSX expression. `Hello` is the React component name. `now` is the JSX attribute that will populate the react component. The value assigned to the `now` attribute is a JSX attribute expression. It is delimited by curly braces and not quotes. It can be any valid Javascript expression.

```jsx
<Hello now='now is the time' />
```
This is also valid.

### Spread Attributes in JSX
```jsx
const props = {a: 4, b: 3};
const element = <Sum {...props} />;
```
This is ES6.

### Events 

Passing data out of a component - using events.

```jsx
function Clicker({ handleClick }) {
    return <div>
        <button onClick={(e) => {handleClick('A');}}>A</button>
        <button onClick={(e) => {handleClick('B');}}>B</button>
        <button onClick={(e) => {handleClick('C');}}>C</button>
    </div>;
}

ReactDOM.render(<Clicker handleClick={(letter) => {console.log(`${letter} clicked`)} />);
```

### JSX Child Elements
```jsx
<Hello>
    <First />
    <Second />
</Hello>
```
## The Author Quiz App
Now let's start to build the non-interactive parts of the app.

Open `AuthorQuiz.js`. It should look something like this:
```javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Turn() {
  return (
    <div>
    </div>
  );
}

function Continue() {
  return (
    <div>
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p>All images are from Wikimedia Commons</p>
      </div>
    </div>
  );
}

class AuthorQuiz extends Component {
  render() {
    return (
      <div className="containter-fluid">
        <Hero/>
        <Turn/>
        <Continue/>
        <Footer/>
      </div>
    );
  }
}

export default AuthorQuiz;
```

The `AuthorQuiz` class has a render function. It contains some JSX with 4 component. `Hero`, `Turn`, `Continue` and `Footer`. We need to define these React components as functions. 

These React components will return some JSX.

