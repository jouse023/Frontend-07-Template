## install

`npm install -g yo`

## command

```
  npm link
  yo toolchain
```

## interaction

```javascript
 var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
    }
    async method1() {
        const answers = await this.prompt([
          {
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname // Default to current folder name
          },
          {
            type: "confirm",
            name: "cool",
            message: "Would you like to enable the Cool feature?"
          }
        ]);
    
        this.log("app name", answers.name);
        this.log("cool feature", answers.cool);
      }
  };
```

## document

```javascript
var Generator = require("yeoman-generator");
module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  async step1() {
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("public/index.html"),
      { title: "初始化" }
    );
  }
};
```

## install 

```javascript
var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  initPackage() {
    const pkgJson = {
      devDependencies: {
        eslint: "^3.15.0",
      },
      dependencies: {
        react: "^16.2.0",
      },
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    this.npmInstall();
  }

  async step1() {
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("public/index.html"),
      { title: "初始化" }
    );
  }
};

```
## mocha address
[链接](https://mochajs.org/)
## install

### 

```javascript
npm install --save-dev mocha
```

###  add.js

```javascript
function add(a, b) {
  return a + b;
}
module.exports = add;

```

###  test 文件夹/test.js

```javascript
mkdir test/touch test.js
```

### test.js

```javascript
var assert = require("assert");
var add = require("../add.js");
describe("add函数测试", function () {
  it("1+2等于3", function () {
    assert.equal(add(1, 2), 3);
  });
  it("-5+2等于-3", function () {
    assert.equal(add(-5, 2), -3);
  });
});

```

### command

```javascript
mocha
```

## export

### modify add.js

```javascript
export function add(a, b) {
  return a + b;
}
```

### test.js

```javascript
var assert = require("assert");
import {add} from "../add";
describe("add函数测试", function () {
  it("1+2等于3", function () {
    assert.equal(add(1, 2), 3);
  });
  it("-5+2等于-3", function () {
    assert.equal(add(-5, 2), -3);
  });
});
```

### download

```bash
npm i --save-dev @babel/core @babel/register
npm i @babel/preset-env --save-dev
```

### .babelrc 

```javascript
{
    "presets": ["@babel/preset-env"]
}
```

### modify package.json  scripts

```javascript
 "scripts": {
    "test": "mocha --require @babel/register"
  },
```

### work command

```bash
npm run test
```

### install nyc

```bash
npm i --save-dev nyc
```

### modify package.json scripts

```javascript
 "scripts": {
    "test": "mocha --require @babel/register",
    "coverage": "nyc npm run test"
  },
```

## cover percentage

```bash
 npm run coverage
```

## import nyc & export

### modify add.js

```javascript
 export function add(a, b) {
  return a + b;
}
export function mul(a, b) {
  return a * b;
}
module.exports.add = add;
module.exports.mul = mul;

```

### modify test.js

```javascript
var assert = require("assert");
import {add,mul} from "../add";
describe("add文件测试", function () {
  it("1+2等于3", function () {
    assert.equal(add(1, 2), 3);
  });
  it("-5+2等于-3", function () {
    assert.equal(add(-5, 2), -3);
  });
  it("5*2等于10", function () {
    assert.equal(mul(5, 2), 10);
  });
});

```

## import

```bash
npm install --save-dev babel-plugin-istanbul
npm i @istanbuljs/nyc-config-babel --save-dev
```

### modify.babelrc

```javascript
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "istanbul"
    ]
}
```

### .nycrc

```javascript
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```

### modify package.json 中 scripts

```javascript
 "scripts": {
    "test": "mocha --require @babel/register",
    "coverage": "nyc mocha"
  },
```

### work

```bash
npm run coverage
```
