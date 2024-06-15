export interface ProfileModel {
    bio: any;
    createdAt: any;
    email: any;
    familyName: any;
    givenName: any;
    name: any;
    photoUrl: any;
    updatedAt: any;
    following: any[];
    uid: any;
    interests?: any[];
    type?: 'Organizer' | 'Personal' | undefined;
}