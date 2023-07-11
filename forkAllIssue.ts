import inquirer from "inquirer";
import { program } from "commander";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

program
  .command("repo")
  .description("이슈를 업데이트할 깃 주소를 입력하세요.")
  .option("-A,--address [address]", "깃 주소를 입력하세요")
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
            return true;
          } else {
            return "깃 주소를 정확히 입력해주세요.";
          }
        },
      },
    ];

    const { address } = await inquirer.prompt(questionsGitAddress);
    const addressSplit = address.split("/")[4];
    const dirAddress = addressSplit.split(".git")[0];
    const dirExists = fs.existsSync(`./${dirAddress}`);
    const dirPath = path.join(path.resolve() + dirAddress);
    if (dirExists) {
      console.log("파일이 존재합니다.");
    } else {
      console.log("깃 클론 중");
      execSync(`cd ../ && git clone ${address} && cd ${dirAddress}`);
    }
    try {
      execSync(`git remote add upstream ${address}`);
    } catch (error) {
      console.log("git remote add upstream 에러", error);
    }
    try {
      execSync(`git fetch upstream`);
    } catch (error) {
      console.log("git fetch upstream 에러", error);
    }
    try {
      execSync(`git push origin refs/remotes/upstream/*:refs/heads/*`);
    } catch (error) {
      console.log("git push origin refs/remotes/upstream/*:refs/heads/* 에러", error);
    }
  });

program.parse(process.argv);
