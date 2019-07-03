import Joi from 'joi';
import Request from './request';

class GetUserRequest extends Request {
    protected static rules: object[] = [
        {
            type: 'params',
            rules: Joi.object({
                id: Joi.number().integer().required(),
            }),
        },
    ];
}

export default GetUserRequest.validate();

