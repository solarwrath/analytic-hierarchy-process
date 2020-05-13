export default interface Criteria {
  title: string;
  comparisons: Map<Criteria, number | null>;
}
