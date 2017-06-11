// React
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { createFilter, createBlacklistFilter } from 'redux-persist-transform-filter';

// Store
import store from './store';

// Component
import App from './App';

// you want to store only a subset of your state of reducer one
const saveSubsetFilter = createFilter(
  'recipes',
  ['id', 'keyYouWantToSave2']
);

export default class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, { transforms: [
    saveSubsetFilter,
    saveSubsetBlacklistFilter,
    loadSubsetFilter,
    saveAndloadSubsetFilter,
  ]}, () => {
      this.setState({ rehydrated: true });
    })
  }
  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>
    }
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

ReactDOM.render(<AppProvider />, document.getElementById('root'));
