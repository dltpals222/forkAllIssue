import inquirer from "inquirer";
import { program } from "commander";
import { execSync } from "child_process";

program
  .command("repo")
  .description("이슈를 업데이트할 깃 주소를 입력하세요.")
  .action(async () => {
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

    const { address } = await inquirer.prompt(questionsGitAddress);
    const addressSplit = address.split("/")[4];
    const dirAddress = addressSplit.split(".git")[0];
    execSync(`git clone ${address}`);
    execSync(`sc .gitignore ${dirAddress}`);
    execSync(`cd ${dirAddress}`);
    execSync(`git fetch upstream`);
    execSync(`git push origin refs/remotes/upstream/*:refs/heads/*`);
  });

program.parse(process.argv);
