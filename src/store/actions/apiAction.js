import { getCompany } from "./companyAction";
import { getAccount } from "./accountAction";
import { getTransaction } from "./transactionAction";
import { getAction } from "./actionAction";
import { getTransfer } from "./transferAction";
import { getCategory } from "./categoryAction";
import { getTag } from "./tagAction";
import { START_LOADER, END_LOADER } from "../types";

export const startLoader = () => dispatch => {
  dispatch({
    type: START_LOADER
  });
};

export const endLoader = () => dispatch => {
  dispatch({
    type: END_LOADER
  });
};

export const getDataDispatcher = () => async dispatch =>
  await Promise.all([
    dispatch(getCompany()),
    dispatch(getAccount()),
    dispatch(getTransaction()),
    dispatch(getAction()),
    dispatch(getTransfer()),
    dispatch(getCategory()),
    dispatch(getTag())
  ]);
