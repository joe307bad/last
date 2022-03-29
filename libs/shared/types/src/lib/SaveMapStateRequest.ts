import {
  IsDefined,
  IsString,
} from 'class-validator';

export class SaveMapStateRequest {
  @IsDefined()
  @IsString()
  public mapId: string;

  @IsDefined()
  @IsString()
  public mapState: string;
}
