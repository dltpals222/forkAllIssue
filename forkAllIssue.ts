import { program } from "commander";
import inquirer from "inquirer";
import { execSync } from "child_process";

// const questionsNewDirectory = [
//   {
//     type: "confirm",
//     name: "newDirectory",
//     message: "디렉토리를 생성하시겠습니까?",
//     default: false,
//   },
// ];

// const questionsMkdir = [
//   {
//     type: "input",
//     name: "mkdir",
//     message: "디렉토리명을 입력하세요.",
//   },
// ];

const questionsGitAddress = [
  {
    type: "input",
    name: "address",
    message: "깃 주소를 입력하세요",
    validate: function (value: string) {
      if (!value) {
        return "깃 주소를 입력해주세요.";
      }
      if (value.endsWith(".git")) {
        return value;
      } else {
        return "깃 주소를 정확히 입력해주세요.";
      }
    },
  },
];

inquirer.prompt(questionsGitAddress).then((answers: string) => {
  console.log("일단 보자", answers);
});
