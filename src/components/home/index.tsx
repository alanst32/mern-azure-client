import React, { useEffect, useState } from "react";
import StudentForm from '@app/home/student-form';
import UserTable from '@app/home/student-table';
import {getStudents, getStudentsObservable} from '@services/student-service';
import _ from 'lodash';
import StudentModel from "@models/student-model";
import StudentTable from "@app/home/student-table";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        home: {
            width: '98%',
            justifyContent: 'center',
            textAlign: 'center',
            margin: 'auto'
        }
    }),
);

export default function Home() {
    const classes = useStyles();
    const[totalStudents, setTotalStudents] = useState(0);
    const[name, setName] = useState('');
    const[skills, setSkills] = useState<string[]>([]);
    const[students, setStudents] = useState<StudentModel[]>([]);
    const emptyStudentModel: StudentModel = {
        _id: '',
        firstName: '',
        lastName: '',
        country: '',
        dateOfBirth: '',
        skills: []
    };
    
    useEffect(() => {
        const request = {
            name,
            skills
        }
        getStudents(request);
    }, []);

    useEffect(() => {
        const subscription = getStudentsObservable().subscribe((list: StudentModel[]) => {
            if (!_.isEmpty(list)) {
                const size: number = list.length;
                const aux: StudentModel[] = list;
                setTotalStudents(users => size);
                list.forEach(x => x.checked = false);
                setStudents(list);
            }
            else {
                setTotalStudents(students => 0);
                setStudents(students => []);
            } 
        });

        return subscription.unsubscribe;
    },[]);

    return (
        <div className={classes.home}>
            <StudentForm totalStudents={totalStudents}></StudentForm>   
            <StudentTable students={students}></StudentTable>
        </div>
    );
}
