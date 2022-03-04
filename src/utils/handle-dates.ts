const parseItemHeadDate = (dateString: string) => {
  const [y, m, d] = dateString.split("-");

  const date = new Date(+y, +m - 1, +d);
  const parsedItemDate = date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return parsedItemDate;
};

const parseItemTransactionDate = (dateString: string) => {
  const date = new Date(dateString);
  const parsedItemDate = date
    .toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(/\sde|\./g, "")
    .replace(/\s(\d+:\d+)$/, " - $1");
  return parsedItemDate;
};

const isToday = (td: Date) => {
  const d = new Date();
  return (
    td.getDate() == d.getDate() &&
    td.getMonth() == d.getMonth() &&
    td.getFullYear() == d.getFullYear()
  );
};

const sortDates = (dates) => {
  return dates.sort(function (a, b) {
    const dateA = a.date.split("-").join("");
    const dateB = b.date.split("-").join("");
    return dateB.localeCompare(dateA);
  });
};

export { parseItemHeadDate, parseItemTransactionDate, sortDates, isToday };
