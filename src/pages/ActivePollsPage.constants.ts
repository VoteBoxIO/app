export enum PollTypeTab {
  MoneyPool = 'money-pool',
  AccessToContent = 'access-to-content',
}
export const ACTIVE_PAGE_TO_REWARD_TYPE_MAP = {
  [PollTypeTab.MoneyPool]: 0,
  [PollTypeTab.AccessToContent]: 1,
}
