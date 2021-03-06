import React, { Component } from 'react';
import Delay from 'react-delay';
import { auth } from '../firebase';

export default WrappedComponent => { // HOC 
  class WithAuthentication extends Component {
    state = {
      providerData: []
    };

    componentDidMount() {
      auth.getAuth().onAuthStateChanged(user => {
        if (user !== null) {
          this.setState({ providerData: user.providerData });
        } else {
          console.info('Must be authenticated');
          this.props.history.push('/'); // redirects to '/', see 'Programmatically navigate with React Router'
        }
      });
    }

    render() {
      return this.state.providerData.length > 0 ? (
        <WrappedComponent
          {...this.props}
          providerData={this.state.providerData}
        />
      ) : (
        <Delay wait={250}>
          <p>Loading...</p>
        </Delay>
      );
    }
  }

  return WithAuthentication;
};