export interface TypeStateIdeas {
  id_idea?: number;
  nombre_idea?: string;
  id_azure_docente_correo?: string;
  id_tipo_idea?: string;
  aprovado?: boolean;
  fecha_creacion?: string;
  id_carrito?: number;
  correo_estudiante?: string;
}

export interface TypeTypesIdeas {
  id_tipo_idea: number;
  nombre: string;
}

export interface TypeIdeasTaken {
  cooldown: string;
  estado: string;
  estado_pago: number;
  fecha_aceptado: string;
  id_azure_estudiante_correo: string;
  id_idea_tomada: number;
  nombre_idea: string;
}


export interface TypeFavorites {
  id_ideaFav: number;
  id_idea: number;
  correo_estudiante: string;
}

export interface TypeCarrito {
  id_idea?: number;
  nombre_idea?: string;
  id_azure_docente_correo?: string;
  id_tipo_idea?: string;
  aprovado?: boolean;
  fecha_creacion?: string;
  id_carrito?: number;
  correo_estudiante?: string;
}