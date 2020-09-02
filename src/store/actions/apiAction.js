import { Alert } from "react-native";
import { START_LOADER, END_LOADER } from "../types";
import {
  getCompany,
  createCompany,
  removeProfileFromCompany,
  joinProfileToCompany,
  updateCompany,
} from "./companyAction";
import {
  getProfile,
  createProfile,
  updateImageProfile,
  updateProfile,
  hideProfile,
} from "./profileAction";
import {
  getAccount,
  hideAccount,
  createAccount,
  updateAccount,
} from "./accountAction";
import {
  getTransaction,
  hideTransaction,
  createTransaction,
} from "./transactionAction";
import { getAction, hideAction, createAction } from "./actionAction";
import { getTransfer, hideTransfer, createTransfer } from "./transferAction";
import {
  getCategory,
  hideCategory,
  createCategory,
  updateCategory,
} from "./categoryAction";
import { getTag, createTag, hideTag, updateTag } from "./tagAction";
import { authLogin, authSignUp, resetPass, logout } from "./authAction";
import {
  updateLayouts,
  setFilterParam,
  clearFilterParam,
} from "./layoutAction";

export const startLoader = () => ({
  type: START_LOADER,
});

export const endLoader = () => ({
  type: END_LOADER,
});

// Auth
export const authSignUpAction = (newUser) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(authSignUp(newUser))]);
  dispatch(endLoader());
};

export const resetPassAction = (userData, onSuccess) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(resetPass(userData, onSuccess))]);
  dispatch(endLoader());
};

export const authLoginAction = (email, password, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(authLogin(email, password))]);
  dispatch(endLoader());

  getState().auth.error === null && onSuccess();
};

// Set
export const setFilterParamAction = (filterParam) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(setFilterParam(filterParam))]);
  dispatch(endLoader());
};

// Get
export const getDataDispatcher = (navigation) => async (dispatch, getState) => {
  dispatch(startLoader());

  await Promise.all([dispatch(getCompany()), dispatch(getProfile())]);

  if (
    getState().profile.profile === null ||
    getState().company.company === null
  ) {
    dispatch(logout(navigation));
    dispatch(endLoader());
    return;
  }

  await Promise.all([
    dispatch(getAccount()),
    dispatch(getTransaction()),
    dispatch(getAction()),
    dispatch(getTransfer()),
    dispatch(getCategory()),
    dispatch(getTag()),
  ]);

  dispatch(updateLayouts());
  dispatch(endLoader());
};

export const getProfileAction = (onSuccess) => async (dispatch, getState) => {
  dispatch(startLoader());
  await Promise.all([dispatch(getProfile())]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().profile.error === null &&
    getState().auth.error === null &&
    onSuccess(getState().profile.profile);
};

// Create/join
export const joinProfileToCompanyAction = (
  { profile_id, profile_phone },
  onSuccess
) => async (dispatch) => {
  dispatch(startLoader());
  await joinProfileToCompany(profile_id, profile_phone)
    .then((res) => {
      onSuccess();
      dispatch(getCompany());
      dispatch(endLoader());
      Alert.alert("Статус запроса", res.data.detail, [{ text: "OK" }], {
        cancelable: false,
      });
    })
    .catch((error) => {
      dispatch(endLoader());
      Alert.alert(
        "Статус запроса",
        error.response.data.detail,
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
    });

  dispatch(updateLayouts());
};

export const createProfileAction = (newItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(createProfile(newItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  const profile = getState().profile;
  profile.error === null && onSuccess(profile.profile);
};

export const createCompanyAction = (newItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(createCompany(newItem), dispatch(getProfile()))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().company.company !== null && onSuccess(getState().company.company);
};

export const createAccountAction = (newItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(createAccount(newItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().account.error === null && onSuccess();
};

export const createCategoryAction = (newItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(createCategory(newItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().category.error === null && onSuccess();
};

export const createTagAction = (newItem, onSuccess = () => {}) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(createTag(newItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().tag.error === null && onSuccess();
};

export const createActionAction = (newItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([
    dispatch(createAction(newItem)),
    dispatch(getAction()),
    dispatch(getAccount()),
  ]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().action.error === null && onSuccess();
};

export const createTransactionAction = (newItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([
    dispatch(createTransaction(newItem)),
    dispatch(getTransaction()),
    dispatch(getAccount()),
  ]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().transaction.error === null && onSuccess();
};

export const createTransferAction = (newItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([
    dispatch(createTransfer(newItem)),
    dispatch(getTransfer()),
    dispatch(getAccount()),
  ]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().transfer.error === null && onSuccess();
};

// Update
export const updateProfileAction = ({ data, id }, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([
    dispatch(updateProfile(data, id)),
    dispatch(getCompany()),
  ]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().profile.error === null && onSuccess();
};

export const updateImageProfileAction = ({ data, id }, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([
    dispatch(updateImageProfile(data, id)),
    dispatch(getCompany()),
  ]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().profile.error === null && onSuccess();
};

export const updateCompanyAction = (updatedItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(updateCompany(updatedItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().company.error === null && onSuccess();
};

export const updateAccountAction = (updatedItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(updateAccount(updatedItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().account.error === null && onSuccess();
};

export const updateCategoryAction = (updatedItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(updateCategory(updatedItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().category.error === null && onSuccess();
};

export const updateTagAction = (updatedItem, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(startLoader());
  await Promise.all([dispatch(updateTag(updatedItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());

  getState().tag.error === null && onSuccess();
};

// Hide/delete
export const hideProfileAction = (hideItem, navigation) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(hideProfile(hideItem, navigation))]);

  dispatch(updateLayouts());
  dispatch(endLoader());
};

export const hideAccountAction = (hideItem) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(hideAccount(hideItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());
};

export const hideCategoryAction = (hideItem) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(hideCategory(hideItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());
};

export const hideTagAction = (hideItem) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(hideTag(hideItem))]);

  dispatch(updateLayouts());
  dispatch(endLoader());
};

const helperOperation = ({ type, id }) => {
  switch (type) {
    case "action":
      return hideAction(id);

    case "transaction":
      return hideTransaction(id);

    case "transfer":
      return hideTransfer(id);
  }
};

export const hideOperationAction = (hideItem) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([
    dispatch(helperOperation(hideItem)),
    dispatch(getAccount()),
  ]);

  dispatch(updateLayouts());
  dispatch(endLoader());
};

export const removeProfileFromCompanyAction = (profile) => async (dispatch) => {
  dispatch(startLoader());
  await removeProfileFromCompany(profile.id, profile.phone)
    .then((res) => {
      dispatch(getCompany());
      dispatch(endLoader());
      Alert.alert("Статус запроса", res.data.detail, [{ text: "OK" }], {
        cancelable: false,
      });
    })
    .catch((error) => {
      dispatch(endLoader());
      Alert.alert(
        "Статус запроса",
        error.response.data.detail,
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
    });

  dispatch(updateLayouts());
};

// Clear
export const clearFilterParamAction = () => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(clearFilterParam())]);
  dispatch(endLoader());
};
