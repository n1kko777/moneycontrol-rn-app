import { getShortName } from "./getShortName";

export const prepareOperationData = (
  company,
  transactions,
  actions,
  transfer
) => {
  const allOpprations = [];

  if (company.profiles !== undefined) {
    transactions.length !== 0 &&
      allOpprations.push(
        ...transactions.map((elem) => ({
          id: elem.last_updated,
          name: getShortName(elem.profile_name.split("(pk=")[0]),
          style: "color-danger-600",
          balance: elem.transaction_amount,
          tags: elem.tags,
          category: elem.category,
        }))
      );

    actions.length !== 0 &&
      allOpprations.push(
        ...actions.map((elem) => ({
          id: elem.last_updated,
          name: getShortName(elem.profile_name.split("(pk=")[0]),
          style: "color-success-600",
          balance: elem.action_amount,
          tags: elem.tags,
          category: elem.category,
        }))
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
          tags: elem.tags,
          category: elem.category,
        }))
      );
  }

  return allOpprations
    .sort((a, b) => new Date(b.id) - new Date(a.id))
    .filter((el, index) => index < 15);
};
