export default `
<div class="form-control">
  <label for="{{name}}">{{label}}</label>
  <input 
    type="{{type}}"
    placeholder="{{placeholder}}"
    value="{{value}}"
    name="{{name}}"
    id="{{id}}"
    {{#if error}}class="input-error"{{/if}}>
    {{#if error}}<div class="error">{{error}}</div> {{/if}}
</div>
`;
