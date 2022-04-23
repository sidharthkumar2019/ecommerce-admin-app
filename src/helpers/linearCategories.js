const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ 
        value: category._id, 
        name: category.name, 
        parentID: category.parentID,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

export default createCategoryList;