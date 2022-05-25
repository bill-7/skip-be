import { Schema, Context, type } from "@colyseus/schema";

class Player extends Schema {
  @type(["number"]) hand = new ArraySchema<number>();
  @type(["number"]) stock = new ArraySchema<number>();

  @type(["number"]) bench_1 = new ArraySchema<number>();
  @type(["number"]) bench_2 = new ArraySchema<number>();
  @type(["number"]) bench_3 = new ArraySchema<number>();
  @type(["number"]) bench_4 = new ArraySchema<number>();
}

class Piles extends Schema {
  @type(["number"]) play_1 = new ArraySchema<number>();
  @type(["number"]) play_2 = new ArraySchema<number>();
  @type(["number"]) play_3 = new ArraySchema<number>();
  @type(["number"]) play_4 = new ArraySchema<number>();
}

export class MyRoomState extends Schema {
  @type({ map: Player }) player1 = new MapSchema<Player>();
  @type({ map: Player }) player2 = new MapSchema<Player>();
  @type({ map: Piles }) piles = new MapSchema<Piles>();
}
