import { debug } from "@actions/core";
import { existsSync } from "fs";

export class Arguments {
  /** The folder to start the process of */
  startFolder: string;
  /** The filename of the index files */
  indexFilename: string;
  /** The content filename to add to indexes */
  contentFilename: string;
  /** The patterns to include, addeds *.md by default */
  includes: string[];
  /** The patterns to exclude */
  excludes: string[];
}

export namespace Arguments {
  export function sanitize(args: Arguments): void {
    // Checks
    if (args.startFolder === "") {
      throw new Error("No folder specified");
    }
    if (!existsSync(args.startFolder)) {
      throw new Error("Folder does not exist: " + args.startFolder);
    }

    if (args.indexFilename === "") {
      throw new Error("No filename specified for the indexes");
    }

    if (!Array.isArray(args.includes)) {
      args.includes = [];
    }
    if (!Array.isArray(args.excludes)) {
      args.excludes = [];
    }

    // Add the content filename to the excludes
    if (args.contentFilename !== "") {
      args.excludes.push(args.contentFilename);
    }

    args.includes.push("*.md");
    args.excludes.push(args.indexFilename, ".git", "node_modules");
  }
}
