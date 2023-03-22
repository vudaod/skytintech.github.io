import { Injectable } from '@angular/core';
import { Screen } from '@core/domain-classes/screen';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class ScreenService extends EntityCollectionServiceBase<Screen>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Screen', serviceElementsFactory);
  }

}
