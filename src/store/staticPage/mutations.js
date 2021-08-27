const getStaticPagesRequest = () => ({
  type: 'GET_STATIC_PAGES_REQUEST'
});

const getStaticPagesSuccess = (data, filters) => ({
  type: 'GET_STATIC_PAGES_SUCCESS',
  data,
  filters
});

const getStaticPagesFail = () => ({
  type: 'GET_STATIC_PAGES_FAIL'
});

const getStaticPageRequest = () => ({
  type: 'GET_STATIC_PAGE_REQUEST'
});

const getStaticPageSuccess = (data) => ({
  type: 'GET_STATIC_PAGE_SUCCESS',
  data
});

const getStaticPageFail = () => ({
  type: 'GET_STATIC_PAGE_FAIL'
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

const updateStaticPageRequest = () => ({
  type: 'UPDATE_STATIC_PAGE_REQUEST'
});

const updateStaticPageSuccess = () => ({
  type: 'UPDATE_STATIC_PAGE_SUCCESS'
});

const updateStaticPagesFail = () => ({
  type: 'UPDATE_STATIC_PAGE_FAIL'
});

const getHomePageRequest = () => ({
  type: 'GET_HOME_PAGE_REQUEST'
});

const getHomePageSuccess = (data) => ({
  type: 'GET_HOME_PAGE_SUCCESS',
  data
});

const getHomePageFail = () => ({
  type: 'GET_HOME_PAGE_FAIL'
});

export const mutation = {
  getStaticPagesRequest,
  getStaticPagesSuccess,
  getStaticPagesFail,
  createStaticPageRequest,
  createStaticPageSuccess,
  createStaticPagesFail,
  getStaticPageRequest,
  getStaticPageSuccess,
  getStaticPageFail,
  updateStaticPageRequest,
  updateStaticPageSuccess,
  updateStaticPagesFail,
  getHomePageRequest,
  getHomePageSuccess,
  getHomePageFail
};
