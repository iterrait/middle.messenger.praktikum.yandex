export default `
  <button id="avatar-button" type="button" class="avatar-button">
    <div class="avatar-wrapper">
    {{#if avatar}}
    <img src={{avatar}} class="avatar">
    {{else}}
    <div class="avatar no-image"></div>
    {{/if}}
    </div>
  </button>  
`;
