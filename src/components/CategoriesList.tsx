import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image } from 'react-native';
import { TagComponent } from '.';
import eventAPI from '../apis/eventApi';
import { appColors } from '../constants/appColors';
import { Category } from '../models/Category';

interface Props {
    isFill?: boolean;
    onFilter?: (id: string) => void;
}

const CategoriesList = (props: Props) => {
    const { isFill, onFilter } = props;

    const [categories, setCategories] = useState<Category[]>([]);
    const [categorySelected, setCategorySelected] = useState('');

    const navigation: any = useNavigation();

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (categorySelected && onFilter) {
            onFilter(categorySelected);
        }
    }, [categorySelected]);

    const getCategories = async () => {
        const api = `/get-categories`;

        try {
            const res = await eventAPI.HandleEvent(api);
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectCategory = async (item: Category) => {
        if (!onFilter) {
            navigation.navigate('CategoryDetail', {
                id: item._id,
                title: item.title,
            });
        } else {
            setCategorySelected(item._id);
        }
    };

    return categories.length > 0 ? (
        <FlatList
            style={{ paddingHorizontal: 16 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={item => item._id}
            renderItem={({ item, index }) => (
                <TagComponent
                    styles={{
                        marginRight: index === categories.length - 1 ? 28 : 12,
                        minWidth: 82,
                    }}
                    bgColor={
                        isFill
                            ? item.color
                            : categorySelected === item._id
                                ? item.color
                                : 'white'
                    }
                    onPress={() => handleSelectCategory(item)}
                    label={item.title}
                    icon={
                        <Image
                            source={{
                                uri: isFill
                                    ? item.iconWhite
                                    : categorySelected === item._id
                                        ? item.iconWhite
                                        : item.iconColor,
                            }}
                            style={{ width: 20, height: 20 }}
                        />
                    }
                    textColor={
                        isFill
                            ? 'white'
                            : categorySelected === item._id
                                ? appColors.white
                                : appColors.text2
                    }
                />
            )}
        />
    ) : (
        <></>
    );
};

export default CategoriesList;