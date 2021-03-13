"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFolder = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const Template = `# {$HEADER$}

## Categories
{$CATEGORIES$}

## DOCUMENTS
{$DOCUMENTS$}`;
const WriteOptions = {
    encoding: 'utf8'
};
/**
 * Creates a markdown index page
 * @param folder
 * @returns True if the page was made.
 */
function CreateFolder(folder) {
    let SubFolders = [];
    let Documents = [];
    //Get childern of folder
    let childern = fs.readdirSync(folder);
    //If childern is not undefined and has content then process it
    if (childern && childern.length > 0) {
        //Loop over
        for (let I = 0; I < childern.length; I++) {
            //grab item
            const child = childern[I];
            //if child is an directory or not
            if (fs.statSync(child).isDirectory()) {
                //Create index page, if succesfull we create a reference
                let subfolder = path_1.default.join(folder, child);
                if (CreateFolder(subfolder)) {
                    SubFolders.push(`- [${child}](./${child}/index.md)`);
                }
            }
            else {
                //If the child is a .md page create a reference
                if (child.endsWith('.md')) {
                    Documents.push(`- [${child.substring(0, child.length - 3)}](${child})`);
                }
            }
        }
    }
    //If there are any reference made we create the index page and return succes
    if (SubFolders.length > 0 || Documents.length > 0) {
        let filepath = path_1.default.join(folder, 'index.md');
        let Name = GetFolderName(folder);
        console.log('writing: ' + filepath);
        let Content = Template.replace(/\{\$HEADER\$\}/gi, Name);
        Content = Content.replace(/\{\$CATEGORIES\$\}/gi, SubFolders.join('\n\r'));
        Content = Content.replace(/\{\$DOCUMENTS\$\}/gi, Documents.join('\n\r'));
        fs.writeFileSync(filepath, Content, WriteOptions);
        return true;
    }
    return false;
}
exports.CreateFolder = CreateFolder;
/**
 * Returns the name of the folder
 * @param folderpath The whole folder path
 * @returns The name of the folder
 */
function GetFolderName(folderpath) {
    let LastIndex = folderpath.lastIndexOf('\\');
    if (LastIndex >= 0) {
        return folderpath.substring(LastIndex, folderpath.length);
    }
    return folderpath;
}
//# sourceMappingURL=traverse.js.map