import Joi from '@hapi/joi';
import Request from './request';

class UpdateUserRequest extends Request {
    protected static rules: object[] = [
        {
            type: 'params',
            rules: Joi.object({
                id: Joi.number().integer().required(),
            }),
        },
        {
            type: 'body',
            rules: Joi.object({
                email: Joi.string().email().required(),
                givenName: Joi.string().max(255).required(),
                familyName: Joi.string().max(255).required(),
            }),
        },
    ];
}

export default UpdateUserRequest.validate();

