import { createSelector } from "reselect";
import { getShortName } from "../../getShortName";

/* Account */
export const getAccounts = (state) => state.account.accounts;
export const getAccountCurrent = (state) => state.account.current;
export const getAccountError = (state) => state.account.error;
export const getAccountLoading = (state) => state.account.loading;

/* Action */
export const getActionError = (state) => state.action.error;
export const getActionLoading = (state) => state.action.loading;

/* Api */
export const getApiLoading = (state) => state.api.loader;

/* Auth */
export const getAuthUser = (state) => state.auth.user;
export const getAuthIsRegister = (state) => state.auth.isRegister;
export const getAuthIsAuth = (state) => state.auth.isAuth;
export const getAuthIsRemindMe = (state) => state.auth.isRemindMe;
export const getAuthError = (state) => state.auth.error;
export const getAuthLoading = (state) => state.auth.loading;

/* Calendar */
export const getCalendarStartDate = (state) => state.calendar.startDate;
export const getCalendarEndDate = (state) => state.calendar.endDate;

/* Category */
export const getCategories = (state) => state.category.categories;
export const getCategoryCurrent = (state) => state.category.current;
export const getCategoryError = (state) => state.category.error;
export const getCategoryLoading = (state) => state.category.loading;

/* Company */
export const getCompany = (state) => state.company.company;
export const getCompanyError = (state) => state.company.error;
export const getCompanyLoading = (state) => state.company.loading;

/* Layout */
export const getLayoutHomeListData = (state) => state.layout.homeListData;
export const getLayoutOperationListData = (state) =>
  state.layout.operationListData;
export const getLayoutOperationTypeData = (state) =>
  state.layout.operationTypeData;
export const getLayoutProfileData = (state) => state.layout.profileData;
export const getLayoutFilterParams = (state) => state.layout.filterParams;
export const getLayoutTotalBalance = (state) => state.layout.totalBalance;
export const getLayoutTotalActions = (state) => state.layout.totalActions;
export const getLayoutTotalTransactions = (state) =>
  state.layout.totalTransactions;

/* Profile */
export const getProfile = (state) => state.profile.profile;
export const getProfileError = (state) => state.profile.error;
export const getProfileLoading = (state) => state.profile.loading;

/* Tag */
export const getTags = (state) => state.tag.tags;
export const getTagError = (state) => state.tag.error;
export const getTagLoading = (state) => state.tag.loading;

/* Transaction */
export const getTransactionError = (state) => state.transaction.error;
export const getTransactionLoading = (state) => state.transaction.loading;

/* Transfer */
export const getTransferError = (state) => state.transfer.error;
export const getTransferLoading = (state) => state.transfer.loading;

/* Reselect */
export const getAccountDataList = createSelector(
  getProfile,
  getAccounts,
  (profile, accounts) =>
    accounts.filter((acc) => profile !== null && acc.profile === profile.id)
);

export const getToolbarTitle = createSelector(
  getProfile,
  getCompany,
  (profile, company) =>
    profile !== null && company !== null
      ? `${profile.is_admin ? "⭐️ " : ""}${company.company_name}`
      : ""
);

export const getCalendarMinDate = createSelector(getProfile, (profile) =>
  profile !== null
    ? new Date(profile.created)
    : new Date(new Date().getFullYear() - 1, 0, 1)
);

export const getCompanyList = createSelector(
  getProfile,
  getAccounts,
  getCompany,
  (profile, accounts, company) => {
    const innerListData = () => {
      if (company !== null && "profiles" in company) {
        if (profile !== null && profile.is_admin) {
          return company.profiles.map((elem) => ({
            ...elem,
            balance: accounts
              .filter((acc) => acc.profile === elem.id)
              .reduce((sum, next) => sum + +next.balance, 0),
          }));
        }
        return company.profiles;
      }
      return [];
    };

    return innerListData().sort((a, b) => {
      if (a.is_admin === b.is_admin) {
        return 0;
      }
      if (a.is_admin) {
        return -1;
      }

      return 1;
    });
  }
);

export const getProfilesList = createSelector(
  getProfile,
  getCompany,
  (profile, company) =>
    (profile !== null && profile.is_admin ? company.profiles : [profile]).map(
      (elem, index) => ({
        index,
        text: getShortName(`${elem.first_name} ${elem.last_name}`),
        title: getShortName(`${elem.first_name} ${elem.last_name}`),
        id: elem.id,
        is_admin: elem.is_admin,
      })
    )
);

export const getCategoriesList = createSelector(getCategories, (categories) =>
  categories.map((elem, index) => ({
    index,
    text: elem.category_name,
    title: elem.category_name,
    id: elem.id,
  }))
);

export const getTagsList = createSelector(getTags, (tags) =>
  tags.map((elem, index) => ({
    index,
    text: elem.tag_name,
    title: elem.tag_name,
    id: elem.id,
  }))
);

export const getToAccountList = createSelector(
  getCompany,
  getProfile,
  (company, profile) =>
    company.profiles.map((elem, index) => ({
      text: `${elem.is_admin ? "⭐️ " : ""}${elem.first_name} ${
        elem.last_name
      } ${elem.id === profile.id ? "👈" : ""}`,
      items: elem.accounts.map((insideElem, insideIndex) => ({
        parentIndex: index,
        index: insideIndex,
        text: insideElem.split("(pk=")[0],
        id: insideElem.split("(pk=")[1].replace(")", ""),
      })),
    }))
);
