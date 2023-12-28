import {
  WriteFileOptions,
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "fs";
import path from "path";

const Template = `# {$HEADER$}
{$CONTENT$}

## Categories
{$CATEGORIES$}

## Documents
{$DOCUMENTS$}`;

const WriteOptions: WriteFileOptions = {
  encoding: "utf8",
};

export interface ITraverseOptions {
  filename: string;
  content: string;
}

/**
 * Creates an index page for the folder
 * @param folder The folder to create the index page for
 * @param options The options for the index page
 * @returns True if the index page was created, false if not
 */
export function createFolder(
  folder: string,
  options: ITraverseOptions
): boolean {
  if (folder.includes(".git")) return false;

  const subfolders: string[] = [];
  const documents: string[] = [];
  const contents = getContent(folder, options.content);

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
        if (createFolder(subfolder, options)) {
          const linkName = child;
          const fileUrl = `./${encodeURI(child)}/${options.filename}`;

          subfolders.push(`- [${linkName}](${fileUrl})`);
        }
        //If the child is a .md page create a reference
      } else if (includeFile(child, options)) {
        const linkName = child.substring(0, child.length - 3);
        const fileUrl = encodeURI(child);

        documents.push(`- [${linkName}](${fileUrl})`);
      }
    }
  }

  //If there are any reference made we create the index page and return success
  if (subfolders.length > 0 || documents.length > 0) {
    const filepath = path.join(folder, options.filename);
    let Name = getFolderName(folder);
    console.log("writing: " + filepath);

    const content = Template.replace(/\{\$HEADER\$\}/gi, Name)
      .replace(/\{\$CONTENT\$\}/gi, contents)
      .replace(/\{\$CATEGORIES\$\}/gi, subfolders.join("\r\n"))
      .replace(/\{\$DOCUMENTS\$\}/gi, documents.join("\r\n"));

    writeFileSync(filepath, content, WriteOptions);
    return true;
  }

  return false;
}

function includeFile(filename: string, options: ITraverseOptions): boolean {
  return (
    filename.endsWith(".md") &&
    filename != options.filename &&
    filename != options.content
  );
}

function getContent(folder: string, contentsFilepath: string): string {
  if (contentsFilepath === "") return "";
  const filepath = path.join(folder, contentsFilepath);

  if (existsSync(filepath) && statSync(filepath).isFile()) {
    console.log("checking content: " + filepath);
    return readFileSync(filepath).toString();
  }

  return "";
}

/**
 * Returns the name of the folder
 * @param folder The whole folder path
 * @returns The name of the folder
 */
function getFolderName(folder: string): string {
  const lastIndex = folder.lastIndexOf("/");

  if (lastIndex >= 0) {
    return folder.substring(lastIndex + 1, folder.length);
  }

  return folder;
}
