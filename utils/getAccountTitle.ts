import { splitToDigits } from './splitToDigits';

export const getAccountTitle = (account: any) =>
  `${account.account_name} (${splitToDigits(account.balance)} ₽)`;
