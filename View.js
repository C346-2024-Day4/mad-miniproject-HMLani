import React, { useState } from "react";
import { amiiboData } from "./Data";
import {Image, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {useFonts} from "expo-font";
import {useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Icon from "react-native-vector-icons/FontAwesome6";

SplashScreen.preventAutoHideAsync();

const ViewAmiibo = ({navigation, route}) => {
    const [imgHeadID] = useState(route.params.imgHeadId);
    const [imgTailID] = useState(route.params.imgTailId);
    const [character] = useState(route.params.character);
    const [releaseDate] = useState(route.params.releaseDate);
    const [presentBy] = useState(route.params.presentBy);
    const [desc] = useState(route.params.desc);
    const [type] = useState(route.params.type);

    const [isLoaded] = useFonts({
        'Mina-Bold': require('./assets/fonts/MinaBold.ttf'),
        'YaHei-Light': require('./assets/fonts/MicrosoftYaHeiLight.ttf'),
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

    return(
        <SafeAreaView onLayout={handleOnLayout}>
            <View style={styles.bg}>
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
                    navigation.navigate('Home');
                }}>
                    <Text style={styles.backBtnStyle}>
                        <Icon name={'angle-left'}/> Back
                    </Text>
                </TouchableOpacity>

                <ScrollView style={styles.container}>
                    <Image source={{uri: `https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_${imgHeadID}-${imgTailID}.png`}} style={styles.imgStyle}/>

                    <Text style={styles.characterTitle}>
                        {character}
                    </Text>

                    <Text style={styles.infoTextBold}>
                        Series: <Text style={styles.infoTextLight}>{type}</Text>
                    </Text>

                    <Text style={styles.infoTextBold}>
                        Release Date: <Text style={styles.infoTextLight}>{releaseDate}</Text>
                    </Text>

                    <Text style={styles.infoTextBold}>
                        Present By: <Text style={styles.infoTextLight}>{presentBy}</Text>
                    </Text>

                    <Text style={styles.descLight}>
                        {desc}
                    </Text>
                </ScrollView>

                <View style={{marginLeft: 30, marginRight: 30}}>
                    <TouchableOpacity
                        style={styles.btnStyle}
                        onPress={() => {
                            navigation.navigate('Edit', {
                                index: route.params.index,
                                type: route.params.type,
                                imgHeadId: imgHeadID,
                                imgTailId: imgTailID,
                                character: character,
                                releaseDate: releaseDate,
                                presentBy: presentBy,
                                desc: desc
                            });


                        }}>
                        <View>
                            <Text style={{fontSize: 20, fontFamily: 'YaHei-Light'}}>
                                Edit <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 20}}>amiibo</Text> Details
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewAmiibo;

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

    container: {
        padding: 30,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderRightWidth: 5,
        borderBottomWidth: 5,
    },

    imgStyle: {
        width: 285,
        height: 150,
        objectFit: 'contain',
        borderWidth: .6,
        borderRadius: 10,
    },

    characterTitle: {
        fontFamily: 'Mina-Bold',
        fontSize: 30,
        marginTop: 10,
    },

    infoTextBold: {
        fontFamily: 'YaHei-Bold',
        fontSize: 15,
        marginTop: 10
    },

    infoTextLight: {
        fontFamily: 'YaHei-Light',
        fontSize: 15,
    },

    descLight: {
        fontFamily: 'YaHei-Light',
        fontSize: 15,
        marginTop: 30,
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

    btnStyle: {
        padding: 15,
        backgroundColor: '#E18585',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        elevation: 5,
    },
});
