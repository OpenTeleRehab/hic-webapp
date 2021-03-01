const getStaticPagesRequest = () => ({
  type: 'GET_STATIC_PAGES_REQUEST'
});

const getStaticPagesSuccess = (data) => ({
  type: 'GET_STATIC_PAGES_SUCCESS',
  data
});

const getStaticPagesFail = () => ({
  type: 'GET_STATIC_PAGES_FAIL'
});

const createStaticPageRequest = () => ({
  type: 'CREATE_STATIC_PAGE_REQUEST'
});

const createStaticPageSuccess = () => ({
  type: 'CREATE_STATIC_PAGE_SUCCESS'
});

const createStaticPagesFail = () => ({
  type: 'CREATE_STATIC_PAGE_FAIL'
});

export const mutation = {
  getStaticPagesRequest,
  getStaticPagesSuccess,
  getStaticPagesFail,
  createStaticPageRequest,
  createStaticPageSuccess,
  createStaticPagesFail
};
