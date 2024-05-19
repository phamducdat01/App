import { SearchNormal1, TickCircle } from 'iconsax-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Share, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { useSelector } from 'react-redux';
import userAPI from '../apis/userApi';
import {
    ButtonComponent,
    InputComponent,
    RowComponent,
    SectionComponent,
    TextComponent,
    UserComponent,
} from '../components';
import { appColors } from '../constants/appColors';
import { fontFamily } from '../constants/fontFamily';
import { authSelector } from '../redux/reducers/authReducer';
import firestore from '@react-native-firebase/firestore';

interface Props {
    visible: boolean;
    onClose: () => void;
    eventId: string;
    title: string;
    joined: string[];
}

const ModalInvite = (props: Props) => {
    const { visible, onClose, eventId, title, joined } = props;

    const [friendIds, setFriendIds] = useState<string[]>([]);
    const [useSelected, setUseSelected] = useState<string[]>([]);

    const modalizeRef = useRef<Modalize>();
    const auth = useSelector(authSelector);

    useEffect(() => {
        if (auth.following && auth.following.length > 0) {
            setFriendIds(auth.following);
        }
    }, [auth]);

    useEffect(() => {
        if (visible) {
            modalizeRef.current?.open();
        } else {
            modalizeRef.current?.close();
        }
    }, [visible]);

    const handleSelectedId = (id: string) => {
        const items: string[] = [...useSelected];
        const index = items.findIndex(element => element === id);

        if (index !== -1) {
            items.splice(index, 1);
        } else {
            items.push(id);
        }

        setUseSelected(items);
    };

    const handleSendInviteNotification = async () => {
        if (useSelected.length > 0) {
            const api = `/send-invite`;

            try {
                await userAPI.HandleUser(
                    api,
                    {
                        ids: useSelected,
                        eventId,
                    },
                    'post',
                );

                const data: any = {
                    from: auth.id,
                    createdAt: Date.now(),
                    content: `Invite A virtual Evening of ${title}`,
                    eventId,
                    idRead: false,
                };

                useSelected.forEach(async id => {
                    console.log(id);
                    await firestore()
                        .collection('notifcation')
                        .add({ ...data, uid: id });

                    console.log('Created notifition done!');
                });

                onClose();
            } catch (error) {
                console.log(error);
            }
        } else {
            Alert.alert('', 'Please select user want to invite!!');
        }
    };

    return

}

export default ModalInvite;