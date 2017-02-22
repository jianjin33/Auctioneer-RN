import React,{Component} from 'react'
import {
    Navigator,
}from 'react-native'

import WelcomePage from './WelcomePage'

function setup(){
    class Root extends Component {
        constructor(props) {
            super(props);
            this.state = {
            };
        }

        render() {
          let defaultName = 'WelcomePage';
          let defaultComponent = WelcomePage;
          return (
          <Navigator
            initialRoute={{ name: defaultName, component: defaultComponent }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.PushFromRight;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.params} navigator={navigator} />
            }} />
          );
        }
    }

    return <Root/>;
}

module.exports = setup;
