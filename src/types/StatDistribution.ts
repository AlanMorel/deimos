export class StatDistribution {

    public totalStatPoints: number;
    // TODO: implement Dictionary to keep track of points earned from quest, trophy, exploration, prestige
    // naming convention: PointsFromQuest, PointsFromTrophy, PointsFromExploration, PointsFromPrestige

    public allocatedStats: Map<number, number>;
    // key = index representing the stat type (ie. a value of 00 corresponds to Str)
    // value = number of points allocated to the stat

    public constructor() {
        // hardcode the amount of stat points the character starts with temporarily
        this.totalStatPoints = 18;
        this.allocatedStats = new Map<number, number>();
    }
}
