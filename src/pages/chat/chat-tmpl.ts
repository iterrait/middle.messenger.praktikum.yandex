export default `
  <div class="chat__sidebar">
    <div class="info">
      <div class="owner-info"> 
        {{#if firstname}}
        {{firstname}} 
        {{else}}Имя
        {{/if}}
        {{#if lastname}}
        {{lastname}} 
        {{else}}Фамилия
        {{/if}}
      </div>
      <div class="owner-status">В сети</div>
    </div>
    <div class="chats">
      {{{chatPreview}}}
    </div>
  </div>
  <div class="content">
    <div class="participant">
      <div class="participant__info">
        {{#if participantFirstname}}
        {{participantFirstname}} 
        {{else}}Иван
        {{/if}}
        {{#if participantLastname}}
        {{participantLastname}} 
        {{else}}Белов
        {{/if}}
      </div>
      <div class="participant__status">Был(а) в сети недавно</div>
    </div>
    <div class="chat__feed"></div>    
    <form id="chat-form">  
      <div class="choose-file"></div>
      {{{fileInput}}}
      {{{messageInput}}}
      {{{sendMessageButton}}}  
    </form>
  </div>
`;
