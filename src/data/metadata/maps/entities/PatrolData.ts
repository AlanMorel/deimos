export class PatrolData {
    public name: string;
    public wayPointIds: string[];
    public patrolSpeed: number;
    public isLoop: boolean;
    public isAirwayPoint: boolean;
    public arriveAnimations: string[];
    public approachAnimations: string[];
    public arriveAnimationTimes: number[];

    public constructor(
        name: string,
        waypointIds: string[],
        patrolSpeed: number,
        isLoop: boolean,
        isAirwayPoint: boolean,
        arriveAnimations: string[],
        approachAnimations: string[],
        arriveAnimationTimes: number[]
    ) {
        this.name = name;
        this.wayPointIds = waypointIds;
        this.patrolSpeed = patrolSpeed;
        this.isLoop = isLoop;
        this.isAirwayPoint = isAirwayPoint;
        this.arriveAnimationTimes = arriveAnimationTimes;
        this.arriveAnimations = arriveAnimations;
        this.approachAnimations = approachAnimations;
    }
}
