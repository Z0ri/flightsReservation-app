export class User{
    constructor(
        public email: string,
        private _password: string,
        public firstName?: string,
        public lastName?: string,
        private _money: number = 0,
        private _credits: number = 0
    ){}

    public get credits(): number {
        return this._credits;
    }
    public set credits(value: number) {
        this._credits = value;
    }

    public get money(): number {
        return this._money;
    }
    public set money(value: number) {
        this._money = value;
    }
    
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

}