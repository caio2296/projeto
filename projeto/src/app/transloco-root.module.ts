import {
  provideTransloco,
  TranslocoModule
} from '@jsverse/transloco';
import { NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco-loader';
import { environment } from '../environments/environment';


@NgModule({
  exports: [ TranslocoModule ],
  providers: [
      provideTransloco({
        config: {
          availableLangs: ['pt-BR', 'en-US'],
          defaultLang: 'pt-BR',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: environment.production,
            missingHandler: { logMissingKey: false } // desativa os warnings
        },
        loader: TranslocoHttpLoader
      }),
  ],
  declarations: [
  ],
})
export class TranslocoRootModule {}
