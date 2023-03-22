import { Injectable } from '@angular/core';
import { ScreenOperation } from '@core/domain-classes/screen-operation';

import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ScreenOperationService extends EntityCollectionServiceBase<ScreenOperation>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('ScreenOperation', serviceElementsFactory);
  }

}
