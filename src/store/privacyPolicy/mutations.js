const getPrivacyPoliciesRequest = () => ({
  type: 'GET_PRIVACY_POLICIES_REQUEST'
});

const getPrivacyPoliciesSuccess = (data) => ({
  type: 'GET_PRIVACY_POLICIES_SUCCESS',
  data
});

const getPrivacyPoliciesFail = () => ({
  type: 'GET_PRIVACY_POLICIES_FAIL'
});

const getPrivacyPolicyRequest = () => ({
  type: 'GET_PRIVACY_POLICY_REQUEST'
});

const getPrivacyPolicySuccess = (data) => ({
  type: 'GET_PRIVACY_POLICY_SUCCESS',
  data
});

const getPrivacyPolicyFail = () => ({
  type: 'GET_PRIVACY_POLICY_FAIL'
});

const getPublishPrivacyPolicyRequest = () => ({
  type: 'GET_PUBLISH_PRIVACY_POLICY_REQUEST'
});

const getPublishPrivacyPolicySuccess = (data) => ({
  type: 'GET_PUBLISH_PRIVACY_POLICY_SUCCESS',
  data
});

const getPublishPrivacyPolicyFail = () => ({
  type: 'GET_PUBLISH_PRIVACY_POLICY_FAIL'
});

const createPrivacyPolicyRequest = () => ({
  type: 'CREATE_PRIVACY_POLICY_REQUEST'
});

const createPrivacyPolicySuccess = () => ({
  type: 'CREATE_PRIVACY_POLICY_SUCCESS'
});

const createPrivacyPolicyFail = () => ({
  type: 'CREATE_PRIVACY_POLICY_FAIL'
});

const updatePrivacyPolicyRequest = () => ({
  type: 'UPDATE_PRIVACY_POLICY_REQUEST'
});

const updatePrivacyPolicySuccess = () => ({
  type: 'UPDATE_PRIVACY_POLICY_SUCCESS'
});

const updatePrivacyPolicyFail = () => ({
  type: 'UPDATE_PRIVACY_POLICY_FAIL'
});

export const mutation = {
  getPrivacyPoliciesRequest,
  getPrivacyPoliciesSuccess,
  getPrivacyPoliciesFail,
  getPrivacyPolicyRequest,
  getPrivacyPolicySuccess,
  getPrivacyPolicyFail,
  createPrivacyPolicyRequest,
  createPrivacyPolicySuccess,
  createPrivacyPolicyFail,
  updatePrivacyPolicyRequest,
  updatePrivacyPolicySuccess,
  updatePrivacyPolicyFail,
  getPublishPrivacyPolicyRequest,
  getPublishPrivacyPolicySuccess,
  getPublishPrivacyPolicyFail
};
