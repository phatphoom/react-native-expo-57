import { Stack } from 'expo-router';

export default function ProductLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: 'Product Details' }} />
            <Stack.Screen name="edit/[id]" options={{ title: 'Edit Product' }} />
        </Stack>
    );
}
