import React, { useState, useEffect, useCallback } from 'react';

import { View, Text, Image, SafeAreaView, TextInput, StatusBar, StyleSheet, ScrollView, FlatList, Touchable, TouchableOpacity } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import Svg, { Path, SvgImage } from 'react-native-svg';
import { fetchWeatherForecast } from './api/weather'; // Import Axios functions

export default function HomeScreen() {

    const [showSearch, toggleSearch] = useState(false);
    const [locations, setLocations] = useState([1, 2, 3]);
    const [weather, setWeather] = useState({})

    const handleLocation = (loc) => {
        console.log('location: ', loc);
        setLocations([]);
        toggleSearch(false);
        fetchWeatherForecast({
            cityName: loc.name,
            days: '7'
        }).then(data => {
            setWeather(data);
            console.log('got data: ', data);
        })
    }

    const handleSearch = value => {
        console.log('value', value);
    }

    const { current, location } = weather;

    return (
        <View className="flex-1 relative" style={{ backgroundColor: 'rgba(24, 32, 41, 1)' }}>
            <StatusBar style="light" />
            <SafeAreaView className="flex flex-1" >

                <Image source={require('./assets/images/bg-map.png')}
                    className="absolute w-full bg-blend-darken"
                />

                <ScrollView>
                    {/*Nav Bar Section*/}
                    <View style={{ height: '7%' }} className="mx-4 flex-row justify-between relative z-50">
                        <Svg className="my-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill='white'
                        >
                            <Path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                                stroke='white'
                            />

                        </Svg>

                        {/*Search location*/}
                        <View className="w-48 my-2 flex-row justify-between items-center rounded-full"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.25)' }}>
                            <TextInput
                                placeholder='NCR'
                                placeholderTextColor={'white'}
                                className="pl-6 h-10 font-bold text-base text-white"
                            />

                            <Svg className="pr-10"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill='white'
                            >
                                <Path
                                    d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"
                                    stroke='white'
                                />
                            </Svg>

                        </View>

                        <Svg className="my-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill='white'
                        >
                            <Path
                                d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 
            1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 
            1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 
            0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 
            8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 
            4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 
            0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"
                                stroke='white'
                            />
                        </Svg>
                    </View>

                    {/*Forecast Section*/}
                    <View className="mx-4 flex p-14 mb-2">
                        <Text className="text-orange-500 text-center text-lg font-bold">
                            DANGER
                        </Text>

                        <Text className="text-center text-xs underline text-white/70">
                            What does this mean?
                        </Text>


                        <View className="flex-row justify-center">
                            <Text className="p-8 pt-16 text-center text-9xl text-white font-black">
                                {current?.feelslike_c}{/*Today Forecast*/}
                                <Text className="pt-8 text-center text-9xl text-white font-light">°</Text>
                            </Text>
                        </View>

                        <Text className="text-white text-center text-sm font-bold">
                            40° as per PAGASA
                        </Text>

                        <Text className="pt-2 text-center text-xs text-white/70" >
                            Updated 00:00 today
                        </Text>
                    </View>

                    {/*Forecast for the next 7 days*/}

                    <View className="mb-2 space-y-3">
                        <ScrollView
                            horizontal
                            contentContainerStyle={{ paddingHorizontal: 8 }}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View className="flex justify-center items-center w-24 rounded-md py-3 space-y-1 mr-4"
                                style={{ backgroundColor: 'background: rgba(255, 255, 255, 0.2)' }}
                            >
                                <Text className="p-4 text-white text-center text-sm font-extrabold">
                                    Tuesday
                                </Text>

                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill='rgba(251, 191, 36, 1)'
                                >
                                    <Path
                                        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 
                6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 
                3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 
                8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 
                18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 
              2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                                        stroke='rgba(251, 191, 36, 1)'
                                    />
                                </Svg>

                                <Text className="p-4 text-white text-center text-sm font-black">
                                    40°
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-md py-3 space-y-1 mr-4"
                                style={{ backgroundColor: 'background: rgba(255, 255, 255, 0.2)' }}
                            >
                                <Text className="py-4 text-white text-center text-sm font-extrabold">
                                    Wednesday
                                </Text>

                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill='rgba(251, 191, 36, 1)'
                                >
                                    <Path
                                        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 
                6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 
                3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 
                8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 
                18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 
              2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                                        stroke='rgba(251, 191, 36, 1)'
                                    />
                                </Svg>

                                <Text className="p-4 text-white text-center text-sm font-black">
                                    40°
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-md py-3 space-y-1 mr-4"
                                style={{ backgroundColor: 'background: rgba(255, 255, 255, 0.2)' }}
                            >
                                <Text className="p-4 text-white text-center text-sm font-extrabold">
                                    Thursday
                                </Text>

                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill='rgba(251, 191, 36, 1)'
                                >
                                    <Path
                                        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 
                6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 
                3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 
                8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 
                18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 
              2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                                        stroke='rgba(251, 191, 36, 1)'
                                    />
                                </Svg>

                                <Text className="p-4 text-white text-center text-sm font-black">
                                    40°
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-md py-3 space-y-1 mr-4"
                                style={{ backgroundColor: 'background: rgba(255, 255, 255, 0.2)' }}
                            >
                                <Text className="p-4 text-white text-center text-sm font-extrabold">
                                    Friday
                                </Text>

                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill='rgba(251, 191, 36, 1)'
                                >
                                    <Path
                                        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 
                6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 
                3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 
                8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 
                18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 
              2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                                        stroke='rgba(251, 191, 36, 1)'
                                    />
                                </Svg>

                                <Text className="p-4 text-white text-center text-sm font-black">
                                    40°
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-md py-3 space-y-1 mr-4"
                                style={{ backgroundColor: 'background: rgba(255, 255, 255, 0.2)' }}
                            >
                                <Text className="p-4 text-white text-center text-sm font-extrabold">
                                    Saturday
                                </Text>

                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill='rgba(251, 191, 36, 1)'
                                >
                                    <Path
                                        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 
                6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 
                3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 
                8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 
                18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 
              2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                                        stroke='rgba(251, 191, 36, 1)'
                                    />
                                </Svg>

                                <Text className="p-4 text-white text-center text-sm font-black">
                                    40°
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-md py-3 space-y-1 mr-4"
                                style={{ backgroundColor: 'background: rgba(255, 255, 255, 0.2)' }}
                            >
                                <Text className="p-4 text-white text-center text-sm font-extrabold">
                                    Sunday
                                </Text>

                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill='rgba(251, 191, 36, 1)'
                                >
                                    <Path
                                        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 
                6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 
                3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 
                8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 
                18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 
              2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                                        stroke='rgba(251, 191, 36, 1)'
                                    />
                                </Svg>

                                <Text className="p-4 text-white text-center text-sm font-black">
                                    40°
                                </Text>
                            </View>

                            <View className="flex justify-center items-center w-24 rounded-md py-3 space-y-1 mr-4"
                                style={{ backgroundColor: 'background: rgba(255, 255, 255, 0.2)' }}
                            >
                                <Text className="p-4 text-white text-center text-sm font-extrabold">
                                    Monday
                                </Text>

                                <Svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill='rgba(251, 191, 36, 1)'
                                >
                                    <Path
                                        d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 
                6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 
                3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 
                8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 
                18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 
              2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                                        stroke='rgba(251, 191, 36, 1)'
                                    />
                                </Svg>

                                <Text className="p-4 text-white text-center text-sm font-black">
                                    40°
                                </Text>
                            </View>

                        </ScrollView>
                    </View>


                </ScrollView>
            </SafeAreaView >
        </View >
    )
}

