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
import { hideTransaction, createTransaction } from "./transactionAction";
import { hideAction, createAction } from "./actionAction";
import { hideTransfer, createTransfer } from "./transferAction";
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
  generateOperationData,
  generateHomeData,
  clearProfileData,
} from "./layoutAction";

export const startLoader = () => ({
  type: START_LOADER,
});

export const endLoader = () => ({
  type: END_LOADER,
});

// Auth
export const authSignUpAction =
  (newUser, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(authSignUp(newUser))]);
    if (getState().auth.error === null) {
      await Promise.all([onSuccess()]);
    }
    dispatch(endLoader());
  };

export const resetPassAction = (userData, onSuccess) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(resetPass(userData, onSuccess))]);
  dispatch(endLoader());
};

export const authLoginAction =
  (email, password, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(authLogin(email, password))]);
    if (getState().auth.error === null) {
      await Promise.all([onSuccess()]);
    }
    dispatch(endLoader());
  };

// Get
export const getProfileListData =
  (profile_id = null) =>
  async (dispatch) => {
    dispatch(startLoader());
    await Promise.all([dispatch(generateHomeData(profile_id))]);
    dispatch(endLoader());
  };

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
    dispatch(updateLayouts()),
    dispatch(getCategory()),
    dispatch(getTag()),
  ]);

  dispatch(endLoader());
};

export const getProfileAction = (onSuccess) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(getProfile(onSuccess))]);
  dispatch(endLoader());
};

export const getOperationAction =
  (params = null, onSuccess) =>
  async (dispatch) => {
    dispatch(startLoader());
    await Promise.all([dispatch(generateOperationData(params, onSuccess))]);
    dispatch(endLoader());
  };

// Create/join
export const joinProfileToCompanyAction =
  ({ profile_id, profile_phone }, onSuccess) =>
  async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([
      dispatch(joinProfileToCompany(profile_id, profile_phone)),
    ]);
    if (getState().company.error === null) {
      await Promise.all([onSuccess()]);
    }
    dispatch(endLoader());
  };

export const createProfileAction =
  (newItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(createProfile(newItem))]);

    const { profile } = getState();
    if (profile.error === null) {
      await Promise.all([onSuccess(profile.profile)]);
    }
    dispatch(endLoader());
  };

export const createCompanyAction =
  (newItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(createCompany(newItem))]);
    if (getState().company.company !== null) {
      await Promise.all([
        dispatch(getProfile()),
        onSuccess(getState().company.company),
      ]);
    }
    dispatch(endLoader());
  };

export const createAccountAction =
  (newItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(createAccount(newItem))]);
    if (getState().account.error === null) {
      await Promise.all([
        dispatch(generateHomeData()),
        dispatch(getCompany()),
        onSuccess(),
      ]);
    }
    dispatch(endLoader());
  };

export const createCategoryAction =
  (newItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(createCategory(newItem))]);
    if (getState().category.error === null) {
      await Promise.all([dispatch(generateHomeData()), onSuccess()]);
    }
    dispatch(endLoader());
  };

export const createTagAction =
  (newItem, onSuccess = () => {}) =>
  async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(createTag(newItem))]);
    if (getState().tag.error === null) {
      await Promise.all([dispatch(generateHomeData()), onSuccess()]);
    }
    dispatch(endLoader());
  };

export const createActionAction =
  (newItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(createAction(newItem))]);
    if (getState().action.error === null) {
      await Promise.all([
        dispatch(updateLayouts()),
        dispatch(getAccount()),
        onSuccess(),
      ]);
    }
    dispatch(endLoader());
  };

export const createTransactionAction =
  (newItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(createTransaction(newItem))]);
    if (getState().transaction.error === null) {
      await Promise.all([
        dispatch(updateLayouts()),
        dispatch(getAccount()),
        onSuccess(),
      ]);
    }
    dispatch(endLoader());
  };

