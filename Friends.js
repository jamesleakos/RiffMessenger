import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const friends = [
    { name: 'Friend 1', key: '1' },
    { name: 'Friend 2', key: '2' },
    { name: 'Friend 3', key: '3' },
    { name: 'Friend 4', key: '4' },
    { name: 'Friend 5', key: '5' },
];

const FriendsList = () => {
    return (
        <View>
            <FlatList
                data={friends}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
            />
        </View>
    );
};

export default FriendsList;