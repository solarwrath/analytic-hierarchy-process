import Criteria from '../criteria';
import ComparedItem from '../compared-item';

export function evaluateEigenvectorComponentsCriteria(criteria: Criteria, criteriaSize: number): number {
  const currentCriteriaComparisons = Array.from(criteria.comparisons.values());
  if (currentCriteriaComparisons.includes(null)) {
    return NaN;
  }

  const criteriaComparisonsProduct =
    currentCriteriaComparisons.reduce((product, currentCriteriaComparison) => product * currentCriteriaComparison, 1);
  return criteriaComparisonsProduct ** (1 / criteriaSize);
}

export function evaluateEigenvectorComponentsComparedItems(comparedItem: ComparedItem, criteria: Criteria, criteriaSize: number): number {
  const currentComparedItemComparisons = Array.from(comparedItem.comparisons.values()).map(comparison => comparison.get(criteria));
  if (currentComparedItemComparisons.includes(null)) {
    return NaN;
  }

  const criteriaComparisonsProduct =
    currentComparedItemComparisons.reduce((product, currentComparedItemComparison) => product * currentComparedItemComparison, 1);
  return criteriaComparisonsProduct ** (1 / criteriaSize);
}

export function findBestItems(comparedItems: ComparedItem[], priorities: Criteria[]): ComparedItem[] {
  const criteriaSize = priorities.length;

  const collectedData = new Map<Criteria, {
    weight: number,
    itemsWeight: Map<ComparedItem, number>,
  }>();

  priorities.forEach(criteria => {
    collectedData.set(criteria, {
      weight: evaluateEigenvectorComponentsCriteria(criteria, criteriaSize),
      itemsWeight: new Map<ComparedItem, number>(),
    });
  });

  const prioritiesWeightSum = Array.from(collectedData.values())
    .map(criteria => criteria.weight)
    .reduce((sum, currentWeight) => sum + currentWeight, 0);
  priorities.forEach(criteria => {
    collectedData.get(criteria).weight = collectedData.get(criteria).weight / prioritiesWeightSum;
  });

  priorities.forEach(criteria => {
    comparedItems.forEach(comparedItem => {
      collectedData.get(criteria).itemsWeight.set(
        comparedItem, evaluateEigenvectorComponentsComparedItems(comparedItem, criteria, criteriaSize)
      );
    });

    const comparedItemsWeightForCriteriaSum =
      Array.from(collectedData.get(criteria).itemsWeight.values())
        .reduce((sum, currentItemWeight) => sum + currentItemWeight, 0);

    comparedItems.forEach(comparedItem => {
      collectedData.get(criteria).itemsWeight.set(
        comparedItem,
        collectedData.get(criteria).itemsWeight.get(comparedItem) / comparedItemsWeightForCriteriaSum
      );
    });
  });

  const itemsWithGlobalEstimations = comparedItems.map(comparedItem => {
    const itemValue = priorities.map(criteria => {
      const criteriaWeight = collectedData.get(criteria).weight;
      const itemWeightForCriteria = collectedData.get(criteria).itemsWeight.get(comparedItem);

      return criteriaWeight * itemWeightForCriteria;
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
