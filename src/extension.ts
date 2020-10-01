// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerTextEditorCommand(
		'php-transform-array.transformArray',
		transformSyntax
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function transformSyntax(editor: vscode.TextEditor): Thenable<boolean> {
	return editor.edit(editBuilder => {
	  editor.selections.forEach(selection => {
		const range = new vscode.Range(selection.start, selection.end);
		const text = editor.document.getText(range) || '';
		const matches = text.match(/(?=.*[a-zA-Z]).+/g);

		const start = text?.substring(0, 6);
		const end = text?.substring(text.length - 1);

		if (!matches || !matches.length || start !== 'array(' || end !== ')') {
		  return;
		}

		const textWithNewSyntax = text.replace(start, '[').replace(/.$/,"]");

		editBuilder.replace(selection, textWithNewSyntax);
	  });
	});
  }

