import { Request, Response } from 'express';

import { ListAllUsersUseCase } from './ListAllUsersUseCase';

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;
    if (Array.isArray(user_id)) {
      return response.status(400).json({ error: 'User_id must be a string!' });
    }
    try {
      const users = this.listAllUsersUseCase.execute({ user_id });
      return response.json(users);
    } catch ({ message: error }) {
      return response.status(400).json({ error });
    }
  }
}

export { ListAllUsersController };
