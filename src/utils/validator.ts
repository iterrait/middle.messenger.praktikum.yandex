interface Regexp {
  rule: RegExp;
  error: string;
}

export const REGEXP: Record<string, Regexp> = {
  email: {
    rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    error: 'Email должен быть латиница, может включать цифры, обзяательно @',
  },
  login: {
    rule: /^[a-zA-Z0-9_-]{3,20}$/u,
    error: 'Логин должен быть от 3 до 20 символов, латиница, может содержать цифры, без пробелов, без спецсимволов',
  },
  first_name: {
    rule: /(^[A-ZА-Я])([Ёёа-яА-Я-]*$)|(^[a-zA-Z-]*$)/,
    error: 'Имя должно быть латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр',
  },
  second_name: {
    rule: /(^[A-ZА-Я])([Ёёа-яА-Я-]*$)|(^[a-zA-Z-]*$)/,
    error: 'Фамилия должна быть латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр',
  },
  phone: {
    rule: /^(\(\d{2,}\) ((\d{4}-\d{4})|(9\d{4}-\d{4})))|(\d{2})((9\d{8})|(\d{8}))$/,
    error: 'Телефон должен быть от 10 до 15 символов, состоит из цифр, может начинаться с плюса',
  },
  password: {
    rule: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/,
    error: 'Пароль должен быть от 8 до 40 символов, хотя бы одна заглавная буква и цифра',
  },
  new_password: {
    rule: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/,
    error: 'Новый пароль введен некорректно',
  },
  confirm_password: {
    rule: /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/,
    error: 'Подтверждение пароля введено некорректно',
  },
  message: {
    rule: /(.|\s)*\S(.|\s)*/,
    error: 'Введите непустое сообщение',
  },
  display_name: {
    rule: /(.|\s)*\S(.|\s)*/,
    error: 'Введите непустое имя',
  },
};

export const validateInput = (input: HTMLInputElement): string | null => {
  if (!input) {
    return null;
  }
  const rule = REGEXP[input.name]?.rule || null;

  return rule && !rule.test(input.value)
    ? REGEXP[input.name].error
    : null;
}

export const validateForm = (data: Record<string, any>): boolean => (
  Object.entries(data).every(([field, value]) => REGEXP[field]?.rule.test(value)) || true
)

export const validateForm2 = (formData: FormData): boolean => {
  return [...formData.entries()].every(([field, value]) => REGEXP[field]?.rule.test(value as string) || true);
};
