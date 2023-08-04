import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { errorMessages, successMessages, HTTP_CALL, ROLE, PAGE_INDEX, COURSES_LENGTH } from "../utils/contants";

i18n.use(Backend)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        debug: false,
        resources: {
            en: {
                translation: {
                    errorMessages,
                    successMessages,
                    HTTP_CALL,
                    COURSES_LENGTH,
                    ROLE,
                    PAGE_INDEX,
                },
            },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
