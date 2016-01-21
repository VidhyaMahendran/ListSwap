import _ from 'underscore';
import { Collection } from 'backbone';
import List from 'models/list';

class ListCollection extends Collection {
  constructor(models, options) {
    // Reference to this collection's model.
    this.model = List;

    super(models, options);
  }

}

export default new ListCollection();
