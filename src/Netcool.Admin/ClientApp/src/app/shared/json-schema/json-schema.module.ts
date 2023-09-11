import { NgModule } from '@angular/core';
import { DelonFormModule, WidgetRegistry } from '@delon/form';
import { SharedModule } from '../shared.module';
import { WangEditorWidget } from "./widgets/wang-editor/wang-editor.widget";

// import { TinymceWidget } from './widgets/tinymce/tinymce.widget';

export const SCHEMA_THIRDS_COMPONENTS = [
  // TinymceWidget,
  // UeditorWidget
  WangEditorWidget
];

@NgModule({
    declarations: SCHEMA_THIRDS_COMPONENTS,
    imports: [SharedModule, DelonFormModule.forRoot()],
    exports: [...SCHEMA_THIRDS_COMPONENTS]
})
export class JsonSchemaModule {
  constructor(widgetRegistry: WidgetRegistry) {
    // widgetRegistry.register(TinymceWidget.KEY, TinymceWidget);
     widgetRegistry.register(WangEditorWidget.KEY, WangEditorWidget);
  }
}
