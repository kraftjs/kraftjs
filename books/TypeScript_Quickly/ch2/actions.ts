export class SearchAction {
  actionType = 'SEARCH';
  constructor(readonly payload: { searchQuery: string }) {}
}

export class SearchSuccessAction {
  actionType = 'SEARCH_SUCCESS';
  constructor(public payload: { searchResults: string[] }) {}
}

export class SearchFailedAction {
  actionType = 'SEARCH_FAILED';
}

export type SearchActions =
  | SearchAction
  | SearchSuccessAction
  | SearchFailedAction;

// Type SearchActions is an example of a discriminated union because
// each members has an actionType discriminant.
