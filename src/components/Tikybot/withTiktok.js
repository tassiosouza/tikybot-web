import React from 'react';
import TiktokContext from './context';
import { withFirebase } from '../Firebase';

const withTikybot = Componet => {
    class WithTikybot extends React.Component {
        constructor(props) {
            super(props);
        
            this.state = {
                tikybotUser: null,
            };
        }
       
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if(authUser) {
                        this.props.firebase.get
                    }
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null });
                },
            );
        }
    
        componentWillUnmount() {
          this.listener();
        }
    
        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                  <Component {...this.props} />
                </AuthUserContext.Provider>
              );
        }
      }
     
    return withFirebase(WithAuthentication);
};
     
export default withTikybot;
