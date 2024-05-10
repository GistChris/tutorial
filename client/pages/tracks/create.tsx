import MainLayout from '@/components/layouts/MainLayout';
import {Button, Card, Grid } from '@mui/material';

import React from 'react';

const Create = () => {
    return (
        // <MainLayout>
            <Grid container>
                <Card>
                    <Grid container justifyContent={'space-between'}>
                        <h1>Tracks List</h1>
                        <Button>Load track</Button>
                    </Grid>    
                </Card>
            </Grid>
        // </MainLayout>
    );
};

export default Create;