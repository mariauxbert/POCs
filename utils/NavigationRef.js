import { CommonActions } from '@react-navigation/native';

let navigationRef;

// Function to set the navigation reference
export const setNavigationReference = ref => {
  navigationRef = ref;
};

// Function to navigate to a specific screen
export const navigateToScreen = (screenName, params) => {
  navigationRef.dispatch(
    CommonActions.navigate({
      name: screenName,
      params: params,
    })
  );
};

// Function to go back to the previous screen
export const goBack = () => {
  navigationRef.dispatch(CommonActions.goBack());
};

// Function to replace the current screen with another screen
export const replaceScreen = (screenName, params) => {
  navigationRef.dispatch(
    CommonActions.replace(screenName, params)
  );
};

// Function to reset the navigation stack and navigate to a specific screen
export const resetNavigation = (screenName, params) => {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: screenName, params: params }],
    })
  );
};
