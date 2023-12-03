import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const isAuthenticated = async () => {
    try {
        const session = await getServerSession(authOptions);
        const userStatus = session?.user?.status || null;
        return userStatus === 'Admin';
    } catch (error) {
        console.error("Error fetching session:", error);
        return false;
    }
};