import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const saveUser = async (user) => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUser(user);
        } catch (error) {
            console.error('Error saving user to AsyncStorage:', error);
        }
    };


    return (
        <UserContext.Provider value={{
            user,
            saveUser
        }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
