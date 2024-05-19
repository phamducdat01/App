import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import eventAPI from '../apis/eventApi';
import { Category } from '../models/Category';

interface Props {
    categoryId: string;
}

const MakerCustom = (props: Props) => {
    const { categoryId } = props;

    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        categoryId && getCategoryById();
    }, [categoryId]);

    const getCategoryById = async () => {
        const api = `/get-category?id=${categoryId}`;
        try {
            const res = await eventAPI.HandleEvent(api);

            setCategory(res.data);
        } catch (error: any) {
            console.log(error);
        }
    };

    return category ? (
        <ImageBackground
            source={require('../assets/img/Union.png')}
            style={[
                globalStyles.shawdow,

                {
                    width: 56,
                    height: 56,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            ]}
            imageStyle={[
                globalStyles.center,
                {
                    resizeMode: 'contain',
                    width: 56,
                    height: 56,
                },
            ]}>
            <View
                style={[
                    globalStyles.center,
                    {
                        width: 38,
                        height: 38,
                        backgroundColor: category.color,
                        borderRadius: 12,
                    },
                ]}>
                <Image
                    source={{ uri: category.iconWhite }}
                    style={{
                        width: 24,
                        height: 24,
                    }}
                />
            </View>
        </ImageBackground>
    ) : (
        <></>
    );
};

export default MakerCustom;