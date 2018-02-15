import BaseForm from 'BaseForm.js';

describe('BaseForm - hasErrors', () => {
    it('hasErrors - Строка с ошибкой', done => {
        const err = BaseForm.hasErrors("Поле обязательно для заполнения");
        expect(err).toBe(true);
        done();
    });
    it('hasErrors - Нет ошибки', done => {
        const err = BaseForm.hasErrors();
        expect(err).toBe(false);
        done();
    });

    it('hasErrors - Строка с 0', done => {
        const err = BaseForm.hasErrors("0");
        expect(err).toBe(true);
        done();
    });

    it('hasErrors - Объект без ошибок', done => {
        const err = BaseForm.hasErrors({
            inn: null,
            ogrn: undefined,
            type: null
        });
        expect(err).toBe(false);
        done();
    });

    it('hasErrors - Объект без ошибок', done => {
        const err = BaseForm.hasErrors({
            inn: null,
            ogrn: null,
            type: null
        });
        expect(err).toBe(false);
        done();
    });
    it('hasErrors - Объект с ошибкой', done => {
        const err = BaseForm.hasErrors({
            inn: 'Некорректный ИНН',
            ogrn: null,
            type: null
        });
        expect(err).toBe(true);
        done();
    });
    it('hasErrors - Объект с несколькими ошибками', done => {
        const err = BaseForm.hasErrors({
            inn: null,
            ogrn: 'Некорректный ОГРН',
            type: 'Некорректный тип'
        });
        expect(err).toBe(true);
        done();
    });
    it('hasErrors - Объект с объектом содержащий ошибку', done => {
        const err = BaseForm.hasErrors({0: {
            inn: null,
            ogrn: 'Некорректный ОГРН',
            type: 'Некорректный тип'
        }});
        expect(err).toBe(true);
        done();
    });
    it('hasErrors - Объект с объектами без ошибок', done => {
        const err = BaseForm.hasErrors({0: {
            inn: null,
            ogrn: null,
            type: null
        }});
        expect(err).toBe(false);
        done();
    });
    it('hasErrors - Массив с объектом без ошибок', done => {
        const err = BaseForm.hasErrors([{
            inn: null,
            ogrn: null,
            type: null
        }]);
        expect(err).toBe(false);
        done();
    });
    it('hasErrors - Массив с объектом с ошибкой', done => {
        const err = BaseForm.hasErrors([{
            inn: null,
            ogrn: 'Ильшат негодует!',
            type: null
        }]);
        expect(err).toBe(true);
        done();
    });
});
