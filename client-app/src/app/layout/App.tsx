import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

// useEffect will always run after this component(App) renders. After it's been rendered, we want to fetch all activities
useEffect(() => {
  activityStore.loadActivities();
}, [activityStore])

if(activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    // React always has to return one element. We add the extra brackets to do this, as otherwise both NavBar and Container would be at the top level
    // We pass down our properties to ActivityDashboard
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard />
      </Container>  
    </>
  );
}

export default observer(App);