export const createTransferAction =
  (newItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(createTransfer(newItem))]);
    if (getState().transfer.error === null) {
      await Promise.all([
        dispatch(updateLayouts()),
        dispatch(getAccount()),
        onSuccess(),
      ]);
    }
    dispatch(endLoader());
  };

// Update
export const updateProfileAction =
  ({ data, id }, onSuccess) =>
  async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(updateProfile(data, id))]);
    if (getState().profile.error === null) {
      await Promise.all([
        dispatch(updateLayouts()),
        dispatch(getCompany()),
        onSuccess(),
      ]);
    }
    dispatch(endLoader());
  };

export const updateImageProfileAction =
  ({ data, id }, onSuccess) =>
  async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(updateImageProfile(data, id))]);
    if (getState().profile.error === null) {
      await Promise.all([
        dispatch(updateLayouts()),
        dispatch(getCompany()),
        onSuccess(),
      ]);
    }
    dispatch(endLoader());
  };

export const updateCompanyAction =
  (updatedItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(updateCompany(updatedItem))]);
    if (getState().company.error === null) {
      await Promise.all([onSuccess()]);
    }
    dispatch(endLoader());
  };

export const updateAccountAction =
  (updatedItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(updateAccount(updatedItem))]);
    if (getState().account.error === null) {
      await Promise.all([
        dispatch(updateLayouts()),
        dispatch(getCompany()),
        onSuccess(),
      ]);
    }
    dispatch(endLoader());
  };

export const updateCategoryAction =
  (updatedItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(updateCategory(updatedItem))]);
    if (getState().category.error === null) {
      await Promise.all([dispatch(updateLayouts()), onSuccess()]);
    }
    dispatch(endLoader());
  };

export const updateTagAction =
  (updatedItem, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([dispatch(updateTag(updatedItem))]);
    if (getState().tag.error === null) {
      await Promise.all([dispatch(updateLayouts()), onSuccess()]);
    }
    dispatch(endLoader());
  };

// Hide/delete
export const hideProfileAction = (hideItem, navigation) => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(hideProfile(hideItem, navigation))]);

  dispatch(endLoader());
};

export const hideAccountAction = (hideItem) => async (dispatch, getState) => {
  dispatch(startLoader());
  await Promise.all([dispatch(hideAccount(hideItem))]);
  if (getState().account.error === null) {
    await Promise.all([dispatch(updateLayouts()), dispatch(getCompany())]);
  }
  dispatch(endLoader());
};

export const hideCategoryAction = (hideItem) => async (dispatch, getState) => {
  dispatch(startLoader());
  await Promise.all([dispatch(hideCategory(hideItem))]);
  if (getState().category.error === null) {
    await Promise.all([dispatch(updateLayouts())]);
  }
  dispatch(endLoader());
};

export const hideTagAction = (hideItem) => async (dispatch, getState) => {
  dispatch(startLoader());
  await Promise.all([dispatch(hideTag(hideItem))]);
  if (getState().tag.error === null) {
    await Promise.all([dispatch(updateLayouts())]);
  }
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
    default:
      return null;
  }
};

export const hideOperationAction = (hideItem) => async (dispatch, getState) => {
  dispatch(startLoader());
  await Promise.all([dispatch(helperOperation(hideItem))]);
  if (getState()[hideItem.type].error === null) {
    await Promise.all([dispatch(updateLayouts()), dispatch(getAccount())]);
  }
  dispatch(endLoader());
};

export const removeProfileFromCompanyAction =
  (profile, onSuccess) => async (dispatch, getState) => {
    dispatch(startLoader());
    await Promise.all([
      dispatch(removeProfileFromCompany(profile.id, profile.phone)),
    ]);
    if (getState().company.error === null) {
      await Promise.all([dispatch(updateLayouts()), onSuccess()]);
    }
    dispatch(endLoader());
  };

// Clear
export const clearProfileListData = () => async (dispatch) => {
  dispatch(startLoader());
  await Promise.all([dispatch(clearProfileData())]);
  dispatch(endLoader());
};
