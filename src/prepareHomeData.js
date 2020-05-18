import { getShortName } from "./getShortName";
import moment from "moment";

export const prepareHomeData = (
  profile,
  company,
  accounts,
  transactions,
  actions,
  transfer,
  categories = [],
  tags = []
) => {
  const allOpprations = [];
  const homeListData = [];

  if (company !== undefined) {
    transactions.length !== 0 &&
      allOpprations.push(
        ...transactions.map((elem) => ({
          key: elem.last_updated,
          name: getShortName(elem.profile_name.split("(pk=")[0]),
          style: "color-danger-600",
          balance: elem.transaction_amount,
          id: elem.id,
          account: elem.account,
          type: "transaction",
          last_updated: elem.last_updated,
        }))
      );

    actions.length !== 0 &&
      allOpprations.push(
        ...actions.map((elem) => ({
          key: elem.last_updated,
          name: getShortName(elem.profile_name.split("(pk=")[0]),
          style: "color-success-600",
          balance: elem.action_amount,
          id: elem.id,
          account: elem.account,
          type: "action",
          last_updated: elem.last_updated,
        }))
      );

    transfer.length !== 0 &&
      allOpprations.push(
        ...transfer.map((elem) => ({
          key: elem.last_updated,
          name:
            getShortName(elem.from_profile.split(" (")[0]) +
            " => " +
            getShortName(elem.to_profile.split(" (")[0]),
          balance: elem.transfer_amount,
          from_account: elem.from_account,
          to_account: elem.to_account,
          id: elem.id,
          type: "transfer",
          last_updated: elem.last_updated,
        }))
      );

    accounts.length !== 0 &&
      homeListData.push({
        navigate: "Account",
        title: "Счета",
        data: accounts
          .filter((acc) => profile !== null && acc.profile === profile.id)
          .map((elem) => ({
            id: elem.id,
            key: elem.last_updated,
            name: elem.account_name,
            balance: elem.balance,
            type: "account",
            last_updated: elem.last_updated,
          })),
      });

    categories.length !== 0 &&
      homeListData.push({
        navigate: "Category",
        title: "Категории",
        data: categories.map((elem) => ({
          id: elem.id,
          key: elem.last_updated,
          name: elem.category_name,
          balance: "",
          type: "category",
          last_updated: elem.last_updated,
        })),
      });

    tags.length !== 0 &&
      homeListData.push({
        navigate: "Tag",
        title: "Теги",
        data: tags.map((elem) => ({
          id: elem.id,
          key: elem.last_updated,
          name: elem.tag_name,
          balance: "",
          type: "tag",
          last_updated: elem.last_updated,
        })),
      });

    [...allOpprations].length !== 0 &&
      homeListData.push({
        navigate: "Operation",
        title: "Последние операции",
        data: allOpprations
          .sort((a, b) => new Date(b.key) - new Date(a.key))
          .filter((el, index) => index < 15),
      });
  }

  return homeListData;
};
