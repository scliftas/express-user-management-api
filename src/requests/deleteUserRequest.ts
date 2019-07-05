import Joi from '@hapi/joi';
import Request from './request';

class DeleteUserRequest extends Request {
    protected static rules: object[] = [
        {
            type: 'params',
            rules: Joi.object({
                id: Joi.number().integer().required(),
            }),
        },
    ];
}

export default DeleteUserRequest.validate();

