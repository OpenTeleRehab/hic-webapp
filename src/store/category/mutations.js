const createCategoryRequest = () => ({
  type: 'CREATE_CATEGORY_REQUEST'
});

const createCategorySuccess = () => ({
  type: 'CREATE_CATEGORY_SUCCESS'
});

const createCategoryFail = () => ({
  type: 'CREATE_CATEGORY_FAIL'
});

export const mutation = {
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFail
};
