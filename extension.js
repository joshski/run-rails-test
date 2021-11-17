const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('run-rails-test.runRailsTestForCurrentLine', function () {
		const line = vscode.window.activeTextEditor.selection.start.line
		let file = vscode.window.activeTextEditor.document.fileName
		
		const folders = vscode.workspace.workspaceFolders
		for (const folder of folders) {
			if (file.startsWith(folder.uri.path)) {
				file = file.substr(folder.uri.path.length + 1)
				break
			}
		}
		
		const command = `rails test ${file}:${line}`
		const testRunnerTerminal = vscode.window.createTerminal(command)
		testRunnerTerminal.sendText(command)
		testRunnerTerminal.show()
	})

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
