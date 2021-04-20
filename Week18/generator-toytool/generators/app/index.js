var Generator = require("yeoman-generator");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  async initPackage() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname, // Default to current folder name
      },
    ]);

    this.log("app name", answers.name);
    const pkgJson = {
      name: answers.name,
      version: "1.0.0",
      description: "",
      main: "generators/app/index.js",
      scripts: {
        build: "webpack",
        test: "mocha --require @babel/register",
        coverage: "nyc mocha --require @babel/register",
      },
      author: "",
      license: "ISC",
      devDependencies: {},
      dependencies: {},
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    this.npmInstall(["vue"], { "save-dev": false });
    this.npmInstall(
      [
        "webpack@4.44.1",
        "webpack-cli",
        "vue-loader",
        "vue-template-compiler",
        "vue-style-loader",
        "css-loader",
        "babel-loader",
        "copy-webpack-plugin@6.0.3",
        "@babel/core",
        "@babel/preset-env",
        "@babel/register",
        "@istanbuljs/nyc-config-babel",
        "babel-plugin-istanbul",
        "mocha",
        "nyc",
      ],
      { "save-dev": true }
    );
    this.fs.copyTpl(
      this.templatePath("app.vue"),
      this.destinationPath("src/app.vue"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );
    this.fs.copyTpl(
      this.templatePath("main.js"),
      this.destinationPath("src/main.js")
    );
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("src/index.html"),
      { title: answers.name }
    );
    this.fs.copyTpl(
      this.templatePath(".babelrc"),
      this.destinationPath(".babelrc"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath(".nycrc"),
      this.destinationPath(".nycrc"),
      {}
    );
    this.fs.copyTpl(
      this.templatePath("sample-test.js"),
      this.destinationPath("test/sample-test.js"),
      {}
    );
  }
};
