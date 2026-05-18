const MONTH_FORMATTER_NO = new Intl.DateTimeFormat("nb-NO", {
  month: "long",
  year: "numeric",
});

const norwegianMonths = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function shiftMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function formatMonthLabel(date: Date) {
  return MONTH_FORMATTER_NO.format(startOfMonth(date));
}

export function getMonthlyPeriods(count = 12, anchorDate = new Date()) {
  const base = startOfMonth(anchorDate);

  return Array.from({ length: count }, (_, index) => {
    const date = shiftMonths(base, -index);
    return formatMonthLabel(date);
  });
}

export function getPreviousMonthLabel(periodLabel: string) {
  const [monthName, yearText] = periodLabel.split(" ");
  const year = Number(yearText);
  const monthIndex = norwegianMonths.indexOf(monthName?.toLowerCase());

  if (!Number.isFinite(year) || monthIndex < 0) {
    return formatMonthLabel(shiftMonths(new Date(), -1));
  }

  return formatMonthLabel(new Date(year, monthIndex - 1, 1));
}
