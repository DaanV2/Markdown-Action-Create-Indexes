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
const core_1 = __importDefault(require("@actions/core"));
const traverse_1 = require("./traverse");
const fs = __importStar(require("fs"));
//Start code
try {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // token: ${{ secrets.GITHUB_TOKEN }}
    const Token = core_1.default.getInput('token');
    const Folder = core_1.default.getInput('folder');
    var result = false;
    if (fs.existsSync(Folder)) {
        result = traverse_1.CreateFolder(Folder);
    }
    else {
        throw { message: 'Couldnt not find folder: ' + Folder };
    }
    if (result) {
        console.log('success');
    }
    else {
        console.log('failure');
        core_1.default.setFailed('no pages were created');
    }
}
catch (error) {
    let message;
    if (error.message)
        message = error.message;
    else
        message = JSON.stringify(error);
    core_1.default.setFailed(message);
}
//# sourceMappingURL=action.js.map