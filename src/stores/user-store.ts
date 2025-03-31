import { defineStore } from "pinia";
import { ref } from "vue";
import type { IUser } from "../types/UserTypes";

export const useUserStore = defineStore("user-store", () => {
    const authUserData = ref<IUser>({
        username: "",
        hash: "",
        password: "",
    });
    const error = ref<string | null>(null);
    const isLoading = ref<boolean>(false);

    function logout() {
        authUserData.value = {
            username: "",
            hash: "",
            password: "",
        };
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("hash");
    }

    return { error, authUserData, isLoading, logout };
})