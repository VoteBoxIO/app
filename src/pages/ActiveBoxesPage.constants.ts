export enum BoxTypeTab {
  MoneyPool = 'money-pool',
  AccessToContent = 'access-to-content',
}
export const ACTIVE_PAGE_TO_REWARD_TYPE_MAP = {
  [BoxTypeTab.MoneyPool]: 0,
  [BoxTypeTab.AccessToContent]: 1,
}
