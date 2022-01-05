import { splitToDigits } from './splitToDigits';

export const getAccountTitle = (account) =>
  `${account.account_name} (${splitToDigits(account.balance)} ₽)`;
