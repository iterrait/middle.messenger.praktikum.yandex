export default `
  <div class="change-password">
    <form id="change-password-form">
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
      <div class="footer">
       {{{cancelButton}}}
       {{{saveButton}}}
      </div>
      <div class="service-message">{{message}}</div>
    </form>
  </div>
`;
