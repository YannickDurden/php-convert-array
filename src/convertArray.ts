import * as vscode from 'vscode';

export function convertArray(editor: vscode.TextEditor): Thenable<boolean> {
	return editor.edit(editBuilder => {
		editor.selections.forEach(selection => {
			const range = new vscode.Range(selection.start, selection.end);
			let selectedText = editor.document.getText(range) || '';
			const matches = selectedText.match(/(array\()|(\))/gm);

			if (!matches || !matches.length) {
				return;
			} else {
				matches.forEach(match => {
					if ('array(' === match) {
						selectedText = selectedText.replace(match, '[');
					} else {
						selectedText = selectedText.replace(match, ']');
					}
				});
			}

			editBuilder.replace(selection, selectedText);
		});
	});
}
