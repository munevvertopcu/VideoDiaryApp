import { Stack } from "expo-router";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Layout() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="modal"
                        options={{
                            headerShown: false,
                            presentation: 'modal'
                        }}
                    />
                    <Stack.Screen name="metadata" options={{ headerShown: false }} />
                    <Stack.Screen name="details/[id]" options={{ headerShown: false }} />
                </Stack>
            </QueryClientProvider>
        </Provider>
    );
}