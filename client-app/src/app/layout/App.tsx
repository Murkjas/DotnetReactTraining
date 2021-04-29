import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {

const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined> (undefined);
const [editMode, setEditMode] = useState(false);
const [loading, setLoading] = useState(true);
const [submitting, setSubmitting] = useState(false);

useEffect(() => {
  agent.Activities.list().then(response => {
    // Temporary solution to display dates on our form
    let activities: Activity[] = [];
    response.forEach(activity =>{
      activity.date = activity.date.split('T')[0];
      activities.push(activity);
    })
    setActivities(activities);
    setLoading(false);
  })
}, [])

// x represents a single activity from our activity list 'activities'. When one is found where x.id matches our selected id, we set it to id
function handleSelectActivity(id: string) {
  setSelectedActivity(activities.find(x => x.id === id));
}

function handleCancelSelectActivity() {
  setSelectedActivity(undefined);
}

function handleFormOpen(id?: string) {
  id ? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
}

function handleFormClose() {
  setEditMode(false);
}

// 
function handleCreateOrEditActivity(activity: Activity) {
  setSubmitting(true);
  if(activity.id){
    agent.Activities.update(activity).then(() => {
      // Remove the activity we're updating, and replace it with the activity we're passing as a parameter
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  } else {
    // If we don't  have an activity ID, we know we're creating an activity
    activity.id = uuid();
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }
}

function handleDeleteActivity(id: string) {
  setSubmitting(true);
  agent.Activities.delete(id).then(() => {
    setActivities([...activities.filter(x => x.id !== id)]);
    setSubmitting(false);
  })
}

if(loading) return <LoadingComponent content='Loading app' />

  return (
    // React always has to return one element. We add the extra brackets to do this, as otherwise both NavBar and Container are at the top level
    // Pass down our properties to ActivityDashboard
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectActivity={handleCancelSelectActivity}
        editMode={editMode}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrEdit={handleCreateOrEditActivity}
        deleteActivity={handleDeleteActivity}
        submitting={submitting}/>
      </Container>  
    </>
  );
}

export default App;
