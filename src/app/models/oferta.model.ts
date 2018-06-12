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
  user_likes : string = 'no'

  constructor() { }

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }

  toggleLikeState() {
    if(this.user_likes == 'no') {
      this.user_likes = 'yes'
      this.likes++
    } else {
      this.user_likes = 'no'
      this.likes--
    }
  }
}