"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoomState = void 0;
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.hand = new ArraySchema();
        this.stock = new ArraySchema();
        this.bench_1 = new ArraySchema();
        this.bench_2 = new ArraySchema();
        this.bench_3 = new ArraySchema();
        this.bench_4 = new ArraySchema();
    }
}
__decorate([
    schema_1.type(["number"])
], Player.prototype, "hand", void 0);
__decorate([
    schema_1.type(["number"])
], Player.prototype, "stock", void 0);
__decorate([
    schema_1.type(["number"])
], Player.prototype, "bench_1", void 0);
__decorate([
    schema_1.type(["number"])
], Player.prototype, "bench_2", void 0);
__decorate([
    schema_1.type(["number"])
], Player.prototype, "bench_3", void 0);
__decorate([
    schema_1.type(["number"])
], Player.prototype, "bench_4", void 0);
class Piles extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.play_1 = new ArraySchema();
        this.play_2 = new ArraySchema();
        this.play_3 = new ArraySchema();
        this.play_4 = new ArraySchema();
    }
}
__decorate([
    schema_1.type(["number"])
], Piles.prototype, "play_1", void 0);
__decorate([
    schema_1.type(["number"])
], Piles.prototype, "play_2", void 0);
__decorate([
    schema_1.type(["number"])
], Piles.prototype, "play_3", void 0);
__decorate([
    schema_1.type(["number"])
], Piles.prototype, "play_4", void 0);
class MyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.player1 = new MapSchema();
        this.player2 = new MapSchema();
        this.piles = new MapSchema();
    }
}
__decorate([
    schema_1.type({ map: Player })
], MyRoomState.prototype, "player1", void 0);
__decorate([
    schema_1.type({ map: Player })
], MyRoomState.prototype, "player2", void 0);
__decorate([
    schema_1.type({ map: Piles })
], MyRoomState.prototype, "piles", void 0);
exports.MyRoomState = MyRoomState;
