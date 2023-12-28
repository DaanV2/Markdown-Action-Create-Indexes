import { existsSync } from "fs";
import { createFolder } from "./traverse";
import { getInput, setFailed } from "@actions/core";

//Start code
try {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // token: ${{ secrets.GITHUB_TOKEN }}
  const folder = getInput("folder");
  const filename = getInput("filename");
  const content = getInput("content");
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
    setFailed("no pages were created");
  }
} catch (error) {
  const message: string = error.message ? error.message : JSON.stringify(error);

  setFailed(message);
}
