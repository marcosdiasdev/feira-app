import { Deserializable } from "../shared/deserializable";

export class Feira implements Deserializable {

  id: number;
  nome: string;
  descricao: string;
  latitude: number;
  longitude: number;
  dia_da_semana: number;
  distancia: number;

  constructor() { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
