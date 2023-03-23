export const inputTmpl = `
    <label for="{{name}}"    
            {{#if isHidden}}
            class="hidden" 
            {{/if}}>
        <div class="input-title">{{label}}</div>
        <input
            {{#if error}}
            class="error-validation" 
            {{/if}}
            type="{{type}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            name="{{name}}"
            required>
            {{#if error}} 
            <div class="input-error">{{error}}</div> 
            {{/if}}
    </label>
`;
