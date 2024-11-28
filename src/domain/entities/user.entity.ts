export class UserEntity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;

    constructor(data: Partial<UserEntity>) {
        Object.assign(this, data);
    }

    static create(data: Partial<UserEntity>) {
        return new UserEntity(data);
    }
}
