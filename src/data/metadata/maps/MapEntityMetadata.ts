import { CoordS } from "../../../types/coords/CoordS";
import { MapLiftableTarget } from "./entities/MapLiftableTarget";
import { MapNpc } from "./entities/npcs/MapNpc";
import { MapBreakableActorObject } from "./entities/objects/breakable/MapBreakableActorObject";
import { MapBreakableNifObject } from "./entities/objects/breakable/MapBreakableNifObject";
import { MapInteractObject } from "./entities/objects/MapInteractObject";
import { MapLiftableObject } from "./entities/objects/MapLiftableObject";
import { MapVibrateObject } from "./entities/objects/MapVibrateObject";
import { MapWeaponObject } from "./entities/objects/MapWeaponObject";
import { PatrolData } from "./entities/PatrolData";
import { MapPortal } from "./entities/portals/MapPortal";
import { MapEventNpcSpawnPoint } from "./entities/spawns/MapEventNpcSpawnPoint";
import { MapMobSpawn } from "./entities/spawns/MapMobSpawn";
import { MapPlayerSpawn } from "./entities/spawns/MapPlayerSpawn";
import { MapTriggerActor } from "./entities/triggers/MapTriggerActor";
import { MapTriggerBox } from "./entities/triggers/MapTriggerBox";
import { MapTriggerCamera } from "./entities/triggers/MapTriggerCamera";
import { MapTriggerCube } from "./entities/triggers/MapTriggerCube";
import { MapTriggerEffect } from "./entities/triggers/MapTriggerEffect";
import { MapTriggerLadder } from "./entities/triggers/MapTriggerLadder";
import { MapTriggerMesh } from "./entities/triggers/MapTriggerMesh";
import { MapTriggerRope } from "./entities/triggers/MapTriggerRope";
import { MapTriggerSkill } from "./entities/triggers/MapTriggerSkill";
import { MapTriggerSound } from "./entities/triggers/MapTriggerSound";
import { WayPoint } from "./Waypoint";

export class MapEntityMetadata {
    public id: number;
    public npcs: MapNpc[];
    public portals: MapPortal[];
    public playerSpawns: MapPlayerSpawn[];
    public mobSpawns: MapMobSpawn[];
    public weaponObjects: MapWeaponObject[];
    public boundingBox0: CoordS;
    public boundingBox1: CoordS;
    public healingSpots: CoordS[];
    public patrolDatum: PatrolData[];
    public wayPoints: WayPoint[];
    public triggerMeshes: MapTriggerMesh[];
    public triggerEffects: MapTriggerEffect[];
    public triggerCameras: MapTriggerCamera[];
    public triggerBoxes: MapTriggerBox[];
    public triggerLadders: MapTriggerLadder[];
    public eventNpcSpawnPoints: MapEventNpcSpawnPoint[];
    public triggerActors: MapTriggerActor[];
    public triggerCubes: MapTriggerCube[];
    public triggerSounds: MapTriggerSound[];
    public triggerRopes: MapTriggerRope[];
    public breakableActors: MapBreakableActorObject[];
    public breakableNifs: MapBreakableNifObject[];
    public vibrateObjects: MapVibrateObject[];
    public triggerSkills: MapTriggerSkill[];
    public interactObjects: MapInteractObject[];
    public liftableObjects: MapLiftableObject[];
    public liftableTarget: MapLiftableTarget[];

    public constructor(
        id: number,
        npcs: MapNpc[],
        portals: MapPortal[],
        playerSpawns: MapPlayerSpawn[],
        mobSpawns: MapMobSpawn[],
        weaponObjects: MapWeaponObject[],
        boundingBox0: CoordS,
        boundingBox1: CoordS,
        healingSpots: CoordS[],
        patrolDatum: PatrolData[],
        wayPoints: WayPoint[],
        triggerMeshes: MapTriggerMesh[],
        triggerEffects: MapTriggerEffect[],
        triggerCameras: MapTriggerCamera[],
        triggerBoxes: MapTriggerBox[],
        triggerLadders: MapTriggerLadder[],
        eventNpcSpawnPoints: MapEventNpcSpawnPoint[],
        triggerActors: MapTriggerActor[],
        triggerCubes: MapTriggerCube[],
        triggerSounds: MapTriggerSound[],
        triggerRopes: MapTriggerRope[],
        breakableActors: MapBreakableActorObject[],
        breakableNifs: MapBreakableNifObject[],
        vibrateObjects: MapVibrateObject[],
        triggerSkills: MapTriggerSkill[],
        interactObjects: MapInteractObject[],
        liftableObjects: MapLiftableObject[],
        liftableTarget: MapLiftableTarget[]
    ) {
        this.id = id;
        this.npcs = npcs;
        this.portals = portals;
        this.playerSpawns = playerSpawns;
        this.mobSpawns = mobSpawns;
        this.weaponObjects = weaponObjects;
        this.boundingBox0 = boundingBox0;
        this.boundingBox1 = boundingBox1;
        this.healingSpots = healingSpots;
        this.patrolDatum = patrolDatum;
        this.wayPoints = wayPoints;
        this.triggerMeshes = triggerMeshes;
        this.triggerEffects = triggerEffects;
        this.triggerCameras = triggerCameras;
        this.triggerBoxes = triggerBoxes;
        this.triggerLadders = triggerLadders;
        this.eventNpcSpawnPoints = eventNpcSpawnPoints;
        this.triggerActors = triggerActors;
        this.triggerCubes = triggerCubes;
        this.triggerSounds = triggerSounds;
        this.triggerRopes = triggerRopes;
        this.breakableActors = breakableActors;
        this.breakableNifs = breakableNifs;
        this.vibrateObjects = vibrateObjects;
        this.triggerSkills = triggerSkills;
        this.interactObjects = interactObjects;
        this.liftableObjects = liftableObjects;
        this.liftableTarget = liftableTarget;
    }
}
