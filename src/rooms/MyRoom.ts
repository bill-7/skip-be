import { ArraySchema } from "@colyseus/schema";
import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("state", (client, message) => {
      console.log(client.id, message);

    });

    this.onMessage("draw", (client) => {
      const p = this.state.players.get(client.sessionId)
      if (p.hand.length < 5)
        p.hand.push(this.randomCard())
    })
  }

  onJoin(client: Client, options: any) {
    if (this.state.players.size == 2) {
      console.log("player cap reached")
      return
    }
    this.state.players.set(client.sessionId, this.newPlayer(client.sessionId))
    console.log(client.sessionId, "joined!");
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  randomCard(): number {
    return Math.floor(Math.random() * 13)
  }

  build(n: number = 10, xs: number[] = []): number[] {
    return !n ? xs : this.build(n - 1, xs.concat(this.randomCard()))
  }

  toAS<T>(xs: T[]) {
    return xs as ArraySchema<T>
  }

  newPlayer(id: string) {
    const p = new Player
    p.id = id
    p.hand = this.toAS(this.build(3))
    p.stock = this.toAS(this.build(10))
    return p
  }
}
