const parseItemDate = (dateString: string) => {
  const [y, m, d] = dateString.split("-");

  const date = new Date(+y, +m - 1, +d);
  const parsedItemDate = date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return parsedItemDate;
};

const sortDates = (dates) => {
  return dates.sort(function (a, b) {
    const dateA = a.date.split("-").join("");
    const dateB = b.date.split("-").join("");
    return dateB.localeCompare(dateA);
  });
};

export { parseItemDate, sortDates };
