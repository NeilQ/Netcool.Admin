import { Inject, Injectable, NgModule } from '@angular/core';
import {
  DelonFormConfig,
  DelonFormModule,
  ErrorData, NzWidgetRegistry,
  SchemaValidatorFactory,
  SFSchema,
  SFValue,
  WidgetRegistry
} from '@delon/form';
import { SharedModule } from '../shared.module';

// import { TinymceWidget } from './widgets/tinymce/tinymce.widget';
// import { UEditorWidget } from './widgets/ueditor/ueditor.widget';

export const SCHEMA_THIRDS_COMPONENTS = [
  // TinymceWidget,
  // UEditorWidget
];

import * as Ajv from 'ajv';

@Injectable()
export class MyAjvSchemaValidatorFactory extends SchemaValidatorFactory {
  protected ajv: any;

  constructor(@Inject(DelonFormConfig) private options: DelonFormConfig) {
    super();
    this.ajv = new Ajv({
      ...options.ajv,
      errorDataPath: 'property',
      allErrors: true,
      jsonPointers: true,
    });
    this.ajv.addFormat('data-url', /^data:([a-z]+\/[a-z0-9-+.]+)?;name=(.*);base64,(.*)$/);
    this.ajv.addFormat(
      'color',
      /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
    );
    this.ajv.addFormat('mobile', /^(0|\+?86|17951)?1[0-9]{10}$/);
    this.ajv.addFormat('id-card', /(^\d{15}$)|(^\d{17}([0-9]|X)$)/);
  }

  createValidatorFn(schema: SFSchema, extraOptions: { ingoreKeywords: string[]; debug: boolean }): (value: SFValue) => ErrorData[] {
    const ingoreKeywords: string[] = [...(this.options.ingoreKeywords as string[]), ...((extraOptions.ingoreKeywords as string[]) || [])];

    return (value: SFValue): ErrorData[] => {
      try {
        this.ajv.validate(schema, value);
      } catch (e) {
        // swallow errors thrown in ajv due to invalid schemas, these
        // still get displayed
        if (extraOptions.debug) {
          console.warn(e);
        }
      }
      let errors: any[] = this.ajv.errors;
      if (this.options && ingoreKeywords && errors) {
        errors = errors.filter(w => ingoreKeywords.indexOf(w.keyword) === -1);
      }
      return errors;
    };
  }
}

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  entryComponents: SCHEMA_THIRDS_COMPONENTS,
  imports: [
    SharedModule,
    DelonFormModule
  ],
  providers: [
    {provide: SchemaValidatorFactory, useClass: MyAjvSchemaValidatorFactory},
    {provide: WidgetRegistry, useClass: NzWidgetRegistry}
  ],
  exports: [
    ...SCHEMA_THIRDS_COMPONENTS
  ]
})
export class JsonSchemaModule {
  constructor(widgetRegistry: WidgetRegistry) {
    // widgetRegistry.register(TinymceWidget.KEY, TinymceWidget);
    // widgetRegistry.register(UEditorWidget.KEY, UEditorWidget);
  }

}
