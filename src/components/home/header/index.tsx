import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Image, Jumbotron } from "react-bootstrap";
import '@app/home/header/header.scss';
import ReactImage from '@assets/svg/react.svg'; 

function JumbotronHeader(totalUsers) {
    return (
        <Jumbotron className="jumbrotron">
            <Image src={ReactImage}/>
            <h1>Users skills list: {totalUsers}</h1>
        </Jumbotron>
    );
}

export default function HeaderHome(totalUsers) {
    const [firstName, setFirstName ] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    return (
        <header className="header">
            <JumbotronHeader totalUsers={totalUsers}/>
            <form className="form" noValidate autoComplete="off">
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
                <TextField id="country" 
                    label="Country" 
                    variant="outlined"
                    onChange={e => setCountry(e.target.value)}/>
                <TextField id="dateOfBirth" 
                    label="DOB"
                    type="date" 
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setDateOfBirth(e.target.value)}/>
            </form>
        </header>
    );
}
