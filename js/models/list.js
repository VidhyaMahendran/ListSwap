import { Model } from 'backbone';

class List extends Model {
  // Default attributes for the List
  defaults() {
    return {
      part1: 'List',
      part2: 'Swap'
    };
  }
}

export default List;
