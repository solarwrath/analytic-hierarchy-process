import Priority from './priority';

export default interface ComparedItem {
  title: string;
  comparisons: Map<ComparedItem, Map<Priority, number | null>>;
}
