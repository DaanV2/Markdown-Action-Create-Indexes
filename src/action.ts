import { Processor } from "./traverse";
import {
  debug,
  error,
  getBooleanInput,
  getInput,
  getMultilineInput,
  setFailed,
} from "@actions/core";
import { Arguments } from "./arguments";
import { info } from "console";

//Start code
try {
  // This should be a token with access to your repository scoped in as a secret.
  // The YML workflow will need to set myToken with the GitHub Secret Token
  // token: ${{ secrets.GITHUB_TOKEN }}
  const args = Arguments.sanitize({
    contentFilename: getInput("content"),
    excludes: getMultilineInput("exclude"),
    includes: getMultilineInput("include"),
    indexFilename: getInput("filename"),
    startFolder: getInput("folder"),
    includeExt: getBooleanInput("includeExt"),
  });

  info("starting on: " + args.startFolder);
  debug(`arguments ${JSON.stringify(args, undefined, 2)}`);
  const processor = new Processor(args);
  const result = processor.createFolder(args.startFolder);

  if (result) {
    info("success");
  } else {
    error("failure");
    setFailed("no pages were created");
  }
} catch (error) {
  const message: string = error.message ? error.message : JSON.stringify(error);

  setFailed(message);
}
