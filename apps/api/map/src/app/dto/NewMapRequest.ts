import {
  IsDefined,
  IsNumber,
} from 'class-validator';

export class NewMapRequestDto {
  @IsDefined()
  @IsNumber()
  public height: number;

  @IsDefined()
  @IsNumber()
  public width: number;

  @IsDefined()
  @IsNumber()
  public numberOfRegions: number;

  @IsDefined()
  @IsNumber()
  public numberOfMaps: number;
}
