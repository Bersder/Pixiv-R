import React, { Component } from 'react'
import SiteHeader from './components/SiteHeader'

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <SiteHeader />
      </>
    );
  }
}

export default App;