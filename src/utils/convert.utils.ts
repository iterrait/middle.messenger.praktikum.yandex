export function getFormData(formData: FormData): Record<string, unknown> {
  const obj: Record<string, unknown> = {};

  for (const pair of formData.entries()) {
    obj[pair[0]] = pair[1];
  }

  return obj;
}
