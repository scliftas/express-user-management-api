import joiValidator from 'express-joi-validation';

export default abstract class Request {
    protected static type: any;
    protected static rules: any;

    static validate() {
        const validator = joiValidator({});

        return this.rules.map((rule) => {
            const type = rule.type;
            const parsedRule = rule.rules;

            return validator[type](parsedRule);
        });
    }
}