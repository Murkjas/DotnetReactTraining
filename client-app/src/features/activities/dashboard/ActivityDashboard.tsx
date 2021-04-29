import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (acvitity : Activity) => void;
    deleteActivity: (id: string) => void;
}
// activities within the function declaration is gotten from our Props interface, and can as such now be used as 'activities' in our jsx
// only sho ActivityDetails if activities[0] exists. '&&' will execute anything to the right of it, if the left condition is not null
export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit, deleteActivity}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities}
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails activity={selectedActivity}
                cancelSelectActivity={cancelSelectActivity}
                openForm={openForm}
                /> }
                {editMode &&
                <ActivityForm closeForm={closeForm} activity={selectedActivity} createOrEdit={createOrEdit}/>}
            </Grid.Column>
        </Grid>
    )
}