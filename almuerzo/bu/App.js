import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MealsScreen from './screens/Meals';
import ModalScreen from './screens/Modal';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import AuthLoading from './screens/AuthLoading';
import MisPedidosScreen from './screens/MisPedidos';
import Me from './screens/me';


const OnBoardingNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
}, {
  initialRouteName: 'Login',
})


const AppNavigator = createStackNavigator({
  Meals: {
    screen: MealsScreen,
  },
  MisPedidos: {
    screen: MisPedidosScreen,
  },
  Me: {
    screen: Me,
  },
},
  {
    initialRouteName: 'Meals'
  })


const RootStack = createStackNavigator({
  Main: AppNavigator,
  Modal: ModalScreen,

}, {
  mode: 'modal',
  headerMode: 'none',
})

const BaseStack = createSwitchNavigator({
  AuthLoading: AuthLoading,
  OnBoarding: OnBoardingNavigator, // login si no encuentra el token
  Root: RootStack, //meals.
}, {
  initialRouteName: 'AuthLoading'
})

export default createAppContainer(BaseStack)

