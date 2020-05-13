import Criteria from './criteria';

export default interface ComparedItem {
  title: string;
  comparisons: Map<ComparedItem, Map<Criteria, number | null>>;
}
