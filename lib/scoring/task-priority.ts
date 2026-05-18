import { OperationalTask, PriorityLevel, ScoredTask } from "@/types";

export function calculatePriorityScore(task: OperationalTask): number {
  return Number(((task.impact * task.confidence * task.scale) / task.complexity).toFixed(1));
}

export function getPriorityLevel(score: number): PriorityLevel {
  if (score >= 120) {
    return "high";
  }

  if (score >= 70) {
    return "medium";
  }

  return "low";
}

export function scoreTasks(tasks: OperationalTask[]): ScoredTask[] {
  return tasks
    .map((task) => {
      const priorityScore = calculatePriorityScore(task);
      return {
        ...task,
        priorityScore,
        priorityLevel: getPriorityLevel(priorityScore),
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}
