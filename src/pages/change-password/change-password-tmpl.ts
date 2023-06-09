export default `
  <form id="change-password-form">
    {{{closeButton}}}
    <div class="form-title">Изменить пароль</div>
    <div class="change-password-info">
      <div class="change-password-info__icon"></div>
      <div class="change-password-info__text">
        Пароль должен быть не короче 6 символов, старайтесь не использовать популярные сочетания символов
        (QWERTY и т.д.)
      </div>
    </div>
    {{{oldPasswordInput}}}
    {{{newPasswordInput}}}
    {{{confirmNewPasswordInput}}}
    {{{saveButton}}}
  </form>
`;
