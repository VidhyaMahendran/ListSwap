import { Model } from 'backbone';

class Service extends Model {
  // Default attributes for the todo
  // and ensure that each todo created has `title` and `completed` keys.
  defaults() {
    return {
      title: '',
      completed: false,
      servicename: 'Installation',
      price: '100'
    };
  }

  // Toggle the `completed` state of this todo item.
  toggle() {
    this.save({
      completed: !this.get('completed')
    });
  }

  toggleService() {
    this.save({
      selected: !this.get('selected')
    });
  }
}

export default Service;
