import { Schema, Context, type, ArraySchema, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") id = ""
  @type(["number"]) hand: ArraySchema<number>;
  @type(["number"]) stock = new ArraySchema<number>();

  @type(["number"]) bench1 = new ArraySchema<number>();
  @type(["number"]) bench2 = new ArraySchema<number>();
  @type(["number"]) bench3 = new ArraySchema<number>();
  @type(["number"]) bench4 = new ArraySchema<number>();
}

export class Piles extends Schema {
  @type(["number"]) pile1 = new ArraySchema<number>();
  @type(["number"]) pile2 = new ArraySchema<number>();
  @type(["number"]) pile3 = new ArraySchema<number>();
  @type(["number"]) pile4 = new ArraySchema<number>();
}

export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ map: Piles }) piles = new MapSchema<Piles>();
}
