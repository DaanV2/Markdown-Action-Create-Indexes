import core from '@actions/core';
import github from '@actions/github';
import { CreateFolder } from './traverse';
import * as fs from 'fs';

//Start code
try {
	// This should be a token with access to your repository scoped in as a secret.
	// The YML workflow will need to set myToken with the GitHub Secret Token
	// token: ${{ secrets.GITHUB_TOKEN }}
	const Token = core.getInput('token');
	const Folder = core.getInput('folder');
	var result = false;

	if (fs.existsSync(Folder)) {
		result = CreateFolder(Folder);
	} else {
		throw { message: 'Couldnt not find folder: ' + Folder };
	}

	if (result) {
		console.log('success');
	}
	else {
		console.log('failure');
		core.setFailed('no pages were created');
	}

} catch (error) {
	let message: string;

	if (error.message)
		message = error.message;
	else
		message = JSON.stringify(error);

	core.setFailed(message);
}