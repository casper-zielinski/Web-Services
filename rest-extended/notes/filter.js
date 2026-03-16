const getFilterQuery = (filter) => {
  let filterQueryTracker = [];
  let filterQueryArray = [];
  let pagginationTracker = [];
  let pagginationValues = {};

  if (filter.title) {
    filterQueryTracker.push("title = ? ");
    filterQueryArray.push(filter.title);
  }
  if (filter.description) {
    filterQueryTracker.push(" description = ? ");
    filterQueryArray.push(filter.description);
  }
  if (filter.limit) {
    let limit = Number(filter.limit);
    if (limit > 100) limit = 100;
    pagginationTracker.push(" LIMIT ? ");
    pagginationValues.limit = limit;
    filterQueryArray.push(limit);
  }
  if (filter.offset) {
    let offset = Number(filter.offset);
    if (filter.offset > 100) offset = 100;
    pagginationTracker.push(" OFFSET ? ");
    pagginationValues.offset = offset;
    filterQueryArray.push(offset);
  }

  const filterQuery = () => {
    if (filterQueryTracker.length === 0) {
      return "";
    } else
      return (
        "WHERE " +
        (filterQueryTracker.length > 1
          ? filterQueryTracker.join("AND ")
          : filterQueryTracker[0])
      );
  };

  const pagginationQuery = () => {
    if (pagginationTracker.length === 0) {
      return "";
    } else {
      return pagginationTracker.join("");
    }
  };

  return {
    filterQueryArray: filterQueryArray,
    filterQuery: filterQuery(),
    pagginationQuery: pagginationQuery(),
    pagginationValues: pagginationValues,
  };
};

module.exports = { getFilterQuery };
