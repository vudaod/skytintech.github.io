import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Operation } from '@core/domain-classes/operation';

@Injectable({providedIn: 'root'})
export class OperationService extends EntityCollectionServiceBase<Operation>  {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
      super('Operation', serviceElementsFactory);
  }

}
