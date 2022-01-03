export class HongBaoData {
    public id: number;
    public count: number;
    public totalUsers: number;
    public duration: number;

    public constructor(id: number, count: number, totalUsers: number, duration: number) {
        this.id = id;
        this.count = count;
        this.totalUsers = totalUsers;
        this.duration = duration;
    }
}
