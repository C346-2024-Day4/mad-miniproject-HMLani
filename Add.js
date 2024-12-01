import {amiiboData} from "./Data.js";
import React, {useState} from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Image, Modal } from 'react-native';
import RSPickerSelect from 'react-native-picker-select';
import {useFonts} from "expo-font";
import {useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Icon from "react-native-vector-icons/FontAwesome6";

SplashScreen.preventAutoHideAsync();

const Add = ({navigation}) => {
    const [imgHeadID, setImgHeadID] = useState('');
    const [imgTailID, setImgTailID] = useState('');
    const [character, setCharacter] = useState('');
    const [series, setSeries] = useState('Super Smash Bros.');
    const [releaseDate, setReleaseDate] = useState('');
    const [presentBy, setPresentBy] = useState('');
    const [description, setDescription] = useState('');
    const [alertAddedVisible, setAlertAddedVisible] = useState(false);

    const [isLoaded] = useFonts({
        'Pretendo-Regular': require('./assets/fonts/Pretendo.ttf'),
        'Bauhaus-bold': require('./assets/fonts/BauhausStdDemi.ttf'),
        'YaHei-Bold': require('./assets/fonts/MicrosoftYaHeiBold.ttf'),
    });

    const handleOnLayout = useCallback(async () => {
        if (isLoaded) {
            await SplashScreen.hideAsync(); //hide the splashscreen
        }
    }, [isLoaded]);

    if (!isLoaded) {
        return null;
    }

    return (
        <SafeAreaView onLayout={handleOnLayout}>
            <ScrollView style={styles.bg}>
                <View style={{backgroundColor: '#FFFFFF', height: '3%'}}></View>
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
                    navigation.navigate('Home');
                }}>
                    <Text style={styles.backBtnStyle}>
                        <Icon name={'angle-left'}/> Back
                    </Text>
                </TouchableOpacity>

                <Text style={styles.titleStyle}>
                    Add an <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 30}}>amiibo</Text>
                </Text>

                <View style={styles.container}>
                    <Text style={styles.textHeaderStyle}>Head ID:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'E.g. 00000000'}
                        onChangeText={(text) => setImgHeadID(text)}
                    />

                    <Text style={styles.textHeaderStyle}>Tail ID:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'E.g. 00000000'}
                        onChangeText={(text) => setImgTailID(text)}
                    />

                    <Text style={styles.textHeaderStyle}>
                        <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 15}}>amiibo</Text> Name:
                    </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'E.g. Mario'}
                        onChangeText={(text) => setCharacter(text)}
                    />

                    <Text style={styles.textHeaderStyle}>Series:</Text>
                    <View style={styles.pickerStyle}>
                        <RSPickerSelect
                            itemKey={series}
                            placeholder={{label: 'Please select series category...', value: null}}
                            onValueChange={(value) => setSeries(value)}
                            items={[
                                {label: 'Super Smash Bros.', value: 'Super Smash Bros.', key: 'Super Smash Bros.'},
                                {label: 'Super Mario', value: 'Super Mario', key: 'Super Mario'},
                                {
                                    label: 'Legend of Zelda: BOTW',
                                    value: 'Legend of Zelda: BOTW',
                                    key: 'Legend of Zelda: BOTW'
                                },
                            ]}
                        />
                    </View>

                    <Text style={styles.textHeaderStyle}>Release Date:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'E.g. Jan 01, 1800'}
                        onChangeText={(text) => setReleaseDate(text)}
                    />

                    <Text style={styles.textHeaderStyle}>Present By:</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={'E.g. Sega'}
                        onChangeText={(text) => setPresentBy(text)}
                    />

                    <Text style={styles.textHeaderStyle}>Description:</Text>
                    <TextInput
                        style={[styles.inputStyle, {minHeight: 210, maxHeight: 210}]}
                        placeholder={'Details about the amiibo...'}
                        onChangeText={(text) => setDescription(text)}
                        multiline={true}
                    />

                    <Modal
                        animationType={'slide'}
                        transparent={true}
                        visible={alertAddedVisible}
                        onRequestClose={() => {
                            setAlertAddedVisible(false);
                        }}
                    >
                        <View style={styles.alertOverlay}>
                            <View style={styles.alertContainer}>
                                <Image
                                    source={require('./assets/img/amiibo-logo2.png')}
                                    style={{width: 150, height: 150, objectFit: 'contain'}}
                                />
                                <Text style={styles.alertMsg}>
                                    <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 25}}>amiibo</Text> added
                                </Text>

                                <View style={styles.alertBtnContainer}>
                                    <TouchableOpacity
                                        style={styles.alertBtn}
                                        onPress={() => {
                                            let item = {
                                                imgHeadId: imgHeadID,
                                                imgTailId: imgTailID,
                                                character: character,
                                                series: series,
                                                releaseDate: releaseDate,
                                                presentBy: presentBy,
                                                desc: description
                                            };
                                            let indexnum = 2;

                                            if (series === 'Super Smash Bros.') {
                                                indexnum = 0;
                                            } else if (series === 'Super Mario') {
                                                indexnum = 1;
                                            }
                                            amiiboData[indexnum].data.push(item);
                                            navigation.navigate('Home');
                                            setAlertAddedVisible(false);
                                        }}
                                    >
                                        <Text style={styles.alertTextBtn}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity style={styles.btnStyle} onPress={() => {setAlertAddedVisible(true);}}>
                        <View>
                            <Text style={{fontSize: 20, fontFamily: 'YaHei-Bold'}}>
                                Submit
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add;

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#E60012',
        height: '100%',
    },

    top: {
        backgroundColor: '#FFFFFF',
        height: '8%',
        borderBottomLeftRadius: 105,
        borderBottomRightRadius: 105,
    },

    titleStyle: {
        fontSize: 30,
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'Pretendo-Regular',
        color: 'white',
    },

    textHeaderStyle: {
        fontFamily: 'YaHei-Bold',
        fontSize: 15,
        color: 'white',
    },

    inputStyle: {
        borderWidth: .8,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 5,
        height: 55,
        paddingLeft: 16
    },

    container: {
        padding: 20
    },

    pickerStyle: {
        borderWidth: .8,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 5
    },

    btnStyle: {
        padding: 15,
        backgroundColor: '#E18585',
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 10,
        alignItems: 'center',
        elevation: 5,
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
        width: '100%'
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
