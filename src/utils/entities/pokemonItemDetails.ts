export interface PokemonItemDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny?: string;
    back_shiny?: string;
    other?: {
      'official-artwork'?: {
        front_default?: string;
        front_shiny?: string;
        back_default?: string;
        back_shiny?: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}
