// This file contains the constants used in the app
// and is used to define the routes for the navigation stack.
export enum Routes {
  Home = 'Home',
  Details = 'Details',
}

export type RootNavigationParamList = {
  [Routes.Home]: undefined;
  [Routes.Details]: {url: string};
};
