import { Schema, Context, type, ArraySchema, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("string") id = ""
  @type(["number"]) hand: ArraySchema<number>;
  @type(["number"]) stock = new ArraySchema<number>();

  @type(["number"]) bench_1 = new ArraySchema<number>();
  @type(["number"]) bench_2 = new ArraySchema<number>();
  @type(["number"]) bench_3 = new ArraySchema<number>();
  @type(["number"]) bench_4 = new ArraySchema<number>();
}

export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type(["number"]) pile_1 = new ArraySchema<number>();
  @type(["number"]) pile_2 = new ArraySchema<number>();
  @type(["number"]) pile_3 = new ArraySchema<number>();
  @type(["number"]) pile_4 = new ArraySchema<number>();
}
