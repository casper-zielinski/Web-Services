const getFilterQuery = (filter) => {
  let filterQueryTracker = [];
  let filterQueryArray = [];
  let pagginationTracker = [];

  if (filter.title) {
    filterQueryTracker.push("title = ? ");
    filterQueryArray.push(filter.title);
  }
  if (filter.description) {
    filterQueryTracker.push(" description = ? ");
    filterQueryArray.push(filter.description);
  }
  if (filter.limit) {
    pagginationTracker.push(" LIMIT ? ");
    filterQueryArray.push(filter.limit);
  }
  if (filter.offset) {
    pagginationTracker.push(" OFFSET ? ");
    filterQueryArray.push(filter.offset);
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
  };
};

module.exports = { getFilterQuery };
