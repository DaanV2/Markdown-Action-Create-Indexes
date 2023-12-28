import * as fs from "fs";
import path from "path";

const Template = `# {$HEADER$}

## Categories
{$CATEGORIES$}

## Documents
{$DOCUMENTS$}`;

const WriteOptions: fs.WriteFileOptions = {
  encoding: "utf8",
};

/**
 * Creates a markdown index page
 * @param folder
 * @returns True if the page was made.
 */
export function CreateFolder(folder: string, filename: string): boolean {
  if (folder.includes(".git")) return false;

  let SubFolders: string[] = [];
  let Documents: string[] = [];

  //Get children of folder
  let children = fs.readdirSync(folder);

  //If children is not undefined and has content then process it
  if (children && children.length > 0) {
    //Loop over
    for (let I = 0; I < children.length; I++) {
      //grab item
      const child = children[I];
      let subfolder = path.join(folder, child);

      //if child is an directory or not
      if (fs.statSync(subfolder).isDirectory()) {
        //Create index page, if successful we create a reference

        if (CreateFolder(subfolder, filename)) {
          SubFolders.push(`- [${child}](./${encodeURI(child)}/${filename})`);
        }
      } else {
        //If the child is a .md page create a reference
        if (child.endsWith(".md") && child != filename) {
          Documents.push(
            `- [${child.substring(0, child.length - 3)}](${encodeURI(child)})`
          );
        }
      }
    }
  }

  //If there are any reference made we create the index page and return success
  if (SubFolders.length > 0 || Documents.length > 0) {
    let filepath = path.join(folder, filename);
    let Name = GetFolderName(folder);
    console.log("writing: " + filepath);

    let Content = Template.replace(/\{\$HEADER\$\}/gi, Name);
    Content = Content.replace(/\{\$CATEGORIES\$\}/gi, SubFolders.join("\r\n"));
    Content = Content.replace(/\{\$DOCUMENTS\$\}/gi, Documents.join("\r\n"));

    fs.writeFileSync(filepath, Content, WriteOptions);
    return true;
  }

  return false;
}

/**
 * Returns the name of the folder
 * @param folder The whole folder path
 * @returns The name of the folder
 */
function GetFolderName(folder: string): string {
  let LastIndex = folder.lastIndexOf("/");

  if (LastIndex >= 0) {
    return folder.substring(LastIndex + 1, folder.length);
  }

  return folder;
}
