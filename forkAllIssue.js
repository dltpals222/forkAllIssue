const { program } = require("commander");
const inquirer = require("inquirer");
const { execSync } = require("child_process");

const questionsNewDirectory = [
  {
    type: "confirm",
    name: "newDirectory",
    message: "디렉토리를 생성하시겠습니까?",
    default: false,
  },
];

const questionsMkdir = [
  {
    type: "input",
    name: "mkdir",
    message: "디렉토리명을 입력하세요.",
  },
];

const questionsGitAddress = [
  {
    type: "input",
    name: "address",
    message: "깃 주소를 입력하세요",
    validate: function (value) {
      if (isNaN(value)) {
        return "깃 주소를 입력해주세요.";
      }
      return value;
    },
  },
];
