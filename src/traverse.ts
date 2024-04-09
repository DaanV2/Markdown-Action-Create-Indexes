import {
  WriteFileOptions,
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "fs";
import path from "path";
import { Arguments } from "./arguments";
import { FileFilter } from "./filter";
import { debug, info } from "@actions/core";

const Template = `# {$HEADER$}
{$CONTENT$}

## Categories
{$CATEGORIES$}

## Documents
{$DOCUMENTS$}`;

const WriteOptions: WriteFileOptions = {
  encoding: "utf8",
};

export class Processor {
  private options: Arguments;
  private filter: FileFilter;

  constructor(options: Arguments) {
    this.options = options;
    this.filter = new FileFilter(options.includes, options.excludes);
  }

  /**
   * Creates an index page for the folder
   * @param folder The folder to create the index page for
   * @param options The options for the index page
   * @returns True if the index page was created, false if not
   */
  createFolder(folder: string): boolean {
    if (this.filter.excluded(folder)) {
      return false;
    }

    const subfolders: string[] = [];
    const documents: string[] = [];
    const contents = this.getContent(folder);

    //Get children of folder
    const children = readdirSync(folder);

    //If children is not undefined and has content then process it
    if (children && children.length > 0) {
      //Loop over
      for (let I = 0; I < children.length; I++) {
        //grab item
        const child = children[I];
        const subfolder = path.join(folder, child);

        //if child is an directory or not
        if (statSync(subfolder).isDirectory()) {
          //Create index page, if successful we create a reference
          if (this.createFolder(subfolder)) {
            const linkName = child;
            const fileUrl = `./${encodeURI(child)}/${
              this.options.indexFilename
            }`;

            subfolders.push(`- [${linkName}](${fileUrl})`);
          }

          //If the child is a .md page create a reference
        } else if (this.includeFile(child)) {
          const linkName = child.substring(0, child.length - 3);
          const fileUrl = encodeURI(child);

          documents.push(`- [${linkName}](${fileUrl})`);
        }
      }
    }

    //If there are any reference made we create the index page and return success
    if (subfolders.length > 0 || documents.length > 0) {
      const filepath = path.join(folder, this.options.indexFilename);
      const foldername = this.getFolderName(folder);
      info("writing: " + filepath);

      const content = Template.replace(/\{\$HEADER\$\}/gi, foldername)
        .replace(/\{\$CONTENT\$\}/gi, contents)
        .replace(/\{\$CATEGORIES\$\}/gi, subfolders.join("\r\n"))
        .replace(/\{\$DOCUMENTS\$\}/gi, documents.join("\r\n"));

      writeFileSync(filepath, content, WriteOptions);
      return true;
    }

    return false;
  }

  /**
   * Returns true if the file should be included, else false
   * @param filename The name of the file
   * @returns True if the file should be included, else false
   */
  includeFile(filename: string): boolean {
    return this.filter.isMatch(filename);
  }

  /**
   * Returns the contents of the contents file if it exists, else returns ""
   * @param folder
   * @returns
   */
  getContent(folder: string): string {
    if (this.options.contentFilename === "") return "";
    const filepath = path.join(folder, this.options.contentFilename);

    if (existsSync(filepath) && statSync(filepath).isFile()) {
      info("> including content: " + filepath);
      return readFileSync(filepath).toString();
    }

    return "";
  }

  /**
   * Returns the name of the folder
   * @param folder The whole folder path
   * @returns The name of the folder
   */
  getFolderName(folder: string): string {
    const lastIndex = folder.lastIndexOf("/");

    if (lastIndex >= 0) {
      return folder.substring(lastIndex + 1, folder.length);
    }

    return folder;
  }
}
