import { getShortName } from "./getShortName";

export const prepareOperationData = (
  company,
  accounts,
  transactions,
  actions,
  transfer
) => {
  const allOpprations = [];

  if (company !== null) {
    transactions.length !== 0 &&
      allOpprations.push(
        ...transactions.map((elem) => ({
          key: elem.last_updated,
          name: `${getShortName(elem.profile_name.split("(pk=")[0])} (${
            accounts.find((acc) => acc.id === elem.account).account_name
          })`,
          style: "color-danger-600",
          balance: elem.transaction_amount,
          tags: elem.tags,
          category: elem.category,
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
          name: `${getShortName(elem.profile_name.split("(pk=")[0])} (${
            accounts.find((acc) => acc.id === elem.account).account_name
          })`,
          style: "color-success-600",
          balance: elem.action_amount,
          tags: elem.tags,
          category: elem.category,
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
          name: `${getShortName(elem.from_profile.split(" (")[0])} (${
            elem.from_account.split(" (pk=")[0]
          }) => ${getShortName(elem.to_profile.split(" (")[0])} (${
            elem.to_account.split(" (pk=")[0]
          })`,
          balance: elem.transfer_amount,
          tags: elem.tags,
          category: elem.category,
          id: elem.id,
          from_account: elem.from_account,
          to_account: elem.to_account,
          type: "transfer",
          last_updated: elem.last_updated,
        }))
      );
  }

  return allOpprations.sort((a, b) => new Date(b.key) - new Date(a.key));
};
