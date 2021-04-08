import React from 'react';
import {SafeAreaView, Text, StyleSheet, View, ScrollView, Platform} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {Title} from "react-native-paper";
//todo: get height fore the scrollview maxHeight




const Options = (props) => {

    // console.log(props)


    return (


        <ScrollView

            style={{maxHeight: 480, marginTop: 10}}
            bounces={false}
        >
            <Grid style={styles.container}>
                <Row
                    style={[styles.row]}
                    onPress={() => props.navigation.navigate('OptionOne')}
                >
                    <Title style={styles.title}>
                        Create New Room
                    </Title>
                </Row>
                <Row style={[styles.row]}></Row>
                <Row style={[styles.row]}></Row>
                <Row style={[styles.row]}></Row>
                <Row style={[styles.row]}></Row>

            </Grid>

        </ScrollView>
    )
}

export default Options;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center'
    },
    row: {
        // backgroundColor: '',
        height: 100,
        width: 250,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 100,
        shadowRadius: 5,
        alignItems: 'center',

    },
    title: {
        marginLeft: 40,
        fontFamily: Platform.OS === 'android' ? 'serif': 'Times New Roman'
    }


})
