export const CUSTOM_ERRORS: any[] = [
  {
    error: 'required',
    format: requiredError,
  },
  {
    error: 'invalid',
    format: invalidError,
  },
  {
    error: 'invalidNaturalName',
    format: invalidNaturalName,
  },
  {
    error: 'invalidLegalName',
    format: invalidLegalName,
  },
  {
    error: 'invalidSingleName',
    format: invalidSingleName,
  },
  {
    error: 'invalidEmail',
    format: invalidEmail,
  }
];

export function requiredError(): string {
  return `Campo obrigatório.`;
}
export function invalidError(): string {
  return `Campo inválido.`;
}

export function invalidEmail(): string {
  return `E-mail inválido.`;
}

export function invalidNaturalName(): string {
  return `Nome com caracteres não permitidos.`;
}

export function invalidLegalName(): string {
  return `Razão social com caracteres não permitidos.`;
}

export function invalidSingleName(): string {
  return `Deve conter mais de uma palavra.`;
}
