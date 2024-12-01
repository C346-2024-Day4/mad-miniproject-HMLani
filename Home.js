import {Image, SafeAreaView, StyleSheet, Text, View, SectionList, TouchableOpacity} from 'react-native';
import React from 'react';
import { useFonts } from "expo-font";
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { amiiboData } from './Data.js';

SplashScreen.preventAutoHideAsync();

export default function Home({navigation}) {
    const renderItem = ({item, index, section}) => {
        return(
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('View', {
                        index: index,
                        type: section.title,
                        imgHeadId: item.imgHeadId,
                        imgTailId: item.imgTailId,
                        character: item.character,
                        releaseDate: item.releaseDate,
                        presentBy: item.presentBy,
                        desc: item.desc,
                    });
                }}
            >
                <View style={[styles.itemContainer, index === section.data.length - 1 && styles.itemLast]}>
                    <Image
                        source={{uri: `https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_${item.imgHeadId}-${item.imgTailId}.png`}}
                        style={styles.imgStyle}
                    />
                    <Text style={styles.textHeaderStyles}>{item.character}</Text>
                    <Text style={styles.textParagraphStyles}>{item.releaseDate}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const [isLoaded] = useFonts({
        'Bauhaus-bold': require('./assets/fonts/BauhausStdDemi.ttf'),
        'Bayon-regular': require('./assets/fonts/BayonReg.ttf'),
        'Mina-Bold': require('./assets/fonts/MinaBold.ttf'),
        'YaHei-Light': require('./assets/fonts/MicrosoftYaHeiLight.ttf')
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

                <View style={styles.container}>
                    <SectionList
                        sections={amiiboData}
                        renderItem={renderItem}
                        renderSectionHeader={
                            ({section: {title, bgColor}}) =>
                                (<Text style={[styles.sectionHeaderStyle, {backgroundColor: bgColor}]}>
                                    {title}
                                </Text>)
                        }
                    />

                    <TouchableOpacity style={styles.btnStyle} onPress={() => {navigation.navigate('Add');}}>
                        <View>
                            <Text style={{fontSize: 20, fontFamily: 'YaHei-Light'}}>
                                Add <Text style={{fontFamily: 'Bauhaus-bold', fontSize: 20}}>amiibo</Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

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

    sectionHeaderStyle: {
        fontSize: 30,
        textAlign: 'center',
        padding: 5,
        color: 'white',
        fontFamily: 'Bayon-regular',
        marginTop: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderLeftWidth: 1,
        borderRightWidth: 5,
        borderTopWidth: 1,
    },

    imgStyle: {
        width: 100,
        height: 100,
        objectFit: 'contain'
    },

    itemContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 5,
    },

    textHeaderStyles: {
        fontSize: 25,
        fontFamily: 'Mina-Bold'
    },

    textParagraphStyles: {
        fontSize: 20,
        fontFamily: 'YaHei-Light'
    },

    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        flex: 1,
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

    itemLast: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomWidth: 5,
    },
});
