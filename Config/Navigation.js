/*
1) Stack Navigation
2) Tab Navigation
3) Drawer Navigation
4) Switch Navigation
*/
//this.props.navigation.navigate()

import { createDrawerNavigator, createMaterialTopTabNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import * as Routes from '../Component/index';
/*


const AuthNavigator = createStackNavigator({
    Login: {
        screen: Routes.Login
    }
});

const TabNavigator = createMaterialTopTabNavigator({
    Ads: {
        screen: Routes.Ads
    },
    'Post Ads': {
        screen: Routes.PostAd
    }
})

const AppNavigator = createDrawerNavigator({
    Home: {
        screen: TabNavigator
    },
    Profile: {
        screen: Routes.Profile
    }
}, {});

const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: AppNavigator
    }
});

export default createAppContainer(MainNavigator);*/


const AuthNavigator = createStackNavigator({
    Login: {
      screen: Routes.Login //LoginScreen
    },
    Registration: {
        screen: Routes.Registration// HomeScreen
      },

  },
  {
    headerMode:"none"  
  }
  );
  
  const AppNavigator = createStackNavigator({
    
    Getusers: {
        screen: Routes.Getusers// HomeScreen
      },
      Cht: {
               screen: Routes.Cht// HomeScreen
              },
    //   MyHeader: {
    //            screen: Routes.MyHeader// HomeScreen
    //           },

    },
    {
      headerMode:"none"  
  }
  
  );
//   const AppNa = createStackNavigator({
    
//     Cht: {
//         screen: Routes.Cht// HomeScreen
//       },
     
//     },
//     {
//       headerMode:"none"  
//   }
  
//   );
  
  const MainNavigator = createSwitchNavigator({
    Auth: {
        screen: AuthNavigator
    },
    App: {
        screen: AppNavigator
    },
//     AppN: {
//         screen: AppNa
//     }
   });

   export default createAppContainer(MainNavigator);
