import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { BASE_URL } from "../config";

const useRecordActivity = () => {
    const { token, user } = useContext(authContext);

    const recordActivity = async (featureName, action = "Used", path = window.location.pathname) => {
        if (!token || !user) return;

        // Determine base endpoint based on role
        let endpoint = "";
        if (user.role === "patient") {
            endpoint = `${BASE_URL}/users/activity/record`;
        } else if (user.role === "doctor" || user.role === "hospital") {
            endpoint = `${BASE_URL}/doctors/activity/record`;
        } else {
            return; // Exit for admin or unknown roles
        }

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    featureName,
                    action,
                    path,
                }),
            });

            const result = await res.json();
            if (!res.ok) {
                throw new Error(result.message);
            }
        } catch (err) {
            console.error("Error recording activity:", err.message);
        }
    };

    return { recordActivity };
};

export default useRecordActivity;
