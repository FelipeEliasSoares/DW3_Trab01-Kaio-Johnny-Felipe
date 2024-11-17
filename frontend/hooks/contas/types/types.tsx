export type Conta = {
  id: string;
  descricao: string;
  tipo: string;
  valor: number;
  data: string;
  status: string;
  forma_pagamento: string;
  usuario_id: string;
};

// Define the type for the API response when getting all contas
export type GetAllContasResponse = {
  status: string;
  registros: Conta[];
};

// Define the type for the API response when getting a conta by ID
export type GetContaByIdResponse = {
  status: string;
  registro: Conta[];
};

export type CreateContaInput = {
  descricao: string;
  tipo: string;
  valor: number;
  data: string;
  status: string;
  forma_pagamento: string;
  usuario_id: string;
};

export type UpdateContaInput = {
  descricao?: string;
  tipo?: string;
  valor?: number;
  data?: string;
  status?: string;
  forma_pagamento?: string;
  usuario_id?: string;
};
