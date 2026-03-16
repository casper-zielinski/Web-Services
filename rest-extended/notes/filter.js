const getFilterQuery = (filter) => {
  let filterQuery = "";
  let filterQueryArray = [];
  if (filter.title && filter.description) {
    filterQuery += "WHERE title = ? AND description = ?";
    filterQueryArray = [filter.title, filter.description];
  } else if (filter.title) {
    filterQuery += "WHERE title = ?";
    filterQueryArray = [filter.title];
  } else if (filter.description) {
    filterQuery += "WHERE description = ?";
    filterQueryArray = [filter.description];
  }

  return {
    filterQueryArray: filterQueryArray,
    filterQuery: filterQuery,
  };
};

module.exports = { getFilterQuery };
