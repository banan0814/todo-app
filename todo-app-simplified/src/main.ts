import { bootstrapApplication } from '@angular/platform-browser';
import { ListComponent } from './app/pages/list/list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(ListComponent, {
  providers: [
    provideAnimationsAsync(),
  ]
})
  .catch((err) => console.error(err));
