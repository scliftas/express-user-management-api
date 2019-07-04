import joiValidator from 'express-joi-validation';

/**
 * Custom request pattern written to make writing Joi
 * validation a bit cleaner. Expects a rules property defining
 * all validation rules for either the request parameters and/or
 * the request body.
 */
export default abstract class Request {
    protected static rules: any;

    /**
     * Runs Joi validation against the defined rules property
     * 
     * @returns Joi validation results
     */
    static validate() {
        const validator = joiValidator({});

        return this.rules.map((rule) => {
            const type = rule.type;
            const parsedRule = rule.rules;

            return validator[type](parsedRule);
        });
    }
}