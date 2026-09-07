# 📦ng-red-grape
##  dependencies
This Angular component library is styled using [Bootstrap](https://getbootstrap.com).  
To use the components properly, you must install and configure Bootstrap in your Angular project.
### 🚀 Installation

 1. Install Bootstrap and Bootstrap-icon via npm.
	```bash
	npm install bootstrap 	
	npm install bootstrap-icon
 2. Add css and js file of bootstrap to angular.json.
    ```json
    "styles": [  
      "node_modules/bootstrap/dist/css/bootstrap.rtl.min.css",  
      "node_modules/bootstrap-icons/font/bootstrap-icons.css",  
      "projects/app-demo/src/styles.scss"  
    ],  
    "scripts": [  
      "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"  
    ]
 3. Add these attributes to the `<html>` tag in `index.html`.
	```html
	<html lang="fa" dir="rtl">
	```

### Date and time picker

`RgDateTimePickerComponent` is a standalone form control. In LTR mode it displays and accepts Gregorian dates; in RTL mode it displays and accepts Jalali (Shamsi) dates. Form values are emitted as ISO date strings (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm`).

```ts
import { RgDateTimePickerComponent } from 'ng-redgrape-ui';

@Component({
  imports: [ReactiveFormsModule, RgDateTimePickerComponent],
  // ...
})
export class ExampleComponent {
  form = new FormGroup({
    dueAt: new FormControl<string | null>(null),
  });
}
```

```html
<rg-date-time-picker
  formControlName="dueAt"
  mode="datetime"
  direction="rtl"
  label="تاریخ و ساعت">
</rg-date-time-picker>
```