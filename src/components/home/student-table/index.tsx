import { 
    Box, 
    Collapse, 
    IconButton, 
    Table, 
    TableCell, 
    TableHead, 
    TableBody, 
    TableRow, 
    Typography, 
    TableContainer,
    Checkbox,
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    TextField,
    Theme
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from "react";
import StudentModel from "@models/student-model";
import { isEmpty } from 'lodash';
import { 
    getStudents, 
    updateStudent,
    deleteStudents
} from '@services/student-service';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userTable: {
            width: "100%",
            marginTop: "20px"
        },
        innerTable: {
            padding: "0px !important"
        },
        innerBox: {
            padding: "16px"
        },
        innerTableNoBottom: {
            padding: "0px !important",
            borderBottom: "0px !important"
        },
        skillsDialog: {
            width: "600%"
        },
        dialog: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        input: {
            width: "300px"
        },
        paper: {
            minWidth: "600px",
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function getSkillsSummary(skills: string[]) {
    const summary: string = new Array(skills).join(",");
    return summary.length > 6 ? 
        `${summary.substring(0, 6)}...` :
        summary;
}

function SkillsDialog(props: {
    openDialog: boolean,
    handleSave,
    handleClose,
}) {
    const {
        openDialog,
        handleSave,
        handleClose
    } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        setOpen(openDialog)
    }, [props]);

    return (
       <Dialog
            classes={{ paper: classes.paper}}
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a skill</DialogTitle>
                <TextField
                    autoFocus
                    className={classes.input}
                    margin="dense"
                    id="name"
                    onChange={e => setInputText(e.target.value)}
                />
                <DialogActions>
                    <Button 
                        color="primary"
                        onClick={() => handleClose()}>
                        Cancel
                    </Button>
                    <Button 
                        color="primary"
                        onClick={() => handleSave(inputText)}>
                        OK
                    </Button>
                </DialogActions>
        </Dialog>
    )
}

function Row(
    props: {
        student: StudentModel,
        handleCheck
    }
) {
    const classes = useStyles();
    const {student, handleCheck} = props;
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const openSkillsDialog = () => {
        setOpenDialog(true);
    }

    const closeSkillsDialog = () => {
        setOpenDialog(false);
    }

    async function saveSkillsAsync(newSkill: string) {
        const skills = student.skills;
        skills.push(newSkill);

        const request: StudentModel = {
            _id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            country: student.country,
            dateOfBirth: student.dateOfBirth,
            skills: skills 
        };
        await updateStudent(request);
        await getStudents({
            name: '',
            skills: []
        });
        closeSkillsDialog();
    }

    return (
        <React.Fragment>
            <TableRow 
                className={classes.userTable}
                tabIndex={-1}
                key={student._id}
                role="checkbox">
                <TableCell padding="checkbox">
                    <Checkbox 
                        id={student._id}
                        onChange={(event) => handleCheck(event, student._id)}
                        checked={student.checked} 
                        inputProps={{'aria-labelledby': student._id}}/>
                </TableCell>
                <TableCell>
                    <IconButton 
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell scope="student">
                    {`${student.firstName} ${student.lastName}`} 
                </TableCell>
                <TableCell>
                    {student.dateOfBirth}
                </TableCell>
                <TableCell>
                    {student.country}
                </TableCell>
                <TableCell>
                    {getSkillsSummary(student.skills)}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell 
                    className={open ? classes.innerTable: classes.innerTableNoBottom }
                    colSpan={6}>
                    <Collapse in={open}
                        timeout="auto"
                        unmountOnExit>
                        <Box className={classes.innerBox}>
                            <Typography 
                                variant="h5"
                                gutterBottom
                                component="div">
                                Skills
                            </Typography>
                            <Table size="small"
                                aria-label="skills">
                                <TableBody>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => openSkillsDialog()}>
                                    Add Skill
                                </Button>
                                    {student.skills.map((skill) => (
                                         <TableRow key={skill}>
                                             <TableCell 
                                                component="th" 
                                                scope="skill">
                                                 {skill}
                                             </TableCell>
                                         </TableRow>
                                    ))}
                                    <SkillsDialog 
                                        openDialog={openDialog} 
                                        handleClose={closeSkillsDialog}
                                        handleSave={saveSkillsAsync}
                                    />
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>    
    );
}

export default function StudentTable(props: {students: StudentModel[]}) {
    const [selectedAll, setSelectedAll] = useState(false);
    const [studentList, setStudentList] = useState<StudentModel[]>([]);
    
    useEffect(() => {
        setStudentList(props.students);
    }, [props]);
 
    const handleCheck = (event, id) => {
        const auxList = studentList;
        setStudentList((prevList) => {
            const aux = prevList.map(s => {
                const check = (s._id === id) ? event.target.checked : 
                    s.checked;
                return {
                    _id: s._id,
                    firstName: s.firstName,
                    lastName: s.lastName,
                    dateOfBirth: s.dateOfBirth,
                    country: s.country,
                    skills: s.skills,
                    checked: check
                }
            });
            return aux;
        });
    }

    const handleSelectAll = (event) => {
        const check = event.target.checked;
        setSelectedAll(check);
        setStudentList((prevList) => {
            const aux = prevList.map(s => {
                return {
                    _id: s._id,
                    firstName: s.firstName,
                    lastName: s.lastName,
                    dateOfBirth: s.dateOfBirth,
                    country: s.country,
                    skills: s.skills,
                    checked: check
                }
            });
            return aux;
        });
    }

    useEffect(()=> {
        if(!isEmpty(studentList)) {
            const filter = studentList.filter(s => !s.checked);
            setSelectedAll((prevChecked) => isEmpty(filter));
        }
    }, [studentList]);

    async function deleteStudentsAsync() {
        const filter: string[] = studentList
            .filter(s => s.checked === true)
            .map(x => x._id || '');
        if (!isEmpty(filter)) {
            await deleteStudents(filter);
            await getStudents({
                name: '',
                skills: []
            });
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <Checkbox
                            value={selectedAll}
                            checked={selectedAll}
                            onChange={(event) => handleSelectAll(event)}
                            inputProps={{ 'aria-label': 'Select all students' }} />
                        </TableCell>
                        <TableCell>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => deleteStudentsAsync()}>
                            Delete
                        </Button>
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>DOB</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Skills</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((row) => {
                        return (
                            <Row 
                                key={row._id} 
                                student={row} 
                                handleCheck={handleCheck} />
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
