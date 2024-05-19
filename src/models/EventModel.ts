export interface EventModel {
    __v?: any;
    _id?: any;
    authorId?: any;
    categories?: any;
    createdAt?: any;
    description?: any;
    endAt?: any;
    locationAddress?: any;
    locationTitle?: any;
    photoUrl?: any;
    position?: Position;
    price?: any;
    date?: any;
    startAt?: any;
    title?: any;
    updatedAt?: any;
    users?: any[];
    followers?: any[];
    joined?: any[];
}

export interface Position {
    _id?: any;
    lat: any;
    long: any;
}