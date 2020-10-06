import * as vscode from 'vscode';
import { convertArray } from './convertArray';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerTextEditorCommand(
		'php-convert-array.convertArray',
		convertArray
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
