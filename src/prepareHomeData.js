import { getShortName } from "./getShortName";

export const prepareHomeData = (
  profile,
  company,
  accounts,
  transactions,
  actions,
  transfer,
  categories,
  tags
) => {
  const allOpprations = [];
  const homeListData = [];

  if (company.profiles !== undefined) {
    transactions.length !== 0 &&
      allOpprations.push(
        ...transactions.map((elem) => ({
          key: elem.last_updated,
          name: getShortName(elem.profile_name.split("(pk=")[0]),
          style: "color-danger-600",
          balance: elem.transaction_amount,
          id: elem.id,
          type: "transaction",
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
          type: "action",
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
          id: elem.id,
          type: "transfer",
        }))
      );

    accounts.length !== 0 &&
      homeListData.push({
        navigate: "Account",
        title: "Счета",
        data: accounts
          .filter((acc) => profile !== null && acc.profile === profile.id)
          .map((elem) => ({
            key: elem.last_updated,
            name: elem.account_name,
            balance: elem.balance,
          })),
      });

    categories.length !== 0 &&
      homeListData.push({
        navigate: "Category",
        title: "Категории",
        data: categories.map((elem) => ({
          key: elem.last_updated,
          name: elem.category_name,
          balance: "",
        })),
      });

    tags.length !== 0 &&
      homeListData.push({
        navigate: "Tag",
        title: "Теги",
        data: tags.map((elem) => ({
          key: elem.last_updated,
          name: elem.tag_name,
          balance: "",
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
