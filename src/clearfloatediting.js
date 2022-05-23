import "../theme/editor.css";
import "../theme/view.css";

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { toWidget } from "@ckeditor/ckeditor5-widget/src/utils";
import ClearFloatIcon from "../theme/clear-float.svg";
import InsertClearFloatCommand, {
  COMMAND_NAME,
} from "./insertclearfloatcommand";

export default class ClearFloatEditing extends Plugin {
  init() {
    console.log("ClearFloatEditing#init() got called");

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      COMMAND_NAME,
      new InsertClearFloatCommand(this.editor)
    );
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("clearFloat", {
      isObject: true,
      allowWhere: "$block",
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;
    const t = this.editor.t;

    conversion.for("upcast").elementToElement({
      model: "clearFloat",
      view: {
        name: "div",
        classes: "clear-float",
      },
    });

    conversion.for("dataDowncast").elementToElement({
      model: "clearFloat",
      view: {
        name: "div",
        classes: "clear-float",
      },
    });

    conversion.for("editingDowncast").elementToElement({
      model: "clearFloat",
      view: (modelElement, { writer: viewWriter }) => {
        const clearFloat = viewWriter.createContainerElement("div", {
          class: "clear-float-editing clear-float",
        });

        const innerText = viewWriter.createText(t("CLEAR FLOAT"));

        viewWriter.insert(
          viewWriter.createPositionAt(clearFloat, 0),
          innerText
        );

        return toWidget(clearFloat, viewWriter, {
          label: "clear float widget",
        });
      },
    });
  }
}
