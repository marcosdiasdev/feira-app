import { Deserializable } from "../shared/deserializable";

export class Oferta implements Deserializable {

  id : number;
  preco : number;
  feira_id : number;
  feira_nome : string;
  produto_nome : string;
  imagem_url : string;
  unidade_descricao : string;
  likes : number;
  liked : boolean;

  constructor() { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  toggleLikeState() {
    if(!this.liked) {
      this.liked = true;
      this.likes++;
    } else {
      this.liked = false;
      this.likes--;
    }
  }
}
