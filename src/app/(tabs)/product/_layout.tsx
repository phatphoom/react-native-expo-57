import { Stack } from 'expo-router';

export default function ProductLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="[id]" options={{ title: 'รายละเอียดสินค้า' }} />
            <Stack.Screen name="edit/[id]" options={{ title: 'แก้ไขสินค้า' }} />
        </Stack>
    );
}
