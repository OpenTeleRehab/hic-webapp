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

const getFeaturedResourcesRequest = () => ({
  type: 'GET_FEATURED_RESOURCES_REQUEST'
});

const getFeaturedResourcesSuccess = (data) => ({
  type: 'GET_FEATURED_RESOURCES_SUCCESS',
  data
});

const getFeaturedResourcesFail = () => ({
  type: 'GET_FEATURED_RESOURCES_FAIL'
});

const getHomeBannerImageRequest = () => ({
  type: 'GET_HOME_BANNER_IMAGE_REQUEST'
});

const getHomeBannerImageSuccess = (data) => ({
  type: 'GET_HOME_BANNER_IMAGE_SUCCESS',
  data
});

const getHomeBannerImageFail = () => ({
  type: 'GET_HOME_BANNER_IMAGE_FAIL'
});

export const mutation = {
  createStaticPageRequest,
  createStaticPageSuccess,
  createStaticPagesFail,
  getStaticPageRequest,
  getStaticPageSuccess,
  getStaticPageFail,
  updateStaticPageRequest,
  updateStaticPageSuccess,
  updateStaticPagesFail,
  getFeaturedResourcesRequest,
  getFeaturedResourcesSuccess,
  getFeaturedResourcesFail,
  getHomeBannerImageRequest,
  getHomeBannerImageSuccess,
  getHomeBannerImageFail
};
