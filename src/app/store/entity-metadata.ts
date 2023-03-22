import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Screen: {
  },
  Operation: {
  },
  ScreenOperation: {
    entityDispatcherOptions: {
      optimisticDelete: true
    }
  },
  Category: {
  }
};

const pluralNames={ Category: 'Categories' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
