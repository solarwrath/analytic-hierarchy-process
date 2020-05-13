import Priority from '../priority';
import ComparedItem from '../compared-item';

export function evaluateEigenvectorComponentsPriorities(priority: Priority): number {
  const currentPriorityComparisons = Array.from(priority.comparisons.values());
  if (currentPriorityComparisons.includes(null)) {
    return NaN;
  }

  const priorityComparisonsProduct =
    currentPriorityComparisons.reduce((product, currentPriorityComparison) => product * currentPriorityComparison, 1);
  return priorityComparisonsProduct ** (1 / 6);
}

export function evaluateEigenvectorComponentsComparedItems(comparedItem: ComparedItem, priority: Priority): number {
  const currentComparedItemComparisons = Array.from(comparedItem.comparisons.values()).map(comparison => comparison.get(priority));
  if (currentComparedItemComparisons.includes(null)) {
    return NaN;
  }

  const priorityComparisonsProduct =
    currentComparedItemComparisons.reduce((product, currentComparedItemComparison) => product * currentComparedItemComparison, 1);
  return priorityComparisonsProduct ** (1 / 6);
}

export function findBestItems(comparedItems: ComparedItem[], priorities: Priority[]): ComparedItem[] {
  const collectedData = new Map<Priority, {
    weight: number,
    itemsWeight: Map<ComparedItem, number>,
  }>();

  priorities.forEach(priority => {
    collectedData.set(priority, {
      weight: evaluateEigenvectorComponentsPriorities(priority),
      itemsWeight: new Map<ComparedItem, number>(),
    });
  });

  const prioritiesWeightSum = Array.from(collectedData.values())
    .map(priority => priority.weight)
    .reduce((sum, currentWeight) => sum + currentWeight, 0);
  priorities.forEach(priority => {
    collectedData.get(priority).weight = collectedData.get(priority).weight / prioritiesWeightSum;
  });

  priorities.forEach(priority => {
    comparedItems.forEach(comparedItem => {
      collectedData.get(priority).itemsWeight.set(comparedItem, evaluateEigenvectorComponentsComparedItems(comparedItem, priority));
    });

    const comparedItemsWeightForPrioritySum =
      Array.from(collectedData.get(priority).itemsWeight.values())
        .reduce((sum, currentItemWeight) => sum + currentItemWeight, 0);

    comparedItems.forEach(comparedItem => {
      collectedData.get(priority).itemsWeight.set(
        comparedItem,
        collectedData.get(priority).itemsWeight.get(comparedItem) / comparedItemsWeightForPrioritySum
      );
    });
  });

  const itemsWithGlobalEstimations = comparedItems.map(comparedItem => {
    const itemValue = priorities.map(priority => {
      const priorityWeight = collectedData.get(priority).weight;
      const itemWeightForPriority = collectedData.get(priority).itemsWeight.get(comparedItem);

      return priorityWeight * itemWeightForPriority;
    })
      .reduce((sum, currentRelativeValue) => sum + currentRelativeValue, 0);

    return {
      comparedItem,
      itemValue,
    };
  });

  return itemsWithGlobalEstimations.reduce((result, currentPair) => {
    if (currentPair.itemValue > result.maxValue) {
      return {
        maxValue: currentPair.itemValue,
        results: [currentPair.comparedItem],
      };
    } else if (currentPair.itemValue === result.maxValue) {
      result.results.push(currentPair.comparedItem);
    }

    return result;
  }, {
    maxValue: itemsWithGlobalEstimations[0].itemValue,
    results: []
  }).results;
}
