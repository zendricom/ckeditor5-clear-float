import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ClearFloatIcon from "../theme/clear-float.svg";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

import InsertClearFloatCommand, {
  COMMAND_NAME,
} from "./insertclearfloatcommand";

export default class ClearFloatUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("clearFloat", (locale) => {
      const command = editor.commands.get(COMMAND_NAME);
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t("Clear Float"),
        tooltip: true,
        icon: ClearFloatIcon,
      });

      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      this.listenTo(buttonView, "execute", () => editor.execute(COMMAND_NAME));

      return buttonView;
    });
  }
}
