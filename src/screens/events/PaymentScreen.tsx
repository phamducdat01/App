import { View, Text } from 'react-native';
import React from 'react';
import {
    ButtonComponent,
    ContainerComponent,
    RowComponent,
    SectionComponent,
    SpaceComponent,
    TagComponent,
    TextComponent,
} from '../../components';
import { fontFamily } from '../../constants/fontFamily';
import { DateTime } from '../../utils/DateTime';
import { appColors } from '../../constants/appColors';
import eventAPI from '../../apis/eventApi';

const PaymentScreen = ({ navigation, route }: any) => {
    const { billDetail } = route.params;

    const handlePaySuccessfully = async () => {
        const api = `/update-payment-success?billId=${billDetail._id}`;

        try {
            const res = await eventAPI.HandleEvent(api);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ContainerComponent>
            <SectionComponent>
                <RowComponent justify="flex-end">
                    <TagComponent
                        label={billDetail.status === 'success' ? 'Success' : 'Unpaid'}
                    />
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{ alignItems: 'center' }}>
                <TextComponent
                    text={`ID: ${billDetail._id}`}
                    font={fontFamily.bold}
                    size={20}
                />
                <TextComponent
                    text={`Date: ${DateTime.GetDayString(billDetail.createdAt)}`}
                />
                <SpaceComponent height={16} />
                <TextComponent
                    text={`$${parseFloat(billDetail.price).toLocaleString()}`}
                    font={fontFamily.bold}
                    size={24}
                    color={appColors.primary}
                />
            </SectionComponent>
            <SectionComponent
                styles={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 16,
                }}>
                <RowComponent justify="space-between">
                    <TextComponent text="Total change" />
                    <TextComponent
                        font={fontFamily.medium}
                        color={appColors.primary}
                        text={`$${billDetail.price}`}
                    />
                </RowComponent>
                <ButtonComponent
                    onPress={handlePaySuccessfully}
                    text="Pay now"
                    type="primary"
                    styles={{ marginBottom: 12, marginVertical: 12 }}
                />
                <TextComponent
                    text="Payment securely progressed by Paypal"
                    styles={{ textAlign: 'center' }}
                    size={12}
                />
            </SectionComponent>
        </ContainerComponent>
    );
};

export default PaymentScreen;