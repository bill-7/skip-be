import { ArraySchema, MapSchema } from "@colyseus/schema";
import { Room, Client } from "colyseus";
import { MyRoomState, Player, Piles } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  onCreate(options: any) {
    this.setState(new MyRoomState());

    this.onMessage("state", (client, message) => {
      console.log(client.id, message);
      const p = this.state.players.get(client.sessionId)
      Object.entries(message).forEach(([key, value]) => {
        if (key === "player.hand") p.hand = value as ArraySchema<number>
        if (key === "player.stock") p.stock = value as ArraySchema<number>
        if (key === "player.bench") this.updateBench(value, client.sessionId)
        if (key === "piles") this.updatePiles(value)
      })
    });

    this.onMessage("draw", (client) => {
      const p = this.state.players.get(client.sessionId)
      if (p.hand?.length < 5)
        p.hand?.push(this.randomCard())
    })
  }

  onJoin(client: Client, options: any) {
    if (this.state.players.size == 0) {
      this.state.piles.set("pile", this.newPiles())
    }
    if (this.state.players.size == 2) {
      console.log("player cap reached")
      return
    }
    this.state.players.set(client.sessionId, this.newPlayer(client.sessionId))
    console.log(client.sessionId, "joined!");
  }

  onLeave(client: Client, consented: boolean) {
    this.state.players.delete(client.sessionId)
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
    p.hand = this.toAS(this.build(5))
    p.stock = this.toAS(this.build(10))
    p.bench1 = this.toAS([])
    p.bench2 = this.toAS([])
    p.bench3 = this.toAS([])
    p.bench4 = this.toAS([])
    return p
  }

  updateBench(benches: any, id: string) {
    const latest = this.state.players.get(id) as Record<string, any>
    (benches as number[][]).forEach((bench, i) => latest["bench" + (i + 1)] = bench)
  }

  newPiles() {
    const p = new Piles
    p.pile1 = this.toAS([])
    p.pile2 = this.toAS([])
    p.pile3 = this.toAS([])
    p.pile4 = this.toAS([])
    return p
  }

  updatePiles(piles: any) {
    const latest = this.state.piles.get("pile") as Record<string, any>
    (piles as number[][]).forEach((pile, i) => {
      latest["pile" + (i + 1)] = ((pile.includes(12)) ? pile : [])
    })
  }
}