interface PriorityProperties {
  title: string;
}

interface PriorityIndexer {
  [anotherPriorityTitle: string]: number | null;
}

type Priority = PriorityProperties & PriorityIndexer;
export default Priority;
