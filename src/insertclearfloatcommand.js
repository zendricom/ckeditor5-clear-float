import Command from "@ckeditor/ckeditor5-core/src/command";

export const COMMAND_NAME = "insertClearFloat";
export default class InsertClearFloatCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <clearFloat>*</clearFloat> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createClearFloat(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      "clearFloat"
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createClearFloat(writer) {
  const clearFloat = writer.createElement("clearFloat");
  return clearFloat;
}
