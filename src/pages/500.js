import * as Handlebars from "handlebars";

const template = `
    <div class="plug">
        <div class="plug__title">500</div>
        <div class="plug__description">Ой! Мы уже разбираемся в чем дело, а пока...</div>
        <a class="plug__link">Назад к чатам</a>
    </div>
`;

export const Page500 = () => {
    return Handlebars.compile(template)();
};
