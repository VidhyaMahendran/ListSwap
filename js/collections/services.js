import _ from 'underscore';
import { Collection } from 'backbone';
import Store from 'backbone.localstorage';
import Service from 'models/service';

class ServicesCollection extends Collection {
  constructor(models, options) {
    // Reference to this collection's model.
    this.model = Service;

    // Save all of the service items under the `"services"` namespace.
    this.localStorage = new Store('services');

    // Services are sorted by their original insertion order.
    this.comparator = 'order';

    super(models, options);
  }

  // Filter down the list of all service items that are finished.
  completed() {
    return this.where({completed: true});
  }

  // Filter down the list to only service items that are still not finished.
  remaining() {
    return this.where({completed: false});
  }

  // We keep the Services in sequential order, despite being saved by unordered
  // GUID in the database. This generates the next order number for new items.
  nextOrder() {
    return this.length ? this.last().get('order') + 1 : 1;
  }

  // Return an array only with the checked services
  checkedServices() {
    return this.where({completed: true});
  }

  // Return an total price of selected services
  getTotalPrice() {
    var totalPrice = 0;
    _.each(this.checkedServices(), function(item){
      totalPrice += parseInt(item.get('price'));
    });
    return totalPrice;
  }
}

export default new ServicesCollection();
