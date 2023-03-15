declare interface IEditorAssistantWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  InitialPromptFieldLabel: string;
  ApiErrorMessage: string;
  ThinkingMessage: string;
  SubmitButtonLabel: string;
  ClearButtonLabel: string;
  PromptPlaceholder: string;
}

declare module 'EditorAssistantWebPartStrings' {
  const strings: IEditorAssistantWebPartStrings;
  export = strings;
}
