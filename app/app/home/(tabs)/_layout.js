import { Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{headerShown: false}}
        >
            <Tabs.Screen
                name="home"
                options={
                          {
                            // href: ["drugInfo"],
                            title: 'Welcome Back!',
                            headerStyle: 
                            {
                              backgroundColor: '#407BFF',
                              },
                            headerTintColor: '#fff',
                            headerTitleStyle: 
                              {
                              fontWeight: 'bold',
                              },
                  }}
                
            />
        </Tabs>
    )
};