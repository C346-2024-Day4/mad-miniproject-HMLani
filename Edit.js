import { amiiboData } from "./Data.js";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, Modal} from "react-native";
import {useFonts} from "expo-font";
import {useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Icon from "react-native-vector-icons/FontAwesome6";

const Edit = ({navigation, route}) => {
    const [imgHeadID, setImgHeadID] = useState(route.params.imgHeadId);
    const [imgTailID, setImgTailID] = useState(route.params.imgTailId);
    const [character, setCharacter] = useState(route.params.character);
    const [releaseDate, setReleaseDate] = useState(route.params.releaseDate);
    const [presentBy, setPresentBy] = useState(route.params.presentBy);
    const [desc, setDesc] = useState(route.params.desc);
    const [alertSaveVisible, setAlertSaveVisible] = useState(false);
    const [alertDelVisible, setAlertDelVisible] = useState(false);

    const [isLoaded] = useFonts({
        'Mina-Bold': require('./assets/fonts/MinaBold.ttf'),
        'YaHei-Light': require('./assets/fonts/MicrosoftYaHeiLight.ttf'),
        'YaHei-Bold': require('./assets/fonts/MicrosoftYaHeiBold.ttf'),
        'Pretendo-Regular': require('./assets/fonts/Pretendo.ttf'),
    });

    const handleOnLayout = useCallback(async () => {
        if (isLoaded) {
            await SplashScreen.hideAsync(); //hide the splashscreen
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }

    return(
        <SafeAreaView onLayout={handleOnLayout}>
            <ScrollView style={styles.bg}>
                <View style={{backgroundColor: '#FFFFFF', height: '4%'}}></View>
                <View style={styles.top}>
                    <Image
                        source={require('./assets/img/Nintendo-Logo.png')}
                        style={{width: 150, height: 150, alignSelf: 'center', marginTop: -60}}
                    />
                    <Image
                        source={require('./assets/img/Amiibo-logo.png')}
                        style={{width: 250, height: 50, alignSelf: 'center', marginTop: -60}}
                    />
                </View>

                <TouchableOpacity onPress={() => {
                    navigation.navigate('View', {
                        index: route.params.index,
                        type: route.params.type,
                        imgHeadId: imgHeadID,
                        imgTailId: imgTailID,
                        character: character,
                        releaseDate: releaseDate,
                        presentBy: presentBy,
                        desc: desc,
                    });
                    // navigation.navigate('Home');
                }}>
                    <Text style={styles.backBtnStyle}>
                        <Icon name={'angle-left'}/> Back
                    </Text>
                </TouchableOpacity>

                <Text style={styles.titleStyle}>
                    Edit <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 30}}>amiibo</Text> details
                </Text>

                <View style={styles.container}>
                    <Text style={styles.textHeaderStyle}>Head ID:</Text>
                    <TextInput
                        value={imgHeadID}
                        style={styles.inputStyle}
                        onChangeText={(text) => setImgHeadID(text)}
                    />

                    <Text style={styles.textHeaderStyle}>Tail ID:</Text>
                    <TextInput
                        value={imgTailID}
                        style={styles.inputStyle}
                        onChangeText={(text) => setImgTailID(text)}
                    />

                    <Text style={styles.textHeaderStyle}>
                        <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 15}}>amiibo</Text> Name:
                    </Text>
                    <TextInput
                        value={character}
                        style={styles.inputStyle}
                        onChangeText={(text) => setCharacter(text)}
                    />

                    <Text style={styles.textHeaderStyle}>Release Date:</Text>
                    <TextInput
                        value={releaseDate}
                        style={styles.inputStyle}
                        onChangeText={(text) => setReleaseDate(text)}
                    />

                    <Text style={styles.textHeaderStyle}>Present By:</Text>
                    <TextInput
                        value={presentBy}
                        style={styles.inputStyle}
                        onChangeText={(text) => setPresentBy(text)}
                    />

                    <Text style={styles.textHeaderStyle}>Description:</Text>
                    <TextInput
                        value={desc}
                        style={[styles.inputStyle, {minHeight: 150, maxHeight: 150}]}
                        onChangeText={(text) => setDesc(text)}
                        multiline={true}
                    />

                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={alertSaveVisible}
                        onRequestClose={() => {
                            setAlertSaveVisible(!alertSaveVisible);
                        }}
                    >
                        <View style={styles.alertOverlay}>
                            <View style={styles.alertContainer}>
                                <Image
                                    source={require('./assets/img/amiibo-logo2.png')}
                                    style={{width: 150, height: 150, objectFit: 'contain'}}
                                />
                                <Text style={styles.alertMsg}>Details saved</Text>
                                <View style={styles.alertBtnContainer}>
                                    <TouchableOpacity
                                        style={styles.alertBtn}
                                        onPress={() => {
                                            let indexnum = 2;
                                            if (route.params.type === 'Super Smash Bros. Series') {
                                                indexnum = 0;
                                            } else if (route.params.type === 'Super Mario Series') {
                                                indexnum = 1;
                                            }

                                            amiiboData[indexnum].data[route.params.index].imgHeadId = imgHeadID;
                                            amiiboData[indexnum].data[route.params.index].imgTailId = imgTailID;
                                            amiiboData[indexnum].data[route.params.index].character = character;
                                            amiiboData[indexnum].data[route.params.index].releaseDate = releaseDate;
                                            amiiboData[indexnum].data[route.params.index].presentBy = presentBy;
                                            amiiboData[indexnum].data[route.params.index].desc = desc;
                                            navigation.navigate('View', {
                                                index: route.params.index,
                                                type: route.params.type,
                                                imgHeadId: imgHeadID,
                                                imgTailId: imgTailID,
                                                character: character,
                                                releaseDate: releaseDate,
                                                presentBy: presentBy,
                                                desc: desc,
                                            });

                                            setAlertSaveVisible(false);
                                        }}
                                    >
                                        <Text style={styles.alertTextBtn}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={alertDelVisible}
                        onRequestClose={() => {
                            setAlertDelVisible(!alertDelVisible);
                        }}
                    >
                        <View style={styles.alertOverlay}>
                            <View style={styles.alertContainer}>
                                <Image
                                    source={require('./assets/img/amiibo-logo2.png')}
                                    style={{width: 150, height: 150, objectFit: 'contain'}}
                                />
                                <Text style={styles.alertMsg}>
                                    Are you sure you want to delete this <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 25}}>amiibo</Text>?
                                </Text>
                                <View style={styles.alertBtnContainer}>
                                    <TouchableOpacity
                                        style={styles.alertBtn}
                                        onPress={() => {
                                            let indexnum = 2;
                                            if (route.params.type === 'Super Smash Bros. Series') {
                                                indexnum = 0;
                                            } else if (route.params.type === 'Super Mario Series') {
                                                indexnum = 1;
                                            }
                                            amiiboData[indexnum].data.splice(route.params.index, 1);
                                            navigation.navigate('Home');
                                            setAlertDelVisible(false);
                                        }}
                                    >
                                        <Text style={styles.alertTextBtn}>YES</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.alertButton}
                                        onPress={() => setAlertDelVisible(false)}
                                    >
                                        <Text style={styles.alertTextBtn}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.btnStyles}>
                        <TouchableOpacity style={styles.btnSubmitStyle} onPress={() => setAlertSaveVisible(true)}>
                            <View>
                                <Text style={{fontFamily: 'YaHei-Bold'}}>
                                    SAVE
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnDelStyle} onPress={() => {setAlertDelVisible(true);}}>
                            <View>
                                <Text style={{fontFamily: 'YaHei-Bold'}}>
                                    DELETE
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Edit;

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#E60012',
        height: '100%',
    },

    top: {
        backgroundColor: '#FFFFFF',
        height: '10%',
        borderBottomLeftRadius: 105,
        borderBottomRightRadius: 105,
    },

    titleStyle: {
        fontSize: 30,
        marginTop: 10,
        marginBottom: -10,
        textAlign: 'center',
        fontFamily: 'Pretendo-Regular',
        color: 'white',
    },

    container: {
        padding: 20
    },

    inputStyle: {
        borderWidth: .8,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
        height: 55,
        paddingLeft: 16
    },

    textHeaderStyle: {
        fontFamily: 'YaHei-Bold',
        fontSize: 15,
        color: 'white',
    },

    btnSubmitStyle: {
        padding: 15,
        backgroundColor: '#E18585',
        flex: 1,
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    },

    btnDelStyle: {
        padding: 15,
        backgroundColor: '#EF5151',
        flex: 1,
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    },

    btnStyles: {
        // paddingTop: 60,
        // paddingBottom: 60,
        flexDirection: 'row',
        marginBottom: 20
    },

    backBtnStyle: {
        marginTop: 10,
        marginLeft: 5,
        width: 100,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'YaHei-Bold',
        fontSize: 15
    },

    alertOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .8)',
    },

    alertContainer: {
        width: '80%',
        backgroundColor: '#AF000E',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },

    alertMsg: {
        fontFamily: 'YaHei-Bold',
        fontSize: 20,
        marginVertical: 10,
        textAlign: 'center',
        color: 'white',
    },

    alertBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    alertBtn: {
        flex: 1,
        padding: 15,
        margin: 5,
        backgroundColor: '#E18585',
        borderRadius: 5,
        alignItems: 'center',
    },

    alertTextBtn: {
        fontFamily: 'YaHei-Bold',
        color: 'black',
        fontSize: 20
    }
});
