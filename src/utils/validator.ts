interface REGEXP {
  rule: RegExp;
  error: string;
}

export const REGEXP: Record<string, REGEXP> = {
  email: {
    rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: "Email введен некорректно",
  },
  login: {
    rule: /^[a-zA-Z0-9_-]{3,20}$/u,
    error: "Логин введен некорректно",
  },
  first_name: {
    rule: /(^[A-ZА-Я])([Ёёа-яА-Я-]*$)|(^[a-zA-Z-]*$)/,
    error: "Имя введено некорректно",
  },
  second_name: {
    rule: /(^[A-ZА-Я])([Ёёа-яА-Я-]*$)|(^[a-zA-Z-]*$)/,
    error: "Фамилия введена некорректно",
  },
  phone: {
    rule: /^(\(\d{2,}\) ((\d{4}-\d{4})|(9\d{4}-\d{4})))|(\d{2})((9\d{8})|(\d{8}))$/,
    error: "Телефон введен некорректно",
  },
  password: {
    rule: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/,
    error: "Пароль введен некорректно",
  },
  new_password: {
    rule: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/,
    error: "Новый пароль введен некорректно",
  },
  confirm_password: {
    rule: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/,
    error: "Подтверждение пароля введено некорректно",
  },
  message: {
    rule: /(.|\s)*\S(.|\s)*/,
    error: 'Введите непустое сообщение',
  },
  display_name: {
    rule: /(.|\s)*\S(.|\s)*/,
    error: 'Введите непустое имя',
  },
}

export const validateInput = (input: HTMLInputElement): string | null => {
  if (!input) {
    return null;
  }
  const rule = REGEXP[input.name]?.rule || null;

  return rule && !rule.test(input.value)
    ? REGEXP[input.name].error
    : null;
}

export const validateForm = (formData: FormData): boolean => {
  return [...formData.entries()].every(([field, value]) => REGEXP[field]?.rule.test(value as string) || true);
};
