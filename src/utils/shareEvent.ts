import { Alert, Share } from "react-native";
import { appInfors } from "../constants/appInfos";

export const ShareEvent = async ({
    title, description, id
}: { title: string, description: string, id: string; }) => {
    try {
        const result = await Share.share({
            message:
                `${title}\n\n${description}\n\nurl: ${appInfors.domain}/detail/${id}`,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error: any) {
        Alert.alert(error.message);
    }
};