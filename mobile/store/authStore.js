// import {create} from "zustand";
// import AsyncStorage from '@react-native-async-storage/async-storage';



// export const useAuthStore = create((set) => ({
//     user: null,
//     token: null,
//     isLoading: false,


//     register: async (username, email, password) => {
//         set({isLoading: true});
//         try {
//             const response = await fetch("https://bookworm-33w3.onrender.com/api/auth/register",{
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     username,
//                     email,
//                     password,
//                 })
//             });

//             const data = await response.json();
//             if(!response.ok) throw new Error(data.message || "Something wants wrong");
//             await AsyncStorage.setItem("user", JSON.stringify(data.user));
//             await AsyncStorage.setItem("token", data.token);
            
//             set({token: data.token, user: data.user, isLoading: false});
//             return {success: true};
//         } catch (error) {
//             set({isLoading: false});
//             return {success:false, error: error.message};
//         }
//     },
// }));



import { create } from "zustand";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,

   register: async (username, email, password) => {
    set({ isLoading: true });
    console.log("🚀 Request Started (Waiting indefinitely)...");
    
    try {
        // REMOVE THE ABORT CONTROLLER/TIMEOUT FOR THIS TEST
        const response = await fetch("https://bookworm-33w3.onrender.com/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        console.log("✅ FINALLY RESPONDED:", data);

        if (!response.ok) throw new Error(data.message || "Registration failed");

        set({ isLoading: false });
        return { success: true, serverOtp: data.serverOtp }; 
        
    } catch (error) {
        set({ isLoading: false });
        console.log("❌ Error:", error.message);
        return { success: false, error: error.message };
    }
},
    verifyOTP: async (username, email, password, userCode, serverOtp) => {
        set({ isLoading: true });
        try {
            const response = await fetch("https://bookworm-33w3.onrender.com/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, userCode, serverOtp })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({ user: data.user, token: data.token, isLoading: false });
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    },


    // 3. Resend OTP (In case they didn't get the email)
    resendOTP: async (email) => {
        try {
            const response = await fetch("https://bookworm-33w3.onrender.com/api/auth/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}));