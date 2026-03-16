const getFilterQuery = (filter) => {
  let filterQueryTracker = [];
  let filterQueryArray = [];

  if (filter.title) {
    filterQueryTracker.push("title = ? ");
    filterQueryArray.push(filter.title);
  }
  if (filter.description) {
    filterQueryTracker.push(" description = ? ");
    filterQueryArray.push(filter.description);
  }
  if (filter.limit) {
    filterQueryTracker.push(" limit = ? ");
    filterQueryArray.push(filter.limit);
  }

  const filterQuery = () => {
    if (filterQueryTracker.length === 0) {
      return "";
    } else
      return "WHERE " + (filterQueryTracker.length > 1
        ? filterQueryTracker.join("AND ")
        : filterQueryTracker[0]);
  };

  const filterQueryString = filterQuery();
  console.log(filterQueryString);
  return {
    filterQueryArray: filterQueryArray,
    filterQuery: filterQueryString,
  };
};

module.exports = { getFilterQuery };
