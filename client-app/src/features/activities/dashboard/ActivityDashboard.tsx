import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

// activities within the function declaration is gotten from our Props interface, and can as such now be used as 'activities' in our jsx
// only sho ActivityDetails if activities[0] exists. '&&' will execute anything to the right of it, if the left condition is not null
export default observer( function ActivityDashboard() {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails /> }
                {editMode &&
                <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
})