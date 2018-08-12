import { Deserializable } from "../../app/shared/deserializable";
import { OfertaProvider } from "../../providers/oferta/oferta.provider";

export class Oferta implements Deserializable {

  id : number
  preco : number
  feira_id : number
  feira_nome : string
  produto_nome : string
  imagem_url : string
  unidade_descricao : string
  likes : number
  liked : string

  constructor() { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  toggleLikeState() {
    if(this.liked == 'no') {
      this.liked = 'yes'
      this.likes++
    } else {
      this.liked = 'no'
      this.likes--
    }
  }
}