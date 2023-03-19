import * as Handlebars from "handlebars";

const template = `
    <div class="plug">
        <div class="plug__title">404</div>
        <div class="plug__description">Вы не туда попали:)</div>
        <a class="plug__link">Назад к чатам</a>
    </div>
`;

export const Page404 = () => {
    return Handlebars.compile(template)();
};
