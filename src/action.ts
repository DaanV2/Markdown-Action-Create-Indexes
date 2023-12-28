import { existsSync } from "fs";
import { createFolder } from "./traverse";

const core = require("@actions/core");

//Start code
try {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // token: ${{ secrets.GITHUB_TOKEN }}
  const folder = core.getInput("folder");
  const filename = core.getInput("filename");
  const content = core.getInput("content");
  var result = false;

  console.log("starting on: " + folder);

  if (existsSync(folder)) {
    result = createFolder(folder, { content, filename });
  } else {
    throw { message: "Couldn't not find folder: " + folder };
  }

  if (result) {
    console.log("success");
  } else {
    console.log("failure");
    core.setFailed("no pages were created");
  }
} catch (error) {
  const message: string = error.message ? error.message : JSON.stringify(error);

  if (core) core.setFailed(message);
  else {
    console.log(message);
    process.exit(1);
  }
}
