export enum ActiveVotingTab {
  MoneyPool = 'money-pool',
  AccessToContent = 'access-to-content',
}
export const ACTIVE_PAGE_TO_REWARD_TYPE_MAP = {
  [ActiveVotingTab.MoneyPool]: 0,
  [ActiveVotingTab.AccessToContent]: 1,
}
