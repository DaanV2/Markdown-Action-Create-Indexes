import { CreateFolder } from './traverse';
import * as fs from 'fs';

const corexp = require('@actions/core');

//Start code
try {
	// This should be a token with access to your repository scoped in as a secret.
	// The YML workflow will need to set myToken with the GitHub Secret Token
	// token: ${{ secrets.GITHUB_TOKEN }}
	const Folder = corexp.getInput('folder');
	var result = false;

	console.log('starting on: ' + Folder);

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
		corexp.setFailed('no pages were created');
	}

} catch (error) {
	let message: string;

	if (error.message)
		message = error.message;
	else
		message = JSON.stringify(error);

	if (corexp)
		corexp.setFailed(message);

	else {
		console.log(message);
		process.exit(1);
	}
}