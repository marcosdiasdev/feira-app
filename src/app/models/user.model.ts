import { Deserializable } from "../shared/deserializable";
import {Model} from "./model";

export class User extends Model implements Deserializable {

  id : number;
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
