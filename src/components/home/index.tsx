import React from "react";
import Header from '@app/home/header';


export default function Home() {

    return (
        <Header totalUsers={0}></Header>   
    )
}


/*

export default function Login() {
    const [login, setLogin ] = useState( '' );
    const [password, setPassword] = useState( '' );
    const navigation = useNavigation();

    const userAuthenticated = () => {
        navigation.navigate('Home');
    } 
    
    const authenticatePost = () => {
        const params = {
            login: login,
            pass: password
        };
    
        // axios.post(`/api/skoogle/authentication`, params)
        //     .then(res => 
        //         // navigate to other page
        //         console.log(res)
        //     )
        //     .catch(err =>
        //         console.error(err)
        //     );
    
        userAuthenticated();
    }

    return (
        <SView style={styles.container}>
            <SView style={styles.container}>
                <SText style={styles.title}>Skoogle</SText>
            </SView>
            <SView style={styles.container}>
                <SView style={styles.contentView}>
                    <SText style={styles.label}>User:</SText>
                    <STextInput style={styles.textInput} 
                        placeholder="type your user"
                        onChangeText={x => setLogin(x)}>
                    </STextInput>
                </SView>
                <SView style={styles.contentView}>
                    <SText style={styles.label}>Password:</SText>
                    <STextInput style={styles.textInput} 
                        placeholder="type your password"
                        onChangeText={x => setPassword(x)}>
                    </STextInput>
                </SView>
                <SView style={styles.container}>
                    <SButton title="Enter" 
                        onPress={() => authenticatePost()}>
                    </SButton>
                </SView>
            </SView>
        </SView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentView: {
        width: 300,
        margin: 10,
        flexDirection: 'row'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    label: {
        width: 90,
    },
    textInput: {
        width: 200
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});



*/