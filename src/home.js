import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { changeUser } from './store/action'

function Home(props) {
    return (
        <View style={styles.container}>
            <Text>{props.user}</Text>
            <Button onPress={() => props.changeUser()} title="Click" />
        </View>
    );
}

function mapStateToProp(state) {
    return ({
        user: state.user,
        age: state.age
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        changeUser: () => { dispatch(changeUser()) },
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default connect(mapStateToProp, mapDispatchToProp)(Home);

