import Joi from 'joi';
import Request from './request';

class CreateUserRequest extends Request {
    protected static rules: object[] = [
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

export default CreateUserRequest.validate();

