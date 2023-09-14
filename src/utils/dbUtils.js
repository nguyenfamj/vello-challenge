export const getCurrentHighestIndex = (arr) => {
  let maxId = 0;

  arr.forEach((item) => {
    const id = parseInt(item.id);

    if (id > maxId) {
      maxId = id;
    }
  });

  return maxId;
};
