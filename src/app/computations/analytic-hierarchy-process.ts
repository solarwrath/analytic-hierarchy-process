import Priority from '../priority';

export function evaluateEigenvectorComponents(priority: Priority): number {
  const currentPriorityComparisons = Array.from(priority.comparisons.values());
  if (currentPriorityComparisons.includes(null)) {
    return NaN;
  }

  const priorityComparisonsProduct =
    currentPriorityComparisons.reduce((product, currentPriorityComparison) => product * currentPriorityComparison, 1);
  return priorityComparisonsProduct ** (1 / 6);
}
