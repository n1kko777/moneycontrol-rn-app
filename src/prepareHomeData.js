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
        ...transactions.map((elem) => {
          const currentProfile = company.profiles.find(
            (cProf) =>
              cProf.accounts
                .filter((elem) => elem !== "")
                .find(
                  (cProfAcc) =>
                    cProfAcc.split("pk=")[1].match(/(\d+)/)[0] == elem.account
                ) !== undefined
          );

          return {
            id: elem.last_updated,
            name:
              currentProfile !== undefined
                ? `${getShortName(
                    `${currentProfile.first_name} ${currentProfile.last_name}`
                  )}${currentProfile.is_admin ? " ⭐️" : ""}`
                : "Удалено",
            style: "color-danger-600",
            balance: elem.transaction_amount,
          };
        })
      );

    actions.length !== 0 &&
      allOpprations.push(
        ...actions.map((elem) => {
          const currentProfile = company.profiles.find(
            (cProf) =>
              cProf.accounts
                .filter((elem) => elem !== "")
                .find(
                  (cProfAcc) =>
                    cProfAcc.split("pk=")[1].match(/(\d+)/)[0] == elem.account
                ) !== undefined
          );

          return {
            id: elem.last_updated,
            name:
              currentProfile !== undefined
                ? `${getShortName(
                    `${currentProfile.first_name} ${currentProfile.last_name}`
                  )}${currentProfile.is_admin ? " ⭐️" : ""}`
                : "Удалено",
            style: "color-success-600",
            balance: elem.action_amount,
          };
        })
      );

    transfer.length !== 0 &&
      allOpprations.push(
        ...transfer.map((elem) => ({
          id: elem.last_updated,
          name:
            getShortName(elem.from_profile.split(" (")[0]) +
            " => " +
            getShortName(elem.to_profile.split(" (")[0]),
          balance: elem.transfer_amount,
        }))
      );

    accounts.length !== 0 &&
      homeListData.push({
        navigate: "Account",
        title: "Счета",
        data: accounts
          .filter((acc) => acc.profile === profile.id)
          .map((elem) => ({
            id: elem.last_updated,
            name: elem.account_name,
            balance: elem.balance,
          })),
      });

    categories.length !== 0 &&
      homeListData.push({
        navigate: "Category",
        title: "Категории",
        data: categories.map((elem) => ({
          id: elem.last_updated,
          name: elem.category_name,
          balance: "",
        })),
      });

    tags.length !== 0 &&
      homeListData.push({
        navigate: "Tag",
        title: "Теги",
        data: tags.map((elem) => ({
          id: elem.last_updated,
          name: elem.tag_name,
          balance: "",
        })),
      });

    [...allOpprations].length !== 0 &&
      homeListData.push({
        navigate: "Operation",
        title: "Последние операции",
        data: allOpprations
          .sort((a, b) => new Date(b.id) - new Date(a.id))
          .filter((el, index) => index < 15),
      });
  }

  return homeListData;
};
