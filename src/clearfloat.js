import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ClearFloatEditing from "./clearfloatediting";
import ClearFloatUI from "./clearfloatui";

class ClearFloat extends Plugin {
  static get requires() {
    return [ClearFloatEditing, ClearFloatUI];
  }
}

export default ClearFloat;
