import { Deserializable } from "../../app/shared/deserializable";
import { LikeProvider } from "../../providers/like/like.provider";

export class Like implements Deserializable {

  oferta_id : number
  app_user_id : number

  constructor() { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}