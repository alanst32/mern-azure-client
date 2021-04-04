import { Button, TextField, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { Image, Jumbotron } from "react-bootstrap";
import ReactImage from '@assets/svg/react.svg';
import { insertStudents, getStudents } from '@services/student-service';
import StudentModel from "@models/student-model";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'inline-block',
            width: '100%',
            marginBottom: '20px',
        },
        jumbotron: {
            height: '300px',
            width: '100%',
            display: 'grid',
            justifyContent: 'center',
            margin: 'auto',
            backgroundColor: 'lightblue',
            marginBottom: '10px',
        },
        form: {
            display: 'flex',
            justifyContent: 'center'
        },
        infoBox: {
            display: 'flex',
            justifyContent: 'center',
            verticalAlign: 'center'
        },
        labelStyle: {
            fontSize: '32px',
            fontWeight: 'bold',
            verticalAlign: 'center'
        },
        insertBtn: {
            marginLeft: '20px'
        }
    }),
);

function JumbotronHeader(props) {
    const classes = useStyles();
    return (
        <Jumbotron className={classes.jumbotron}>
            <Image src={ReactImage}/>
            <h1>Students skills list: {props.totalStudents}</h1>
        </Jumbotron>
    );
}

export default function StudentForm(props) {
    const classes = useStyles();
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    
    async function insertStudentAsync() {
        const request: StudentModel = {
            firstName,
            lastName,
            country,
            dateOfBirth,
            skills: [] 
        };
        await insertStudents(request);
        await getStudents({
            name: '',
            skills: []
        });
    }

    return (
        <div className={classes.header}>
            <JumbotronHeader totalStudents={props.totalStudents}/>
            <form 
                className={classes.form}
                noValidate 
                autoComplete="off">
                <TextField 
                    id="firstName" 
                    label="First Name" 
                    variant="outlined" 
                    onChange={e => setFirstName(e.target.value)}/>
                <TextField 
                    id="lastName" 
                    label="Last Name" 
                    variant="outlined"
                    onChange={e => setLastName(e.target.value)}/>
                <TextField 
                    id="country" 
                    label="Country" 
                    variant="outlined"
                    onChange={e => setCountry(e.target.value)}/>
                <TextField 
                    id="dateOfBirth" 
                    label="DOB"
                    type="date" 
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setDateOfBirth(e.target.value)}/>
                <Button 
                    id="insertBtn"
                    className={classes.insertBtn}
                    variant="contained" 
                    color="primary"
                    onClick={() => insertStudentAsync()}>
                    Insert
                </Button>
            </form>
        </div>
    );
}
