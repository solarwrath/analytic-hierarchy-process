export default interface Priority {
  title: string;
  comparisons: Map<Priority, number | null>;
}
