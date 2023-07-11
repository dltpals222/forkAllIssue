const inquirer = require("inquirer");

const questionsGitAddress = [
  {
    type: "input",
    name: "address",
    message: "깃 주소를 입력하세요",
    validate: function (value) {
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

inquirer.prompt(questionsGitAddress).then((answers) => {
  console.log("일단 보자", answers);
});
