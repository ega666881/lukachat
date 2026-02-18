import { IsNotEmpty } from 'class-validator';
import { IsUuid } from '../../../shared/decorators/uuid.decorator';
import { chatsTable } from '../../schemas/chats.schema';
import { ChatDto } from './chat.dto';

export class GetChatByIdRequest {
  @IsNotEmpty()
  @IsUuid({
    table: chatsTable,
    column: 'id',
    description: 'ID чата',
    required: true,
  })
  chatId!: string;
}

export class GetChatByIdResponse {
  @IsNotEmpty()
  chat!: ChatDto;
}
