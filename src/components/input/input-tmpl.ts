export default `
  <label for="{{name}}" {{#if isHidden}} class="hidden" {{/if}}>{{label}}</label>
  <input 
    type="{{type}}"
    placeholder="{{placeholder}}"
    value="{{value}}"
    name="{{name}}"
    {{#if error}}class="input-error"{{/if}}>
    {{#if error}}<div class="error">{{error}}</div> {{/if}}
`;
